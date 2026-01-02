// utils/trainingPdfGenerator.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { Training } from '@/app/api_services/trainingService';

// Use standard fonts that are more reliable with React-PDF
// Avoid external font loading which causes issues in Turbopack
Font.register({
  family: 'Helvetica',
  src: 'https://fonts.gstatic.com/s/helvetica/v15/3b76f5UjJ4jFXSHoYHbeBQ.woff2',
});

// For even better reliability, we can use built-in fonts
// but let's try to make Helvetica work first

// Define styles with the specified color
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: 2,
    borderBottomColor: '#039AC5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    color: '#039AC5',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  mainTable: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#039AC5',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#039AC5',
    borderBottomStyle: 'solid',
    minHeight: 40,
    alignItems: 'flex-start',
  },
  tableHeader: {
    backgroundColor: '#E6F7FF',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    minHeight: 35,
    alignItems: 'center',
    color: '#039AC5',
  },
  tableCell: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#039AC5',
    borderRightStyle: 'solid',
    fontSize: 9,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  cellTitle: {
    width: '28%',
    fontWeight: 'bold',
  },
  cellGroup: {
    width: '22%',
  },
  cellDuration: {
    width: '8%',
    textAlign: 'center',
  },
  cellDates: {
    width: '24%',
  },
  cellCost: {
    width: '18%',
    textAlign: 'right',
    paddingRight: 12,
    fontWeight: 'bold',
    color: '#039AC5',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 9,
    color: '#666',
  },
  noteSection: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#F0FAFF',
    borderWidth: 1,
    borderColor: '#039AC5',
    borderRadius: 4,
  },
  noteTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#039AC5',
  },
  noteText: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#039AC5',
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#039AC5',
    borderBottomStyle: 'solid',
  },
  centeredText: {
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  courseDates: {
    fontSize: 8.5,
    lineHeight: 1.4,
  },
  contactBox: {
    backgroundColor: '#E6F7FF',
    padding: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#039AC5',
    borderRadius: 4,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#039AC5',
    marginBottom: 6,
  },
  sectionDivider: {
    borderTop: 2,
    borderTopColor: '#039AC5',
    marginTop: 20,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#039AC5',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  twoColumnItem: {
    width: '50%',
    marginBottom: 5,
  },
  highlightText: {
    color: '#039AC5',
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#039AC5',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 7,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  generatedDate: {
    fontSize: 9,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#F0FAFF',
    borderRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#039AC5',
    fontSize: 14,
  },
  statLabel: {
    fontSize: 8,
  },
  noticeBox: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF8E6',
    borderLeftWidth: 4,
    borderLeftColor: '#039AC5',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

// Simple fallback font function to avoid errors
const useSafeFont = () => {
  // Return a safe font family that won't cause errors
  return 'Helvetica';
};

// Utility functions
const formatCurrency = (cost: string): string => {
  // Ensure proper formatting
  const num = parseInt(cost.replace(/\D/g, ''));
  return num ? `Kshs ${num.toLocaleString()}` : cost;
};

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : 
                   day === 2 || day === 22 ? 'nd' : 
                   day === 3 || day === 23 ? 'rd' : 'th';
    return `${day}${suffix} ${format(date, 'MMMM')}`;
  } catch {
    return dateString;
  }
};

