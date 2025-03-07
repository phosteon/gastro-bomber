
import React, { useState } from 'react';
import { format, addDays, startOfWeek, addWeeks, setHours, setMinutes } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CalendarBookingProps {
  packageType: string;
  coachName: string;
}

const CalendarBooking: React.FC<CalendarBookingProps> = ({ packageType, coachName }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedTimeSlot(null);
    
    if (selectedDate) {
      // Generate mock time slots for the selected date
      // In a real app, this would come from an API
      const mockTimeSlots = [
        '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
      ];
      setTimeSlots(mockTimeSlots);
    } else {
      setTimeSlots([]);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };

  const handleBooking = () => {
    if (!date || !selectedTimeSlot) return;
    
    setIsConfirming(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false);
      setIsBooked(true);
      toast.success(`Termin erfolgreich gebucht: ${format(date, 'dd.MM.yyyy')} um ${selectedTimeSlot} Uhr`);
    }, 1500);
  };

  // Function to generate available day modifiers for the calendar
  const generateAvailableDays = () => {
    // In a real app, this would come from an API
    // For demo purposes, we'll just make weekdays available
    const today = new Date();
    const days: Date[] = [];
    
    // Add next 14 days (excluding weekends for demo)
    for (let i = 1; i <= 14; i++) {
      const day = addDays(today, i);
      const dayOfWeek = day.getDay();
      
      // Exclude weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(day);
      }
    }
    
    return days;
  };

  const availableDays = generateAvailableDays();

  return (
    <div className="flex flex-col items-center">
      {!isBooked ? (
        <>
          <div className="flex flex-col md:flex-row w-full gap-8">
            {/* Calendar */}
            <div className="md:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  modifiers={{ available: availableDays }}
                  modifiersStyles={{
                    available: { 
                      fontWeight: 'bold',
                      color: 'var(--purple-500)', 
                      backgroundColor: 'var(--purple-50)' 
                    }
                  }}
                  disabled={(date) => {
                    // Disable past dates, weekends, and dates not in available days
                    return (
                      date < new Date() || 
                      date.getDay() === 0 || 
                      date.getDay() === 6 ||
                      !availableDays.some(d => d.toDateString() === date.toDateString())
                    );
                  }}
                  className="pointer-events-auto"
                  locale={de}
                />
              </div>
            </div>

            {/* Time slots */}
            <div className="md:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
                <h3 className="text-lg font-medium mb-4">
                  {date 
                    ? `Verfügbare Zeiten am ${format(date, 'dd. MMMM yyyy', {locale: de})}`
                    : 'Bitte wählen Sie zuerst ein Datum'
                  }
                </h3>
                
                {timeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={cn(
                          "py-2 px-4 rounded-md border transition-all duration-200 text-sm",
                          selectedTimeSlot === time
                            ? "bg-purple-100 border-purple-400 text-purple-700 dark:bg-purple-900/40 dark:border-purple-700 dark:text-purple-300"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                        )}
                      >
                        {time} Uhr
                      </button>
                    ))}
                  </div>
                ) : (
                  date && (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                      <p>Keine Termine verfügbar an diesem Tag.</p>
                      <p className="mt-2">Bitte wählen Sie ein anderes Datum.</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 w-full md:w-1/2">
            <Button
              onClick={handleBooking}
              disabled={!date || !selectedTimeSlot || isConfirming}
              className="w-full py-6 text-lg"
            >
              {isConfirming ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Termin wird gebucht...
                </span>
              ) : (
                `Termin buchen: ${date && selectedTimeSlot ? `${format(date, 'dd.MM.')} um ${selectedTimeSlot} Uhr` : ''}`
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Termin erfolgreich gebucht!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ihr Termin mit {coachName} am {date && format(date, 'dd.MM.yyyy')} um {selectedTimeSlot} Uhr wurde bestätigt.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details zu Ihrem {packageType === 'premium' ? 'Premium-Coaching' : 'Community-Onboarding'}.
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Zurück zur Startseite
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarBooking;
