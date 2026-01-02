'use client';

import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  avatarColor?: string;
}

const TestimonialCard = ({ 
  name, 
  role, 
  content, 
  rating, 
  image, 
  avatarColor = '#3B82F6' 
}: TestimonialCardProps) => {
  // Determine if image is initials or URL
  const isInitials = image && image.length <= 2;
  
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
        <span className="ml-2 text-sm text-gray-500">{rating}.0</span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ backgroundColor: avatarColor }}
        >
          {isInitials ? (
            <span>{image}</span>
          ) : (
            // If image is a URL, you would use an img tag
            <span className="text-sm">{name.charAt(0)}</span>
          )}
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