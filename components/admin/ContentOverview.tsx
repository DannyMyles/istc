'use client'

import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react'
import { useState, useEffect } from 'react'

// Define proper types for content stats
interface ContentStat {
  type: string;
  published: number;
  draft?: number;
  upcoming?: number;
  completed?: number;
  pending?: number;
  totalViews?: number;
  totalEnrollments?: number;
  totalParticipants?: number;
  avgRating?: number;
  growth: number;
  trend: 'up' | 'down';
}

const contentStats: ContentStat[] = [
  {
    type: 'Blog Posts',
    published: 24,
    draft: 3,
    totalViews: 5204,
    growth: 12,
    trend: 'up',
  },
  {
    type: 'Courses',
    published: 18,
    draft: 2,
    totalEnrollments: 1248,
    growth: 8,
    trend: 'up',
  },
  {
    type: 'Testimonials',
    published: 36,
    pending: 4,
    avgRating: 4.8,
    growth: 5,
    trend: 'up',
  },
]

export default function ContentOverview() {
  const [animatedStats, setAnimatedStats] = useState<number[]>(contentStats.map(() => 0))

  useEffect(() => {
    const timers = contentStats.map((stat, index) => {
      // Calculate target value with proper type safety
      const target = 
        stat.totalViews || 
        stat.totalEnrollments || 
        stat.totalParticipants || 
        (stat.avgRating ? stat.avgRating * 100 : 0)
      
      const increment = target / 20
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setAnimatedStats(prev => {
          const newStats = [...prev]
          newStats[index] = Math.floor(current)
          return newStats
        })
      }, 50)

      return timer
    })

    return () => timers.forEach(timer => clearInterval(timer))
  }, [])

  return (
    <div className="adventure-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Content Overview</h2>
          <p className="text-sm text-gray-600 mt-1">Performance across all content types</p>
        </div>
        <BarChart3 className="h-6 w-6 text-accent-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contentStats.map((stat, index) => (
          <div key={stat.type} className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.type}</p>
              <div className="flex items-baseline mt-2">
                <p className="text-2xl font-bold text-gray-900">
                  {stat.type === 'Testimonials' 
                    ? `${(animatedStats[index] / 100).toFixed(1)}`
                    : animatedStats[index].toLocaleString()
                  }
                </p>
                <span className={`ml-2 flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stat.growth)}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {stat.type === 'Blog Posts' && (
                <>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Published</span>
                    <span className="font-medium">{stat.published}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Draft</span>
                    <span className="font-medium">{stat.draft}</span>
                  </div>
                </>
              )}
              
              {stat.type === 'Courses' && (
                <>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Published</span>
                    <span className="font-medium">{stat.published}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Draft</span>
                    <span className="font-medium">{stat.draft}</span>
                  </div>
                </>
              )}
              
              {stat.type === 'Trainings' && (
                <>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Upcoming</span>
                    <span className="font-medium">{stat.upcoming}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Completed</span>
                    <span className="font-medium">{stat.completed}</span>
                  </div>
                </>
              )}
              
              {stat.type === 'Testimonials' && (
                <>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Published</span>
                    <span className="font-medium">{stat.published}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Pending</span>
                    <span className="font-medium">{stat.pending}</span>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2">
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    stat.trend === 'up' ? 'bg-accent-500' : 'bg-adventure-fire'
                  } rounded-full transition-all duration-1000`}
                  style={{ 
                    width: `${Math.min(100, (animatedStats[index] / (stat.type === 'Testimonials' ? 500 : 10000)) * 100)}%` 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-accent-50 rounded-lg">
          <p className="text-sm font-medium text-accent-700">Engagement Rate</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">84%</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-700">Avg. Time</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">4:32</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-700">New Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">48</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <p className="text-sm font-medium text-purple-700">Conversion</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12%</p>
        </div>
      </div>
    </div>
  )
}