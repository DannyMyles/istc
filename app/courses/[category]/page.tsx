import { notFound } from 'next/navigation';
import { 
  Clock, Users, Award, Calendar, 
  Star, CheckCircle, BookOpen, 
  Shield, Target, GraduationCap,
  ArrowRight, Phone, Mail
} from 'lucide-react';
import Link from 'next/link';

// Course data - in a real app, this would come from a database or API
const courseDetails = {
  'occupational-health-safety': {
    id: 'ohs-level1',
    title: 'Occupational Health & Safety Level 1',
    description: 'Fundamental safety training covering essential workplace safety principles, hazard identification, and basic safety management systems.',
    longDescription: 'This comprehensive course provides foundational knowledge in occupational health and safety. Participants will learn to identify workplace hazards, conduct basic risk assessments, and implement safety measures. The course covers legal requirements, safety management systems, and practical safety applications across various industries.',
    duration: '5 Days',
    schedule: '9:00 AM - 4:00 PM Daily',
    participants: 'Maximum 20 participants',
    level: 'Beginner',
    prerequisites: 'No prior experience required',
    nextStart: 'March 15, 2024',
    upcomingDates: [
      'March 15-19, 2024',
      'April 2-6, 2024',
      'May 7-11, 2024'
    ],
    rating: 4.9,
    totalRatings: 128,
    price: 25000,
    discountedPrice: 22500,
    category: 'Health & Safety',
    featured: true,
    whatYouLearn: [
      'Identify workplace hazards and assess risks',
      'Understand legal safety requirements',
      'Implement basic safety management systems',
      'Conduct safety inspections and audits',
      'Develop emergency response plans',
      'Promote safety culture in the workplace'
    ],
    courseContent: [
      {
        module: 'Module 1: Introduction to Workplace Safety',
        topics: [
          'Safety legislation and regulations',
          'Employer and employee responsibilities',
          'Safety management principles'
        ]
      },
      {
        module: 'Module 2: Hazard Identification',
        topics: [
          'Types of workplace hazards',
          'Risk assessment techniques',
          'Control measures implementation'
        ]
      },
      {
        module: 'Module 3: Safety Equipment',
        topics: [
          'Personal protective equipment (PPE)',
          'Safety signs and signals',
          'Equipment maintenance'
        ]
      },
      {
        module: 'Module 4: Emergency Preparedness',
        topics: [
          'Emergency response procedures',
          'First aid basics',
          'Fire safety and evacuation'
        ]
      },
      {
        module: 'Module 5: Safety Culture',
        topics: [
          'Promoting safety awareness',
          'Incident reporting and investigation',
          'Continuous improvement'
        ]
      }
    ],
    certification: 'Upon successful completion, participants receive an ISTC Occupational Health & Safety Certificate valid for 2 years.',
    whoShouldAttend: [
      'Safety officers',
      'HR managers',
      'Team leaders',
      'Operations staff',
      'Anyone responsible for workplace safety'
    ],
    instructor: {
      name: 'Dr. Sarah Johnson',
      title: 'Senior Safety Consultant',
      experience: '15+ years in occupational safety',
      qualifications: ['PhD in Safety Management', 'NEBOSH Certified', 'OSHA Trainer']
    }
  },
  'first-aid': {
    id: 'first-aid',
    title: 'First Aid & CPR Certification',
    description: 'Comprehensive emergency response training including CPR techniques, wound care, and medical emergency management.',
    longDescription: 'This hands-on course equips participants with essential first aid skills to handle medical emergencies effectively. The training includes practical demonstrations, scenario-based learning, and certification in CPR and basic life support.',
    duration: '2 Days',
    schedule: '8:30 AM - 5:00 PM',
    participants: 'Maximum 25 participants',
    level: 'Beginner',
    prerequisites: 'No prior medical knowledge required',
    nextStart: 'March 18, 2024',
    upcomingDates: [
      'March 18-19, 2024',
      'April 8-9, 2024',
      'May 13-14, 2024'
    ],
    rating: 4.8,
    totalRatings: 96,
    price: 15000,
    discountedPrice: 13500,
    category: 'First Aid',
    featured: false,
    whatYouLearn: [
      'CPR for adults, children, and infants',
      'Basic wound care and dressing',
      'Managing choking emergencies',
      'Recognizing heart attack and stroke symptoms',
      'First aid for burns and fractures',
      'Emergency response coordination'
    ],
    courseContent: [
      {
        module: 'Module 1: Emergency Response',
        topics: [
          'Assessing emergency situations',
          'Activating emergency services',
          'Scene safety assessment'
        ]
      },
      {
        module: 'Module 2: CPR & AED Training',
        topics: [
          'Adult, child, and infant CPR',
          'Automated External Defibrillator (AED) use',
          'Recovery position'
        ]
      },
      {
        module: 'Module 3: Medical Emergencies',
        topics: [
          'Heart attack and stroke recognition',
          'Choking management',
          'Diabetic emergencies'
        ]
      },
      {
        module: 'Module 4: Injury Management',
        topics: [
          'Wound care and dressing',
          'Fracture stabilization',
          'Burn treatment'
        ]
      }
    ],
    certification: 'ISTC First Aid & CPR Certificate valid for 2 years. Meets international first aid standards.',
    whoShouldAttend: [
      'Safety officers',
      'Teachers and educators',
      'Parents and caregivers',
      'Security personnel',
      'Workplace first aiders'
    ],
    instructor: {
      name: 'Michael Chen',
      title: 'Emergency Medical Specialist',
      experience: '12+ years in emergency medicine',
      qualifications: ['Paramedic Certification', 'ACLS Instructor', 'First Aid Trainer']
    }
  },
  'fire-safety': {
    id: 'fire-safety',
    title: 'Fire Safety & Evacuation Training',
    description: 'Comprehensive fire safety training covering prevention, evacuation procedures, and firefighting equipment operation.',
    longDescription: 'This practical course provides essential knowledge and skills for fire prevention and emergency response. Participants learn to identify fire hazards, operate firefighting equipment, and conduct safe evacuations.',
    duration: '3 Days',
    schedule: '9:00 AM - 4:00 PM',
    participants: 'Maximum 15 participants',
    level: 'Intermediate',
    prerequisites: 'Basic safety awareness',
    nextStart: 'March 20, 2024',
    upcomingDates: [
      'March 20-22, 2024',
      'April 10-12, 2024',
      'May 15-17, 2024'
    ],
    rating: 4.7,
    totalRatings: 84,
    price: 22000,
    discountedPrice: 19800,
    category: 'Fire Safety',
    featured: false,
    whatYouLearn: [
      'Fire prevention techniques',
      'Evacuation procedures and drills',
      'Firefighting equipment operation',
      'Emergency response coordination',
      'Fire risk assessment',
      'Regulatory compliance'
    ],
    courseContent: [
      {
        module: 'Module 1: Fire Science',
        topics: [
          'Fire triangle and combustion',
          'Classes of fire',
          'Fire behavior'
        ]
      },
      {
        module: 'Module 2: Fire Prevention',
        topics: [
          'Fire hazard identification',
          'Prevention measures',
          'Safety inspections'
        ]
      },
      {
        module: 'Module 3: Firefighting',
        topics: [
          'Fire extinguisher types and use',
          'Hose reel operation',
          'Fire blanket application'
        ]
      },
      {
        module: 'Module 4: Evacuation',
        topics: [
          'Emergency planning',
          'Evacuation procedures',
          'Assembly point management'
        ]
      }
    ],
    certification: 'ISTC Fire Safety Certificate valid for 3 years. Meets fire safety regulatory requirements.',
    whoShouldAttend: [
      'Fire wardens',
      'Safety officers',
      'Facility managers',
      'Building supervisors',
      'Security personnel'
    ],
    instructor: {
      name: 'Robert Kimani',
      title: 'Fire Safety Expert',
      experience: '18+ years in fire safety',
      qualifications: ['Fire Engineering Diploma', 'Fire Service Certification', 'NFPA Trainer']
    }
  },
  'construction-safety': {
    id: 'construction-safety',
    title: 'Construction Site Safety',
    description: 'Comprehensive safety training for construction sites covering hazard identification, equipment safety, and site management.',
    longDescription: 'This specialized course addresses the unique safety challenges of construction environments. Participants learn to identify construction hazards, implement safety controls, and manage site safety effectively.',
    duration: '4 Days',
    schedule: '8:00 AM - 5:00 PM',
    participants: 'Maximum 20 participants',
    level: 'Intermediate',
    prerequisites: 'Basic construction knowledge',
    nextStart: 'March 25, 2024',
    upcomingDates: [
      'March 25-28, 2024',
      'April 15-18, 2024',
      'May 20-23, 2024'
    ],
    rating: 4.9,
    totalRatings: 112,
    price: 28000,
    discountedPrice: 25200,
    category: 'Construction',
    featured: false,
    whatYouLearn: [
      'Construction hazard identification',
      'Fall protection systems',
      'Equipment safety procedures',
      'Excavation safety',
      'Scaffold safety',
      'Site safety management'
    ],
    courseContent: [
      {
        module: 'Module 1: Site Safety Management',
        topics: [
          'Site safety planning',
          'Safety responsibilities',
          'Site inspections'
        ]
      },
      {
        module: 'Module 2: Height Safety',
        topics: [
          'Fall protection systems',
          'Scaffold safety',
          'Ladder safety'
        ]
      },
      {
        module: 'Module 3: Equipment Safety',
        topics: [
          'Heavy equipment safety',
          'Power tool safety',
          'Equipment maintenance'
        ]
      },
      {
        module: 'Module 4: Specialized Hazards',
        topics: [
          'Excavation safety',
          'Electrical hazards',
          'Confined spaces'
        ]
      }
    ],
    certification: 'ISTC Construction Safety Certificate valid for 2 years. Recognized by construction regulatory bodies.',
    whoShouldAttend: [
      'Site supervisors',
      'Construction managers',
      'Safety officers',
      'Project engineers',
      'Construction workers'
    ],
    instructor: {
      name: 'James Omondi',
      title: 'Construction Safety Specialist',
      experience: '20+ years in construction safety',
      qualifications: ['Civil Engineering Degree', 'OSHA Construction Trainer', 'Safety Management Diploma']
    }
  }
};

