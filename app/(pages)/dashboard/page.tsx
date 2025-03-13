"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  limitToLast,
  DataSnapshot,
} from "firebase/database";
import { ScrollArea } from "@/components/ui/scroll-area";
import { database } from "@/lib/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

interface FirebaseDataEntry<T> {
  [key: string]: T;
}

// Interfaces
interface SystemMetadata {
  cpu: string;
  docker: boolean;
  node: string;
  os: string;
  python: string;
  ram: string;
  rust: string;
}

interface RawTaskData {
  taskType: "docker" | "python";
  status: "completed" | "failed" | "running" | "pending";
  createdAt: string;
  assignedTo: string;
  createdBy: string;
  userId: string;
  doneUserId?: string;
}

interface Task extends RawTaskData {
  id: string;
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

interface TaskStatusProps {
  status: Task["status"];
}

// Reusable Components
const TaskStatus: React.FC<TaskStatusProps> = ({ status }) => {
  const config = {
    completed: { icon: CheckCircle, color: "text-green-500" },
    failed: { icon: XCircle, color: "text-red-500" },
    running: { icon: Loader, color: "text-blue-500" },
    pending: { icon: Clock, color: "text-orange-500" },
  }[status];

  let Icon=Clock;
  if (config !== undefined) {
    Icon = config.icon 
  } 

  return (
    <Icon
      className={`h-4 w-4 ${config?.color||"text-blue-100"} ${
        status === "running" ? "animate-spin" : ""
      }`}
    />
  );
};

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  details: React.ReactNode;
}> = ({ title, value, icon, details }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex gap-2 text-xs text-muted-foreground">{details}</div>
    </CardContent>
  </Card>
);

// Main Component
const DashboardPage = () => {
  const { user } = useAuth();
  const [presenceData, setPresenceData] = useState<PresenceData[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    activeNodes: 0,
    workersOnline: 0,
    clientsOnline: 0,
    doneTotalTasks: 0,
    doneCompletedTasks: 0,
    doneFailedTasks: 0,
  });

  const processPresenceData = useCallback(
    (snapshot: DataSnapshot, userEmail: string): PresenceData[] => {
      const data = snapshot.val() as FirebaseDataEntry<RawPresenceData> | null;
      if (!data) return [];

      return Object.entries(data)
        .map(
          ([id, value]): PresenceData => ({
            id,
            ...value,
          })
        )
        .filter((node) => node.email === userEmail);
    },
    []
  );

  const processTasksData = useCallback(
    (
      snapshot: DataSnapshot,
      userId: string,
      isDone: boolean = false
    ): Task[] => {
      const data = snapshot.val() as FirebaseDataEntry<RawTaskData> | null;
      if (!data) return [];

      return Object.entries(data)
        .map(
          ([id, value]): Task => ({
            id,
            ...value,
          })
        )
        .filter((task) =>
          isDone ? task.doneUserId === userId : task.userId === userId
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    },
    []
  );

  const chartData = useMemo(() => {
    return tasks
      .reduce((acc: { date: string; tasks: number }[], task) => {
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
  }, [tasks]);
  useEffect(() => {
    if (!database || !user?.uid) return;

    const presenceRef = ref(database, "presence");
    const tasksRef = ref(database, "tasks");
    const userTasksQuery: Query = query(
      tasksRef,
      orderByChild("createdBy"),
      limitToLast(100)
    );

    const unsubscribePresence = onValue(presenceRef, (snapshot) => {
      const presenceArray = processPresenceData(snapshot, user.email ?? "");
      setPresenceData(presenceArray);

      const now = new Date().getTime();
      const onlineThreshold = 60000;
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

    const unsubscribeTasks = onValue(userTasksQuery, (snapshot) => {
      const tasksArray = processTasksData(snapshot, user.uid);
      const doneTasksArray = processTasksData(snapshot, user.uid, true);

      setTasks(tasksArray);

      setStats((prev) => ({
        ...prev,
        totalTasks: tasksArray.length,
        completedTasks: tasksArray.filter((task) => task.status === "completed")
          .length,
        failedTasks: tasksArray.filter((task) => task.status === "failed")
          .length,
        doneTotalTasks: doneTasksArray.length,
        doneCompletedTasks: doneTasksArray.filter(
          (task) => task.status === "completed"
        ).length,
        doneFailedTasks: doneTasksArray.filter(
          (task) => task.status === "failed"
        ).length,
      }));
    });

    return () => {
      unsubscribePresence();
      unsubscribeTasks();
    };
  }, [user?.uid, user?.email, processPresenceData, processTasksData]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-lg">Please log in to view your dashboard</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Navbar */}
      <NavBar />

      <div className="p-4 md:p-6 space-y-6 bg-[#f0efea] rounded-xl">
        {/* Stats Overview */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Your Active Nodes"
            value={stats.activeNodes}
            icon={<Server className="h-4 w-4 text-muted-foreground" />}
            details={
              <>
                <span>{stats.clientsOnline} clients</span>
                <span>{stats.workersOnline} workers</span>
              </>
            }
          />
          <StatCard
            title="Your Tasks"
            value={stats.totalTasks}
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
            details={
              <>
                <span className="text-green-500">
                  {stats.completedTasks} completed
                </span>
                <span className="text-red-500">{stats.failedTasks} failed</span>
                <span className="text-blue-500">
                  {stats.totalTasks - stats.completedTasks - stats.failedTasks}{" "}
                  pending
                </span>
              </>
            }
          />
          <StatCard
            title="Tasks Done"
            value={stats.doneTotalTasks}
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
            details={
              <>
                <span className="text-green-500">
                  {stats.doneCompletedTasks} completed
                </span>
                <span className="text-red-500">
                  {stats.doneFailedTasks} failed
                </span>
                <span className="text-blue-500">
                  {stats.doneTotalTasks -
                    stats.doneCompletedTasks -
                    stats.doneFailedTasks}{" "}
                  pending
                </span>
              </>
            }
          />
        </div>

        {/* Chart */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Your Task Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                />
                <YAxis tick={{ fontSize: 12 }} />
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

        {/* Tasks and Nodes Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 h-[35vh]">
          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Your Recent Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[20vh] pr-4">
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-3 gap-2"
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
                      <div className="text-sm text-muted-foreground">
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

          {/* Network Nodes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Your Active Network Nodes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className=" pr-4">
                <div className="space-y-2">
                  {presenceData.map((node) => (
                    <div
                      key={node.id}
                      className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-3 gap-2"
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
                            <span className="capitalize">{node.type}</span>{" "}
                            {node.id}
                          </div>
                          <div className="text-xs text-muted-foreground md:hidden">
                            Status:{" "}
                            <span className="capitalize">{node.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block text-sm text-muted-foreground capitalize">
                        {node.status}
                      </div>
                    </div>
                  ))}
                  {presenceData.length === 0 && (
                    <div className="text-center text-muted-foreground p-4">
                      No network nodes found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
