'use client';

import { Clock, Users, Award, Calendar, Star } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  participants: string;
  level: string;
  nextStart: string;
  rating: number;
  price: number;
  category: string;
  href: string;
  featured?: boolean;
}

const CourseCard = ({
  title,
  description,
  duration,
  participants,
  level,
  nextStart,
  rating,
  price,
  category,
  href,
  featured = false
}: CourseCardProps) => {
  return (
    <div className={`adventure-card hover:shadow-adventure-lg transition-all duration-300 ${featured ? 'border-2 border-accent' : ''}`}>
      {/* Category Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-accent-100 text-accent-800 text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
        {featured && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Course Info */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-800 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
        {description}
      </p>

      {/* Course Details */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-accent-600" />
          <span className="text-sm text-gray-600">{duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} className="text-accent-600" />
          <span className="text-sm text-gray-600">{participants}</span>
        </div>
        <div className="flex items-center gap-2">
          <Award size={16} className="text-accent-600" />
          <span className="text-sm text-gray-600">{level}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-accent-600" />
          <span className="text-sm text-gray-600">{nextStart}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">({rating}.0)</span>
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <span className="text-2xl font-bold text-accent-800">Ksh {price.toLocaleString()}</span>
          <span className="text-gray-500 text-sm ml-2">/person</span>
        </div>
        <Link
          href={href}
          className="btn-adventure px-6 py-2 text-sm"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;