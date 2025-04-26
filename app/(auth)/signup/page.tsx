"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Import icons (assuming you have lucide-react installed)
import { GraduationCap, UserCog, Building } from "lucide-react";

// Define roles with icons
const roles = [
  {
    title: "Student",
    // Description is kept for potential future use or tooltips, but not shown in the card
    description: "Access courses, track progress, and connect with peers",
    href: "/signup/student",
    icon: GraduationCap, // Assign appropriate icons
  },
  {
    title: "Teacher",
    description: "Create courses, manage students, and track performance",
    href: "/signup/teacher",
    icon: UserCog, // Changed from Presentation for better distinction
  },
  {
    title: "Institution",
    description: "Manage multiple classes, teachers, and educational resources",
    href: "/signup/institution",
    icon: Building,
  },
];

export default function SignUpPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);

  const handleContinue = () => {
    const selected = roles.find((r) => r.title === selectedRole);
    if (selected) {
      router.push(selected.href);
    }
  };

  return (
    // Main container: Light background, centered vertically and horizontally
    <div className="flex items-center justify-center min-h-screen w-full p-4 bg-red">
      {/* Card container: White background, rounded corners, shadow */}
      <Card className="w-full max-w-xl rounded-xl shadow-xl border-none bg-card text-card-foreground">
        {/* Header section */}
        <CardHeader className="text-center pt-2 pb-2 space-y-3">
          <CardTitle className="text-6xl md:text-4xl font-bold">
            {/* Reusing the gradient text style */}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ">
              Choose Your Role
            </span>
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground px-4">
            Select how you want to use PupilSync
          </CardDescription>
        </CardHeader>

        {/* Role selection area */}
        <CardContent className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 pt-4 pb-8 px-6 md:px-10">
          {roles.map((role) => {
            const isSelected = selectedRole === role.title;
            return (
              <button
                key={role.title}
                onClick={() => setSelectedRole(role.title)}
                // Styling the button to look like a selectable card
                className={`
                  flex flex-col items-center justify-center
                  w-48 h-48 p-6 rounded-xl border-2
                  transition-all duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50
                  ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md scale-105 bg-gradient-to-r from-blue-600 to-purple-600" // Selected state: blue border, light blue bg, shadow, slightly larger
                      : "border-border bg-card hover:border-primary/40 hover:bg-muted/50" // Default state: subtle border, card bg, hover effect
                  }
                `}
              >
                {/* Icon */}
                <role.icon
                  className={`w-12 h-12 mb-3 transition-colors ${
                    isSelected ? "text-primary" : "text-muted-foreground/80"
                  }`}
                  aria-hidden="true"
                />
                {/* Role Title */}
                <span
                  className={`text-lg font-medium transition-colors ${
                    isSelected ? "text-primary" : "text-card-foreground"
                  }`}
                >
                  {role.title}
                </span>
              </button>
            );
          })}
        </CardContent>

        {/* Action Button Area */}
        <div className="px-6 md:px-10 pb-10 pt-2 flex justify-center">
          <Button
            size="lg"
            className="w-full sm:w-1/2" // Full width on small screens, half width on larger
            onClick={handleContinue}
            disabled={!selectedRole} // Disable button if no role is selected
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}