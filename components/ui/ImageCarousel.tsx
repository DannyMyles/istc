"use client";

import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import type { Settings } from "react-slick";

function ImageCarousel() {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipe: true,
    touchMove: true,
    lazyLoad: "ondemand",
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const slides = [
    {
      id: 1,
      title: "First Aid Training",
      image: "/images/clients/client_1.jpeg",
    },
    {
      id: 2,
      title: "Fire Safety Course",
      image: "/images/clients/client_2.jpeg",
    },
    {
      id: 3,
      title: "Workplace Safety",
      image: "/images/clients/client_3.jpeg",
    },
    {
      id: 4,
      title: "Hazardous Materials",
      image: "/images/clients/client_4.jpeg",
    },
    {
      id: 5,
      title: "Emergency Response",
      image: "/images/clients/client_5.jpeg",
    },
    { id: 6, title: "OSHA Compliance", image: "/images/clients/client_6.jpeg" },
    {
      id: 7,
      title: "CPR Certification",
      image: "/images/clients/client_7.jpeg",
    },
    { id: 8, title: "Fall Protection", image: "/images/clients/client_8.jpeg" },
    {
      id: 9,
      title: "Electrical Safety",
      image: "/images/clients/client_9.jpeg",
    },
    {
      id: 10,
      title: "Confined Space Entry",
      image: "/images/clients/client_10.jpeg",
    },
    {
      id: 11,
      title: "Scaffolding Safety",
      image: "/images/clients/client_11.jpeg",
    },
    {
      id: 12,
      title: "Forklift Operation",
      image: "/images/clients/client_12.jpeg",
    },
    {
      id: 13,
      title: "Heavy Equipment Safety",
      image: "/images/clients/client_13.jpeg",
    },
    {
      id: 14,
      title: "Hazard Communication",
      image: "/images/clients/client_14.jpeg",
    },
    {
      id: 15,
      title: "Lockout/Tagout",
      image: "/images/clients/client_15.jpeg",
    },
    {
      id: 16,
      title: "Respiratory Protection",
      image: "/images/clients/client_16.jpeg",
    },
    {
      id: 17,
      title: "Heat Stress Prevention",
      image: "/images/clients/client_17.jpeg",
    },
    {
      id: 18,
      title: "Cold Stress Prevention",
      image: "/images/clients/client_18.jpeg",
    },
    {
      id: 19,
      title: "Noise Exposure Control",
      image: "/images/clients/client_19.jpeg",
    },
    {
      id: 20,
      title: "Ergonomics Training",
      image: "/images/clients/client_20.jpeg",
    },
    {
      id: 21,
      title: "Bloodborne Pathogens",
      image: "/images/clients/client_21.jpeg",
    },
    {
      id: 22,
      title: "Defensive Driving",
      image: "/images/clients/client_22.jpeg",
    },
    {
      id: 23,
      title: "Industrial Hygiene",
      image: "/images/clients/client_23.jpeg",
    },
    {
      id: 24,
      title: "Machine Guarding",
      image: "/images/clients/client_24.jpeg",
    },
    {
      id: 25,
      title: "Welding Safety",
      image: "/images/clients/client_25.jpeg",
    },
    { id: 26, title: "Crane Safety", image: "/images/clients/client_26.jpeg" },
    {
      id: 27,
      title: "Excavation Safety",
      image: "/images/clients/client_27.jpeg",
    },
    {
      id: 28,
      title: "Asbestos Awareness",
      image: "/images/clients/client_28.jpeg",
    },
    { id: 29, title: "Lead Safety", image: "/images/clients/client_29.jpeg" },
    { id: 30, title: "Silica Safety", image: "/images/clients/client_30.jpeg" },
    {
      id: 31,
      title: "Trenching Safety",
      image: "/images/clients/client_31.jpeg",
    },
    {
      id: 32,
      title: "Radiation Safety",
      image: "/images/clients/client_32.jpeg",
    },
    {
      id: 33,
      title: "Chemical Safety",
      image: "/images/clients/client_33.jpeg",
    },
    {
      id: 34,
      title: "Laboratory Safety",
      image: "/images/clients/client_34.jpeg",
    },
    {
      id: 36,
      title: "Construction Safety",
      image: "/images/clients/client_36.jpeg",
    },
    {
      id: 37,
      title: "Maritime Safety",
      image: "/images/clients/client_37.jpeg",
    },
  ];

  return (
    <div className="carousel-container max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our <span className="text-[#039AC5]">Portfolio </span>
      </h2>

      <style jsx global>{`
        /* Fix for slick carousel height issues */
        .carousel-container .slick-slide {
          height: auto !important;
        }

        .carousel-container .slick-slide > div {
          padding: 0 15px;
          height: 100%;
        }

        .carousel-container .slick-list {
          margin: 0 -15px;
          padding: 10px 0 30px 0; /* Add padding for dots */
        }

        /* Arrow styling */
        .carousel-container .slick-prev,
        .carousel-container .slick-next {
          width: 40px;
          height: 40px;
          z-index: 10;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          display: flex !important;
          align-items: center;
          justify-content: center;
        }

        .carousel-container .slick-prev {
          left: -20px;
        }

        .carousel-container .slick-next {
          right: -20px;
        }

        .carousel-container .slick-prev:before,
        .carousel-container .slick-next:before {
          color: #4b5563;
          font-size: 20px;
          opacity: 0.8;
        }

        .carousel-container .slick-prev:hover,
        .carousel-container .slick-next:hover {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .carousel-container .slick-prev:hover:before,
        .carousel-container .slick-next:hover:before {
          opacity: 1;
          color: #3b82f6;
        }

        /* Dots styling */
        .carousel-container .slick-dots {
          bottom: 0;
        }

        .carousel-container .slick-dots li {
          margin: 0 4px;
        }

        .carousel-container .slick-dots li button:before {
          font-size: 10px;
          color: #cbd5e1;
          opacity: 0.8;
        }

        .carousel-container .slick-dots li.slick-active button:before {
          color: #3b82f6;
          opacity: 1;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .carousel-container {
            padding-left: 8px;
            padding-right: 8px;
          }

          .carousel-container .slick-list {
            margin: 0 -8px;
            padding: 5px 0 20px 0;
          }

          .carousel-container .slick-slide > div {
            padding: 0 8px;
          }

          /* Hide arrows on mobile */
          .carousel-container .slick-prev,
          .carousel-container .slick-next {
            display: none !important;
          }

          /* Hide dots on mobile */
          .carousel-container .slick-dots {
            display: none !important;
          }
        }

        /* Tablet styles */
        @media (max-width: 1024px) and (min-width: 769px) {
          .carousel-container .slick-prev {
            left: -15px;
          }

          .carousel-container .slick-next {
            right: -15px;
          }
        }
      `}</style>

      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="h-full">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-blue-100">
              {/* Image container with fixed aspect ratio */}
              <div className="relative w-full pt-[75%] md:pt-[70%] lg:pt-[65%]">
                {/* Fallback placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-600 text-xs font-medium block">
                      {slide.title}
                    </span>
                  </div>
                </div>

                {/* Optimized Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 48px), calc(33vw - 48px)"
                  className="object-contain p-4 hover:scale-[1.02] transition-transform duration-300"
                  style={{ backgroundColor: "#f9fafb" }}
                  priority={slide.id <= 3}
                  quality={85}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Mobile indicator (optional) */}
      <div className="block md:hidden text-center mt-4">
        <p className="text-sm text-gray-500">Swipe to navigate ← →</p>
      </div>
    </div>
  );
}

export default ImageCarousel;
