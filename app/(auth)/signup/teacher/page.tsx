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
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";



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
  subjectExpertise: z.string().min(1, "Subject is required"),
  qualification: z.string().min(1, "Qualification is required"),
  experience: z.string().min(1, "Years of experience is required"),
  profilePicture: z.any().optional(),
  institutionIds: z.string().min(1, "At least one institution ID is required"),
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

export default function TeacherSignUpPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      subjectExpertise: "",
      qualification: "",
      experience: "",
      profilePicture: null,
      institutionIds: "",
    },
  });
  const router = useRouter();


  const uploadImageToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=fdb73ec7a0d24b5455debb730fd6d32a', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Image upload failed');
      }

      const data = await response.json();
      if (!data.success || !data.data.url) {
        throw new Error('Failed to get image URL from ImgBB');
      }

      return data.data.url;
    } catch (error) {
      throw new Error(`Failed to upload image to ImgBB: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      let profilePictureUrl = '';
      if (values.profilePicture && values.profilePicture[0]) {
        profilePictureUrl = await uploadImageToImgBB(values.profilePicture[0]);
      }

      // Parse institution IDs and determine primary
      const institutionIds = values.institutionIds
        .split(',')
        .map(id => parseInt(id.trim()))
        .filter(id => !isNaN(id));
      
      const primaryInstitutionId = institutionIds.length > 0 ? institutionIds[0] : null;

      const response = await authService.registerTeacher({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        subjectExpertise: values.subjectExpertise,
        qualification: `${values.qualification} - ${values.experience} years of experience`,
        profilePictureUrl,
        institutions: institutionIds,
        primaryInstitutionId,
      });

      toast({
        title: "Success",
        description: "Your teacher account has been created.",
      });

      router.push('/teacher/dashboard');  
      // router.push('/login');


    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
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
                  Teacher Sign Up
                </span>
              </CardTitle>
            </div>
            <CardDescription className="text-center">
              Create your teacher account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
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
                <Label htmlFor="subjectExpertise">Subject</Label>
                <Input
                  id="subjectExpertise"
                  type="text"
                  placeholder="Enter your teaching subject"
                  {...form.register("subjectExpertise")}
                  className={form.formState.errors.subjectExpertise ? "border-red-500" : ""}
                />
                {form.formState.errors.subjectExpertise && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.subjectExpertise.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  type="text"
                  placeholder="Enter your highest qualification"
                  {...form.register("qualification")}
                  className={form.formState.errors.qualification ? "border-red-500" : ""}
                />
                {form.formState.errors.qualification && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.qualification.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="text"
                  placeholder="Enter years of teaching experience"
                  {...form.register("experience")}
                  className={form.formState.errors.experience ? "border-red-500" : ""}
                />
                {form.formState.errors.experience && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.experience.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <Input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  {...form.register("profilePicture")}
                  className={form.formState.errors.profilePicture ? "border-red-500" : ""}
                />
                {form.formState.errors.profilePicture && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.profilePicture?.message?.toString()}
                  </p>
                )}
                {form.watch("profilePicture") && form.watch("profilePicture")[0] && (
                  <p className="text-sm text-muted-foreground mt-1">Selected file: {form.watch("profilePicture")[0].name}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="institutionIds">Institution IDs</Label>
                <Input
                  id="institutionIds"
                  type="text"
                  placeholder="Enter institution IDs (comma-separated)"
                  {...form.register("institutionIds")}
                  className={form.formState.errors.institutionIds ? "border-red-500" : ""}
                />
                <p className="text-sm text-muted-foreground">
                  Enter institution IDs separated by commas. The first ID will be set as primary.
                </p>
                {form.formState.errors.institutionIds && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.institutionIds.message}
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
