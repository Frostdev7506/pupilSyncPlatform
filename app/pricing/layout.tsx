"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 max-sm:text-4xl max-[375px]:text-3xl">
            Simple Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-sm:text-lg">
            Choose the perfect plan for your needs
          </p>
          <Tabs
            defaultValue={pathname.split("/").pop() || "students"}
            className="w-full max-w-[400px] mx-auto"
            onValueChange={(value) => router.push(`/pricing/${value}`)}
          >
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {children}
      </div>
    </div>
  );
}
