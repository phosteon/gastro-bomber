
import React, { useState } from 'react';
import { format, addDays, startOfWeek, addWeeks, setHours, setMinutes } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Check, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';

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
          <div className="flex flex-col lg:flex-row w-full gap-6">
            {/* Calendar - Improved mobile styling */}
            <div className="w-full lg:w-1/2">
              <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-lg p-3 sm:p-5 border border-white/5 overflow-hidden">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  modifiers={{ available: availableDays }}
                  modifiersStyles={{
                    available: { 
                      fontWeight: 'bold',
                      color: '#22C55E', 
                      backgroundColor: 'rgba(34, 197, 94, 0.1)' 
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
                  className="pointer-events-auto max-w-full"
                  locale={de}
                  styles={{
                    caption: { fontSize: 'text-sm sm:text-base' },
                    head_cell: { fontSize: 'text-xs sm:text-sm' },
                    day: { fontSize: 'text-xs sm:text-sm' },
                    caption_label: { fontSize: 'text-sm sm:text-base' }
                  }}
                />
              </div>
            </div>

            {/* Time slots - Improved mobile layout */}
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
              <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-lg p-3 sm:p-5 border border-white/5 h-full">
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-white">
                  {date 
                    ? `Verfügbare Zeiten am ${format(date, 'dd. MMMM yyyy', {locale: de})}`
                    : 'Bitte wählen Sie zuerst ein Datum'
                  }
                </h3>
                
                {timeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={cn(
                          "py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 text-sm border",
                          selectedTimeSlot === time
                            ? "bg-[#22C55E]/20 border-[#22C55E]/30 text-[#22C55E]"
                            : "bg-black/30 border-white/5 text-gray-300 hover:bg-white/5"
                        )}
                      >
                        {time} Uhr
                      </button>
                    ))}
                  </div>
                ) : (
                  date && (
                    <div className="flex flex-col items-center justify-center py-4 sm:py-8 text-gray-400">
                      <CalendarIcon className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-gray-500/50" />
                      <p className="text-sm sm:text-base">Keine Termine verfügbar an diesem Tag.</p>
                      <p className="mt-1 sm:mt-2 text-sm sm:text-base">Bitte wählen Sie ein anderes Datum.</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 w-full lg:w-1/2">
            <Button
              onClick={handleBooking}
              disabled={!date || !selectedTimeSlot || isConfirming}
              className={cn(
                "w-full py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 relative",
                !date || !selectedTimeSlot
                  ? "bg-gray-700/50 text-gray-400"
                  : "bg-[#22C55E] hover:bg-[#1ea34d] text-white shadow-lg shadow-[#22C55E]/20"
              )}
            >
              {isConfirming ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Termin wird gebucht...
                </span>
              ) : (
                <span className="text-sm sm:text-base">
                  {date && selectedTimeSlot 
                    ? `Termin buchen: ${format(date, 'dd.MM.')} um ${selectedTimeSlot} Uhr` 
                    : 'Bitte Datum und Uhrzeit auswählen'}
                </span>
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-6 sm:py-8 bg-black/20 backdrop-blur-md rounded-xl p-4 sm:p-8 border border-white/5 w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#22C55E]/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Check className="h-8 w-8 sm:h-10 sm:w-10 text-[#22C55E]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">Termin erfolgreich gebucht!</h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
            Ihr Termin mit {coachName} am {date && format(date, 'dd.MM.yyyy')} um {selectedTimeSlot} Uhr wurde bestätigt.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
            Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details zu Ihrem {packageType === 'premium' ? 'Premium-Coaching' : 'Community-Onboarding'}.
          </p>
          <Button 
            onClick={() => window.location.href = '/'} 
            className="bg-[#171923] hover:bg-[#222533] text-white border-none text-base sm:text-lg px-6 sm:px-8 py-3 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Zurück zur Startseite
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarBooking;
