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
    image: "/images/clients/client_1.jpeg",
    category: "Emergency",
  },
  {
    id: 2,
    title: "Fire Safety Course",
    image: "/images/clients/client_2.jpeg",
    category: "Fire Safety",
  },
  {
    id: 3,
    title: "Workplace Safety",
    image: "/images/clients/client_3.jpeg",
    category: "Compliance",
  },
  {
    id: 4,
    title: "Hazardous Materials",
    image: "/images/clients/client_4.jpeg",
    category: "HazMat",
  },
  {
    id: 5,
    title: "Emergency Response",
    image: "/images/clients/client_5.jpeg",
    category: "Emergency",
  },
  { id: 6, title: "OSHA Compliance", image: "/images/clients/client_6.jpeg", category: "Compliance" },
  {
    id: 7,
    title: "CPR Certification",
    image: "/images/clients/client_7.jpeg",
    category: "Medical",
  },
  { id: 8, title: "Fall Protection", image: "/images/clients/client_8.jpeg", category: "Construction" },
  {
    id: 9,
    title: "Electrical Safety",
    image: "/images/clients/client_9.jpeg",
    category: "Electrical",
  },
  {
    id: 10,
    title: "Confined Space Entry",
    image: "/images/clients/client_10.jpeg",
    category: "Industrial",
  },
  {
    id: 11,
    title: "Scaffolding Safety",
    image: "/images/clients/client_11.jpeg",
    category: "Construction",
  },
  {
    id: 12,
    title: "Forklift Operation",
    image: "/images/clients/client_12.jpeg",
    category: "Equipment",
  },
  {
    id: 13,
    title: "Heavy Equipment Safety",
    image: "/images/clients/client_13.jpeg",
    category: "Equipment",
  },
  {
    id: 14,
    title: "Hazard Communication",
    image: "/images/clients/client_14.jpeg",
    category: "Compliance",
  },
  {
    id: 15,
    title: "Lockout/Tagout",
    image: "/images/clients/client_15.jpeg",
    category: "Procedures",
  },
  {
    id: 16,
    title: "Respiratory Protection",
    image: "/images/clients/client_16.jpeg",
    category: "Health",
  },
  {
    id: 17,
    title: "Heat Stress Prevention",
    image: "/images/clients/client_17.jpeg",
    category: "Health",
  },
  {
    id: 18,
    title: "Cold Stress Prevention",
    image: "/images/clients/client_18.jpeg",
    category: "Health",
  },
  {
    id: 19,
    title: "Noise Exposure Control",
    image: "/images/clients/client_19.jpeg",
    category: "Industrial",
  },
  {
    id: 20,
    title: "Ergonomics Training",
    image: "/images/clients/client_20.jpeg",
    category: "Health",
  },
  {
    id: 21,
    title: "Bloodborne Pathogens",
    image: "/images/clients/client_21.jpeg",
    category: "Medical",
  },
  {
    id: 22,
    title: "Defensive Driving",
    image: "/images/clients/client_22.jpeg",
    category: "Transportation",
  },
  {
    id: 23,
    title: "Industrial Hygiene",
    image: "/images/clients/client_23.jpeg",
    category: "Health",
  },
  {
    id: 24,
    title: "Machine Guarding",
    image: "/images/clients/client_24.jpeg",
    category: "Equipment",
  },
  {
    id: 25,
    title: "Welding Safety",
    image: "/images/clients/client_25.jpeg",
    category: "Industrial",
  },
  { id: 26, title: "Crane Safety", image: "/images/clients/client_26.jpeg", category: "Equipment" },
  {
    id: 27,
    title: "Excavation Safety",
    image: "/images/clients/client_27.jpeg",
    category: "Construction",
  },
  {
    id: 28,
    title: "Asbestos Awareness",
    image: "/images/clients/client_28.jpeg",
    category: "HazMat",
  },
  { id: 29, title: "Lead Safety", image: "/images/clients/client_29.jpeg", category: "HazMat" },
  { id: 30, title: "Silica Safety", image: "/images/clients/client_30.jpeg", category: "HazMat" },
  {
    id: 31,
    title: "Trenching Safety",
    image: "/images/clients/client_31.jpeg",
    category: "Construction",
  },
  {
    id: 32,
    title: "Radiation Safety",
    image: "/images/clients/client_32.jpeg",
    category: "HazMat",
  },
  {
    id: 33,
    title: "Chemical Safety",
    image: "/images/clients/client_33.jpeg",
    category: "HazMat",
  },
  {
    id: 34,
    title: "Laboratory Safety",
    image: "/images/clients/client_34.jpeg",
    category: "Industrial",
  },
  {
    id: 36,
    title: "Construction Safety",
    image: "/images/clients/client_36.jpeg",
    category: "Construction",
  },
  {
    id: 37,
    title: "Maritime Safety",
    image: "/images/clients/client_37.jpeg",
    category: "Specialized",
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
}: {
  slide: typeof slides[0];
  isActive: boolean;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="relative w-full"
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
      {/* Glassmorphism Card */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/50 shadow-2xl aspect-[4/3]">
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-[#039AC5]/0 via-[#039AC5]/50 to-[#039AC5]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-full h-full rounded-2xl bg-transparent" />
        </div>

        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#039AC5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {/* Loading shimmer */}
          {!imageLoaded && !imageError && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#039AC5]/20 to-[#02749C]/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#039AC5]" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Optimized Image */}
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
                sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 48px), calc(33vw - 48px)"
                className="object-cover"
                onError={() => setImageError(true)}
                onLoad={() => setImageLoaded(true)}
                priority={index < 4}
                quality={85}
              />
            </motion.div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

          {/* Category badge */}
          <motion.div
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#039AC5]">{getCategoryIcon(slide.category)}</span>
            <span className="text-xs font-semibold text-gray-800">{slide.category}</span>
          </motion.div>


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
      className="absolute top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: direction === "prev" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      {direction === "prev" ? (
        <ChevronLeft className="w-5 h-5 text-[#039AC5]" />
      ) : (
        <ChevronRight className="w-5 h-5 text-[#039AC5]" />
      )}
    </motion.button>
  );
}

