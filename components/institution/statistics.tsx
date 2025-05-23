"use client"; // Keep this if it's a Next.js client component

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, CheckSquare, Clock, Award, Star, BarChart3, Zap } from 'lucide-react'; // Added relevant icons

// Animated counter hook (same as before)
const useCounter = (end: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const timeElapsed = timestamp - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * (end - startValue) + startValue);
      setCount(currentCount);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    setCount(0);
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  return count;
};

// Formatters for display (Keep these OUTSIDE the component function)
const formatRating = (rawCount: number) => {
  // Displays rating as N.N / 5
  return (rawCount / 10).toFixed(1);
};
const formatPercentage = (count: number) => `${count}%`;


// Renamed component for institutional context
export function PlatformImpactStats() {
  const [activeTab, setActiveTab] = useState("outcomes"); // Default to outcomes
  const [progressValues, setProgressValues] = useState({
    passRate: 0,
    engagement: 0,
    completion: 0,
    timeSaved: 0,
    satisfaction: 0,
    easeOfUse: 0
  });

  // Target values reflecting institutional benefits
  const targetValues = {
    passRate: 92,       // Slightly adjusted, represents %
    engagement: 85,     // Represents % student engagement increase/rate
    completion: 88,     // Represents % course completion rate
    timeSaved: 25,      // Represents % estimated teacher time saved
    satisfaction: 48,   // Represents 4.8 / 5 overall satisfaction (raw value for counter)
    easeOfUse: 47       // Represents 4.7 / 5 ease of use rating (raw value for counter)
  };

  // Auto-switching tabs
  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab(prevTab => prevTab === "outcomes" ? "efficiency" : "outcomes");
    }, 6000); // Switch every 6 seconds

    return () => clearInterval(tabInterval);
  }, []);

  // Animation for progress bars
  useEffect(() => {
    // Reset progress to 0 to re-trigger animation on tab change
    setProgressValues({
      passRate: 0, engagement: 0, completion: 0,
      timeSaved: 0, satisfaction: 0, easeOfUse: 0
    });

    // Use a small delay to allow the UI to render the 0 state before animating
    const timer = setTimeout(() => {
      setProgressValues({
        passRate: targetValues.passRate,
        engagement: targetValues.engagement,
        completion: targetValues.completion,
        timeSaved: targetValues.timeSaved,
        // Convert 0-50 raw rating to 0-100 percentage for progress bar
        satisfaction: (targetValues.satisfaction / 50) * 100,
        easeOfUse: (targetValues.easeOfUse / 50) * 100
      });
    }, 50); // Reduced delay slightly

    return () => clearTimeout(timer);
    // Added activeTab to dependencies so progress animates on tab change
  }, [activeTab, targetValues.passRate, targetValues.engagement, targetValues.completion, targetValues.timeSaved, targetValues.satisfaction, targetValues.easeOfUse]);


  // Use the counter hook for animated numbers
  // Added activeTab as a dependency to reset counters on tab change
  const passRateCount = useCounter(activeTab === "outcomes" ? targetValues.passRate : 0);
  const engagementCount = useCounter(activeTab === "outcomes" ? targetValues.engagement : 0);
  const completionCount = useCounter(activeTab === "outcomes" ? targetValues.completion : 0);
  const timeSavedCount = useCounter(activeTab === "efficiency" ? targetValues.timeSaved : 0);
  const satisfactionRawCount = useCounter(activeTab === "efficiency" ? targetValues.satisfaction : 0);
  const easeOfUseRawCount = useCounter(activeTab === "efficiency" ? targetValues.easeOfUse : 0);


  // CSS Class Variables
  const cardBaseClasses = "overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1";
  const gradientBackground = "bg-gradient-to-r from-blue-600 to-purple-600 text-white";
  const iconContainerClasses = "pt-6 pb-4 flex items-center justify-center";
  const iconClasses = "h-12 w-12 text-white opacity-90";
  const contentClasses = "p-6 text-center";
  const numberClasses = "text-4xl font-bold text-white mb-2";
  const labelClasses = "text-blue-100 opacity-90";
  const progressClasses = "h-2 mt-4 transition-all duration-1000 bg-white/30";
  const progressIndicatorClasses = "[&>div]:bg-white";


  return (
    <div className="w-full py-12 md:py-16 bg-background">
      {/* Optional: Title reflecting institutional value */}
      <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Measurable Institutional Impact</h2>
      <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-10">
        See how our LMS enhances student outcomes and empowers educators.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
        {/* Updated Tab Names */}
        <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
          <TabsTrigger value="outcomes">Student Outcomes</TabsTrigger>
          <TabsTrigger value="efficiency">Teacher Efficiency</TabsTrigger>
        </TabsList>

        {/* Outcomes Tab Content */}
        {/* Use motion.div if you want tab content to animate (requires wrapping each TabsContent) */}
        {/* Or use CSS transitions on the content if preferred */}
        <TabsContent value="outcomes" className="space-y-6 md:space-y-0 data-[state=inactive]:hidden"> {/* Add data-[state=inactive]:hidden */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Improved Pass Rate */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  <Trophy className={iconClasses} />
                </div>
                <div className={contentClasses}>
                  {/* Use the formatter */}
                  <div className={numberClasses}>{formatPercentage(passRateCount)}</div>
                  <div className={labelClasses}>Improved Pass Rate</div>
                  <Progress
                    value={progressValues.passRate || 0}
                    className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Student Engagement */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  {/* Changed Icon to represent engagement/activity */}
                  <BarChart3 className={iconClasses} />
                </div>
                <div className={contentClasses}>
                   {/* Use the formatter */}
                  <div className={numberClasses}>{formatPercentage(engagementCount)}</div>
                  <div className={labelClasses}>Student Engagement</div>
                  <Progress
                     value={progressValues.engagement || 0}
                     className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Course Completion */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  {/* Icon representing goal achievement */}
                  <CheckSquare className={iconClasses} />
                </div>
                <div className={contentClasses}>
                   {/* Use the formatter */}
                  <div className={numberClasses}>{formatPercentage(completionCount)}</div>
                  <div className={labelClasses}>Course Completion Rate</div>
                  <Progress
                     value={progressValues.completion || 0}
                     className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Efficiency & Satisfaction Tab Content */}
         {/* Use motion.div if you want tab content to animate */}
        <TabsContent value="efficiency" className="space-y-6 md:space-y-0 data-[state=inactive]:hidden"> {/* Add data-[state=inactive]:hidden */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 4: Teacher Time Saved */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  {/* Icon representing speed/efficiency */}
                  <Zap className={iconClasses} />
                </div>
                <div className={contentClasses}>
                  {/* Use the formatter */}
                  <div className={numberClasses}>{formatPercentage(timeSavedCount)}</div>
                  {/* Updated Label for clarity */}
                  <div className={labelClasses}>Est. Teacher Time Saved</div>
                  <Progress
                    value={progressValues.timeSaved || 0}
                    className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 5: Overall User Satisfaction */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  {/* Icon for overall rating/award */}
                  <Award className={iconClasses} />
                </div>
                <div className={contentClasses}>
                   {/* Use the formatter */}
                  <div className={numberClasses}>{formatRating(satisfactionRawCount)}/5</div>
                  {/* Updated Label */}
                  <div className={labelClasses}>Overall User Satisfaction</div>
                  <Progress
                     value={progressValues.satisfaction || 0} // Use calculated percentage with fallback
                     className={`${progressClasses} ${progressIndicatorClasses}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 6: Ease of Use */}
            <Card className={`${cardBaseClasses} ${gradientBackground}`}>
              <CardContent className="p-0">
                <div className={iconContainerClasses}>
                  {/* Icon for ease of use/rating */}
                  <Star className={iconClasses} />
                </div>
                <div className={contentClasses}>
                   {/* Use the formatter */}
                  <div className={numberClasses}>{formatRating(easeOfUseRawCount)}/5</div>
                  {/* Updated Label */}
                  <div className={labelClasses}>Teacher Ease of Use</div>
                  <Progress
                     value={progressValues.easeOfUse || 0} // Use calculated percentage with fallback
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

// Optional export default
// export default PlatformImpactStats;