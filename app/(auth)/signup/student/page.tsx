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
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  gradeLevel: z.string().min(1, "Grade is required"),
  institutionId: z.string().min(1, "Institution ID is required"),
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
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gradeLevel: "",
      institutionId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      // Prepare data for API request
      const studentData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        institutionId: parseInt(values.institutionId),
        gradeLevel: values.gradeLevel
      };
      
      // Make API request to register student
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register-student', 
        studentData,
        { withCredentials: true }
      );
      
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Your student account has been created successfully.",
        });
        
        // Redirect to login or dashboard
        // router.push('/login');
      router.push('/student/dashboard');  


      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create account. Please try again.",
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
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    {...form.register("firstName")}
                    className={form.formState.errors.firstName ? "border-red-500" : ""}
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    {...form.register("lastName")}
                    className={form.formState.errors.lastName ? "border-red-500" : ""}
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </motion.div>
              </div>

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
                <Label htmlFor="institutionId">Institution ID</Label>
                <Input
                  id="institutionId"
                  type="text"
                  placeholder="Enter your institution ID"
                  {...form.register("institutionId")}
                  className={form.formState.errors.institutionId ? "border-red-500" : ""}
                />
                {form.formState.errors.institutionId && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.institutionId.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="gradeLevel">Grade/Year</Label>
                <Input
                  id="gradeLevel"
                  type="text"
                  placeholder="Enter your grade or year"
                  {...form.register("gradeLevel")}
                  className={form.formState.errors.gradeLevel ? "border-red-500" : ""}
                />
                {form.formState.errors.gradeLevel && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.gradeLevel.message}
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
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
