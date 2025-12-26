'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, CreditCard, CheckCircle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';

interface TrainingSession {
  id: string;
  courseTitle: string;
  courseCategory: string;
  date: string;
  time: string;
  duration: string;
  seats: number;
  availableSeats: number;
  location: string;
  price: number;
  instructor: string;
  level: string;
  isFeatured: boolean;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const trainingSessions: TrainingSession[] = [
    {
      id: '1',
      courseTitle: 'Occupational Health & Safety Level 1',
      courseCategory: 'Health & Safety',
      date: '2024-03-15',
      time: '09:00',
      duration: '5 Days',
      seats: 20,
      availableSeats: 8,
      location: 'ISTC Main Campus, Westlands',
      price: 25000,
      instructor: 'Dr. Sarah Johnson',
      level: 'Beginner',
      isFeatured: true
    },
    {
      id: '2',
      courseTitle: 'First Aid & CPR Certification',
      courseCategory: 'First Aid',
      date: '2024-03-18',
      time: '08:30',
      duration: '2 Days',
      seats: 25,
      availableSeats: 15,
      location: 'ISTC Main Campus, Westlands',
      price: 15000,
      instructor: 'Michael Chen',
      level: 'Beginner',
      isFeatured: false
    },
    {
      id: '3',
      courseTitle: 'Fire Safety & Evacuation Training',
      courseCategory: 'Fire Safety',
      date: '2024-03-20',
      time: '09:00',
      duration: '3 Days',
      seats: 15,
      availableSeats: 3,
      location: 'ISTC Fire Training Center',
      price: 22000,
      instructor: 'Robert Kimani',
      level: 'Intermediate',
      isFeatured: true
    },
    {
      id: '4',
      courseTitle: 'Construction Site Safety',
      courseCategory: 'Construction',
      date: '2024-03-25',
      time: '08:00',
      duration: '4 Days',
      seats: 20,
      availableSeats: 12,
      location: 'ISTC Construction Yard',
      price: 28000,
      instructor: 'James Omondi',
      level: 'Intermediate',
      isFeatured: false
    },
    {
      id: '5',
      courseTitle: 'Environmental Safety Management',
      courseCategory: 'Environmental',
      date: '2024-03-28',
      time: '09:30',
      duration: '3 Days',
      seats: 20,
      availableSeats: 18,
      location: 'ISTC Main Campus, Westlands',
      price: 24000,
      instructor: 'Grace Akinyi',
      level: 'Intermediate',
      isFeatured: false
    },
    {
      id: '6',
      courseTitle: 'Advanced Safety Management',
      courseCategory: 'Management',
      date: '2024-04-02',
      time: '09:00',
      duration: '5 Days',
      seats: 18,
      availableSeats: 5,
      location: 'ISTC Executive Center',
      price: 35000,
      instructor: 'Dr. Sarah Johnson',
      level: 'Advanced',
      isFeatured: true
    },
    {
      id: '7',
      courseTitle: 'Electrical Safety Training',
      courseCategory: 'Electrical',
      date: '2024-04-08',
      time: '08:30',
      duration: '2 Days',
      seats: 15,
      availableSeats: 10,
      location: 'ISTC Technical Center',
      price: 19000,
      instructor: 'Peter Mwiti',
      level: 'Intermediate',
      isFeatured: false
    },
    {
      id: '8',
      courseTitle: 'Chemical Safety & Handling',
      courseCategory: 'Chemical Safety',
      date: '2024-04-12',
      time: '09:00',
      duration: '3 Days',
      seats: 15,
      availableSeats: 7,
      location: 'ISTC Chemical Lab',
      price: 26000,
      instructor: 'Lucy Wanjiru',
      level: 'Advanced',
      isFeatured: false
    },
  ];

