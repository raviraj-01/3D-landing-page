"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/10 backdrop-blur-xl border-b border-white/20 py-4"
          : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
           {/* Abstract Banana/Lightning Icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-orange-500"
          >
            <path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            Nano Banana
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
            <button className="hidden md:block text-sm font-medium hover:text-orange-500 transition-colors">
                Our Story
            </button>
            <button className="hidden md:block text-sm font-medium hover:text-orange-500 transition-colors">
                Flavors
            </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-6 py-2 rounded-full bg-orange-500 text-white font-semibold overflow-hidden shadow-lg shadow-orange-500/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Order Now <ShoppingBag size={18} />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </motion.button>
          
           <button className="md:hidden text-gray-800 dark:text-white">
                <Menu size={24} />
           </button>
        </div>
      </div>
    </motion.nav>
  );
}
