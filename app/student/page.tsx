"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import {
  CheckCircle,
  ChevronRight,
  MessageCircle,
  BookOpen,
  BarChart2,
  Clock,
  Award,
  Calendar,
  TrendingUp,
  Star,
  BookMarked,
  GraduationCap,
  Target,
  Zap,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Trophy,
  Users,
  Bell,
  ArrowRight
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";

import { StudentStatistics } from "@/components/student/statistics";
import { StudentHeroCarousel } from "@/components/student/hero-carousel";
import { StudentSection } from "@/components/sections/student-section";
import { TestimonialSection } from "@/components/student/testimonial-section";
import { ChatModal } from "@/components/chat-modal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.7
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Sample data for charts
const learningProgressData = [
  { month: 'Jan', progress: 65, target: 60 },
  { month: 'Feb', progress: 72, target: 65 },
  { month: 'Mar', progress: 80, target: 70 },
  { month: 'Apr', progress: 78, target: 75 },
  { month: 'May', progress: 85, target: 80 },
  { month: 'Jun', progress: 90, target: 85 },
];

const subjectPerformanceData = [
  { subject: 'Math', score: 80, average: 70 },
  { subject: 'Science', score: 90, average: 75 },
  { subject: 'English', score: 70, average: 65 },
  { subject: 'History', score: 85, average: 70 },
  { subject: 'Art', score: 95, average: 80 },
  { subject: 'Music', score: 75, average: 60 },
];

const studyTimeData = [
  { name: 'Math', value: 35, color: '#0088FE' },
  { name: 'Science', value: 25, color: '#00C49F' },
  { name: 'English', value: 20, color: '#FFBB28' },
  { name: 'History', value: 15, color: '#FF8042' },
  { name: 'Other', value: 5, color: '#8884d8' },
];

const upcomingDeadlines = [
  { id: 1, course: 'Advanced Mathematics', task: 'Problem Set 3', due: '2 days' },
  { id: 2, course: 'Physics 101', task: 'Lab Report', due: '5 days' },
  { id: 3, course: 'English Literature', task: 'Essay Draft', due: '1 week' },
];

const recentAchievements = [
  { id: 1, title: 'Perfect Score', description: 'Achieved 100% on Physics Quiz', icon: Trophy, color: 'text-amber-500', bgColor: 'bg-amber-100' },
  { id: 2, title: '7-Day Streak', description: 'Completed lessons for 7 consecutive days', icon: Zap, color: 'text-blue-500', bgColor: 'bg-blue-100' },
  { id: 3, title: 'Fast Learner', description: 'Completed 3 courses ahead of schedule', icon: Clock, color: 'text-emerald-500', bgColor: 'bg-emerald-100' },
];

const recommendedCourses = [
  { id: 1, title: 'Advanced Data Structures', level: 'Intermediate', match: '95%', enrolled: 1240 },
  { id: 2, title: 'Creative Writing Workshop', level: 'Beginner', match: '87%', enrolled: 890 },
  { id: 3, title: 'Quantum Physics Fundamentals', level: 'Advanced', match: '82%', enrolled: 560 },
];

