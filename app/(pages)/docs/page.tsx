"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  Activity,
  Container,
  Globe,
  Terminal,
  BookOpen,
  Code,
  Server,
  Network,
  DownloadIcon,
  Database,
  Cpu,
} from "lucide-react";
import NavBar from "@/app/components/NavBar";

type SectionContent = {
  title: string;
  icon: React.ReactNode;
  content: React.ReactElement;
};

type SidebarContent = {
  [key: string]: SectionContent;
};

type SectionName =
  | "overview"
  | "installation"
  | "task-execution"
  | "p2p-network"
  | "task-scheduler"
  | "docker-integration"
  | "security";

const DashDocumentation = () => {
  const [activeSection, setActiveSection] = useState<SectionName>("overview");
  // const [searchQuery, setSearchQuery] = useState("");

  const sidebarContent: SidebarContent = {
    overview: {
      title: "Overview",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-slate-800">
              DASH Documentation
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              A distributed code execution system enabling efficient task
              distribution and execution across multiple nodes, built with
              Next.js, Tauri, and Firebase.
            </p>
          </div>

          <Alert className="mb-8 bg-blue-50 border border-blue-100">
            <Activity className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              Latest Version: v1.9.4 - Now with enhanced Firebase integration
              and real-time monitoring
            </AlertDescription>
          </Alert>

          <Card className="mb-8 border border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl">What is DASH?</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-4">
              <p className="leading-relaxed">
                DASH (Distributed Adaptive Serverless Hosting) represents a
                revolutionary approach to serverless computing that
                fundamentally reimagines how cloud functions are deployed and
                executed. Unlike traditional serverless platforms that rely on
                centralized cloud infrastructure, DASH introduces a paradigm
                shift by implementing a decentralized, peer-to-peer network for
                function hosting and execution.
              </p>
              <p className="leading-relaxed">
                At its core, DASH employs containerization technology to create
                isolated, secure environments for function execution. Each node
                in the DASH network can both host and execute functions,
                creating a resilient mesh of computational resources. The
                system&apos;s adaptive nature allows it to automatically scale
                and redistribute workloads based on network capacity and demand.
              </p>
              <p className="leading-relaxed">
                By spreading functions across multiple nodes, the system
                maintains reliability even if some nodes go offline - unlike
                traditional cloud setups where an outage at a single data center
                could bring everything to a halt.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="mb-8 border border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl">Task Execution Flow</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                <ol className="list-decimal pl-5 space-y-4">
                  <li className="pl-2">
                    <p className="font-semibold">
                      User Submits Code for Execution
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Users input code via the DASH desktop application</li>
                      <li>
                        Select execution mode: local or distributed via Docker
                      </li>
                      <li>Task is added to Firebase with status: queued</li>
                    </ul>
                  </li>
                  <li className="pl-2">
                    <p className="font-semibold">
                      Scheduler Assigns Task to a Node
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>
                        Python-based scheduler scans Firebase for queued tasks
                      </li>
                      <li>
                        Selects the best available node based on load balancing
                      </li>
                      <li>Updates task metadata and status to: assigned</li>
                    </ul>
                  </li>
                  <li className="pl-2">
                    <p className="font-semibold">
                      Node Fetches and Executes the Task
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>
                        Assigned node retrieves task details from Firebase
                      </li>
                      <li>Pulls specified Docker image if required</li>
                      <li>Executes code in container or natively</li>
                    </ul>
                  </li>
                  <li className="pl-2">
                    <p className="font-semibold">
                      Task Completion and Result Storage
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Execution node stores output in Firebase</li>
                      <li>Task status updated to: completed</li>
                      <li>User retrieves results via DASH client</li>
                    </ul>
                  </li>
                </ol>
              </CardContent>
            </Card>
            <div className="h-full flex flex-col gap-4">
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Future Development</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Intelligent Task Scheduling
                      </h3>
                      <p>
                        Machine learning-based load prediction models to
                        optimize node assignments and anticipate workload
                        spikes.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        Real-Time Monitoring
                      </h3>
                      <p>
                        Enhanced visualization dashboard for live execution logs
                        and system performance metrics.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        Enhanced Security
                      </h3>
                      <p>
                        Role-based access control (RBAC) and improved sandboxing
                        mechanisms for secure execution.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        Federated Execution
                      </h3>
                      <p>
                        Cross-cluster scalability for distributed execution
                        across multiple geographic locations.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">API Integration</h3>
                      <p>
                        RESTful API for third-party applications to submit
                        execution requests programmatically.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-green-500" />
                    System Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span>Next.js + Tauri Desktop Client</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Code className="h-5 w-5 text-blue-500" />
                      <span>Python-based Task Scheduler</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-blue-500" />
                      <span>Firebase Task Management</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Container className="h-5 w-5 text-blue-500" />
                      <span>Docker Execution Environment</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ),
    },
    "task-execution": {
      title: "Task Execution",
      icon: <Terminal className="h-4 w-4" />,
      content: (
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle>Task Execution Flow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Execution Process</h3>
              <p className="text-slate-600 leading-relaxed">
                DASH implements a sophisticated task execution flow that
                leverages Firebase for coordination and Docker for isolation.
                Tasks can be executed locally or distributed across the network
                based on resource availability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-lg mb-4">Task Submission</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-blue-500" />
                    Code snippet submission
                  </li>
                  <li className="flex items-center gap-2">
                    <Container className="h-4 w-4 text-blue-500" />
                    Docker-based execution
                  </li>
                  <li className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-blue-500" />
                    Firebase task queueing
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-lg mb-4">Execution Options</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-500" />
                    Local execution
                  </li>
                  <li className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-blue-500" />
                    Network distribution
                  </li>
                  <li className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    Real-time monitoring
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-lg mb-4">
                Example Task Configuration
              </h4>
              <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                {`{
  "taskId": "-0J2GAEL3UtyeEty5tP",
  "type": "docker",
  "status": "completed",
  "assignedAt": "2025-02-14T07:03:21.991708+00:00",
  "assignedTo": "-OFgsZE8ngqBs-sw3wlM",
  "clientId": "-OEjYpjcCR5E2qEvNwYJ",
  "completedAt": "2025-02-14T07:03:27.539Z",
  "createdAt": "2025-02-14T07:03:09.024Z",
  "dockerConfig": {
    "cpuLimit": "1",
    "image": "hello-world",
    "memoryLimit": "512m"
  },
  "doneUserId": "NU3SeYJxdDZkm98Xeyb9NdsZaUW2",
  "output": "Hello from Docker! This message shows that your installation appears to be working correctly.",
  "runtime": 4,
  "schedulerMetadata": {
    "startedAt": "2025-02-14T07:03:22.985Z",
    "status": "completed",
    "taskType": "docker",
    "userId": "Jzc9LoS0UshJzyUSxgnNRitJmF33"
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      ),
    },
    installation: {
      title: "Installation",
      icon: <DownloadIcon className="h-4 w-4" />,
      content: (
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle>Installation Guide</CardTitle>
          </CardHeader>

          <CardContent className="text-slate-600">
            <div className="space-y-4">
              <p className="text-slate-600">
                Download DASH for your preferred platform from our download
                page.
              </p>
              <div className="flex justify-center">
                <a
                  href="/download"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  Download DASH
                </a>
              </div>
              <div className="mt-4 text-sm text-slate-500 text-center">
                Available for Windows, Linux, and macOS
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-slate-800 mb-2">
                  Prerequisites
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Docker Desktop installed and running (required for container
                    distribution)
                  </li>
                  <li>4GB RAM minimum (8GB recommended)</li>
                  <li>2GB free disk space</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-slate-800 mb-2">
                  Installation Steps
                </h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Download DASH for your platform from the download page
                  </li>
                  <li>Install Docker Desktop if not already installed</li>
                  <li>Run the DASH installer</li>
                  <li>Launch DASH and connect to the P2P network</li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium text-slate-800 mb-2">
                  Verifying Installation
                </h3>
                <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  {`# Check Docker installation
docker --version

# Launch DASH
# The application will automatically connect to the P2P network`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    "docker-integration": {
      title: "Docker Integration",
      icon: <Container className="h-4 w-4" />,
      content: (
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle>Docker Container Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-slate-600 leading-relaxed">
              DASH provides seamless integration with Docker, allowing you to
              distribute and manage containers across your P2P network. This
              enables consistent, isolated execution environments for your
              distributed tasks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-lg mb-4">Container Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Automatic container distribution</li>
                  <li>Version management and rollback</li>
                  <li>Resource isolation and limits</li>
                  <li>Network configuration</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-lg mb-4">Security Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Container image verification</li>
                  <li>Resource access controls</li>
                  <li>Network isolation</li>
                  <li>Security scanning</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-lg mb-4">
                Example Configuration
              </h4>
              <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                {`version: '3'
services:
  dash-task:
    image: hello-world
    container_name: dash-task
    cpus: '1'
    mem_limit: 512m
    security_opt:
      - no-new-privileges:true
    networks:
      - dash-network
    environment:
      - TASK_ID=-0J2GAEL3UtyeEty5tP
      - CLIENT_ID=-OEjYpjcCR5E2qEvNwYJ
    volumes:
      - ./task-logs:/var/log/dash
    labels:
      - "com.dash.taskType=docker"
      - "com.dash.assignedTo=-OFgsZE8ngqBs-sw3wlM"
      - "com.dash.status=pending"

networks:
  dash-network:
    driver: bridge
    labels:
      - "com.dash.managed=true`}
              </pre>
            </div>
          </CardContent>
        </Card>
      ),
    },
  };

  const sections = {
    "Getting Started": ["overview", "installation"],
    "Core Concepts": ["task-execution", "p2p-network", "task-scheduler"],
    Features: ["docker-integration"],
  };

  // Helper functions for navigation
  function getAllSections() {
    return Object.values(sections).flat() as SectionName[];
  }

  function getPreviousSection(currentSection: SectionName) {
    const allSections = getAllSections();
    const currentIndex = allSections.indexOf(currentSection);
    return currentIndex > 0 ? allSections[currentIndex - 1] : null;
  }

  function getNextSection(currentSection: SectionName) {
    const allSections = getAllSections();
    const currentIndex = allSections.indexOf(currentSection);
    return currentIndex < allSections.length - 1
      ? allSections[currentIndex + 1]
      : null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-4">
      {/* Header */}
      <NavBar />

      <div className="flex flex-1 bg-[#f0efea] h-[80vh] rounded-xl">
        {/* Sidebar */}
        <div className="w-64 bg-[#f7f7f7] border-r border-slate-200 hidden lg:block overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Search bar */}
            {/* <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 h-4 w-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div> */}

            {/* Navigation sections */}
            {Object.entries(sections).map(([category, sectionNames]) => (
              <div key={category}>
                <div className="text-slate-400 font-medium mb-2 text-xs uppercase tracking-wider">
                  {category}
                </div>
                <ul className="space-y-1">
                  {sectionNames.map((section) => (
                    <li
                      key={section}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                        activeSection === section
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                      onClick={() => setActiveSection(section as SectionName)}
                    >
                      {sidebarContent[section]?.icon}
                      <span className="text-sm">
                        {sidebarContent[section]?.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile breadcrumb */}
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">
                {
                  Object.entries(sections).find(([, sectionNames]) =>
                    sectionNames.includes(activeSection)
                  )?.[0]
                }
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-900 font-medium">
                {sidebarContent[activeSection]?.title}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            <div className="relative">
              {/* Section content */}
              {sidebarContent[activeSection]?.content}

              {/* Navigation footer */}
              <div className="mt-12 border-t border-slate-200 pt-8">
                <div className="flex justify-between items-center">
                  {/* Previous section */}
                  {getPreviousSection(activeSection) && (
                    <button
                      onClick={() =>
                        setActiveSection(getPreviousSection(activeSection)!)
                      }
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span>Previous</span>
                    </button>
                  )}

                  {/* Next section */}
                  {getNextSection(activeSection) && (
                    <button
                      onClick={() =>
                        setActiveSection(getNextSection(activeSection)!)
                      }
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <span>Next</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-slate-500 text-sm">
            © 2025 DASH. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashDocumentation;