  const categories = ['All Categories', 'Health & Safety', 'First Aid', 'Fire Safety', 'Construction', 'Environmental', 'Management', 'Electrical', 'Chemical Safety'];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const filteredSessions = trainingSessions.filter(session => {
    const sessionDate = new Date(session.date);
    const matchesCategory = selectedCategory === 'all' || session.courseCategory === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || session.level === selectedLevel;
    const matchesMonth = sessionDate.getMonth() === selectedMonth;
    const matchesYear = sessionDate.getFullYear() === selectedYear;
    
    return matchesCategory && matchesLevel && matchesMonth && matchesYear;
  });

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const hasSessions = trainingSessions.some(session => session.date === dateStr);
      days.push({ day, dateStr, hasSessions });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const sessionsForSelectedDate = trainingSessions.filter(session => session.date === selectedSession);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Training Schedule & Booking
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                View available training dates, check seat availability, and book your safety training sessions.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white adventure-card text-center p-6">
                <div className="text-2xl font-bold text-accent-800 mb-2">
                  {trainingSessions.length}
                </div>
                <div className="text-gray-600">Upcoming Sessions</div>
              </div>
              <div className="bg-white adventure-card text-center p-6">
                <div className="text-2xl font-bold text-accent-800 mb-2">
                  {trainingSessions.filter(s => s.availableSeats > 0).length}
                </div>
                <div className="text-gray-600">Available Now</div>
              </div>
              <div className="bg-white adventure-card text-center p-6">
                <div className="text-2xl font-bold text-accent-800 mb-2">
                  {trainingSessions.filter(s => s.isFeatured).length}
                </div>
                <div className="text-gray-600">Featured Courses</div>
              </div>
              <div className="bg-white adventure-card text-center p-6">
                <div className="text-2xl font-bold text-accent-800 mb-2">
                  5
                </div>
                <div className="text-gray-600">Training Locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calendar Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white adventure-card sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <Filter size={20} className="text-accent-600" />
                    <h3 className="text-lg font-semibold">Filters</h3>
                  </div>

