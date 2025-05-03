"use client";

import { motion } from "framer-motion";

export default function InstitutionDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-[calc(100vh-4rem)] bg-background"
    >
      {children}
    </motion.div>
  );
}
