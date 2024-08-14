import React from "react";
import { TextField, Box, Typography, Paper } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const handleStartChange = (newValue: Date | null) => {
    setStartDate(newValue);
    if (endDate && newValue && newValue > endDate) {
      setEndDate(null);
    }
  };

  const handleEndChange = (newValue: Date | null) => {
    if (startDate && newValue && newValue < startDate) {
      return;
    }
    setEndDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Select Date Range
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <DateTimePicker
            // @ts-ignore
            //   minDateTime={new Date()}
            label="Start Date and Time"
            // @ts-ignore
            value={startDate}
            // @ts-ignore
            onChange={handleStartChange}
            // @ts-ignore
            maxDateTime={endDate || undefined}
            // @ts-ignore
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="End Date and Time"
            // @ts-ignore
            value={endDate}
            // @ts-ignore
            onChange={handleEndChange}
            // @ts-ignore
            minDateTime={startDate || undefined}
            // @ts-ignore
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        {startDate && endDate && (
          <Box sx={{ mt: 2, p: 2, bgcolor: "primary.light", borderRadius: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Selected Range:
            </Typography>
            <Typography>Start: {startDate.toLocaleString()}</Typography>
            <Typography>End: {endDate.toLocaleString()}</Typography>
          </Box>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
