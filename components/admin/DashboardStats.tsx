'use client'

import { Users, BookOpen, Calendar, MessageSquare, TrendingUp, TrendingDown } from 'lucide-react'
import { useState, useEffect } from 'react'

const stats = [
  {
    name: 'Total Users',
    value: '1,248',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'bg-gradient-to-r from-accent-500 to-accent-600',
  },
  {
    name: 'Active Courses',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: BookOpen,
    color: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
  },
  {
    name: 'Upcoming Trainings',
    value: '8',
    change: '-2',
    trend: 'down',
    icon: Calendar,
    color: 'bg-gradient-to-r from-adventure-sky to-accent-400',
  },
  {
    name: 'Pending Reviews',
    value: '16',
    change: '+4',
    trend: 'up',
    icon: MessageSquare,
    color: 'bg-gradient-to-r from-adventure-fire to-red-500',
  },
]

export default function DashboardStats() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const target = parseInt(stat.value.replace(/,/g, ''))
      const increment = target / 30
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={stat.name} className="adventure-card hover:transform-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <div className="flex items-baseline mt-2">
                <p className="text-3xl font-bold text-gray-900">
                  {animatedStats[index].toLocaleString()}
                </p>
                <span className={`ml-2 flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`${stat.color} p-3 rounded-xl text-white shadow-adventure`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  stat.trend === 'up' ? 'bg-accent-500' : 'bg-adventure-fire'
                } rounded-full transition-all duration-1000`}
                style={{ width: `${Math.min(100, animatedStats[index] / 50 * 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}