import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { createCustomer } from "../services/api";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile_number: yup.string().required("Mobile number is required"),
  home_number: yup.string(),
  work_number: yup.string(),
  company: yup.string(),
});

const CreateCustomer: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const customer = await createCustomer(data);
      toast.success("Customer created successfully");
      navigate("/jobs", {
        state: {
          customerId: customer?.id,
          customer: customer,
        },
      });
    } catch (error) {
      toast.error("Failed to create customer");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create New Customer
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="first_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="last_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="mobile_number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile Number"
                  fullWidth
                  error={!!errors.mobile_number}
                  helperText={errors.mobile_number?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="home_number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Home Number" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="work_number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Work Number" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="company"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Company" fullWidth />
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          Create Customer
        </Button>
      </form>
    </div>
  );
};

export default CreateCustomer;