const getFilteredTrainings = (
  trainings: Training[], 
  selectedMonth: number | null, 
  selectedYear: number, 
  selectedCategory: string
): Training[] => {
  return trainings.filter(training => {
    // Filter by category
    if (selectedCategory !== 'all' && training.category !== selectedCategory) {
      return false;
    }
    
    // If selectedMonth is null, show all courses
    if (selectedMonth === null) {
      return true;
    }
    
    // Filter by month
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
};

// Function to format sessions as in the PDF
const formatSessions = (training: Training): string => {
  if (!training.sessions || training.sessions.length === 0) return 'N/A';
  
  const now = new Date();
  const upcoming = training.sessions
    .filter(session => new Date(session.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  if (upcoming.length === 0) return 'N/A';
  
  // Format like in the PDF: "10th-13th February 12th-15th May"
  const formatted = upcoming.slice(0, 4).map(session => {
    const startDate = new Date(session.startDate);
    const endDate = new Date(session.endDate);
    
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const month = format(startDate, 'MMMM');
    
    const startSuffix = getDaySuffix(startDay);
    const endSuffix = getDaySuffix(endDay);
    
    return `${startDay}${startSuffix}-${endDay}${endSuffix} ${month}`;
  });
  
  return formatted.join(' ');
};

const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

// PDF Document Component
export interface TrainingCalendarPDFProps {
  trainings: Training[];
  selectedMonth: number | null;
  selectedYear: number;
  selectedCategory: string;
  categories: string[];
}

export const TrainingCalendarPDF: React.FC<TrainingCalendarPDFProps> = ({
  trainings,
  selectedMonth,
  selectedYear,
  selectedCategory,
  categories
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredTrainings = getFilteredTrainings(trainings, selectedMonth, selectedYear, selectedCategory);

  return (
    <Document>
      {/* Page 1: Main Training Table */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src="/istclogo.png"  style={styles.logo} />
          <Text style={styles.title}>THE INTERNATIONAL SAFETY TRAINING CENTRE</Text>
          <Text style={[styles.subtitle, styles.boldText]}>
            2026 TRAINING CALENDAR
          </Text>
          <Text style={styles.subtitle}>
            {selectedMonth === null 
              ? "Available Courses" 
              : `Courses Available in ${months[selectedMonth]} ${selectedYear}`}
          </Text>
          {selectedCategory !== 'all' && (
            <Text style={styles.subtitle}>
              Category: <Text style={styles.highlightText}>
                {categories.find(c => c.toLowerCase() === selectedCategory) || selectedCategory}
              </Text>
            </Text>
          )}
          <Text style={styles.generatedDate}>
            Generated on: {format(new Date(), 'MMMM dd, yyyy')}
          </Text>
        </View>

        {/* Main Training Table */}
        <View style={styles.mainTable}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.cellTitle]}>COURSE TITLE</Text>
            <Text style={[styles.tableCell, styles.cellGroup]}>TARGET GROUP</Text>
            <Text style={[styles.tableCell, styles.cellDuration]}>DURATION</Text>
            <Text style={[styles.tableCell, styles.cellDates]}>DATES</Text>
            <Text style={[styles.tableCell, styles.cellCost, styles.lastCell]}>COST (KSH) EXCLUSIVE OF TAX</Text>
          </View>
          
          {/* Table Rows */}
          {filteredTrainings.map((training, index) => (
            <View key={training.id} style={[
              styles.tableRow,
              index === filteredTrainings.length - 1 ? { borderBottomWidth: 0 } : {}
            ]}>
              <View style={[styles.tableCell, styles.cellTitle]}>
                <Text style={{ fontWeight: 'bold' }}>
                  {training.title}
                </Text>
                {training.isFeatured && (
                  <Text style={styles.badge}>FEATURED</Text>
                )}
              </View>
              <Text style={[styles.tableCell, styles.cellGroup]}>
                {training.targetGroup}
              </Text>
              <Text style={[styles.tableCell, styles.cellDuration, styles.centeredText]}>
                {training.duration}
              </Text>
              <View style={[styles.tableCell, styles.cellDates]}>
                <Text style={styles.courseDates}>
                  {formatSessions(training)}
                </Text>
              </View>
              <Text style={[styles.tableCell, styles.cellCost, styles.lastCell]}>
                {formatCurrency(training.cost)}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{filteredTrainings.length}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {filteredTrainings.filter(t => t.isFeatured).length}
            </Text>
            <Text style={styles.statLabel}>Featured</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {[...new Set(filteredTrainings.map(t => t.category))].length}
            </Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
        </View>

        {/* Page Footer */}
        <View style={styles.pageNumber}>
          <Text>THE INTERNATIONAL SAFETY TRAINING CENTRE. PG. 1</Text>
        </View>
      </Page>

      {/* Page 2: Additional Information */}
      <Page size="A4" style={styles.page}>
        <View style={styles.sectionDivider} />
        
        {/* Modes of Study */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionHeader}>Modes of Study</Text>
          <Text style={styles.noteText}>
            <Text style={styles.boldText}>1) Distance Learning</Text> - Available for Diploma Programmes
          </Text>
          <Text style={styles.noteText}>
            <Text style={styles.boldText}>2) Full Time</Text> - Available for all short courses (1-5 days duration)
          </Text>
        </View>

        {/* Other Courses Available */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionHeader}>Other Courses Available On Demand</Text>
          <View style={styles.twoColumnContainer}>
            {[
              'Accident / Incident Investigation',
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
              <View key={index} style={styles.twoColumnItem}>
                <Text style={styles.noteText}>
                  <Text style={styles.highlightText}>{String.fromCharCode(97 + index)})</Text> {course}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Important Notes */}
        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>Important Information & Notes</Text>
          <Text style={styles.noteText}>
            • All our short professional courses are open to all interested persons, organizations, and institutions
          </Text>
          <Text style={styles.noteText}>
            • Confirmation of attendance includes payment of a <Text style={styles.boldText}>non-refundable registration fee of Kshs. 1,000</Text> at least two weeks before course commencement
          </Text>
          <Text style={styles.noteText}>
            • We offer customized on-site training programs for corporate clients
          </Text>
          <Text style={styles.noteText}>
            • All course costs are exclusive of VAT/Tax unless otherwise specified
          </Text>
          <Text style={styles.noteText}>
            • Courses are subject to minimum participant numbers
          </Text>
        </View>

        {/* How to Register */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionHeader}>How to Register</Text>
          <Text style={styles.noteText}>
            To register for these courses, kindly download the registration form from our website{' '}
            <Text style={[styles.boldText, styles.highlightText]}>www.istc.co.ke</Text>, fill up the form and send it to us via our email address{' '}
            <Text style={[styles.boldText, styles.highlightText]}>hsetraining@istc.co.ke</Text>.
          </Text>
          <Text style={[styles.noteText, { marginTop: 8 }]}>
            For any further enquiries kindly contact us: <Text style={[styles.boldText, styles.highlightText]}>(0700 364 722)</Text>
          </Text>
        </View>

        {/* Page Footer */}
        <View style={styles.pageNumber}>
          <Text>THE INTERNATIONAL SAFETY TRAINING CENTRE. PG. 2</Text>
        </View>
      </Page>
    </Document>
  );
};

// Helper function to generate PDF filename
export const generatePDFFileName = (
  selectedMonth: number | null,
  selectedYear: number,
  selectedCategory: string,
  categories: string[]
): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  let filename = 'ISTC_Training_Calendar_';
  
  if (selectedMonth !== null) {
    filename += `${months[selectedMonth].toUpperCase()}_${selectedYear}`;
  } else {
    filename += '2026';
  }
  
  if (selectedCategory !== 'all') {
    const categoryName = categories.find(c => c.toLowerCase() === selectedCategory) || selectedCategory;
    filename += `_${categoryName.replace(/\s+/g, '_').toUpperCase()}`;
  }
  
  filename += '.pdf';
  return filename;
};