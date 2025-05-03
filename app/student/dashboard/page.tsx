"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // Added Progress component
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Award,         // Overall Performance/GPA
  BookOpen,      // Courses
  ClipboardList, // Assignments
  Clock,         // Upcoming Deadlines
  CheckCircle,   // Completed/Graded
  TrendingUp,    // Progress Trend
  Calendar,      // Schedule
  Bell,          // Notifications
  FileText,      // Grades/Reports
  AlertCircle,   // Needs Attention/Missing
  GraduationCap, // Course specific
  MessageSquare, // Communication (Optional)
  Search,        // Search
  Filter,        // Filter
  Download,      // Download (e.g., assignment files)
  ArrowRight,    // View Details
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for student charts and tables
const overallProgressData = [
  { name: 'Jan', avgGrade: 78 },
  { name: 'Feb', avgGrade: 82 },
  { name: 'Mar', avgGrade: 80 },
  { name: 'Apr', avgGrade: 85 },
  { name: 'May', avgGrade: 88 },
  { name: 'Jun', avgGrade: 90 },
];

const upcomingDeadlines = [
  { id: 1, task: 'Math Homework 5', course: 'Math 101', due: 'Tomorrow, 11:59 PM', type: 'Assignment' },
  { id: 2, task: 'Physics Quiz 3', course: 'Physics 201', due: 'Wednesday, 9:00 AM', type: 'Quiz' },
  { id: 3, task: 'Essay Final Draft', course: 'English Lit', due: 'Friday, 5:00 PM', type: 'Assignment' },
  { id: 4, task: 'Comp Sci Project Part 2', course: 'Comp Sci 101', due: 'Next Monday', type: 'Project' },
];

const recentGrades = [
  { id: 1, assignment: 'Math Homework 4', course: 'Math 101', grade: 'A-', score: 92, date: 'Yesterday' },
  { id: 2, assignment: 'Physics Lab Report 2', course: 'Physics 201', grade: 'B+', score: 88, date: '2 days ago' },
  { id: 3, assignment: 'Comp Sci Quiz 2', course: 'Comp Sci 101', grade: 'A', score: 95, date: '3 days ago' },
];

const courses = [
    { id: 'math101', name: 'Math 101', teacher: 'Dr. Evelyn Reed', currentGrade: 'A-', progress: 91, upcoming: 2 },
    { id: 'phys201', name: 'Physics 201', teacher: 'Dr. Evelyn Reed', currentGrade: 'B+', progress: 88, upcoming: 1 },
    { id: 'cs101', name: 'Comp Sci 101', teacher: 'Dr. Alan Turing', currentGrade: 'A', progress: 95, upcoming: 1 },
    { id: 'englit', name: 'English Literature', teacher: 'Prof. Jane Austen', currentGrade: 'B', progress: 84, upcoming: 1 },
];

const assignments = [
    { id: 1, name: 'Math Homework 5', course: 'Math 101', due: 'Tomorrow', status: 'Pending', grade: null },
    { id: 2, name: 'Physics Quiz 3', course: 'Physics 201', due: 'Wednesday', status: 'Upcoming', grade: null },
    { id: 3, name: 'Math Homework 4', course: 'Math 101', due: 'Yesterday', status: 'Graded', grade: 'A-' },
    { id: 4, name: 'Physics Lab Report 2', course: 'Physics 201', due: '3 days ago', status: 'Graded', grade: 'B+' },
    { id: 5, name: 'Comp Sci Project Part 1', course: 'Comp Sci 101', due: 'Last week', status: 'Graded', grade: 'A' },
    { id: 6, name: 'English Essay Draft 1', course: 'English Lit', due: 'Last week', status: 'Missing', grade: null },
];

// Animation variants (reused)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.5
    }
  }
};

