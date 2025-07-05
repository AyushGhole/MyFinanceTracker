// src/components/GlassCard.jsx

import { motion } from "framer-motion";

export default function GlassCard({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`backdrop-blur-md bg-white/30 border border-white/20 p-6 rounded-2xl shadow-xl ${className}`}>
      {children}
    </motion.div>
  );
}
