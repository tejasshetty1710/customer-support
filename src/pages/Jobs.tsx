import React, { useState, useEffect, useCallback } from "react";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { toast } from "react-toastify";
import { getJobs } from "../services/api";
import { customerData } from "../mockData/customerData";

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);
  const navigate = useNavigate();
  let location = useLocation();

  const customerId = location.state?.customerId;

  console.log(location.state, "BRUHH");

  useEffect(() => {
    fetchJobs();
  }, [page, rowsPerPage]);

  const fetchJobs = async () => {
    try {
      const response = await getJobs({
        page: page + 1,
        page_size: rowsPerPage,
        ...(customerId ? { customer_id: customerId} : {}),
        // customer_id: customerId,
      });
      setJobs(response.data.jobs);
      setTotalJobs(response.data.total_items);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const customer =
    customerData.find((customer) => {
      return customer.id === customerId;
    }) ?? location.state?.customer;

  const handleCreateJob = useCallback(() => {
    return navigate("/jobs/create", {
      state: {
        customerId,
        customer,
      },
    });
  }, [customerId, customer]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Jobs
      </Typography>
      {customer && (
        <Button
          onClick={handleCreateJob}
          variant="contained"
          color="primary"
          style={{ marginBottom: "1rem" }}
        >
          Create New Job
        </Button>
      )}
      {customerId && customer && (
        <Typography variant="h6" gutterBottom>
          Existing jobs for {customer?.first_name ?? ""}{" "}
          {customer?.last_name ?? ""}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job: any) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>
                  {job.customer?.first_name} {job.customer?.last_name}
                </TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>{job.work_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalJobs}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Jobs;
