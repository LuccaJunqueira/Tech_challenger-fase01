"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header role="banner" className="sticky top-0 z-50 border-b bg-background ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/avatar3.png"
              alt="Logo ByteBank"
              width={44}
              height={44}
              className="object-contain"
              priority
            />

            <Image
              src="/images/logo.png"
              alt="ByteBank"
              width={100}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center">
            <Link href="/login">
              <Button variant="primary">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
