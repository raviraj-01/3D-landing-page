"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductDetails from "@/components/ProductDetails";
import BuyNow from "@/components/BuyNow";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const product = products[currentIndex];

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToProduct = (index: number) => {
      setCurrentIndex(index);
  }

  // Reset scroll on change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  return (
    <main className="min-h-screen font-sans">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
            style={{
                // Base background color and custom gradient
                background: product.gradient,
            }}
        >
            {/* Scroll Experience section */}
            <ProductBottleScroll product={product} />
            
            {/* Content Sections */}
            <div className="relative z-20 bg-white dark:bg-neutral-900 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)] -mt-24 pt-24">
                <ProductDetails product={product} />
                <BuyNow product={product} />
                
                {/* Next Flavor CTA */}
                <div className="py-24 px-6 bg-gray-50 dark:bg-black text-center relative overflow-hidden">
                    <motion.div
                       initial={{ y: 50, opacity: 0 }}
                       whileInView={{ y: 0, opacity: 1 }}
                       transition={{ duration: 0.8 }}
                       viewport={{ once: true }}
                       className="relative z-10"
                    >
                         <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                            Explore more flavors
                         </h3>
                         <button 
                            onClick={nextProduct}
                            className="bg-white dark:bg-neutral-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors shadow-lg flex items-center gap-2 mx-auto"
                         >
                            Next Flavor <ChevronRight />
                         </button>
                    </motion.div>
                </div>

                <Footer />
            </div>
        </motion.div>
      </AnimatePresence>

      {/* Fixed Navigation UI */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-4 border border-white/10 shadow-2xl">
         {products.map((p, i) => (
             <button
                key={p.id}
                onClick={() => goToProduct(i)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    i === currentIndex 
                    ? "bg-white text-black shadow-lg" 
                    : "text-white hover:text-gray-300"
                }`}
             >
                 {p.name}
             </button>
         ))}
      </div>
      
       {/* Side Arrows */}
       <button onClick={prevProduct} className="fixed left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white border border-white/10 hidden md:block">
            <ChevronLeft size={24} />
       </button>
       
       <button onClick={nextProduct} className="fixed right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white border border-white/10 hidden md:block">
            <ChevronRight size={24} />
       </button>

    </main>
  );
}
