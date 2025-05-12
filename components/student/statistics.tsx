"use client"; // Keep this if it's a Next.js client component

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, Clock, BookOpen, GraduationCap, Award } from 'lucide-react';

// Animated counter hook (modified slightly for clarity)
const useCounter = (end:number, duration = 1500) => { // Default duration 1.5s
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime:number;
    let animationFrame:number;
    const startValue = 0;

    const step = (timestamp:number) => {
      if (!startTime) startTime = timestamp;
      const timeElapsed = timestamp - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      // Ease-out function for smoother animation end
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * (end - startValue) + startValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
         setCount(end); // Ensure it ends exactly at the target value
      }
    };

    // Reset count to 0 before starting animation
    setCount(0);
    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  // Re-run animation when 'end' value changes or component remounts (like tab switch)
  }, [end, duration]);

  return count;
};


export function StudentStatistics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [progressValues, setProgressValues] = useState({
    passRate: 0,
    activeUsers: 0,
    support: 0, // Support is always 100% visually
    courses: 0,
    graduates: 0,
    satisfaction: 0
  });

  // Target values for stats
  const targetValues = {
    passRate: 95,
    activeUsers: 1000, // Represents 1000K+ -> target 1000
    support: 100,
    courses: 50,      // Represents 50+
    graduates: 250,   // Represents 250K+ -> target 250
    satisfaction: 96  // Represents 4.8/5 -> 96% (4.8 * 20)
  };

  // Auto-switching tabs
  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab(prevTab => prevTab === "overview" ? "detailed" : "overview");
    }, 6000); // Switch every 6 seconds

    return () => clearInterval(tabInterval);
  }, []);

  // Animation for progress bars (starts slightly after mount/tab switch)
  useEffect(() => {
     // Reset progress on tab change before starting new animation
     setProgressValues({
       passRate: 0, activeUsers: 0, support: 0,
       courses: 0, graduates: 0, satisfaction: 0
     });

    const timer = setTimeout(() => {
      setProgressValues({
        passRate: targetValues.passRate,
        activeUsers: 80, // Static progress value for visual representation
        support: targetValues.support,
        courses: 75, // Static progress value
        graduates: 85, // Static progress value
        satisfaction: targetValues.satisfaction
      });
    }, 150); // Start progress animation shortly after component mount/tab switch

    return () => clearTimeout(timer);
  }, [activeTab]); // Rerun when activeTab changes


  // Use the counter hook for animated numbers
  // Using activeTab in dependency array to restart animation on tab switch
  const passRateCount = useCounter(activeTab ? targetValues.passRate : 0);
  const activeUsersCount = useCounter(activeTab ? targetValues.activeUsers : 0);
  const coursesCount = useCounter(activeTab ? targetValues.courses : 0);
  const graduatesCount = useCounter(activeTab ? targetValues.graduates : 0);
  // For satisfaction, animate 0 to 48, then display as 4.8/5
  const satisfactionRawCount = useCounter(activeTab ? targetValues.satisfaction * 0.5 : 0); // Animate 0 to 48

  // Formatters for display
  const formatSatisfaction = (rawCount:number) => {
    // Animate towards 48, display as N.N/5
    return (rawCount / 10).toFixed(1);
  }

   // Helper to format large numbers with K+
   const formatKPlus = (num:number) => {
     if (num < 1000) return num; // Don't format if less than 1000 during animation
     return (num / 1000).toFixed(0) + 'K+'; // Show K+ once it hits 1000+
   };


  const cardBaseClasses = "overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1";
  const gradientBackground = "bg-gradient-to-r from-blue-600 to-purple-600 text-white";
  const iconContainerClasses = "pt-6 pb-4 flex items-center justify-center"; // Adjusted padding
  const iconClasses = "h-12 w-12 text-white opacity-90"; // White icons
  const contentClasses = "p-6 text-center";
  const numberClasses = "text-4xl font-bold text-white mb-2";
  const labelClasses = "text-blue-100 opacity-90"; // Lighter text for labels
  const progressClasses = "h-2 mt-4 transition-all duration-1000 bg-white/30"; // Track color
  const progressIndicatorClasses = "[&>div]:bg-white"; // Indicator color


  return (
    <div className="w-full py-12 md:py-16 bg-background"> {/* Added padding */}
      {/* Optional: Add a subtle title if needed */}
      {/* <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Our Impact</h2> */}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto"> {/* Added max-width */}
        <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto"> {/* Centered TabsList */}
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Stats</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6 md:space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Pass Rate */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  <Trophy className={iconClasses} />
                </div>
                <div className={contentClasses}>
                  <div className={numberClasses}>{passRateCount}%</div>
                  <div className={labelClasses}>Pass Rate</div>
                  <Progress
                    value={progressValues.passRate || 0}
                    className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Active Learners */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  <Users className={iconClasses} />
                </div>
                <div className={contentClasses}>
                  {/* Use formatter */}
                  <div className={numberClasses}>{formatKPlus(activeUsersCount)}</div>
                  <div className={labelClasses}>Active Learners</div>
                  <Progress
                     value={progressValues.activeUsers || 0}
                     className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Study Support */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  <Clock className={iconClasses} />
                </div>
                <div className={contentClasses}>
                  <div className={numberClasses}>24/7</div>
                  <div className={labelClasses}>Study Support</div>
                  <Progress
                     value={progressValues.support || 0} // Always 100
                     className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Detailed Stats Tab Content */}
        <TabsContent value="detailed" className="space-y-6 md:space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 4: Available Courses */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  <BookOpen className={iconClasses} />
                </div>
                <div className={contentClasses}>
                  <div className={numberClasses}>{coursesCount}+</div>
                  <div className={labelClasses}>Available Courses</div>
                  <Progress
                    value={progressValues.courses || 0}
                    className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 5: Graduated Students */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  <GraduationCap className={iconClasses} />
                </div>
                <div className={contentClasses}>
                  {/* Use formatter */}
                  <div className={numberClasses}>{formatKPlus(graduatesCount)}</div>
                  <div className={labelClasses}>Graduated Students</div>
                  <Progress
                     value={progressValues.graduates || 0}
                     className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 6: Satisfaction Rate */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  <Award className={iconClasses} />
                </div>
                <div className={contentClasses}>
                   {/* Format the satisfaction rate */}
                  <div className={numberClasses}>{formatSatisfaction(satisfactionRawCount)}/5</div>
                  <div className={labelClasses}>Satisfaction Rate</div>
                  <Progress
                     value={progressValues.satisfaction || 0}
                     className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Export default if needed for specific file structure
// export default StudentStatistics;