import React from "react";
import {
  ChevronRight,
  PlayCircle,
  Shield,
  Zap,
  Star,
  Github,
  Globe,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold">VoxNow</div>
              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About
                </a>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition"
                >
                  Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/20/20')] opacity-5"></div>

        <section className="container mx-auto px-6 pt-20 pb-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Democracy meets blockchain technology
                </h1>
                <p className="text-xl text-gray-400">
                  The secure, transparent, and decentralized voting platform for
                  the modern world.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  Get started
                  <ChevronRight size={20} />
                </Link>
                <button className="border border-gray-700 hover:border-gray-600 px-6 py-3 rounded-md text-lg font-semibold flex items-center justify-center gap-2 transition">
                  Watch demo
                  <PlayCircle size={20} />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-8 border-t border-gray-800"
              >
                <p className="text-sm text-gray-400 mb-4">
                  Trusted by leading organizations worldwide
                </p>
                <div className="grid grid-cols-3 gap-8">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className="h-8 bg-gray-800 rounded-md animate-pulse"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 3D Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-8 backdrop-blur-xl border border-gray-700">
                <div className="grid gap-6">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-md"
                    >
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <div className="h-4 bg-gray-700 rounded flex-grow" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section className="border-t border-gray-800 bg-gray-900">
        <div className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Lock,
                title: "Enterprise Security",
                description:
                  "Built on blockchain technology for unmatched security and transparency",
              },
              {
                icon: Globe,
                title: "Global Scale",
                description:
                  "Host secure votes with participants from anywhere in the world",
              },
              {
                icon: Shield,
                title: "Real-time Verification",
                description:
                  "Watch votes being recorded and verified on the blockchain instantly",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-gray-800/50 p-8 rounded-lg border border-gray-700/50">
                  <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

//color therme used
// Here's the core design theme used in the landing page, formatted in markdown:

// # VoxNOW Design Theme

// ## 🎨 Core Colors

// ### Primary Colors
// - `bg-gray-900` - Main background/dark theme
// - `bg-blue-600` - Primary action buttons
// - `bg-purple-500` - Secondary accent color

// ### Text Colors
// - White (`text-white`) - Primary text
// - `text-gray-400` - Secondary/muted text
// - `text-blue-400` - Accent text & icons

// ### Border Colors
// - `border-gray-800` - Main borders
// - `border-gray-700` - Card borders

// ## 🎯 Brand Gradients

// ### Background Gradients
// - Primary: `from-blue-500/20 to-purple-500/20`
// - Hover: `from-blue-600/20 to-purple-600/20`

// ### Glow Effects
// - Blue glow: `bg-blue-500/10`
// - Purple glow: `bg-purple-500/10`

// ## 🖼 UI Elements

// ### Cards
// - Dark translucent background (`bg-gray-800/50`)
// - Subtle border
// - Rounded corners
// - Blur effect on hover

// ### Buttons
// - Solid blue for primary actions
// - Border-only for secondary actions
// - Rounded corners
// - Hover state with scale effect

// That's the essential theme - focused on a dark, modern look with blue and purple accents. It's inspired by GitHub's design language but customized for VoxNOW's identity.
