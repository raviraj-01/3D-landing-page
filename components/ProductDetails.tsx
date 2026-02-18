"use client";

import { motion } from "framer-motion";
import { Product } from "@/data/products";
import Image from "next/image";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <section className="relative py-24 px-6 bg-white dark:bg-neutral-900 z-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text Integration */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
            <h3 className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-2">
                The Details
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {product.detailsSection.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {product.detailsSection.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
                {product.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {stat.val}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>

        {/* Feature Visual / Freshness */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-100 dark:bg-neutral-800 rounded-3xl p-8 md:p-12"
        >
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {product.freshnessSection.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                {product.freshnessSection.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
                {product.features.map((feature, i) => (
                    <span key={i} className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-neutral-900">
                        {feature}
                    </span>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
}
