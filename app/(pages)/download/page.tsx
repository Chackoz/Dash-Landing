"use client"
import React, { useEffect, useState } from 'react';
import { Download, Check} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NavBar from '@/app/components/NavBar';

interface Release {
  tag_name: string;
}

interface OSOption {
  os: string;
  icon: string;
}

const DownloadPage: React.FC = () => {
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedOS, setSelectedOS] = useState<string>("Windows");
  const [downloadStarted, setDownloadStarted] = useState<boolean>(false);


  useEffect(() => {
    const fetchLatestVersion = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Chackoz/Dash-Desktop/releases/latest"
        );
        if (!response.ok) throw new Error("Failed to fetch latest release");
        const release: Release = await response.json();
        setLatestVersion(release.tag_name);
        
        const detectedOS = getOSSpecificDetails().os;
        setSelectedOS(detectedOS);
      } catch (error) {
        console.error("Failed to fetch version:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestVersion();
  }, []);

  const getOSSpecificDetails = (): { os: string; icon: string } => {
    if (typeof window === 'undefined') return { os: 'Windows', icon: '🪟' };
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) return { os: 'macOS', icon: '🍎' };
    if (userAgent.includes('linux')) return { os: 'Linux', icon: '🐧' };
    return { os: 'Windows', icon: '🪟' };
  };

  const getDownloadUrl = (os: string): string => {
    if (!latestVersion) return '';
    const baseUrl = `https://github.com/Chackoz/Dash-Desktop/releases/download/${latestVersion}/`;
    
    switch (os) {
      case 'Windows':
        return `${baseUrl}DASH_0.1.0_x64_en-US.msi`;
      case 'macOS':
        return `${baseUrl}DASH_0.1.0_aarch64.dmg`;
      case 'Linux':
        return `${baseUrl}DASH_0.1.0_amd64.deb`;
      default:
        return '';
    }
  };


  const handleDownload = (): void => {
    const downloadUrl = getDownloadUrl(selectedOS);
    if (!downloadUrl) return;

    setDownloadStarted(true);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadUrl.split('/').pop() || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadStarted(false), 3000);
  };



  const handleOSSelect = (os: string): void => {
    setSelectedOS(os);
  };

  const osOptions: OSOption[] = [
    { os: 'macOS', icon: '🍎' },
    { os: 'Linux', icon: '🐧' },
    { os: 'Windows', icon: '🪟' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between w-full p-4">
      <NavBar/>
      
      <div className="md:max-w-3xl w-full space-y-4 md:space-y-8 text-center flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold mb-2">Download DASH</h1>
        
        <div className="grid grid-cols-3 gap-4 md:max-w-md mx-auto mb-8">
          {osOptions.map(({ os, icon }) => (
            <Card 
              key={os}
              className={`p-4 flex flex-col items-center justify-center hover:bg-accent cursor-pointer transition-colors
                ${selectedOS === os ? 'bg-accent' : ''}`}
              onClick={() => handleOSSelect(os)}
            >
              <span className="text-2xl mb-2">{icon}</span>
              <span className="text-sm">{os}</span>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          {selectedOS === 'Linux' ? (
            <div className="space-y-4">
            

            </div>
          ) : null}

          <Button 
            size="lg" 
            className="w-full max-w-md"
            variant="default"
            onClick={handleDownload}
            disabled={!latestVersion || downloadStarted}
          >
            {downloadStarted ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {downloadStarted ? 'Download Started' : `Download for ${selectedOS}`}
          </Button>
          
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Checking version..." : `Latest version: ${latestVersion || 'Unknown'}`}
          </p>
          <p className="text-sm text-muted-foreground">
            Requires {selectedOS === 'Windows' ? 'Windows 10' : selectedOS === 'macOS' ? 'macOS 12' : 'Linux 2023.01.01'} or later
          </p>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default DownloadPage;