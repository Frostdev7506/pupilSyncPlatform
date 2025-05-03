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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,         // Students
  BookMarked,    // Classes
  ClipboardList, // Assignments
  CheckCircle,   // Graded/Completed
  TrendingUp,    // Performance
  Clock,         // Upcoming
  Calendar,      // Schedule
  Bell,          // Notifications/Announcements
  Settings,
  FileText,
  BarChart2,
  PieChart as PieChartIcon, // Renamed to avoid conflict
  Plus,
  Download,
  Filter,
  Search,
  MessageSquare, // Communication
  AlertCircle, // Needs Attention
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for teacher charts and tables
const classPerformanceData = [
  { name: 'Math 101', avgGrade: 85, completion: 95 },
  { name: 'Physics 201', avgGrade: 78, completion: 92 },
  { name: 'Comp Sci 101', avgGrade: 91, completion: 98 },
  { name: 'English Lit', avgGrade: 88, completion: 96 },
];

const assignmentCompletionData = [
  { name: 'Week 1', completed: 75 },
  { name: 'Week 2', completed: 82 },
  { name: 'Week 3', completed: 78 },
  { name: 'Week 4', completed: 85 },
  { name: 'Week 5', completed: 90 },
  { name: 'Week 6', completed: 88 },
];

const gradeDistributionData = [
  { name: 'A', value: 35 },
  { name: 'B', value: 40 },
  { name: 'C', value: 15 },
  { name: 'D/F', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const upcomingLessons = [
  { id: 1, topic: 'Algebra - Chapter 5 Review', class: 'Math 101', time: 'Tomorrow, 9:00 AM' },
  { id: 2, topic: 'Newton\'s Laws Lab', class: 'Physics 201', time: 'Tomorrow, 11:00 AM' },
  { id: 3, topic: 'Intro to Python Functions', class: 'Comp Sci 101', time: 'Wednesday, 1:00 PM' },
];

const recentSubmissions = [
  { id: 1, student: 'Alice Smith', assignment: 'Math Homework 4', status: 'Graded', grade: 'A-', time: '2 hours ago' },
  { id: 2, student: 'Bob Johnson', assignment: 'Physics Lab Report 2', status: 'Submitted', time: '5 hours ago' },
  { id: 3, student: 'Charlie Brown', assignment: 'Essay Draft 1', status: 'Submitted', time: 'Yesterday' },
  { id: 4, student: 'Diana Prince', assignment: 'Comp Sci Project Part 1', status: 'Graded', grade: 'B+', time: 'Yesterday' },
];

const studentsNeedingAttention = [
    { id: 1, name: 'Ethan Hunt', issue: '3 Missing Assignments', class: 'Math 101' },
    { id: 2, name: 'Fiona Glenanne', issue: 'Low Quiz Scores', class: 'Physics 201'},
    { id: 3, name: 'Gregory House', issue: 'Declining Participation', class: 'English Lit'},
];

// Animation variants (can reuse from institution dashboard)
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


export default function TeacherDashboardPage() {
  // Assuming teacher's name is available, e.g., from context or props
  const teacherName = "Dr. Evelyn Reed";

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
            <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {teacherName}! Manage your classes and students.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Announcements
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Active Classes</p>
                <BookMarked className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mt-1">4</h3>
              <p className="text-xs text-muted-foreground mt-1">Currently teaching</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold mt-1">98</h3>
              <p className="text-xs text-muted-foreground mt-1">Across all classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Avg. Performance</p>
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold mt-1">85.5%</h3>
              <p className="text-xs text-muted-foreground mt-1">Average grade this term</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Pending Grading</p>
                <ClipboardList className="h-5 w-5 text-rose-500" />
              </div>
              <h3 className="text-2xl font-bold mt-1">15</h3>
              <p className="text-xs text-muted-foreground mt-1">Submissions awaiting review</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Content */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="classes">My Classes</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Upcoming Lessons */}
                <Card className="lg:col-span-1">
                   <CardHeader>
                    <CardTitle>Upcoming Lessons</CardTitle>
                    <CardDescription>Your schedule for the next few days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingLessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                          <div className="rounded-full p-1.5 bg-blue-100">
                            <Clock className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{lesson.topic}</p>
                            <p className="text-xs text-muted-foreground">{lesson.class} - {lesson.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                   <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      View Full Schedule
                    </Button>
                  </CardFooter>
                </Card>

                {/* Recent Submissions */}
                 <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>Latest student work submitted</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-3">
                      {recentSubmissions.slice(0, 4).map((submission) => (
                        <div key={submission.id} className="flex items-center justify-between gap-3 pb-2 border-b last:border-0">
                           <div className="flex items-center gap-3">
                             <div className="rounded-full p-1.5 bg-purple-100">
                                {submission.status === 'Graded' ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <FileText className="h-4 w-4 text-purple-600" />}
                             </div>
                             <div>
                                <p className="text-sm font-medium">{submission.student} - <span className="text-muted-foreground">{submission.assignment}</span></p>
                                <p className="text-xs text-muted-foreground">{submission.time}</p>
                             </div>
                           </div>
                           <Badge variant={submission.status === 'Graded' ? 'secondary' : 'outline'}>
                             {submission.status === 'Graded' ? `Grade: ${submission.grade}` : submission.status}
                            </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Submissions
                    </Button>
                  </CardFooter>
                </Card>
              </div>

               {/* Assignment Completion Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Completion Rate</CardTitle>
                  <CardDescription>Weekly trend of assignment submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={assignmentCompletionData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis unit="%" domain={[60, 100]}/>
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                          name="Completion Rate"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Classes Tab */}
            <TabsContent value="classes" className="space-y-4">
                {/* Class Performance Comparison */}
                 <Card>
                  <CardHeader>
                    <CardTitle>Class Performance Overview</CardTitle>
                    <CardDescription>Comparison of average grades and completion rates across your classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart
                          data={classPerformanceData}
                          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                         >
                           <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                           <XAxis dataKey="name" />
                           <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" unit="%"/>
                           <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" unit="%"/>
                           <Tooltip />
                           <Bar yAxisId="left" dataKey="avgGrade" fill="#3b82f6" name="Avg Grade" />
                           <Bar yAxisId="right" dataKey="completion" fill="#8b5cf6" name="Completion Rate" />
                         </BarChart>
                       </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                 {/* List of Classes with Quick Actions */}
                <Card>
                   <CardHeader>
                    <CardTitle>Your Classes</CardTitle>
                    <CardDescription>Manage your active classes</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="space-y-3">
                        {classPerformanceData.map((cls) => (
                            <div key={cls.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-3 sm:gap-0">
                                <div className="flex items-center gap-3">
                                     <div className="rounded-full p-2 bg-blue-100">
                                        <BookMarked className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{cls.name}</p>
                                        <p className="text-sm text-muted-foreground">Avg Grade: {cls.avgGrade}% | Completion: {cls.completion}%</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 self-end sm:self-center">
                                    <Button variant="outline" size="sm">View Details</Button>
                                    <Button variant="outline" size="sm">New Announcement</Button>
                                </div>
                            </div>
                        ))}
                     </div>
                   </CardContent>
                </Card>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                     {/* Grade Distribution */}
                    <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Overall Grade Distribution</CardTitle>
                        <CardDescription>Across all your students</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                            <Pie
                                data={gradeDistributionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {gradeDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        </div>
                    </CardContent>
                    </Card>

                    {/* Students Needing Attention */}
                    <Card className="lg:col-span-2">
                       <CardHeader>
                            <CardTitle>Students Needing Attention</CardTitle>
                            <CardDescription>Students with missing work or low performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                            {studentsNeedingAttention.map((student) => (
                                <div key={student.id} className="flex items-center justify-between gap-3 pb-3 border-b last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full p-1.5 bg-rose-100">
                                            <AlertCircle className="h-4 w-4 text-rose-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{student.name} <span className="text-xs text-muted-foreground">({student.class})</span></p>
                                            <p className="text-xs text-rose-600 font-medium">{student.issue}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                                    </Button>
                                </div>
                            ))}
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button variant="ghost" size="sm" className="w-full">
                                View All Alerts
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Student List Table */}
                <Card>
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                    <div>
                        <CardTitle>Student Performance</CardTitle>
                        <CardDescription>Overview of student grades and activity</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search students..."
                            className="w-full md:w-[200px] pl-8"
                        />
                        </div>
                         <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Classes</SelectItem>
                                <SelectItem value="math101">Math 101</SelectItem>
                                <SelectItem value="physics201">Physics 201</SelectItem>
                                <SelectItem value="compsci101">Comp Sci 101</SelectItem>
                                <SelectItem value="englishlit">English Lit</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Current Grade</TableHead>
                            <TableHead>Attendance</TableHead>
                            <TableHead>Last Activity</TableHead>
                            <TableHead>Missing Assignments</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Add Sample Student Rows Here - replace with actual data fetching */}
                             <TableRow>
                                <TableCell className="font-medium">Alice Smith</TableCell>
                                <TableCell>A- (91%)</TableCell>
                                <TableCell>98%</TableCell>
                                <TableCell>Today</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell><Button variant="ghost" size="sm">View Profile</Button></TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium">Bob Johnson</TableCell>
                                <TableCell>B (84%)</TableCell>
                                <TableCell>95%</TableCell>
                                <TableCell>Yesterday</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell><Button variant="ghost" size="sm">View Profile</Button></TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium">Charlie Brown</TableCell>
                                <TableCell>B+ (88%)</TableCell>
                                <TableCell>96%</TableCell>
                                <TableCell>Today</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell><Button variant="ghost" size="sm">View Profile</Button></TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium">Diana Prince</TableCell>
                                <TableCell>A (95%)</TableCell>
                                <TableCell>100%</TableCell>
                                <TableCell>Yesterday</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell><Button variant="ghost" size="sm">View Profile</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Ethan Hunt</TableCell>
                                <TableCell className="text-rose-600">C- (71%)</TableCell>
                                <TableCell>85%</TableCell>
                                <TableCell>3 days ago</TableCell>
                                <TableCell className="text-rose-600">3</TableCell>
                                <TableCell><Button variant="ghost" size="sm">View Profile</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Showing 5 of 98 students</p>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" disabled>
                        Previous
                        </Button>
                        <Button variant="outline" size="sm">
                        Next
                        </Button>
                    </div>
                    </CardFooter>
                </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}