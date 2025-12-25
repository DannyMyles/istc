'use client';

import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const TestimonialCard = ({ name, role, content, rating, image }: TestimonialCardProps) => {
  return (
    <div className="adventure-card hover:shadow-adventure-lg transition-all duration-300">
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote className="text-accent-300" size={32} />
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-6 leading-relaxed italic">
        "{content}"
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
          <span className="font-semibold text-accent-800">{image}</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;