export default function CourseDetailPage({ params }: { params: { category: string } }) {
  const course = courseDetails[params.category as keyof typeof courseDetails];

  if (!course) {
    notFound();
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Link 
                href="/courses" 
                className="text-accent-600 hover:text-accent-800 flex items-center gap-2"
              >
                ← Back to all courses
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Course Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {course.category}
                  </span>
                  {course.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured Course
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent-100 p-2 rounded-lg">
                      <Clock className="text-accent-600" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{course.duration}</div>
                      <div className="text-sm text-gray-500">Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent-100 p-2 rounded-lg">
                      <Users className="text-accent-600" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{course.participants}</div>
                      <div className="text-sm text-gray-500">Class Size</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent-100 p-2 rounded-lg">
                      <Award className="text-accent-600" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{course.level}</div>
                      <div className="text-sm text-gray-500">Level</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent-100 p-2 rounded-lg">
                      <Calendar className="text-accent-600" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Next: {course.nextStart}</div>
                      <div className="text-sm text-gray-500">Start Date</div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                    <span className="text-gray-500"> ({course.totalRatings} ratings)</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Enrollment Card */}
              <div className="lg:col-span-1">
                <div className="bg-white adventure-card sticky top-24">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-accent-800 mb-1">
                      Ksh {course.price.toLocaleString()}
                    </div>
                    {course.discountedPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg line-through text-gray-400">
                          Ksh {course.discountedPrice.toLocaleString()}
                        </span>
                        <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                          Save {Math.round((1 - course.discountedPrice/course.price) * 100)}%
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-2">Per participant</p>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full btn-adventure py-3">
                      Enroll Now
                    </button>
                    <button className="w-full btn-adventure-outline py-3">
                      Download Brochure
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Need help deciding?</h4>
                    <div className="space-y-3">
                      <a 
                        href="tel:+254700364722" 
                        className="flex items-center gap-3 text-gray-600 hover:text-accent-800 transition-colors"
                      >
                        <Phone size={18} />
                        <span>Call for advice</span>
                      </a>
                      <a 
                        href="mailto:hsetraining@istc.co.ke" 
                        className="flex items-center gap-3 text-gray-600 hover:text-accent-800 transition-colors"
                      >
                        <Mail size={18} />
                        <span>Email for details</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* What You'll Learn */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <BookOpen className="text-accent-600" />
                    What You'll Learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                  <div className="space-y-4">
                    {course.courseContent.map((module, index) => (
                      <details key={index} className="bg-gray-50 rounded-xl p-4">
                        <summary className="font-semibold text-gray-900 cursor-pointer">
                          {module.module}
                        </summary>
                        <div className="mt-4 space-y-2">
                          {module.topics.map((topic, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-gray-600">
                              <div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div>
                              {topic}
                            </div>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>

                {/* Instructor */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Instructor</h2>
                  <div className="bg-accent-50 rounded-2xl p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                        <GraduationCap className="text-accent-600" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {course.instructor.name}
                        </h3>
                        <p className="text-accent-700 font-medium mb-3">{course.instructor.title}</p>
                        <p className="text-gray-600 mb-4">{course.instructor.experience}</p>
                        <div className="flex flex-wrap gap-2">
                          {course.instructor.qualifications.map((qual, idx) => (
                            <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-600">
                              {qual}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Who Should Attend */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Should Attend</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.whoShouldAttend.map((attendee, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Users className="text-accent-600" size={20} />
                        <span className="text-gray-700">{attendee}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certification */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Certification</h2>
                  <div className="bg-white adventure-card">
                    <div className="flex items-start gap-4">
                      <Award className="text-accent-600 mt-1" size={24} />
                      <div>
                        <p className="text-gray-700">{course.certification}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Upcoming Dates */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Dates</h3>
                  <div className="space-y-3">
                    {course.upcomingDates.map((date, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar size={18} className="text-accent-600" />
                          <span className="font-medium">{date}</span>
                        </div>
                        <button className="text-accent-600 font-medium hover:text-accent-800">
                          Enroll →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{course.prerequisites}</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock size={18} className="text-accent-600" />
                      <span className="font-medium">{course.schedule}</span>
                    </div>
                    <p className="text-sm text-gray-600">Daily training sessions</p>
                  </div>
                </div>

                {/* Related Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Courses</h3>
                  <div className="space-y-3">
                    <Link 
                      href="/courses/first-aid" 
                      className="flex items-center justify-between p-3 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors"
                    >
                      <span className="font-medium">First Aid & CPR</span>
                      <ArrowRight size={18} className="text-accent-600" />
                    </Link>
                    <Link 
                      href="/courses/fire-safety" 
                      className="flex items-center justify-between p-3 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors"
                    >
                      <span className="font-medium">Fire Safety</span>
                      <ArrowRight size={18} className="text-accent-600" />
                    </Link>
                    <Link 
                      href="/courses/construction-safety" 
                      className="flex items-center justify-between p-3 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors"
                    >
                      <span className="font-medium">Construction Safety</span>
                      <ArrowRight size={18} className="text-accent-600" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Master {course.title}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our next session and gain practical safety skills from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-accent-800 hover:bg-accent-50 px-8 py-3 rounded-xl font-semibold text-lg transition-colors">
                Enroll Now - Ksh {course.price.toLocaleString()}
              </button>
              <a 
                href="tel:+254700364722" 
                className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Call to Enroll
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static paths for all courses
export async function generateStaticParams() {
  return Object.keys(courseDetails).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const course = courseDetails[params.category as keyof typeof courseDetails];
  
  if (!course) {
    return {
      title: 'Course Not Found',
      description: 'The requested course could not be found.',
    };
  }

  return {
    title: `${course.title} | ISTC Safety Training`,
    description: course.description,
    keywords: `${course.category}, safety training, certification, ${course.title.toLowerCase()}`,
  };
}