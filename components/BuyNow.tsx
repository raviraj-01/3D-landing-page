"use client";

import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { ShoppingBag, Truck, ShieldCheck, Leaf } from "lucide-react";

export default function BuyNow({ product }: { product: Product }) {
  return (
    <section className="relative py-20 px-6 bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800 z-20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
            
          {/* Summary / Promise Card */}
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Ready to taste the future?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <Leaf size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Processing</h4>
                        <ul className="text-sm text-gray-500 mt-1 space-y-1">
                            {product.buyNowSection.processingParams.map((p, i) => (
                                <li key={i}>• {p}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Truck size={20} />
                    </div>
                    <div>
                         <h4 className="font-semibold text-gray-900 dark:text-white">Delivery</h4>
                         <p className="text-sm text-gray-500 mt-1 leading-snug">
                             {product.buyNowSection.deliveryPromise}
                         </p>
                    </div>
                </div>
                 <div className="flex items-start gap-3 md:col-span-2">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                         <h4 className="font-semibold text-gray-900 dark:text-white">Guarantee</h4>
                         <p className="text-sm text-gray-500 mt-1">
                             {product.buyNowSection.returnPolicy}
                         </p>
                    </div>
                </div>
            </div>
          </div>

          {/* Pricing Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[400px] bg-gray-50 dark:bg-neutral-800 rounded-3xl p-8 border border-gray-200 dark:border-neutral-700 shadow-xl"
          >
             <div className="space-y-6">
                <div>
                     <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Total Price</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-gray-900 dark:text-white">{product.buyNowSection.price}</span>
                        <span className="text-gray-500">{product.buyNowSection.unit}</span>
                    </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-neutral-700 my-4" />

                <button className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-500/25 transition-all active:scale-95 flex items-center justify-center gap-2">
                    Add to Cart <ShoppingBag size={20} />
                </button>
                 <p className="text-xs text-center text-gray-400">
                    Secure checkout powered by Stripe
                </p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
