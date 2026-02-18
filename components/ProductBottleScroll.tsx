"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/data/products";

interface ProductBottleScrollProps {
  product: Product;
}

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll progress for the entire container (500vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index (0 to 119)
  // Assuming 120 frames. Adjust based on data if needed.
  const frameCount = product.frameCount || 120;
  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Load images
  useEffect(() => {
    setIsLoading(true);
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const imgPrefix = product.imagePrefix || "";
    const imgExt = product.imageExtension || "webp"; // Default to webp as per prompt
    // Correction: Prompt data implementation plan said 1.webp to 120.webp.

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // Construct path: /images/mango/1.webp OR /images/mango/ezgif-frame-001.jpg
        let frameNum = i.toString();
        if (product.zeroPadding) {
             frameNum = i.toString().padStart(3, '0');
        }
        
        img.src = `${product.folderPath}/${imgPrefix}${frameNum}.${imgExt}`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
                setIsLoading(false);
            }
        };
        img.onerror = (e) => {
             console.error(`Failed to load image: ${img.src}`);
             // Continue loading anyway to avoid blocking
             loadedCount++;
              if (loadedCount === frameCount) {
                setIsLoading(false);
            }
        }
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [product, frameCount]);

  // Draw to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size (high DPI)
    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        if(parent) {
             canvas.width = parent.clientWidth * window.devicePixelRatio;
             canvas.height = parent.clientHeight * window.devicePixelRatio;
             canvas.style.width = `${parent.clientWidth}px`;
             canvas.style.height = `${parent.clientHeight}px`;
             ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const idx = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(currentIndex.get()))
      );
      const img = images[idx];
      
      if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

        // "Contain" fit logic
        const cw = canvas.width / window.devicePixelRatio;
        const ch = canvas.height / window.devicePixelRatio;
        
        // Prevent division by zero
        if (cw === 0 || ch === 0) return;

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cw / ch;
        
        let drawWidth, drawHeight;
        
        if (canvasRatio > imgRatio) {
            drawHeight = ch;
            drawWidth = img.naturalWidth * (ch / img.naturalHeight);
        } else {
            drawWidth = cw;
            drawHeight = img.naturalHeight * (cw / img.width);
        }
        
        const offsetX = (cw - drawWidth) / 2;
        const offsetY = (ch - drawHeight) / 2;

        // Final sanity check for finite numbers
        if (isFinite(offsetX) && isFinite(offsetY) && isFinite(drawWidth) && isFinite(drawHeight)) {
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
      
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animId);
    };
  }, [images, currentIndex, frameCount]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
        {/* Sticky Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Text Overlays */}
        <ProductTextOverlaysWithProgress product={product} progress={scrollYProgress} />

        {/* Canvas Layer */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full object-contain pointer-events-none" />
        
        {/* Loading State */}
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        )}
      </div>
    </div>
  );
}

// Import the specialized overlay component
import { ProductTextOverlaysWithProgress } from "./ProductTextOverlays";

