import { motion } from "framer-motion";
import React from "react";
import { Button, Typography, Input } from "@material-tailwind/react";

const floatingVariants = {
  animate: {
    x: ["-5%", "5%", "-5%"],
    y: ["-5%", "5%", "-5%"],
    rotate: [0, 360],
    scale: [1, 1.2, 1],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <svg className="absolute inset-0 h-full w-full">
          <pattern
            id="grid-pattern"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0H0V50"
              className="stroke-slate-800"
              strokeWidth="1.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Animated Gradient Blobs */}
      <motion.div
        className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-r from-indigo-500/30 to-blue-400/30 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-r from-indigo-500/30 to-blue-400/30 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Animated Headline Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 border-l-4 border-indigo-500 pl-6 relative"
          >
            <div className="absolute -left-1 top-0 w-1 h-full bg-emerald-500/25" />
            <Typography
              variant="h1"
              className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-indigo-900 to-indigo-400 bg-clip-text text-transparent">
                TaskTracker
              </span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="block -mt-2"
              >
                Organize Your Day
              </motion.span>
            </Typography>
            <Typography className="text-xl text-indigo-100/80 uppercase tracking-widest font-medium mb-2">
              Smart Task Management Reimagined
            </Typography>
            <Typography className="text-base text-slate-400 max-w-2xl">
              Transform your productivity with AI-powered task organization,
              real-time collaboration, and intelligent scheduling.
            </Typography>
          </motion.div>

          {/* Enhanced CTA Section */}
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex-1 space-y-8 w-full max-w-lg"
            >
              <div className="relative group">
                <Input
                  variant="static"
                  placeholder="Enter your email"
                  className="!text-white !border-b-slate-700 focus:!border-indigo-500 placeholder:text-slate-500 transition-all"
                  labelProps={{ className: "hidden" }}
                  containerProps={{
                    className: "border-b group-hover:border-b-emerald-500/50",
                  }}
                />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-emerald-500 transition-all duration-300 group-hover:w-full" />
              </div>
              <Button
                size="lg"
                className="relative overflow-hidden bg-indigo-900 hover:bg-indigo-800 text-gray-300 font-bold px-12 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <Typography className="text-sm text-slate-500">
                Join 1,000+ productive teams already using TaskTracker
              </Typography>
            </motion.div>

            {/* Animated Stats Grid */}
            <div className="flex-1 grid grid-cols-2 gap-6" id="stats">
              {[
                { value: "300+", label: "Tasks Managed" },
                { value: "150+", label: "Active Users" },
                { value: "2-min", label: "Quick Setup" },
                { value: "4.8/5", label: "User Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={statItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-sm rounded-xl hover:bg-slate-800/20 transition-colors cursor-default"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-200 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 uppercase tracking-wide font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;