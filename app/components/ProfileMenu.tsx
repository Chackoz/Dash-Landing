"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, LogOut, User} from 'lucide-react';
import { AuthResponse } from '@/types/auth';

// Define the User type if not already imported from your auth types
interface User {
  photoURL: string | null;
  displayName: string | null;
  email: string | null;
}

// Define props interface
interface ProfileMenuProps {
  user: User | null;
  logout: () => Promise<AuthResponse> | void;
  onLoginClick: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user, logout, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <Image
        src="/logo.png"
        width={32}
        height={32}
        alt="Profile"
        className="rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onLoginClick}
      />
    );
  }

  return (
    <div className="relative w-fit" ref={menuRef}>
      <button
        className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <Image
          src={user.photoURL || "/logo.png"}
          width={32}
          height={32}
          alt="Profile"
          className="rounded-lg"
        />
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-10 bg-white rounded-lg shadow-lg py-1 border border-gray-100 w-fit">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.displayName || user.email}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <Link 
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <User className="w-4 h-4" />
            Dashboard
          </Link>

     

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
            type="button"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;