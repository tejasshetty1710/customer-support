const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

const HCP_BASE_URL = "https://api.housecallpro.com";
const API_KEY = process.env.HCP_API_KEY;

const makeApiCall = async (method, path, data = null, params = null) => {
  try {
    const response = await axios({
      method,
      url: `${HCP_BASE_URL}${path}`,
      headers: {
        Authorization: `Token ${API_KEY}`,
      },
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error.response?.data || error.message);
    throw error;
  }
};

app.get("/customers", async (req, res) => {
  try {
    const data = await makeApiCall("get", "/customers", null, req.query);
    res.json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
});

app.post("/customers", async (req, res) => {
  try {
    const data = await makeApiCall("post", "/customers", req.body, req.query);
    res.json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
});

app.get("/booking_windows", async (req, res) => {
  try {
    const data = await makeApiCall(
      "get",
      "/company/schedule_availability/booking_windows",
      null,
      req.query,
    );
    res.json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
});

app.get("/jobs", async (req, res) => {
  try {
    const data = await makeApiCall("get", "/jobs", null, req.query);
    res.json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
});

app.post("/jobs", async (req, res) => {
  try {
    const data = await makeApiCall("post", "/jobs", req.body, req.query);
    res.json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
});

app.get("/jobs/:id", async (req, res) => {
  try {
    const data = await makeApiCall("get", `/jobs/${req.params.id}`);
    res.json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
});

app.put("/jobs/:id", async (req, res) => {
  try {
    const data = await makeApiCall("put", `/jobs/${req.params.id}`, req.body);
    res.json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    const data = await makeApiCall("delete", `/jobs/${req.params.id}`);
    res.json(data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Using API key: ${API_KEY.substring(0, 5)}...`);
});
