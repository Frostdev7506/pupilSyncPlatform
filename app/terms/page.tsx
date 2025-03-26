"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using our services, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">3. Prohibited Activities</h2>
            <p className="text-muted-foreground">
              You may not use our services for any illegal or unauthorized purpose.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content included on our platform is the property of our company.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              We shall not be liable for any indirect, incidental, or consequential damages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">6. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time.
            </p>
          </section>

          <div className="pt-4">
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}