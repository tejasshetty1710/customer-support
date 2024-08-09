import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { format, addDays, isSameDay } from 'date-fns';
import { getBookingWindows } from '../services/api';

interface BookingCalendarProps {
  onSelectTime: (time: Date) => void;
}

const bookingWindowsData = [{start_time: '2024-08-06T14:15:00Z'}, {start_time: '2024-08-06T15:15:00Z'}]

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onSelectTime }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookingWindows, setBookingWindows] = useState<any[]>([]);

  useEffect(() => {
    fetchBookingWindows(selectedDate);
  }, [selectedDate]);

  const fetchBookingWindows = async (date: Date) => {
    try {
      const response = await getBookingWindows(format(date, 'yyyy-MM-dd'));
      setBookingWindows(response.data.booking_windows);
    } catch (error) {
        setBookingWindows(bookingWindowsData)
      console.error('Failed to fetch booking windows', error);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    const [hours, minutes] = time.split(':');
    const selectedTime = new Date(selectedDate);
    selectedTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    onSelectTime(selectedTime);
  };

  const renderDateButtons = () => {
    const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
    return dates.map((date) => (
      <Grid item key={date.toISOString()}>
        <Button
          variant={isSameDay(date, selectedDate) ? 'contained' : 'outlined'}
          onClick={() => handleDateSelect(date)}
        >
          {format(date, 'MMM d')}
        </Button>
      </Grid>
    ));
  };

  const renderTimeSlots = () => {
    return bookingWindows.map((window) => (
      <Grid item key={window.start_time}>
        <Button
          variant="outlined"
          onClick={() => handleTimeSelect(format(new Date(window.start_time), 'HH:mm'))}
        >
          {format(new Date(window.start_time), 'h:mm a')}
        </Button>
      </Grid>
    ));
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '1rem' }}>
        {renderDateButtons()}
      </Grid>
      <Typography variant="h6" gutterBottom>
        Available time slots for {format(selectedDate, 'MMMM d, yyyy')}:
      </Typography>
      <Grid container spacing={2}>
        {renderTimeSlots()}
      </Grid>
    </div>
  );
};

export default BookingCalendar;