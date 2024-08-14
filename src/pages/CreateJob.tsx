import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button, TextField, Grid, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { createJob } from "../services/api";
import BookingCalendar from "../components/BookingCalendar";
import { customerData } from "../mockData/customerData";
import DateRangePicker from "../components/DateRangePicker";

const schema = yup.object().shape({
  customer_id: yup.string(),
  description: yup.string(),
});

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let location = useLocation();
  const customerId = location.state?.customerId;

  const customer =
    customerData.find((customer) => {
      return customer.id === customerId;
    }) ?? location?.state.customer;

  const onSubmit = async (data: any) => {
    if (!selectedTime && !selectedEndTime) {
      toast.error("Please select a start and end time");
      return;
    }

    try {
      const jobData = {
        customer_id: customerId,
        address_id: null,
        schedule: {
          scheduled_start: selectedTime?.toISOString(),
          scheduled_end: selectedEndTime?.toISOString(),
        },
      };
      // @ts-ignore
      await createJob(jobData);
      toast.success("Job created successfully");
      navigate("/jobs", {
        state: {
          customerId,
          customer,
        },
      });
    } catch (error) {
      toast.error("Failed to create job");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create New Job
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "1rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="customer_id"
                    disabled
                    control={control}
                    defaultValue={customer?.id}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Customer ID"
                        fullWidth
                        error={!!errors.customer_id}
                        helperText={errors.customer_id?.message}
                        value={customer?.id}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Job Description"
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "1rem" }}>
              <Typography variant="h6" gutterBottom>
                Select Booking Time
              </Typography>
              <DateRangePicker
                startDate={selectedTime}
                endDate={selectedEndTime}
                setEndDate={setSelectedEndTime}
                setStartDate={setSelectedTime}
              />
              {/* <BookingCalendar onSelectTime={setSelectedTime} /> */}
              {/* {selectedTime && (
                <Typography variant="body1" style={{ marginTop: '1rem' }}>
                  Selected time: {selectedTime.toLocaleString()}
                </Typography>
              )} */}
            </Paper>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          Create Job
        </Button>
      </form>
    </div>
  );
};

export default CreateJob;