export default function StudentPage() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background antialiased">
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-background/90 to-muted/20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                variants={itemVariants}
                className="relative z-10 space-y-6"
              >
                <Badge
                  variant="secondary"
                  className="mb-4 px-4 py-1.5 text-sm font-medium bg-background border border-border/50 hover:bg-primary/5 transition-colors"
                >
                  Student Success Simplified
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 2xl:h-[126px]">
                  Master Your <br className="hidden lg:block" />Learning Journey
                </h1>
                <motion.p
                  variants={fadeIn}
                  className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
                >
                  The ultimate platform for students to track progress, access resources, and achieve academic success.
                </motion.p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.div variants={itemVariants}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 px-8 py-6 text-base"
                    >
                      Start Learning Free
                      <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary/20 bg-background/80 hover:bg-primary/5 hover:border-primary/40 px-8 py-6 text-base shadow-sm hover:shadow-md"
                    >
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Explore Features
                      </span>
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  variants={fadeIn}
                  className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Free for students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">24/7 study support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Used by 1M+ students</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              variants={itemVariants}
              className="flex-1 w-full max-w-2xl"
              whileHover={{ scale: 1.01 }}
            >
              <StudentHeroCarousel className="rounded-2xl shadow-2xl border border-border/30" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <StudentStatistics />

      {/* Learning Dashboard Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Your Learning Dashboard</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Track your progress, monitor performance, and stay on top of your learning journey.
            </p>
          </motion.div>

          <Tabs defaultValue="progress" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                    <CardDescription>Your progress compared to target goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={learningProgressData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="progress"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            name="Your Progress"
                          />
                          <Line
                            type="monotone"
                            dataKey="target"
                            stroke="#94a3b8"
                            strokeDasharray="5 5"
                            name="Target"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>Stay on top of your assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingDeadlines.map((deadline) => (
                        <div key={deadline.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                          <div className="rounded-full p-1.5 bg-blue-100">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{deadline.task}</p>
                            <p className="text-xs text-muted-foreground">{deadline.course}</p>
                            <Badge variant="outline" className="mt-1 text-xs">Due in {deadline.due}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Assignments
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                    <CardDescription>Your scores compared to class average</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={subjectPerformanceData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="Your Score"
                            dataKey="score"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.6}
                          />
                          <Radar
                            name="Class Average"
                            dataKey="average"
                            stroke="#94a3b8"
                            fill="#94a3b8"
                            fillOpacity={0.3}
                          />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Study Time Distribution</CardTitle>
                    <CardDescription>How you allocate your study time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={studyTimeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {studyTimeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>Your upcoming classes and study sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Monday */}
                      <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <h3 className="font-medium">Monday</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">Advanced Mathematics</p>
                              <p className="text-xs text-muted-foreground">9:00 AM - 10:30 AM</p>
                            </div>
                            <Badge>Lecture</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">Physics Lab</p>
                              <p className="text-xs text-muted-foreground">1:00 PM - 3:00 PM</p>
                            </div>
                            <Badge variant="outline">Practical</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Tuesday */}
                      <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <h3 className="font-medium">Tuesday</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">English Literature</p>
                              <p className="text-xs text-muted-foreground">11:00 AM - 12:30 PM</p>
                            </div>
                            <Badge>Lecture</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">Study Group</p>
                              <p className="text-xs text-muted-foreground">4:00 PM - 6:00 PM</p>
                            </div>
                            <Badge variant="outline">Group Work</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      View Full Schedule
                    </Button>
                  </CardFooter>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Achievements</CardTitle>
                      <CardDescription>Your latest accomplishments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentAchievements.map((achievement) => (
                          <div key={achievement.id} className="flex items-start gap-3">
                            <div className={`rounded-full p-2 ${achievement.bgColor}`}>
                              <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{achievement.title}</p>
                              <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Recommended Courses Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Recommended For You</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Courses and resources tailored to your learning profile and interests.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {recommendedCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: course.id * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{course.match}</Badge>
                    </div>
                    <CardDescription>{course.level} • {course.enrolled.toLocaleString()} students enrolled</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm text-muted-foreground">(4.9)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This course matches your learning profile and previous course history.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Enroll Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />
      <StudentSection />

      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Ready to Boost Your Grades?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join millions of students achieving academic success with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 px-8 py-6 text-base"
              >
                Start Free Trial
                <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/20 bg-background/80 hover:bg-primary/5 hover:border-primary/40 px-8 py-6 text-base shadow-sm hover:shadow-md"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Student Resources
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          size="lg"
          className="rounded-full shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Study Assistant
        </Button>
      </motion.div>
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
      <Footer />
    </div>
  );
}
