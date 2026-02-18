"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { Product } from "@/data/products";

interface ProductTextOverlaysProps {
  product: Product;
}

export default function ProductTextOverlays({ product }: ProductTextOverlaysProps) {
  // We need to access the SAME scroll progress as the bottle, so we assume this component is placed 
  // correctly relative to the scroll container or we just use absolute positioning over the 500vh container.
  // Actually, simpler approach: This component IS the text layer inside the sticky wrapper or 
  // it sits parallel to the canvas but responds to the same scroll progress.
  
  // Since ProductBottleScroll handles the layout (h-[500vh]), we can put this INSIDE ProductBottleScroll
  // OR we can make a wrapper component. 
  
  // However, to keep files separate and clean as requested:
  // The architecture implies specific scroll triggers.
  // Let's assume this component is rendered INSIDE the sticky container of the main page or 
  // passed as children to a layout.
  // BUT, to keep it simple and robust:
  // I'll make this component accept a `scrollYProgress` prop if I was compositing it manually,
  // but to make it standalone and "drop-in", I will make it fixed/sticky based on the parent reference.
  
  // Revised approach:
  // This component will render the text sections relative to the viewport, driven by the global window scroll 
  // or a passed ref. 
  // Given the structure "ProductBottleScroll (The scroll experience)", it likely encapsulates the text too?
  // No, the prompt separates them: "Display the 4 text sections... Use framer-motion's useTransform".
  
  // I will implement this as a component that expects to be inside the `h-[500vh]` container 
  // effectively, but `useScroll` needs a target.
  
  // Let's create a contextual hook or just accept scrollProgress as a prop?
  // No, I'll use the `useScroll` with window or a shared layout context. 
  // Actually, the best pattern for "Scrollytelling" is to have the text sections 
  // dispersed at absolute positions within the tall scroll container.
  
  return (
      <div className="absolute inset-0 pointer-events-none z-20">
          {/* We define specific scroll ranges for each text block. 
              The total height is 500vh.
              0-100vh: Section 1
              100-200vh: Section 2
              etc.
          */}
          
          <Section opacityRange={[0, 0.2, 0.3]} yRange={[0, -50]} text={product.section1} />
          <Section opacityRange={[0.25, 0.45, 0.55]} yRange={[50, -50]} text={product.section2} />
          <Section opacityRange={[0.5, 0.7, 0.8]} yRange={[50, -50]} text={product.section3} />
          <Section opacityRange={[0.75, 0.9, 1]} yRange={[50, 0]} text={product.section4} isLast />
      </div>
  );
}

function Section({ opacityRange, yRange, text, isLast }: { 
    opacityRange: number[], 
    yRange: number[], 
    text: { title: string, subtitle: string },
    isLast?: boolean
}) {
    // We need to link this to the master scroll container which is the parent. 
    // Since we can't easily reference the parent ref without context, 
    // and `useScroll` defaults to window if no target (which works for native scroll),
    // we need to be careful. In this "Sticky" setup, the window scroll IS the driver.
    // So `useScroll()` works perfectly.
    
    // BUT we need the progress of the `product-container`.
    // I will use absolute positioning top-[100vh], top-[200vh] etc? 
    // No, the prompt says "Fade them In/Out based on scroll progress (0.1, 0.3, 0.6, etc.)".
    // This implies we are transforming them purely by progress while they stay FIXED in the viewport.
    
    const { scrollYProgress } = useScroll(); // Tracks viewport scroll.
    
    // We really want the progress of the PARENT element (the 500vh div).
    // Framer Motion's `useScroll` allows `target`.
    // Since we are decoupling, we might need to rely on the fact that this component 
    // is rendered inside the same Ref context or we pass the Ref.
    // For now, I'll fallback to assuming this component is placed insdie the Sticky View 
    // and we drive it via specific start/end percentages of the PARENT wrapper.
    
    // Wait, `useScroll` with `target` requires a Ref.
    // I'll update `ProductBottleScroll.tsx` to include `ProductTextOverlays` inside it
    // or pass the ref.
    // Actually, making `ProductTextOverlays` accept `scrollYProgress` is the cleanest React pattern.
    
    return null; // Logic moved to main file or see below.
}

// RE-WRITING Component to accept `progress` prop for cleaner architecture
export const ProductTextOverlaysWithProgress = ({ product, progress }: { product: Product, progress: any }) => {
    return (
        <>
            <HeroSection progress={progress} product={product} />
            <OverlaySection progress={progress} range={[0.25, 0.35, 0.45]} text={product.section2} align="right" />
            <OverlaySection progress={progress} range={[0.5, 0.6, 0.7]} text={product.section3} align="left" />
            <OverlaySection progress={progress} range={[0.75, 0.85, 0.95]} text={product.section4} align="center" />
        </>
    );
}

function HeroSection({ progress, product }: { progress: any, product: Product }) {
    // Hero fades OUT as we scroll down.
    // Visible at 0, starts fading at 0.15, gone by 0.25
    const opacity = useTransform(progress, [0, 0.15, 0.25], [1, 1, 0]);
    const y = useTransform(progress, [0, 0.25], [0, -100]);
    const scale = useTransform(progress, [0, 0.25], [1, 0.9]);

    return (
        <motion.div 
            style={{ opacity, y, scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-30 pointer-events-none px-4"
        >
             {/* Title Group */}
            <h1 className="text-6xl md:text-9xl font-bold tracking-tight mb-4 drop-shadow-xl">
                {product.section1.title.replace('.', '')}
            </h1>
            <p className="text-2xl md:text-4xl font-light mb-10 drop-shadow-lg tracking-wide">
                {product.section1.subtitle}
            </p>

            {/* Price & Features Cluster */}
            <div className="flex items-center gap-8 mt-4 bg-black/20 backdrop-blur-sm p-6 rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-5xl md:text-6xl font-bold drop-shadow-md text-white">
                    {product.price}
                </div>
                <div className="w-px h-16 bg-white/40"></div>
                <div className="text-left space-y-1">
                    {product.features.map((f, i) => (
                        <p key={i} className="text-sm md:text-base font-medium drop-shadow-md leading-tight text-white/90">
                            {f}
                        </p>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

function OverlaySection({ progress, range, text, align = "center" }: { progress: any, range: [number, number, number], text: { title: string, subtitle: string }, align?: "left" | "right" | "center" }) {
    const opacity = useTransform(progress, [range[0], range[1], range[2]], [0, 1, 0]);
    const y = useTransform(progress, [range[0], range[1], range[2]], [50, 0, -50]);
    const scale = useTransform(progress, [range[0], range[1], range[2]], [0.9, 1, 1.1]);

    const alignClass = {
        left: "items-start text-left pl-10 md:pl-20",
        right: "items-end text-right pr-10 md:pr-20",
        center: "items-center text-center px-4"
    }[align];

    return (
        <motion.div 
            style={{ opacity, y, scale }}
            className={`absolute inset-0 flex flex-col justify-center pointer-events-none z-30 ${alignClass}`}
        >
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
                {text.title}
            </h2>
            <p className="text-2xl md:text-4xl text-white/90 font-medium max-w-2xl drop-shadow-md">
                {text.subtitle}
            </p>
        </motion.div>
    );
};