// Progress indicator dots
function ProgressDots({
  total,
  current,
  onClick,
}: {
  total: number;
  current: number;
  onClick: (index: number) => void;
}) {
  const visiblePages = 5;
  const startPage = Math.max(0, current - Math.floor(visiblePages / 2));
  const endPage = Math.min(total, startPage + visiblePages);
  const visibleDots = slides.slice(startPage, endPage);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap px-4">
      {/* Previous pages indicator */}
      {startPage > 0 && (
        <span className="text-gray-400 text-xs">.{slides.length - startPage}</span>
      )}

      {visibleDots.map((_, idx) => {
        const actualIndex = startPage + idx;
        const isActive = actualIndex === current;

        return (
          <motion.button
            key={actualIndex}
            onClick={() => onClick(actualIndex)}
            className="relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${actualIndex + 1}`}
          >
            {/* Active indicator ring */}
            {isActive && (
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#039AC5]/30 to-[#4AC1E8]/30"
                layoutId="activeDot"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Dot */}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-[#039AC5] shadow-lg shadow-[#039AC5]/50"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          </motion.button>
        );
      })}

      {/* Next pages indicator */}
      {endPage < slides.length && (
        <span className="text-gray-400 text-xs">{slides.length - endPage}.</span>
      )}
    </div>
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
    }, 4000);

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

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

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

  // Calculate visible slides
  const getVisibleSlides = () => {
    if (isMobile) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#039AC5]/3 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#039AC5]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#039AC5]/10 text-[#039AC5] text-sm font-semibold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-4 h-4" />
            Our Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Trusted by <span className="text-[#039AC5]">Industry Leaders</span>
          </h2>
          <p className="mt-4 text-gray-100 max-w-2xl mx-auto">
            Delivering world-class safety training and compliance solutions to businesses worldwide
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation buttons */}
          {!isMobile && (
            <>
              <NavButton
                onClick={goToPrev}
                direction="prev"
                disabled={currentIndex === 0}
              />
              <NavButton
                onClick={goToNext}
                direction="next"
                disabled={currentIndex >= slides.length - getVisibleSlides()}
              />
            </>
          )}

          {/* Slides container */}
          <div
            className="overflow-hidden px-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-center gap-4">
              <AnimatePresence mode="wait">
                {slides.slice(currentIndex, currentIndex + getVisibleSlides()).map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`${
                      isMobile ? "w-full" : "w-full"
                    } ${getVisibleSlides() === 2 ? "w-1/2" : ""} ${
                      getVisibleSlides() === 3 ? "w-1/3" : ""
                    } px-2`}
                    style={{ maxWidth: isMobile ? "100%" : `${100 / getVisibleSlides()}%` }}
                  >
                    <CarouselSlide
                      slide={slide}
                      isActive={idx === Math.floor(getVisibleSlides() / 2)}
                      index={currentIndex + idx}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress dots */}
          <ProgressDots
            total={slides.length}
            current={currentIndex}
            onClick={goToSlide}
          />

          {/* Mobile swipe indicator */}
          {isMobile && (
            <motion.div
              className="flex items-center justify-center gap-2 mt-4 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              <span className="text-xs">Swipe to navigate</span>
              <ChevronDown className="w-4 h-4 rotate-90" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ImageCarousel;

