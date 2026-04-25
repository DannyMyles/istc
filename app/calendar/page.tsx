'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, CreditCard, ChevronLeft, ChevronRight, Filter, Download, Mail, Phone, CheckCircle, BookOpen, DivideIcon } from 'lucide-react';
import Link from 'next/link';
import { Training, TrainingResponse, trainingService } from '../api_services/trainingService';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TrainingCalendarPDF, generatePDFFileName } from '@/utils/trainingPdfGenerator';
import Spinner, { LoadingSpinner } from '@/components/ui/Spinner';

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
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [expandedTraining, setExpandedTraining] = useState<string | number | null>(null);
  const [showAllCourses, setShowAllCourses] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Fetch trainings from API
  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: TrainingResponse = await trainingService.getAllTrainings();
      setTrainings(response.trainings);
    } catch (err) {
      console.error('Error fetching trainings:', err);
      setError('Failed to load training calendar. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Extract categories from trainings
  const categories = ['All Courses', ...trainingService.getUniqueCategories(trainings)];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Filter trainings based on selected filters
  const filteredTrainings = trainings.filter(training => {
    // Filter by category
    if (selectedCategory !== 'all' && training.category !== selectedCategory) {
      return false;
    }
    
    // If selectedMonth is null, show all courses regardless of month
    if (selectedMonth === null) {
      return true;
    }
    
    // Filter by month - check if any session is in the selected month
    if (training.sessions) {
      const hasSessionInMonth = training.sessions.some(session => {
        const sessionDate = new Date(session.startDate);
        return sessionDate.getMonth() === selectedMonth && 
               sessionDate.getFullYear() === selectedYear;
      });
      return hasSessionInMonth;
    }
    
    return false;
  });

  // Format month and year for display
  const formatMonthYear = () => {
    if (selectedMonth === null) {
      return "All Months";
    }
    return `${months[selectedMonth]} ${selectedYear}`;
  };

  // Get sessions for specific month (or all sessions if selectedMonth is null)
  const getSessionsForDisplay = (training: Training) => {
    if (!training.sessions) return [];
    
    if (selectedMonth === null) {
      // Show all upcoming sessions when showing all courses
      const now = new Date();
      return training.sessions.filter(session => {
        const sessionDate = new Date(session.startDate);
        return sessionDate >= now; // Only show future sessions
      }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }
    
    // Show sessions for specific month
    return training.sessions.filter(session => {
      const sessionDate = new Date(session.startDate);
      return sessionDate.getMonth() === selectedMonth && 
             sessionDate.getFullYear() === selectedYear;
    });
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    if (selectedMonth === null) {
      // If showing all, set to current month
      const currentMonth = new Date().getMonth();
      setSelectedMonth(currentMonth);
      setShowAllCourses(false);
    } else if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev! - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === null) {
      // If showing all, set to current month
      const currentMonth = new Date().getMonth();
      setSelectedMonth(currentMonth);
      setShowAllCourses(false);
    } else if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev! + 1);
    }
  };

  // Toggle training expansion
  const toggleTrainingExpansion = (trainingId: string | number) => {
    setExpandedTraining(expandedTraining === trainingId ? null : trainingId);
  };

  // Show all courses
  const handleShowAllCourses = () => {
    setSelectedMonth(null);
    setShowAllCourses(true);
  };

  // Show current month
  const handleShowCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    setShowAllCourses(false);
  };

  // Handle PDF generation start
  const handlePDFGenerationStart = () => {
    setIsGeneratingPDF(true);
  };

  // Handle PDF generation complete
  const handlePDFGenerationComplete = () => {
    setIsGeneratingPDF(false);
  };

  // Helper function to parse duration JSON string
  const parseDuration = (duration: any): string => {
    if (!duration) return 'N/A'
    if (typeof duration === 'string') {
      try {
        const parsed = JSON.parse(duration)
        return parsed.display || 'N/A'
      } catch {
        return duration
      }
    }
    return duration.display || 'N/A'
  }

  // Helper function to parse cost JSON string
  const parseCost = (cost: any): string => {
    if (!cost) return 'N/A'
    let parsed: any
    if (typeof cost === 'string') {
      try {
        parsed = JSON.parse(cost)
      } catch {
        return cost
      }
    } else {
      parsed = cost
    }
    const amount = parsed.amount
    const currency = parsed.currency || 'KSH'
    if (typeof amount === 'number') {
      return `${amount.toLocaleString()} ${currency}`
    }
    return parsed.display || 'N/A'
  }

  // Helper function to parse modeOfStudy JSON string
  const parseModeOfStudy = (modeOfStudy: any): string => {
    if (!modeOfStudy) return ''
    if (typeof modeOfStudy === 'string') {
      try {
        const parsed = JSON.parse(modeOfStudy)
        if (Array.isArray(parsed)) {
          return parsed.map(m => m.charAt(0).toUpperCase() + m.slice(1).replace('-', ' ')).join(', ')
        }
        return String(parsed)
      } catch {
        return modeOfStudy
      }
    }
    if (Array.isArray(modeOfStudy)) {
      return modeOfStudy.map(m => m.charAt(0).toUpperCase() + m.slice(1).replace('-', ' ')).join(', ')
    }
    return String(modeOfStudy)
  }

  // Generate filename for PDF
  const getPDFFileName = () => {
    return generatePDFFileName(selectedMonth, selectedYear, selectedCategory, categories);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="pt-20">
        <LoadingSpinner 
          text="Loading Training Calendar..." 
          size="lg"
          className="min-h-[60vh]"
        />
      </div>
    );
  }

  // Render error state
  if (error && trainings.length === 0) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Oops!</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchTrainings}
              className="bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative py-28 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/13.jpg')",
            backgroundColor: '#039AC5'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/images/patterns/network-pattern.svg')]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent-500/10 backdrop-blur-sm border border-accent-500/20 text-white px-6 py-2 rounded-full text-sm font-medium mb-8">
              <Calendar size={16} />
              <span>{new Date().getFullYear()} Training Schedule</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Training <span className="text-accent-400">Calendar</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional safety training programs with scheduled dates, durations, and costs. All courses are available for both individuals and corporate clients.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {trainings.length}
                </div>
                <div className="text-gray-300">Available Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {trainings.reduce((sum, t) => sum + trainingService.getUpcomingSessionsCount(t), 0)}
                </div>
                <div className="text-gray-300">Upcoming Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {trainings.filter(t => t.isFeatured).length}
                </div>
                <div className="text-gray-300">Featured Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {trainingService.getUniqueCategories(trainings).length}
                </div>
                <div className="text-gray-300">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calendar Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white adventure-card sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <Filter size={20} className="text-accent-600" />
                    <h3 className="text-lg font-semibold">Filter Courses</h3>
                  </div>

                  {/* Categories Filter */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 mb-4">Course Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category === 'All Courses' ? 'all' : category.toLowerCase())}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === (category === 'All Courses' ? 'all' : category.toLowerCase())
                              ? 'bg-accent-100 text-accent-800 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {category}
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
                        {formatMonthYear()}
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
                          onClick={() => {
                            setSelectedMonth(index);
                            setShowAllCourses(false);
                          }}
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
                          onClick={() => {
                            setSelectedMonth(index + 6);
                            setShowAllCourses(false);
                          }}
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
                    
                    {/* Show All Courses Button */}
                    <button
                      onClick={handleShowAllCourses}
                      className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
                        showAllCourses
                          ? 'bg-accent-600 text-white font-medium'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Show All Courses
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    {/* PDF Download Button */}
                    <div className="border-t pt-4 text-[#039AC5]">
                      <PDFDownloadLink
                        document={
                          <TrainingCalendarPDF
                            trainings={trainings}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            selectedCategory={selectedCategory}
                            categories={categories}
                          />
                        }
                        fileName={getPDFFileName()}
                        className="w-full flex items-center justify-center gap-2 text-accent-600 hover:text-accent-800 font-medium py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {({ loading, error }) => (
                          <>
                            <Download size={18} />
                            {loading ? 'Generating PDF...' : 'Download Calendar'}
                          </>
                        )}
                      </PDFDownloadLink>
                      
                      {isGeneratingPDF && (
                        <div className="text-xs text-gray-500 mt-1 text-center">
                          Please wait while we generate your PDF...
                        </div>
                      )}
                    </div>
                    
                    <Link
                      href="/courses"
                      className="block text-center text-accent-600 hover:text-accent-800 font-medium py-2"
                    >
                      View All Course Details →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Training Calendar Table */}
              <div className="lg:col-span-3">
                {/* Calendar Header */}
                <div className="bg-white adventure-card mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {showAllCourses ? "All Upcoming Training Sessions" : `${formatMonthYear()} Training Schedule`}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {showAllCourses 
                          ? `Showing ${filteredTrainings.length} courses with upcoming sessions` 
                          : `Showing ${filteredTrainings.length} courses with sessions in ${months[selectedMonth!]}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleShowCurrentMonth}
                        className="text-sm text-accent-600 hover:text-accent-800 font-medium"
                      >
                        Show Current Month
                      </button>
                      <div className="hidden sm:block">
                        <PDFDownloadLink
                          document={
                            <TrainingCalendarPDF
                              trainings={trainings}
                              selectedMonth={selectedMonth}
                              selectedYear={selectedYear}
                              selectedCategory={selectedCategory}
                              categories={categories}
                            />
                          }
                          fileName={getPDFFileName()}
                          className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {({ loading, error }) => (
                            <>
                              <Download size={16} />
                              {loading ? 'Generating...' : 'Download PDF'}
                            </>
                          )}
                        </PDFDownloadLink>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Training Calendar Table */}
                <div className="bg-white adventure-card overflow-hidden">
                  {/* Table Header - Desktop Only */}
                  <div className="hidden md:grid md:grid-cols-12 bg-accent-50 border-b border-gray-200">
                    <div className="col-span-4 p-4 font-semibold text-gray-900">
                      COURSE TITLE
                    </div>
                    <div className="col-span-2 p-4 font-semibold text-gray-900">
                      DURATION
                    </div>
                    <div className="col-span-3 p-4 font-semibold text-gray-900">
                      {showAllCourses ? "UPCOMING DATES" : "DATES"}
                    </div>
                    <div className="col-span-2 p-4 font-semibold text-gray-900 text-right">
                      COST (KSH)
                    </div>
                    <div className="col-span-1 p-4"></div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-100">
                    {filteredTrainings.length > 0 ? (
                      filteredTrainings.map((training) => {
                        const sessions = getSessionsForDisplay(training);
                        const isExpanded = expandedTraining === training.id;
                        
                        return (
                          <div key={training.id}>
                            {/* Main Row - Mobile Card View / Desktop Table Row */}
                            <div 
                              className="md:grid md:grid-cols-12 hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => toggleTrainingExpansion(training.id)}
                            >
                              {/* Mobile View - Card Layout */}
                              <div className="md:hidden p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="font-semibold text-gray-900">
                                      {training.title}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                      {training.targetGroup}
                                    </div>
                                    {training.isFeatured && (
                                      <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                                        Featured
                                      </span>
                                    )}
                                  </div>
                                  <ChevronRight 
                                    size={20} 
                                    className={`text-gray-400 transition-transform flex-shrink-0 ml-2 ${
                                      isExpanded ? 'rotate-90' : ''
                                    }`}
                                  />
                                </div>
                                
                                {/* Quick Info Row */}
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Clock size={14} className="text-accent-500 flex-shrink-0" />
                                    <span className="text-gray-700">{parseDuration(training.duration)}</span>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-gray-900">
                                      {parseCost(training.cost)}
                                    </div>
                                    <div className="text-xs text-gray-500">Excl. VAT</div>
                                  </div>
                                </div>
                                
                                {/* Dates */}
                                <div className="mt-3">
                                  {sessions.length > 0 ? (
                                    <div className="text-sm text-gray-700">
                                      {sessions.slice(0, 1).map((session, index) => (
                                        <div key={session._id || `session-${index}`}>
                                          {session.formattedDates}
                                        </div>
                                      ))}
                                      {sessions.length > 1 && (
                                        <div className="text-sm text-accent-600">
                                          +{sessions.length - 1} more session{sessions.length - 1 > 1 ? 's' : ''}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-sm text-gray-400">
                                      {showAllCourses ? "No upcoming sessions" : "No sessions this month"}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Desktop View - Table Layout */}
                              <div className="hidden md:block col-span-4 p-4">
                                <div className="font-semibold text-gray-900">
                                  {training.title}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {training.targetGroup}
                                </div>
                                {training.isFeatured && (
                                  <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                                    Featured
                                  </span>
                                )}
                              </div>
                              
                              <div className="hidden md:block col-span-2 p-4">
                                <div className="flex items-center gap-2 text-gray-700">
                                  <Clock size={14} className="text-accent-500" />
                                  {parseDuration(training.duration)}
                                </div>
                              </div>
                              
                              <div className="hidden md:block col-span-3 p-4">
                                {sessions.length > 0 ? (
                                  <div className="space-y-1">
                                    {sessions.slice(0, 1).map((session, index) => (
                                      <div key={session._id || `session-${index}`} className="text-gray-700">
                                        {session.formattedDates}
                                      </div>
                                    ))}
                                    {sessions.length > 1 && (
                                      <div className="text-sm text-accent-600">
                                        +{sessions.length - 1} more session{sessions.length - 1 > 1 ? 's' : ''}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-gray-400">
                                    {showAllCourses ? "No upcoming sessions" : "No sessions this month"}
                                  </div>
                                )}
                              </div>
                              
                              <div className="hidden md:block col-span-2 p-4 text-right">
                                <div className="font-semibold text-gray-900">
                                  {parseCost(training.cost)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Excl. VAT
                                </div>
                              </div>
                              
                              <div className="hidden md:block col-span-1 p-4 flex items-center justify-center">
                                <ChevronRight 
                                  size={20} 
                                  className={`text-gray-400 transition-transform ${
                                    isExpanded ? 'rotate-90' : ''
                                  }`}
                                />
                              </div>
                            </div>
                            
                            {/* Expanded Details */}
                            {isExpanded && (
                              <div className="bg-accent-25 border-t border-gray-100">
                                <div className="p-4 md:p-6">
                                  {/* Course Description */}
                                  <div className="mb-4 md:mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                      Course Description
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                      {training.description}
                                    </p>
                                    <div className="text-sm text-gray-600 mt-1">
                                      {parseModeOfStudy(training.modeOfStudy)}
                                    </div>
                                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <BookOpen size={14} />
                                        <span>Certification: {training.certification}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <CreditCard size={14} />
                                        <span>Reg. Fee: Kshs {training.registrationFee.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Available Sessions */}
                                  {sessions.length > 0 && (
                                    <div className="mb-4 md:mb-6">
                                      <h4 className="font-semibold text-gray-900 mb-3">
                                        {showAllCourses ? "All Upcoming Sessions" : `Available Sessions in ${months[selectedMonth!]}`}
                                      </h4>
                                      <div className="space-y-3">
                                        {sessions.map((session, index) => (
                                          <div 
                                            key={session._id || `session-${index}`}
                                            className="bg-white rounded-lg p-4 border border-gray-200"
                                          >
                                            {/* Mobile: Stacked layout */}
                                            <div className="md:hidden space-y-3">
                                              <div>
                                                <div className="text-xs text-gray-500">Dates</div>
                                                <div className="font-medium text-sm">{session.formattedDates}</div>
                                              </div>
                                              <div>
                                                <div className="text-xs text-gray-500">Venue</div>
                                                <div className="font-medium text-sm">{session.venue}</div>
                                              </div>
                                              <div>
                                                <div className="text-xs text-gray-500">Seats</div>
                                                <div className="font-medium text-sm">
                                                  {session.seats.available !== undefined ? session.seats.available : session.seats.booked !== undefined ? session.seats.total - session.seats.booked : session.seats.total} / {session.seats.total}
                                                </div>
                                              </div>
                                              <div>
                                                <div className="text-xs text-gray-500">Instructor</div>
                                                <div className="font-medium text-sm">
                                                  {session.instructor || 'ISTC Certified Trainers'}
                                                </div>
                                              </div>
                                              <div className="pt-2 flex gap-2">
                                                <Link href={`/courses/${training.slug}`} className="flex-1 text-sm text-accent-600 hover:text-accent-800 font-medium py-2 px-3 border border-accent-600 rounded-lg inline-flex items-center justify-center transition-colors">
                                                  View Details
                                                </Link>
                                                <Link href="/contact" className="flex-1 text-sm bg-accent-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-accent-700 transition-colors inline-flex items-center justify-center">
                                                  Register Now
                                                </Link>
                                              </div>
                                            </div>
                                            
                                            {/* Desktop: Grid layout */}
                                            <div className="hidden md:grid md:grid-cols-4 gap-4">
                                              <div>
                                                <div className="text-sm text-gray-500">Dates</div>
                                                <div className="font-medium">{session.formattedDates}</div>
                                              </div>
                                              <div>
                                                <div className="text-sm text-gray-500">Venue</div>
                                                <div className="font-medium">{session.venue}</div>
                                              </div>
                                              <div>
                                                <div className="text-sm text-gray-500">Seats Available</div>
                                                <div className="font-medium">
                                                  {session.seats.available !== undefined ? session.seats.available : session.seats.booked !== undefined ? session.seats.total - session.seats.booked : session.seats.total} / {session.seats.total}
                                                </div>
                                              </div>
                                              <div>
                                                <div className="text-sm text-gray-500">Instructor</div>
                                                <div className="font-medium">
                                                  {session.instructor || 'TBD'}
                                                </div>
                                              </div>
                                            </div>
                                            
                                            {/* <div className="hidden md:flex mt-4 justify-end space-x-3 bg-amber-600">
                                              <Link href={`/courses/${training.slug}`} className="text-sm text-accent-600 hover:text-accent-800 font-medium py-2 px-3 border border-accent-600 rounded-lg inline-flex items-center justify-center transition-colors">
                                                View Details
                                              </Link>
                                              <Link href="/contact" className="text-sm bg-accent-600  px-4 py-2 rounded-lg font-medium hover:bg-accent-700 transition-colors inline-flex items-center justify-center">
                                                Register Now
                                              </Link>
                                            </div> */}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Action Buttons */}
                                  <div className="flex flex-wrap gap-3 pt-3 md:pt-4 border-t border-gray-200">
                                    <Link href="/contact" className="flex-1 min-w-[140px] btn-adventure text-sm py-2.5 justify-center text-center">
                                      Register for Course
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-8 md:p-12 text-center">
                        <Calendar size={36} className="text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          No training sessions found
                        </h4>
                        <p className="text-gray-600 mb-6 text-sm">
                          Try selecting a different month or category to view available training sessions.
                        </p>
                        <button
                          onClick={handleShowAllCourses}
                          className="btn-adventure inline-flex items-center gap-2 text-sm"
                        >
                          Show All Courses
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Notes */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white adventure-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="text-green-500" size={24} />
                      <h4 className="font-semibold text-gray-900">Confirmation & Payment</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Registration includes a non-refundable fee of Kshs 1,000 payable at least two weeks before course commencement.
                    </p>
                  </div>
                  
                  <div className="bg-white adventure-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="text-blue-500" size={24} />
                      <h4 className="font-semibold text-gray-900">Corporate Training</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      We offer customized on-site training programs for corporate clients. Contact us for tailored solutions.
                    </p>
                  </div>
                  
                  <div className="bg-white adventure-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="text-purple-500" size={24} />
                      <h4 className="font-semibold text-gray-900">Diploma Programme</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Registration for Diploma in Occupational Safety & Health ongoing. Intakes in May and December.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration & Contact Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Registration Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">How to Register</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-accent-600 font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Visit Contact Form</h4>
                      <p className="opacity-90">
                        Navigate to our <Link href="/contact" className="text-blue-300 underline hover:no-underline font-medium">Contact page</Link>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-accent-600 font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Fill Course Details</h4>
                      <p className="opacity-90">
                        Select course, enter your details, and specify preferred dates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-accent-600 font-bold">3</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Submit & Confirm</h4>
                      <p className="opacity-90">
                        Submit form. We will contact you with confirmation & payment details
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <div className="space-y-6">
                  <a 
                    href="tel:+254700364722" 
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                  >
                    <div className="bg-white/20 rounded-full p-3 group-hover:scale-110 transition-transform">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Call Us</div>
                      <div className="text-xl">+254 700 364 722</div>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:hsetraining@istc.co.ke" 
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                  >
                    <div className="bg-white/20 rounded-full p-3 group-hover:scale-110 transition-transform">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Email Us</div>
                      <div className="text-xl">hsetraining@istc.co.ke</div>
                    </div>
                  </a>
                  
                  <Link 
                    href="/courses" 
                    className="flex items-center gap-4 p-4 bg-white text-accent-600 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <div className="bg-accent-100 rounded-full p-3 group-hover:scale-110 transition-transform">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Browse All Courses</div>
                      <div className="opacity-80">View complete course catalog</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Available Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
              Other Courses Available on Demand
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'Accident/Incident Investigation',
                'Food Safety',
                'Gender and Inclusion',
                'Stress Management',
                'Security Management Training',
                'Road & Transport Safety',
                'Forklift Safety',
                'Confined Space Entry',
                'Gender Sensitive OSH Practice',
                'Safe Use of Chemicals',
                'Disaster and Emergency Preparedness',
                'Industrial Hygiene',
                'Occupational Audiometry',
                'Behavioral Based Safety'
              ].map((course, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-sm text-gray-700">{course}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/contact" 
                className="btn-adventure-outline inline-flex items-center gap-2"
              >
                Request Custom Training
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}