"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Zap,
  Shield,
  Award,
} from "lucide-react";

// Slide data with client info
const slides = [
  {
    id: 1,
    title: "First Aid Training",
    image: "/images/clients/client_1.jpg",
    category: "Emergency",
  },
  {
    id: 2,
    title: "Fire Safety Course",
    image: "/images/clients/client_2.jpg",
    category: "Fire Safety",
  },
  {
    id: 3,
    title: "Workplace Safety",
    image: "/images/clients/client_3.jpg",
    category: "Compliance",
  },
  {
    id: 4,
    title: "Hazardous Materials",
    image: "/images/clients/client_4.jpg",
    category: "HazMat",
  },
  {
    id: 5,
    title: "Emergency Response",
    image: "/images/clients/client_5.jpg",
    category: "Emergency",
  },
  {
    id: 6,
    title: "OSHA Compliance",
    image: "/images/clients/client_6.jpg",
    category: "Compliance",
  },
  {
    id: 7,
    title: "CPR Certification",
    image: "/images/clients/client_7.jpg",
    category: "Medical",
  },
  {
    id: 8,
    title: "Fall Protection",
    image: "/images/clients/client_8.jpg",
    category: "Construction",
  },
  {
    id: 9,
    title: "Electrical Safety",
    image: "/images/clients/client_9.jpg",
    category: "Electrical",
  },
  {
    id: 10,
    title: "Confined Space Entry",
    image: "/images/clients/client_10.jpg",
    category: "Industrial",
  },
  {
    id: 11,
    title: "Scaffolding Safety",
    image: "/images/clients/client_11.jpg",
    category: "Construction",
  },
  {
    id: 12,
    title: "Forklift Operation",
    image: "/images/clients/client_12.jpg",
    category: "Equipment",
  },
  {
    id: 13,
    title: "Ladder Safety",
    image: "/images/clients/client_13.jpg",
    category: "Construction",
  },
  {
    id: 14,
    title: "Respiratory Protection",
    image: "/images/clients/client_14.jpg",
    category: "Industrial",
  },
  {
    id: 15,
    title: "Machine Guarding",
    image: "/images/clients/client_15.jpg",
    category: "Manufacturing",
  },
  {
    id: 16,
    title: "Bloodborne Pathogens",
    image: "/images/clients/client_16.jpg",
    category: "Medical",
  },
  {
    id: 17,
    title: "Hazard Communication",
    image: "/images/clients/client_17.jpg",
    category: "Compliance",
  },
  {
    id: 18,
    title: "Personal Protective Equipment",
    image: "/images/clients/client_18.jpg",
    category: "Safety Gear",
  },
  {
    id: 19,
    title: "Ergonomics Training",
    image: "/images/clients/client_19.jpg",
    category: "Workplace Safety",
  },
  {
    id: 20,
    title: "Lockout/Tagout",
    image: "/images/clients/client_20.jpg",
    category: "Industrial",
  },
  {
    id: 21,
    title: "Trenching and Excavation",
    image: "/images/clients/client_21.jpg",
    category: "Construction",
  },
  {
    id: 22,
    title: "Noise Exposure",
    image: "/images/clients/client_22.jpg",
    category: "Industrial",
  },
  {
    id: 23,
    title: "Bloodborne Pathogens",
    image: "/images/clients/client_23.jpg",
    category: "Medical",
  },  
];

// Category icon mapping
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Emergency":
    case "Medical":
      return <Zap className="w-3 h-3" />;
    case "Fire Safety":
      return <Shield className="w-3 h-3" />;
    default:
      return <Award className="w-3 h-3" />;
  }
};

