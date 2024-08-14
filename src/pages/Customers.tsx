import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
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
import { getCustomers } from "../services/api";
import { Customer } from "../types/customer";
import { customerData } from "../mockData/customerData";
import { debounce } from "../utils/utils";

const handleBackupData = (search: string) => {
  const lowerCaseSearch = search.toLowerCase();
  if (!search) {
    return customerData;
  }
  return customerData.filter((customer) => {
    return (
      customer.email?.toLowerCase()?.includes(lowerCaseSearch) ||
      customer.mobile_number?.toLowerCase()?.includes(lowerCaseSearch) ||
      customer.first_name?.toLowerCase()?.includes(lowerCaseSearch) ||
      customer.last_name?.toLowerCase()?.includes(lowerCaseSearch)
    );
  });
};

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [search, setSearch] = useState("");
  const [totalCustomers, setTotalCustomers] = useState(0);
  const navigate = useNavigate();

  const fetchCustomers = async (search = "") => {
    try {
      const response = await getCustomers({
        page: page + 1,
        q: search,
        page_size: rowsPerPage,
      });
      setCustomers(response.data?.customers);
      setTotalCustomers(response.data?.total_items);
    } catch (error) {
      const backupResponse = handleBackupData(search ?? "");
      setCustomers(backupResponse);
      setTotalCustomers(backupResponse.length);
      toast.error("Failed to fetch customers");
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchCustomers, 300), []);

  const handleInputChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetchResults(value);
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowCick = useCallback(
    (customerId: string) => {
      return navigate("/jobs/create", {
        state: {
          customerId,
          customer: customers.find((customer: Customer) => {
            return customer.id === customerId;
          }),
        },
      });
    },
    [customers],
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create a job
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          label="Search existing customer"
          variant="outlined"
          value={search}
          onChange={handleInputChange}
          style={{ marginBottom: "1rem", width: "400px" }}
        />
        <Button
          component={Link}
          to="/customers/create"
          variant="contained"
          color="primary"
          style={{ marginBottom: "1rem" }}
        >
          Create New Customer
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer: any) => (
              <TableRow>
                <TableCell>{`${customer.first_name} ${customer.last_name}`}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.mobile_number}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleRowCick(customer.id)}
                    color="info"
                  >
                    Create a job
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCustomers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Customers;
