/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  Shield,
  Activity,
  Container,
  CheckCircle,
  Globe,
  Cloud,
  Terminal,
  BookOpen,
  Code,
  Server,
  Network,
  Clock,
  DownloadIcon,
  Archive,
} from "lucide-react";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

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
  | "architecture"
  | "p2p-network"
  | "task-scheduler"
  | "docker-integration"
  | "security"


const DashDocumentation = () => {
  const [activeSection, setActiveSection] = useState<SectionName>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarContent: SidebarContent = {
    overview: {
      title: "Overview",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">DASH Documentation</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              A powerful decentralized desktop application for distributed task execution
              and Docker container orchestration across peer-to-peer networks
            </p>
          </div>

          <Alert className="mb-8 bg-blue-50 border-blue-200">
            <Activity className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              Latest Version: v1.9.3 Beta - Now with enhanced Docker support and
              improved task scheduling
            </AlertDescription>
          </Alert>

          <Card className="bg-white border-gray-200 mb-8 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">What is DASH?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 space-y-4">
              <p className="leading-relaxed">
                DASH is a revolutionary desktop application built with Tauri and Next.js that
                enables distributed task execution across a peer-to-peer network. Unlike 
                traditional client-server architectures, DASH operates in a completely 
                decentralized manner, where each node in the network can both distribute 
                and execute tasks.
              </p>
              <p className="leading-relaxed">
                With native Docker support, DASH allows you to distribute Docker containers 
                as tasks across the network, enabling complex workload distribution while 
                maintaining isolation and reproducibility. The system includes a built-in 
                scheduler that oversees task distribution and assignment across all 
                connected peers.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span className="leading-relaxed">True peer-to-peer distributed task execution</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Container className="h-5 w-5 text-blue-500" />
                    <span className="leading-relaxed">Native Docker container distribution and execution</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Cloud className="h-5 w-5 text-blue-500" />
                    <span className="leading-relaxed">Serverless architecture with decentralized scheduling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <span className="leading-relaxed">End-to-end encrypted peer-to-peer communication</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-semibold text-blue-600">10,000+</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Tasks Processed</span>
                    <span className="font-semibold text-blue-600">1M+</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Network Nodes</span>
                    <span className="font-semibold text-blue-600">5,000+</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-semibold text-blue-600">99.9%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </>
      ),
    },
    "p2p-network": {
      title: "P2P Network",
      icon: <Network className="h-4 w-4" />,
      content: (
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle>P2P Network Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Network Overview</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                DASH implements a fully decentralized peer-to-peer network architecture
                where each node acts as both a client and server. This enables robust,
                scalable distributed computing without single points of failure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Node Types</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Worker Nodes - Execute distributed tasks</li>
                  <li>Scheduler Nodes - Coordinate task distribution</li>
                  <li>Gateway Nodes - Handle network discovery</li>
                  <li>Storage Nodes - Manage distributed data</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-lg">Network Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Automatic peer discovery and routing</li>
                  <li>NAT traversal and hole punching</li>
                  <li>End-to-end encrypted communication</li>
                  <li>Automatic network partitioning handling</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Network Configuration</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`# Example network configuration
network:
  discovery:
    bootstrap_nodes:
      - /ip4/1.2.3.4/tcp/4001/p2p/QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N
    mdns:
      enabled: true
      interval: 10
  
  security:
    transport_sec: true
    peer_id_privacy: true`}
              </pre>
            </div>
          </CardContent>
        </Card>
      ),
    },
    "task-scheduler": {
      title: "Task Scheduler",
      icon: <Clock className="h-4 w-4" />,
      content: (
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle>Distributed Task Scheduler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Scheduler Architecture</h3>
              <p className="text-gray-600 leading-relaxed">
                The DASH task scheduler implements a distributed algorithm for efficiently
                assigning and managing tasks across the P2P network. It handles task
                prioritization, load balancing, and fault tolerance automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-lg mb-4">Scheduling Features</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Dynamic load balancing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Priority-based scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Resource-aware task distribution
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Automatic failure recovery
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-lg mb-4">Task Types</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Container className="h-4 w-4 text-blue-500" />
                    Docker container tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-blue-500" />
                    Code execution tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-blue-500" />
                    Shell command tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-500" />
                    Data processing tasks
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-lg mb-4">Example Task Definition</h4>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "task_id": "process-data-001",
  "type": "docker",
  "image": "data-processor:latest",
  "priority": "high",
  "resources": {
    "cpu": "2",
    "memory": "4Gi"
  },
  "retry_policy": {
    "max_attempts": 3,
    "backoff": "exponential"
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
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle>Installation Guide</CardTitle>
          </CardHeader>

          <CardContent className="text-gray-600">
            <div className="space-y-4">
              <p className="text-gray-600">
                Download DASH for your preferred platform from our download
                page.
              </p>
              <div className="flex justify-center">
                <a
                  href="/download"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#3d3d3d] text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  Download DASH
                </a>
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                Available for Windows, Linux, and macOS
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-black mb-2">Prerequisites</h3>
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
                <h3 className="font-medium text-black mb-2">
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
                <h3 className="font-medium text-black mb-2">
                  Verifying Installation
                </h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
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
    architecture: {
      title: "Architecture",
      icon: <Archive className="h-4 w-4" />,
      content: (
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle>Technical Architecture</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-black mb-2">
                  Desktop Application
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Built with Tauri and Next.js for native performance</li>
                  <li>Cross-platform support (Windows, Linux, macOS)</li>
                  <li>Integrated Docker support for container execution</li>
                  <li>Local task execution capabilities</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-black mb-2">P2P Network</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Decentralized peer-to-peer architecture</li>
                  <li>No central server requirement</li>
                  <li>Built-in task scheduler for workload distribution</li>
                  <li>Automatic peer discovery and connection</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-black mb-2">
                  Task Distribution
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Support for code execution and Docker containers</li>
                  <li>Intelligent task scheduling across network nodes</li>
                  <li>Real-time task monitoring and status updates</li>
                  <li>Fault tolerance and task redistribution</li>
                </ul>
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
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle>Docker Container Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              DASH provides seamless integration with Docker, allowing you to distribute
              and manage containers across your P2P network. This enables consistent,
              isolated execution environments for your distributed tasks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-lg mb-4">Container Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Automatic container distribution</li>
                  <li>Version management and rollback</li>
                  <li>Resource isolation and limits</li>
                  <li>Network configuration</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-lg mb-4">Security Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Container image verification</li>
                  <li>Resource access controls</li>
                  <li>Network isolation</li>
                  <li>Security scanning</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-lg mb-4">Example Configuration</h4>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`version: '3'
services:
  task:
    image: my-task:latest
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
    security_opt:
      - no-new-privileges
    networks:
      - dash-network`}
              </pre>
            </div>
          </CardContent>
        </Card>
      ),
    },
    // ... [Continue with other sections] ...
  };

  const sections = {
    "Getting Started": ["overview", "installation"],
    "Core Concepts": ["architecture", "p2p-network", "task-scheduler"],
    "Features": ["docker-integration"],
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 hidden lg:block overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
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
            </div>

            {/* Navigation sections */}
            {Object.entries(sections).map(([category, sectionNames]) => (
              <div key={category}>
                <div className="text-gray-500 font-medium mb-3 text-sm uppercase tracking-wider">
                  {category}
                </div>
                <ul className="space-y-2">
                  {sectionNames.map((section) => (
                    <li
                      key={section}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        activeSection === section
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setActiveSection(section as SectionName)}
                    >
                      {sidebarContent[section]?.icon}
                      <span>
                        {section
                          .split("-")
                          .map(
                            (word) => word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white">
          {/* Mobile breadcrumb */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">
                {Object.entries(sections).find(([_, sectionNames]) =>
                  sectionNames.includes(activeSection)
                
                )?.[0]}
              </span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-900 font-medium">
                {activeSection
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto p-8">
            <div className="relative">
              {/* Section content */}
              {sidebarContent[activeSection]?.content}

              {/* Navigation footer */}
              <div className="mt-12 border-t border-gray-200 pt-8">
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

      <Footer />
    </div>
  );

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
};

export default DashDocumentation;