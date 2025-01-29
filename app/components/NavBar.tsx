"use client"
import React, { useState } from 'react'

import ProfileMenu from "@/app/components/ProfileMenu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LoginModal } from './LoginModal';
import Link from 'next/link';


const MobileNav = () => (
  <Sheet>
    <SheetTrigger className="md:hidden">
      <Menu className="h-6 w-6" />
    </SheetTrigger>
    <SheetContent side="left" className="w-64">
      <div className="flex flex-col gap-4 mt-8">
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
    </SheetContent>
  </Sheet>
);

function NavBar() {
     const { user, logout } = useAuth();
     const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  return (
    <nav className="sticky top-0 z-50 w-full px-4 md:px-6 py-4 flex justify-between items-center bg-background border-b">
    <div className="flex items-center gap-4 md:gap-8">
      <div className="flex items-center gap-2">
        <Link href="/" className="font-bold text-xl">DASH</Link>
      </div>
      <div className="gap-6 text-sm hidden md:flex">
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
      <MobileNav />
      
    </div>
    {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
  </nav>
  )
}

export default NavBar