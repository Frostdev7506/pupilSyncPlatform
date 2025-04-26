"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  studentId: z.string().min(1, "Student ID is required"),
  grade: z.string().min(1, "Grade is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function StudentSignUpPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      studentId: "",
      grade: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      // Implement your signup logic here
      console.log(values);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      toast({
        title: "Success",
        description: "Your account has been created.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-10 bg-gradient-to-b from-background to-muted/20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg px-4"
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center">
              <Link
                href="/signup"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
              <CardTitle className="text-3xl font-bold text-center flex-1 mr-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Student Sign Up
                </span>
              </CardTitle>
            </div>
            <CardDescription className="text-center">
              Create your student account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  {...form.register("fullName")}
                  className={form.formState.errors.fullName ? "border-red-500" : ""}
                />
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.fullName.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...form.register("email")}
                  className={form.formState.errors.email ? "border-red-500" : ""}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter your student ID"
                  {...form.register("studentId")}
                  className={form.formState.errors.studentId ? "border-red-500" : ""}
                />
                {form.formState.errors.studentId && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.studentId.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="grade">Grade/Year</Label>
                <Input
                  id="grade"
                  type="text"
                  placeholder="Enter your grade or year"
                  {...form.register("grade")}
                  className={form.formState.errors.grade ? "border-red-500" : ""}
                />
                {form.formState.errors.grade && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.grade.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  {...form.register("password")}
                  className={form.formState.errors.password ? "border-red-500" : ""}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...form.register("confirmPassword")}
                  className={form.formState.errors.confirmPassword ? "border-red-500" : ""}
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </div>
                  ) : "Create Account"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}