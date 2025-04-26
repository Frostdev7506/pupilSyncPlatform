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
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";

// Zod schema remains the same
const formSchema = z.object({
  name: z.string().min(2, "Institution name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  contactEmail: z.string().email("Invalid contact email"),
  address: z.string().min(5, "Address is required"), // Added address back if needed
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Make sure error attaches to confirmPassword field
});

// Animation variants remain the same
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, staggerChildren: 0.07 }, // Adjusted timings slightly
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }, // Adjusted timings slightly
};

export default function InstitutionSignUpPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address: "",
      contactEmail: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await authService.registerInstitution({
        name: values.name,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        contactEmail: values.contactEmail,
        address: values.address,
        password: values.password,
      });

      if (response.status === 'success' && response.token) {
        toast({
          title: "Success",
          description: "Your institution account has been created successfully.",
        });

        // Token is automatically stored by authService
        // Redirect to dashboard
        router.push('instituiton/dashboard');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create institution account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to generate input field classes
  const getInputClasses = (fieldName: keyof z.infer<typeof formSchema>) => {
    const baseClasses = `
      mt-1 block w-full px-3 py-2 rounded-md
      bg-gray-800 border border-gray-600
      text-gray-100 placeholder-gray-500
      focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-transparent
      transition duration-150 ease-in-out
    `; // Removed focus:ring-offset-background as bg is dark
    const focusClasses = form.formState.errors[fieldName]
      ? 'focus:ring-red-500 focus:border-red-500' // Focus state when error
      : 'focus:ring-blue-500 focus:border-blue-500'; // Normal focus state
    const errorClasses = form.formState.errors[fieldName] ? 'border-red-500' : 'border-gray-600';

    return `${baseClasses} ${errorClasses} ${focusClasses}`;
  };
   // Helper function for Textarea classes
   const getTextareaClasses = (fieldName: keyof z.infer<typeof formSchema>) => {
    const baseClasses = `
        mt-1 block w-full px-3 py-2 rounded-md
        bg-gray-800 border border-gray-600
        text-gray-100 placeholder-gray-500
        focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-transparent
        transition duration-150 ease-in-out resize-none
      `; // Added resize-none
      const focusClasses = form.formState.errors[fieldName]
      ? 'focus:ring-red-500 focus:border-red-500' // Focus state when error
      : 'focus:ring-blue-500 focus:border-blue-500'; // Normal focus state
      const errorClasses = form.formState.errors[fieldName] ? 'border-red-500' : 'border-gray-600';

      return `${baseClasses} ${errorClasses} ${focusClasses}`;
  };

  return (
    // --- Main container with background gradient ---
    <div className="flex items-center justify-center min-h-screen py-12 px-4 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg" // Constrain width
      >
        {/* --- Dark Card --- */}
        <Card className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-xl rounded-xl text-gray-200">

          {/* --- Card Header --- */}
          <CardHeader className="pt-8 pb-4 px-6 md:px-8 relative"> {/* Added relative positioning */}
            {/* Back Button - Positioned absolutely */}
            <Link
              href="/signup" // Link back to role selection
              className="absolute left-4 top-6 inline-flex items-center text-sm text-gray-400 hover:text-gray-100 transition-colors z-10"
              aria-label="Go back to role selection"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back
            </Link>
            {/* Centered Title and Description */}
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Institution Sign Up
                </span>
              </CardTitle>
              <CardDescription className="text-gray-400 text-base">
                Create your institution account to get started
              </CardDescription>
            </div>
          </CardHeader>

          {/* --- Card Content (Form) --- */}
          <CardContent className="px-6 md:px-8 pb-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* --- Form Fields using itemVariants for animation --- */}

              {/* Institution Name */}
              <motion.div variants={itemVariants}>
                <Label htmlFor="name" className="text-sm font-medium text-gray-300">Institution Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter institution name"
                  {...form.register("name")}
                  className={getInputClasses("name")}
                  aria-invalid={form.formState.errors.name ? "true" : "false"}
                />
                {form.formState.errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </motion.div>

              {/* Institution Email */}
              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">Institution Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter institution email"
                  {...form.register("email")}
                  className={getInputClasses("email")}
                   aria-invalid={form.formState.errors.email ? "true" : "false"}
                />
                {form.formState.errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* First Name */}
              <motion.div variants={itemVariants}>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  {...form.register("firstName")}
                  className={getInputClasses("firstName")}
                   aria-invalid={form.formState.errors.firstName ? "true" : "false"}
                />
                {form.formState.errors.firstName && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </motion.div>

              {/* Last Name */}
              <motion.div variants={itemVariants}>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  {...form.register("lastName")}
                  className={getInputClasses("lastName")}
                   aria-invalid={form.formState.errors.lastName ? "true" : "false"}
                />
                {form.formState.errors.lastName && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </motion.div>

              {/* Contact Email */}
              <motion.div variants={itemVariants}>
                <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-300">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="Enter contact email"
                  {...form.register("contactEmail")}
                  className={getInputClasses("contactEmail")}
                   aria-invalid={form.formState.errors.contactEmail ? "true" : "false"}
                />
                {form.formState.errors.contactEmail && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {form.formState.errors.contactEmail.message}
                  </p>
                )}
              </motion.div>

              {/* Address */}
               <motion.div variants={itemVariants}>
                <Label htmlFor="address" className="text-sm font-medium text-gray-300">Address</Label>
                <textarea
                  id="address"
                  rows={3}
                  placeholder="Enter institution address"
                  {...form.register("address")}
                  className={getTextareaClasses("address")}
                   aria-invalid={form.formState.errors.address ? "true" : "false"}
                />
                {form.formState.errors.address && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  {...form.register("password")}
                  className={getInputClasses("password")}
                   aria-invalid={form.formState.errors.password ? "true" : "false"}
                />
                {form.formState.errors.password && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={itemVariants}>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...form.register("confirmPassword")}
                  className={getInputClasses("confirmPassword")}
                   aria-invalid={form.formState.errors.confirmPassword ? "true" : "false"}
                />
                {form.formState.errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </motion.div>

              {/* --- Submit Button --- */}
              <motion.div variants={itemVariants} className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 text-base transition duration-150 ease-in-out disabled:opacity-60"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </div>
                  ) : "Create Account"}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          {/* --- Card Footer (Sign in link) --- */}
          <CardFooter className="flex justify-center pt-2 pb-8 px-6 md:px-8">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}