export default function StudentDashboardPage() {
  // Assuming student's name is available, e.g., from context or props
  const studentName = "Alex Chen";

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Dashboard Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {studentName}! Stay on top of your studies.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              My Schedule
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Notifications <Badge variant="destructive" className="ml-2">3</Badge>
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Overall Average</p>
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold mt-1">89%</h3>
              <p className="text-xs text-muted-foreground mt-1">Current term average (A-)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</p>
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mt-1">{upcomingDeadlines.length}</h3>
              <p className="text-xs text-muted-foreground mt-1">Tasks due soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                <BookOpen className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold mt-1">{courses.length}</h3>
              <p className="text-xs text-muted-foreground mt-1">Currently enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Recent Grades</p>
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mt-1">{recentGrades.length}</h3>
              <p className="text-xs text-muted-foreground mt-1">New grades posted</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Content */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="grades">Assignments & Grades</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Upcoming Deadlines */}
                <Card className="lg:col-span-1">
                   <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>Stay ahead of your tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingDeadlines.slice(0, 4).map((deadline) => (
                        <div key={deadline.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                          <div className={`rounded-full p-1.5 ${deadline.type === 'Quiz' ? 'bg-rose-100' : 'bg-blue-100'}`}>
                            {deadline.type === 'Quiz' ? <AlertCircle className="h-4 w-4 text-rose-600" /> : <Clock className="h-4 w-4 text-blue-600" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{deadline.task}</p>
                            <p className="text-xs text-muted-foreground">{deadline.course} - Due: {deadline.due}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                   <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Deadlines
                    </Button>
                  </CardFooter>
                </Card>

                {/* Overall Progress Trend */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Overall Progress Trend</CardTitle>
                    <CardDescription>Your average grade development over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={overallProgressData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                          <XAxis dataKey="name" />
                          <YAxis unit="%" domain={[70, 100]}/>
                          <Tooltip />
                          <Area type="monotone" dataKey="avgGrade" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Avg Grade" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

               {/* Recent Grades */}
              <Card>
                <CardHeader>
                  <CardTitle>Recently Graded</CardTitle>
                  <CardDescription>Check your latest results</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="space-y-3">
                    {recentGrades.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 pb-2 border-b last:border-0">
                         <div className="flex items-center gap-3">
                           <div className="rounded-full p-1.5 bg-emerald-100">
                              <CheckCircle className="h-4 w-4 text-emerald-600" />
                           </div>
                           <div>
                              <p className="text-sm font-medium">{item.assignment} <span className="text-xs text-muted-foreground">({item.course})</span></p>
                              <p className="text-xs text-muted-foreground">Graded: {item.date}</p>
                           </div>
                         </div>
                         <Badge variant="secondary" className="text-base">
                            {item.grade} <span className="text-xs ml-1">({item.score}%)</span>
                          </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Grades
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* My Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
                 <Card>
                   <CardHeader>
                    <CardTitle>Your Enrolled Courses</CardTitle>
                    <CardDescription>Overview of your current subjects</CardDescription>
                   </CardHeader>
                   <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courses.map((course) => (
                          <Card key={course.id} className="flex flex-col justify-between">
                              <CardHeader className="pb-2">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <GraduationCap className="h-5 w-5 text-blue-600"/> {course.name}
                                    </CardTitle>
                                    <Badge variant={course.progress >= 90 ? 'default' : course.progress >= 80 ? 'secondary' : 'destructive'}>
                                        {course.currentGrade}
                                    </Badge>
                                  </div>
                                  <CardDescription>Taught by {course.teacher}</CardDescription>
                              </CardHeader>
                              <CardContent className="flex-grow">
                                  <p className="text-sm text-muted-foreground mb-1">Progress: {course.progress}%</p>
                                  <Progress value={course.progress} className="h-2" />
                                  <p className="text-sm text-muted-foreground mt-2">{course.upcoming} upcoming deadline(s)</p>
                              </CardContent>
                               <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                    View Course Details <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                               </CardFooter>
                          </Card>
                      ))}
                   </CardContent>
                </Card>
            </TabsContent>

            {/* Assignments & Grades Tab */}
            <TabsContent value="grades" className="space-y-4">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                    <div>
                        <CardTitle>Assignments & Grades</CardTitle>
                        <CardDescription>Track your submissions and results</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search assignments..."
                            className="w-full md:w-[200px] pl-8"
                        />
                        </div>
                         <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="graded">Graded</SelectItem>
                                <SelectItem value="missing">Missing</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Courses</SelectItem>
                                {courses.map(course => (
                                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignments.map(assignment => (
                                <TableRow key={assignment.id} className={assignment.status === 'Missing' ? 'bg-rose-50 dark:bg-rose-900/30' : ''}>
                                    <TableCell className="font-medium">{assignment.name}</TableCell>
                                    <TableCell>{assignment.course}</TableCell>
                                    <TableCell>{assignment.due}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                assignment.status === 'Graded' ? 'default' :
                                                assignment.status === 'Pending' ? 'secondary' :
                                                assignment.status === 'Missing' ? 'destructive' :
                                                'outline'
                                            }
                                        >
                                            {assignment.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-semibold">{assignment.grade ?? '---'}</TableCell>
                                    <TableCell>
                                        {assignment.status !== 'Graded' && assignment.status !== 'Upcoming' && (
                                             <Button variant="outline" size="sm">
                                                {assignment.status === 'Missing' ? 'Submit Late' : 'Submit / View'}
                                            </Button>
                                        )}
                                        {assignment.status === 'Graded' && (
                                            <Button variant="ghost" size="sm">View Feedback</Button>
                                        )}
                                         {assignment.status === 'Upcoming' && (
                                            <Button variant="ghost" size="sm" disabled>Not Due</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Showing {assignments.length} assignments</p>
                     {/* Add pagination if needed */}
                    </CardFooter>
                </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}