// Single slide component
function CarouselSlide({
  slide,
  isActive,
  index,
  isMobile,
}: {
  slide: (typeof slides)[0];
  isActive: boolean;
  index: number;
  isMobile: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.85,
        x: 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Glassmorphism Card - Reduced max-width */}
      <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/50 shadow-xl aspect-[4/3] w-full max-w-[280px] mx-auto">
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-[#039AC5]/0 via-[#039AC5]/50 to-[#039AC5]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-full h-full rounded-xl bg-transparent" />
        </div>

        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#039AC5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {/* Loading shimmer */}
          {!imageLoaded && !imageError && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Fallback placeholder */}
          {imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-4"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#039AC5]/20 to-[#02749C]/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#039AC5]" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Optimized Image with smaller sizes */}
          {!imageError && (
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 75vw, (max-width: 1024px) 40vw, (max-width: 1280px) 28vw, 20vw"
                className="object-fit-cover rounded-md"
                onError={() => setImageError(true)}
                onLoad={() => setImageLoaded(true)}
                priority={index < 4}
                quality={80} // Reduced quality for smaller images
              />
            </motion.div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
        </div>

        {/* Hover shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          style={{ pointerEvents: "none" }}
        />
      </div>
    </motion.div>
  );
}

// Navigation button component
function NavButton({
  onClick,
  direction,
  disabled,
}: {
  onClick: () => void;
  direction: "prev" | "next";
  disabled: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="absolute top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: direction === "prev" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      {direction === "prev" ? (
        <ChevronLeft className="w-4 h-4 text-[#039AC5]" />
      ) : (
        <ChevronRight className="w-4 h-4 text-[#039AC5]" />
      )}
    </motion.button>
  );
}

// Main carousel component
function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  // Detect mobile and window width
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setWindowWidth(width);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 3500); // Slightly faster auto-play

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setIsAutoPlaying(true);
  };

  // Calculate visible slides based on screen size - More on large screens
  const getVisibleSlides = () => {
    if (isMobile) return 1;
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 3;
    if (windowWidth < 1280) return 4;
    if (windowWidth < 1536) return 5;
    return 6; // Even more on extra large screens
  };

  // Get maximum index based on visible slides
  const getMaxIndex = () => {
    const max = slides.length - getVisibleSlides();
    return max > 0 ? max : 0;
  };

  // Generate visible slides
  const getVisibleSlidesArray = () => {
    const visibleCount = getVisibleSlides();
    let startIndex = currentIndex;

    // Adjust start index if we're near the end
    if (currentIndex > slides.length - visibleCount) {
      startIndex = slides.length - visibleCount;
    }

    return slides.slice(startIndex, startIndex + visibleCount);
  };

  return (
    <section className="relative py-12 md:py-16 px-4 overflow-hidden">
      {/* Background decoration - Lighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#039AC5]/2 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#039AC5]/5 to-transparent blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header - Smaller */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#039AC5]/10 text-[#039AC5] text-xs font-semibold mb-3"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-3 h-3" />
            Our Portfolio
          </motion.span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Trusted by <span className="text-[#039AC5]">Industry Leaders</span>
          </h2>
          <p className="mt-3 text-gray-100 text-sm md:text-base max-w-2xl mx-auto">
            Delivering world-class safety training and compliance solutions
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation buttons - Closer to slides */}
          {!isMobile && windowWidth >= 768 && (
            <>
              <NavButton
                onClick={goToPrev}
                direction="prev"
                disabled={currentIndex === 0}
                // style={{ left: '0.5rem' }}
              />
              <NavButton
                onClick={goToNext}
                direction="next"
                disabled={currentIndex >= getMaxIndex()}
                // style={{ right: '0.5rem' }}
              />
            </>
          )}

          {/* Slides container with tighter spacing */}
          <div
            className="overflow-hidden px-1"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-center gap-3 md:gap-4 transition-all duration-300">
              <AnimatePresence mode="wait">
                {getVisibleSlidesArray().map((slide, idx) => {
                  const visibleSlides = getVisibleSlides();
                  const slideWidth = 100 / visibleSlides;
                  const isActive = idx === Math.floor(visibleSlides / 2);

                  return (
                    <div
                      key={slide.id}
                      className="flex-shrink-0"
                      style={{ width: `${slideWidth}%` }}
                    >
                      <div className="px-1.5">
                        <CarouselSlide
                          slide={slide}
                          isActive={isActive}
                          index={currentIndex + idx}
                          isMobile={isMobile}
                        />
                      </div>
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile swipe indicator */}
          {isMobile && (
            <motion.div
              className="flex items-center justify-center gap-1.5 mt-4 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
              <span className="text-xs">Swipe to navigate</span>
              <ChevronDown className="w-3 h-3 rotate-90" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ImageCarousel;