                  {/* Categories */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4">Course Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category === 'All Categories' ? 'all' : category)}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === (category === 'All Categories' ? 'all' : category)
                              ? 'bg-accent-100 text-accent-800 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Levels */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4">Skill Level</h4>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level === 'All Levels' ? 'all' : level.toLowerCase())}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedLevel === (level === 'All Levels' ? 'all' : level.toLowerCase())
                              ? 'bg-accent-100 text-accent-800 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Month Navigation */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4">Select Month</h4>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={handlePrevMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="text-lg font-semibold">
                        {months[selectedMonth]} {selectedYear}
                      </div>
                      <button
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {months.slice(0, 6).map((month, index) => (
                        <button
                          key={month}
                          onClick={() => setSelectedMonth(index)}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            selectedMonth === index
                              ? 'bg-accent-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {month.substring(0, 3)}
                        </button>
                      ))}
                      {months.slice(6, 12).map((month, index) => (
                        <button
                          key={month}
                          onClick={() => setSelectedMonth(index + 6)}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            selectedMonth === index + 6
                              ? 'bg-accent-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {month.substring(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <Link
                      href="/courses"
                      className="block text-center text-accent-600 hover:text-accent-800 font-medium"
                    >
                      View All Courses →
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-center btn-adventure-outline py-2"
                    >
                      Request Custom Date
                    </Link>
                  </div>
                </div>
              </div>

              {/* Calendar & Sessions */}
              <div className="lg:col-span-2">
                {/* Calendar View */}
                <div className="bg-white adventure-card mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Calendar View</h3>
                    <button
                      onClick={() => {
                        setSelectedMonth(new Date().getMonth());
                        setSelectedYear(new Date().getFullYear());
                      }}
                      className="text-sm text-accent-600 hover:text-accent-800 font-medium"
                    >
                      Go to Today
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((dayInfo, index) => {
                      if (!dayInfo) {
                        return <div key={`empty-${index}`} className="h-12"></div>;
                      }

                      const isToday = new Date().toDateString() === new Date(dayInfo.dateStr).toDateString();
                      const isSelected = selectedSession === dayInfo.dateStr;

                      return (
                        <button
                          key={dayInfo.dateStr}
                          onClick={() => setSelectedSession(dayInfo.dateStr)}
                          className={`h-12 rounded-lg flex flex-col items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-accent-600 text-white'
                              : isToday
                              ? 'bg-accent-100 text-accent-800'
                              : dayInfo.hasSessions
                              ? 'bg-accent-50 text-gray-900 hover:bg-accent-100'
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-sm font-medium">{dayInfo.day}</div>
                          {dayInfo.hasSessions && !isSelected && (
                            <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-1"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-accent-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Training Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-accent-100 rounded-full"></div>
                      <span className="text-sm text-gray-600">Today</span>
                    </div>
                  </div>
                </div>

                {/* Sessions for Selected Date */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {selectedSession ? `Sessions on ${formatDate(selectedSession)}` : 'Select a date to view sessions'}
                  </h3>

                  {selectedSession ? (
                    sessionsForSelectedDate.length > 0 ? (
                      <div className="space-y-6">
                        {sessionsForSelectedDate.map((session) => (
                          <div key={session.id} className="bg-white adventure-card hover:shadow-adventure-lg transition-all duration-300">
                            <div className="p-6">
                              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                {/* Course Info */}
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-semibold">
                                      {session.courseCategory}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                      session.level === 'Beginner' 
                                        ? 'bg-green-100 text-green-800'
                                        : session.level === 'Intermediate'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-purple-100 text-purple-800'
                                    }`}>
                                      {session.level}
                                    </span>
                                    {session.isFeatured && (
                                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                                        Featured
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                                    {session.courseTitle}
                                  </h4>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                      <Clock size={16} className="text-accent-600" />
                                      <div>
                                        <div className="font-medium text-gray-900">{session.time}</div>
                                        <div className="text-sm text-gray-500">{session.duration}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Users size={16} className="text-accent-600" />
                                      <div>
                                        <div className="font-medium text-gray-900">
                                          {session.availableSeats}/{session.seats}
                                        </div>
                                        <div className="text-sm text-gray-500">Seats</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin size={16} className="text-accent-600" />
                                      <div>
                                        <div className="font-medium text-gray-900">Location</div>
                                        <div className="text-sm text-gray-500">{session.location}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <CreditCard size={16} className="text-accent-600" />
                                      <div>
                                        <div className="font-medium text-gray-900">
                                          Ksh {session.price.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500">Per person</div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4">
                                    <div className="text-sm text-gray-600">
                                      <span className="font-medium">Instructor:</span> {session.instructor}
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="lg:w-48 space-y-3">
                                  {session.availableSeats > 0 ? (
                                    <>
                                      <button className="w-full btn-adventure">
                                        Book Now
                                      </button>
                                      <button className="w-full btn-adventure-outline">
                                        Add to Cart
                                      </button>
                                    </>
                                  ) : (
                                    <div className="text-center">
                                      <div className="text-red-600 font-semibold mb-2">Fully Booked</div>
                                      <button className="w-full btn-adventure-outline">
                                        Join Waitlist
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-2xl p-12 text-center">
                        <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          No sessions scheduled for this date
                        </h4>
                        <p className="text-gray-600 mb-6">
                          Try selecting a different date or contact us for custom scheduling.
                        </p>
                        <Link
                          href="/contact"
                          className="btn-adventure inline-flex items-center gap-2"
                        >
                          Request Custom Date
                        </Link>
                      </div>
                    )
                  ) : (
                    <div className="bg-gray-50 rounded-2xl p-12 text-center">
                      <Calendar size={48} className="text-accent-400 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Select a date from the calendar
                      </h4>
                      <p className="text-gray-600">
                        Click on any date with available training sessions to view details and book.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking CTA */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Need Help Choosing a Date?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our training coordinators can help you find the perfect schedule for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+254700364722" 
                className="bg-white text-accent-800 hover:bg-accent-50 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Call for Assistance
              </a>
              <Link 
                href="/contact" 
                className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Email Your Requirements
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Important Booking Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="text-green-500" size={24} />
                  <h4 className="font-semibold text-gray-900">Confirmation</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  You will receive email confirmation within 24 hours of booking.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="text-accent-500" size={24} />
                  <h4 className="font-semibold text-gray-900">Payment</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Secure online payment or invoice option for corporate bookings.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="text-blue-500" size={24} />
                  <h4 className="font-semibold text-gray-900">Group Discounts</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  10% discount for groups of 5+, 15% for groups of 10+.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}