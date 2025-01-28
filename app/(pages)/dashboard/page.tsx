"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  Server,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";
import {
  ref,
  onValue,
  Query,
  query,
  orderByChild,
  limitToLast
} from "firebase/database";
import { ScrollArea } from "@/components/ui/scroll-area";
import { database } from "@/lib/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "@/app/components/LoginModal";
import ProfileMenu from "@/app/components/ProfileMenu";

interface RawTaskData {
  taskType: "docker" | "python";
  status: "completed" | "failed" | "running" | "pending";
  createdAt: string;
  assignedTo: string;
  createdBy: string;
  userId: string;
  doneUserId?:string;
}

// Final task type after mapping (includes the Firebase key)
interface Task extends RawTaskData {
  id: string;
}

interface SystemMetadata {
  cpu: string;
  docker: boolean;
  node: string;
  os: string;
  python: string;
  ram: string;
  rust: string;
}

interface RawPresenceData {
  email: string;
  lastSeen: string;
  status: string;
  systemMetadata: SystemMetadata;
  type: "client" | "worker";
  userId: string;
}

interface PresenceData extends RawPresenceData {
  id: string;
}

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  activeNodes: number;
  workersOnline: number;
  clientsOnline: number;
  doneTotalTasks: number;
  doneCompletedTasks: number;
  doneFailedTasks: number;
}

interface ChartData {
  date: string;
  tasks: number;
}

interface TaskStatusProps {
  status: Task["status"];
}

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [presenceData, setPresenceData] = useState<PresenceData[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    activeNodes: 0,
    workersOnline: 0,
    clientsOnline: 0,
    doneTotalTasks: 0,
  doneCompletedTasks: 0,
  doneFailedTasks: 0
  });
  
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!database || !user?.uid) return;

    // Listen to presence data for user's nodes
    const presenceRef = ref(database, "presence");
    const presenceUnsubscribe = onValue(presenceRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const presenceArray = Object.entries(data)
        .map((entry) => {
          const [id, value] = entry;
          return {
            id,
            ...(value as RawPresenceData),
          } as PresenceData;
        })
        .filter((node) => node.email === user.email);

    console.log(presenceArray,"Presence Array");

      setPresenceData(presenceArray);

      // Calculate online stats
      const now = new Date().getTime();
      const onlineThreshold = 60000; // 60 seconds

      const onlineNodes = presenceArray.filter(
        (node) => new Date(node.lastSeen).getTime() > now - onlineThreshold
      );

      setStats((prev) => ({
        ...prev,
        activeNodes: onlineNodes.length,
        workersOnline: onlineNodes.filter((node) => node.type === "worker")
          .length,
        clientsOnline: onlineNodes.filter((node) => node.type === "client")
          .length,
      }));
    });

    // Listen to user's tasks
    const tasksRef = ref(database, "tasks");
    const userTasksQuery: Query = query(
      tasksRef,
      orderByChild("createdBy"),
      limitToLast(100)
    );

    const tasksUnsubscribe = onValue(userTasksQuery, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const tasksArray = Object.entries(data)
        .map((entry) => {
          const [id, value] = entry;
          return {
            id,
            ...(value as RawTaskData),
          } as Task;
        })
        .filter((task) => task.userId === user.uid)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      const doneTasksArray = Object.entries(data)
        .map((entry) => {
          const [id, value] = entry;
          return {
            id,
            ...(value as RawTaskData),
          } as Task;
        })
        .filter((task) => task.doneUserId === user.uid)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      setTasks(tasksArray);
      setDoneTasks(doneTasksArray);
      console.log(doneTasks);
      

      // Calculate task stats
      setStats((prev) => ({
        ...prev,
        totalTasks: tasksArray.length,
        completedTasks: tasksArray.filter((task) => task.status === "completed")
          .length,
        failedTasks: tasksArray.filter((task) => task.status === "failed")
          .length,
          doneTotalTasks: doneTasksArray.length,
          doneCompletedTasks: doneTasksArray.filter((task) => task.status === "completed")
            .length,
            doneFailedTasks: doneTasksArray.filter((task) => task.status === "failed")
            .length,
        
      }));
    });

    return () => {
      presenceUnsubscribe();
      tasksUnsubscribe();
    };
  }, [user?.uid, user?.email]);

  // Process task data for the chart
  const chartData: ChartData[] = tasks
    .reduce((acc: ChartData[], task) => {
      const date = new Date(task.createdAt).toLocaleDateString();
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.tasks += 1;
      } else {
        acc.push({ date, tasks: 1 });
      }
      return acc;
    }, [])
    .slice(-7);

  const TaskStatus: React.FC<TaskStatusProps> = ({ status }) => {
    const config = {
      completed: { icon: CheckCircle, color: "text-green-500" },
      failed: { icon: XCircle, color: "text-red-500" },
      running: { icon: Loader, color: "text-blue-500" },
      pending: { icon: Clock, color: "text-orange-500" },
    }[status];

    const Icon = config.icon||Clock;
    return (
      <Icon
        className={`h-4 w-4 ${config.color} ${
          status === "running" ? "animate-spin" : ""
        }`}
      />
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-lg">Please log in to view your dashboard</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-xl">DASH</h1>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="https://github.com/Chackoz/Dash-Desktop"
              className="text-gray-800 hover:text-gray-600"
            >
              GitHub
            </a>
            <a
              href="https://github.com/Chackoz/Dash-Desktop/blob/master/README.md"
              className="text-gray-800 hover:text-gray-600"
            >
              Documentation
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ProfileMenu
            user={user}
            logout={logout}
            onLoginClick={() => setIsLoginOpen(true)}
          />
        </div>
      </nav>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Your Active Nodes
            </CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeNodes}</div>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>{stats.clientsOnline} clients</span>
              <span>{stats.workersOnline} workers</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Your Tasks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-green-500">
                {stats.completedTasks} completed
              </span>
              <span className="text-red-500">{stats.failedTasks} failed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks Done</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.doneTotalTasks}</div>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-green-500">
                {stats.doneCompletedTasks} completed
              </span>
              <span className="text-red-500">{stats.doneFailedTasks} failed</span>
            </div>
          </CardContent>
        </Card>

       

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Your Task Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        
      </div>

      <div className="w-full flex gap-4">
        {/* Recent Tasks */}
        <Card className="mt-6 w-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Your Recent Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <TaskStatus status={task.status} />
                      <div>
                        <div className="font-medium">
                          {task.taskType === "docker"
                            ? "Docker Container"
                            : "Python Script"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(task.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground min-w-[250px]">
                      {task.assignedTo
                        ? `Worker: ${task.assignedTo}`
                        : "Unassigned"}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* User's Nodes */}
        <Card className="mt-6 w-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Your Network Nodes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {presenceData.map((node) => (
                  <div
                    key={node.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          new Date(node.lastSeen).getTime() >
                          new Date().getTime() - 60000
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">
                          {node.email || node.id.slice(0, 8)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {node.type} - Last seen:{" "}
                          {new Date(node.lastSeen).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {node.status}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
