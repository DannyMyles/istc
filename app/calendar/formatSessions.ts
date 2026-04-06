import { format } from 'date-fns';

export interface TrainingSession {
  startDate: string;
  endDate: string;
  venue: string;
  instructor?: string;
  seats: {
    total: number;
    available?: number;
    booked?: number;
  };
  // Add other fields as needed
  [key: string]: any;
}

export const formatSessions = (sessions: TrainingSession[]): string => {
  if (!sessions || sessions.length === 0) return 'Available on Request';
  
  const now = new Date();
  const upcoming = sessions
    .filter(session => new Date(session.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  if (upcoming.length === 0) return 'No upcoming sessions';
  
  return upcoming.slice(0, 3).map(session => {
    const start = new Date(session.startDate);
    const end = new Date(session.endDate);
    
    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = format(start, 'MMM');
    const year = format(start, 'yyyy');
    
    const startSuffix = getDaySuffix(startDay);
    const endSuffix = getDaySuffix(endDay);
    
    if (startDay === endDay) {
      return `${startDay}${startSuffix} ${month} ${year}`;
    }
    
    return `${startDay}${startSuffix}-${endDay}${endSuffix} ${month} ${year}`;
  }).join(', ');
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

// For single session display
export const formatSingleSessionDate = (session: TrainingSession): string => {
  const start = new Date(session.startDate);
  const end = new Date(session.endDate);
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = format(start, 'MMM');
  const year = format(start, 'yyyy');
  
  const startSuffix = getDaySuffix(startDay);
  const endSuffix = getDaySuffix(endDay);
  
  if (startDay === endDay) {
    return `${startDay}${startSuffix} ${month} ${year}`;
  }
  
  return `${startDay}${startSuffix}-${endDay}${endSuffix} ${month} ${year}`;
};

