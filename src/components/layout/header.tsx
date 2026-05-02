"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

interface HeaderProps {
  showLogin?: boolean;
}
export function Header({ showLogin = true }: HeaderProps)  {
  return (
    <header role="banner" className="sticky top-0 z-50 border-b bg-background ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>
          {showLogin && ( 
          <div className="flex items-center">
            <Link href="/login">
              <Button variant="primary">Login</Button>
            </Link>
          </div>)}
        </div>
      </div>
    </header>
  );
}
