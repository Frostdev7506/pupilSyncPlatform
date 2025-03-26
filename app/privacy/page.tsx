"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect personal information you provide when creating an account, including name, email, and usage data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">2. How We Use Information</h2>
            <p className="text-muted-foreground">
              Your information is used to provide services, improve our platform, and communicate with you.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">3. Data Protection</h2>
            <p className="text-muted-foreground">
              We implement security measures to protect your data, but no system is 100% secure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">4. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We may use third-party services that collect information to provide their services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">5. Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies to enhance your experience and analyze site usage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">6. Your Rights</h2>
            <p className="text-muted-foreground">
              You may request access, correction, or deletion of your personal data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">7. Policy Changes</h2>
            <p className="text-muted-foreground">
              We may update this policy and will notify you of significant changes.
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