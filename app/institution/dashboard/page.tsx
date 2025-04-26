"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
  Cell
} from "recharts";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Bell, 
  Settings, 
  FileText, 
  BarChart2, 
  PieChart as PieChartIcon,
  Plus,
  Download,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for charts and tables
const performanceData = [
  { name: 'Jan', students: 65, teachers: 28, courses: 12 },
  { name: 'Feb', students: 72, teachers: 30, courses: 14 },
  { name: 'Mar', students: 80, teachers: 32, courses: 15 },
  { name: 'Apr', students: 78, teachers: 35, courses: 16 },
  { name: 'May', students: 85, teachers: 36, courses: 18 },
  { name: 'Jun', students: 90, teachers: 38, courses: 20 },
];

const engagementData = [
  { name: 'Week 1', engagement: 75 },
  { name: 'Week 2', engagement: 82 },
  { name: 'Week 3', engagement: 78 },
  { name: 'Week 4', engagement: 85 },
  { name: 'Week 5', engagement: 90 },
  { name: 'Week 6', engagement: 88 },
];

const courseDistributionData = [
  { name: 'Science', value: 35 },
  { name: 'Mathematics', value: 30 },
  { name: 'Languages', value: 20 },
  { name: 'Arts', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentActivities = [
  { id: 1, activity: 'New course added: Advanced Physics', date: '2 hours ago', type: 'Course' },
  { id: 2, activity: 'Teacher onboarded: Sarah Johnson', date: '5 hours ago', type: 'Staff' },
  { id: 3, activity: '25 new students enrolled', date: 'Yesterday', type: 'Enrollment' },
  { id: 4, activity: 'Quarterly report generated', date: 'Yesterday', type: 'Report' },
  { id: 5, activity: 'System maintenance completed', date: '2 days ago', type: 'System' },
];

const upcomingEvents = [
  { id: 1, event: 'Faculty Meeting', date: 'Tomorrow, 10:00 AM' },
  { id: 2, event: 'End of Semester', date: 'June 15, 2023' },
  { id: 3, event: 'Summer Program Registration', date: 'June 20, 2023' },
];

// Animation variants
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

export default function InstitutionDashboardPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Institution Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your institution.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              June 2023
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">1,248</h3>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">+12%</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                <BookOpen className="h-5 w-5 text-purple-500" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">42</h3>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">+4</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">New courses this semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Graduation Rate</p>
                <GraduationCap className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">94.2%</h3>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">+2.1%</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Above national average</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Teacher Satisfaction</p>
                <Award className="h-5 w-5 text-rose-500" />
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">4.8/5</h3>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">+0.3</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Based on recent survey</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Content */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Performance Chart */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>Monthly growth in students, teachers, and courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={performanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="students" fill="#3b82f6" name="Students" />
                          <Bar dataKey="teachers" fill="#8b5cf6" name="Teachers" />
                          <Bar dataKey="courses" fill="#f59e0b" name="Courses" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest updates from your institution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                          <div className="rounded-full p-1.5 bg-blue-100">
                            {activity.type === 'Course' && <BookOpen className="h-4 w-4 text-blue-600" />}
                            {activity.type === 'Staff' && <Users className="h-4 w-4 text-purple-600" />}
                            {activity.type === 'Enrollment' && <GraduationCap className="h-4 w-4 text-amber-600" />}
                            {activity.type === 'Report' && <FileText className="h-4 w-4 text-emerald-600" />}
                            {activity.type === 'System' && <Settings className="h-4 w-4 text-slate-600" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.activity}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Activities
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Engagement Chart */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Student Engagement</CardTitle>
                    <CardDescription>Weekly engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={engagementData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="engagement" 
                            stroke="#8b5cf6" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Schedule for the next few weeks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                          <div className="rounded-full p-1.5 bg-purple-100">
                            <Calendar className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{event.event}</p>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      View Full Calendar
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Course Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Distribution</CardTitle>
                    <CardDescription>Breakdown by subject area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={courseDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {courseDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Key indicators of institutional success</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Student Retention Rate</p>
                          <p className="text-sm font-medium">92%</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Teacher Retention Rate</p>
                          <p className="text-sm font-medium">88%</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Course Completion Rate</p>
                          <p className="text-sm font-medium">95%</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Student Satisfaction</p>
                          <p className="text-sm font-medium">4.7/5</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Table */}
              <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                  <div>
                    <CardTitle>Detailed Analytics</CardTitle>
                    <CardDescription>Comprehensive data for all departments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full md:w-[200px] pl-8"
                      />
                    </div>
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
                        <TableHead>Department</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Teachers</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Avg. Grade</TableHead>
                        <TableHead>Completion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Science</TableCell>
                        <TableCell>342</TableCell>
                        <TableCell>18</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>B+</TableCell>
                        <TableCell>94%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mathematics</TableCell>
                        <TableCell>285</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>B</TableCell>
                        <TableCell>92%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Languages</TableCell>
                        <TableCell>210</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>A-</TableCell>
                        <TableCell>96%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Arts</TableCell>
                        <TableCell>175</TableCell>
                        <TableCell>9</TableCell>
                        <TableCell>6</TableCell>
                        <TableCell>A</TableCell>
                        <TableCell>98%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Physical Education</TableCell>
                        <TableCell>236</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>6</TableCell>
                        <TableCell>A-</TableCell>
                        <TableCell>99%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Showing 5 of 12 departments</p>
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
            
            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>Access and download institutional reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-blue-100">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Quarterly Performance Report</p>
                          <p className="text-sm text-muted-foreground">Last updated: June 1, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-purple-100">
                          <BarChart2 className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Student Enrollment Analytics</p>
                          <p className="text-sm text-muted-foreground">Last updated: May 28, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-amber-100">
                          <PieChartIcon className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Resource Allocation Report</p>
                          <p className="text-sm text-muted-foreground">Last updated: May 15, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-emerald-100">
                          <TrendingUp className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium">Academic Performance Trends</p>
                          <p className="text-sm text-muted-foreground">Last updated: May 10, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Generate New Report
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}
