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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const phoneRegex = /^\+[1-9]\d{1,14}$/;

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  mobileNumber: z.string().regex(phoneRegex, "Please enter a valid phone number with country code (e.g., +1234567890)"),
  email: z.string()
    .email("Invalid email address")
    .refine((email) => email.includes(".") && email.split("@")[1].includes("."), {
      message: "Please enter a valid business email",
    }),
  purpose: z.string().min(1, "Please select a purpose"),
  additionalDetails: z.string().optional(),
});

const demoTypes = [
  { value: "product-overview", label: "Product Overview" },
  { value: "specific-features", label: "Specific Features" },
  { value: "technical-integration", label: "Technical Integration" },
  { value: "pricing-discussion", label: "Pricing Discussion" },
  { value: "custom-solution", label: "Custom Solution" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function BookDemoPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      purpose: "",
      additionalDetails: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Demo request submitted!",
        description: "Our team will contact you shortly to schedule your demo.",
      });
      
      form.reset();
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
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg"
      >
        <Card className="border-2">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Book Your Demo Session</CardTitle>
            <CardDescription className="text-lg">
              Experience how Pupil Sync can transform your learning management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <motion.div variants={itemVariants}>
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...form.register("fullName")}
                  className="mt-1"
                  aria-describedby="fullName-error"
                />
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-500 mt-1" id="fullName-error">
                    {form.formState.errors.fullName.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="mobileNumber">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  placeholder="+1234567890"
                  {...form.register("mobileNumber")}
                  className="mt-1"
                  aria-describedby="mobileNumber-error"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Include country code (e.g., +1 for US)
                </p>
                {form.formState.errors.mobileNumber && (
                  <p className="text-sm text-red-500 mt-1" id="mobileNumber-error">
                    {form.formState.errors.mobileNumber.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="email">
                  Business Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  {...form.register("email")}
                  className="mt-1"
                  aria-describedby="email-error"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1" id="email-error">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="purpose">
                  Purpose of Demo <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => form.setValue("purpose", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select the purpose of your demo" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.purpose && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.purpose.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="additionalDetails">Additional Details</Label>
                <Textarea
                  id="additionalDetails"
                  placeholder="Tell us about your specific requirements or questions"
                  {...form.register("additionalDetails")}
                  className="mt-1"
                  rows={4}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting request...
                    </>
                  ) : (
                    "Schedule Demo"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}