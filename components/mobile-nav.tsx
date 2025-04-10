"use client";

import * as React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className="font-bold text-xl mb-4 hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              Pupilsync
            </Link>
            <MobileLink href="/platform" onOpenChange={setOpen}>
              Platform
            </MobileLink>
            <MobileLink href="/resources" onOpenChange={setOpen}>
              Resources
            </MobileLink>
            <MobileLink href="/pricing/students" onOpenChange={setOpen}>
              Pricing
            </MobileLink>
            <MobileLink href="/login" onOpenChange={setOpen}>
              Login
            </MobileLink>
            <MobileLink href="/signup" onOpenChange={setOpen}>
              Sign Up
            </MobileLink>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  href: string;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
