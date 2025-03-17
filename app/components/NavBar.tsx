"use client";
import React, { useState } from "react";
import ProfileMenu from "@/app/components/ProfileMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "./LoginModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

// NavLink component to handle active styling
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = "" }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`${className} ${
        isActive 
          ? "text-gray-900 border-b-2 border-gray-800" 
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNav = () => {
  const pathname = usePathname();
  
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col gap-4 mt-8">
          <NavLink href="/" className={`text-lg px-2 py-2 ${pathname === "/" ? "font-medium" : ""}`}>
            Welcome
          </NavLink>
          <NavLink href="/docs" className={`text-lg px-2 py-2 ${pathname === "/docs" ? "font-medium" : ""}`}>
            User Guides
          </NavLink>
          <NavLink href="https://github.com/Chackoz/Dash-Desktop/releases" className="text-lg px-2 py-2">
            Release Notes
          </NavLink>
          <Link href="/download" className="mt-4 text-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800">
            Download <span className="ml-1">›</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

function NavBar() {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-50 w-full flex flex-col bg-white shadow-sm">
      <div className="px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-3xl nanum-myeongjo-regular">
            DASH
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* <Link
            href="/download"
            className="hidden md:flex items-center px-4 py-1.5 text-sm bg-black text-white rounded-full hover:bg-gray-800"
          >
            Download <span className="ml-1">›</span>
          </Link> */}

          {!user && (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="hidden md:block text-md  text-gray-900 hover:text-gray-400"
            >
              Sign In
            </button>
          )}

          <ProfileMenu
            user={user}
            logout={logout}
            onLoginClick={() => setIsLoginOpen(true)}
          />

          <MobileNav />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="hidden md:block border-t border-gray-100">
        <div className="px-6 flex">
          <NavLink
            href="/"
            className="px-3 py-4 text-sm font-medium"
          >
            Welcome
          </NavLink>
          <NavLink
            href="/docs"
            className="px-3 py-4 text-sm font-medium"
          >
            User Guides
          </NavLink>
          <NavLink href="/download" className="px-3 py-4 text-sm font-medium">
            Download
          </NavLink>
          <NavLink
            href="https://github.com/Chackoz/Dash-Desktop/releases"
            className="px-3 py-4 text-sm font-medium"
          >
            Release Notes
          </NavLink>

        </div>
      </div>

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </nav>
  );
}

export default NavBar;