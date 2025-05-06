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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For back navigation

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
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

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Implement your password reset logic here
      console.log("Password reset requested for:", values.email);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      toast({
        title: "Check Your Email",
        description: `Password reset instructions have been sent to ${values.email}.`,
      });
      form.reset();
      // Optionally redirect or show further instructions
      // router.push('/login');
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send reset instructions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-6 md:py-12 bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="border-slate-700/60 shadow-xl bg-slate-800/30 backdrop-blur-sm text-slate-50">
          <CardHeader className="space-y-4">
            <motion.div variants={itemVariants} className="mb-2">
              <Button
                variant="ghost"
                onClick={() => router.back()} // Or Link to="/login"
                className="text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 px-3"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <CardTitle className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Forgot Password?
                </span>
              </CardTitle>
              <CardDescription className="text-slate-400 pt-2">
                No worries! Enter your email address and we'll send you instructions to reset your password.
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email" className="text-slate-300">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                            className={`bg-slate-700/50 border-slate-600 text-slate-50 placeholder:text-slate-500 focus:ring-primary focus:border-primary ${
                              form.formState.errors.email ? "border-red-500/70 focus:border-red-500/70" : ""
                            }`}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Instructions...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Reset Instructions
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2 pt-6">
            <motion.div variants={itemVariants} className="text-sm text-slate-400">
              Remember your password?{" "}
              <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}