// src/components/AnimatedDatePicker.jsx

import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AnimatedDatePicker({ selected, setSelected }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}>
      <DatePicker
        selected={selected}
        onChange={(date) => setSelected(date)}
        placeholderText="Select a date"
        dateFormat="yyyy-MM-dd"
        className="w-full rounded px-4 py-2 bg-white/80 focus:outline-none"
      />
    </motion.div>
  );
}
