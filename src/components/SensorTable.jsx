import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import GrassIcon from "@mui/icons-material/Grass";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SpaIcon from "@mui/icons-material/Spa";

const SensorTable = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        backgroundColor: "#f1f8e9", // hijau sangat muda
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#388e3c" }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Waktu</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              <Box display="flex" alignItems="center" gap={1}>
                <SpaIcon fontSize="small" />
                Kelembaban Tanah
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              <Box display="flex" alignItems="center" gap={1}>
                <OpacityIcon fontSize="small" />
                Kelembaban Udara
              </Box>
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              <Box display="flex" alignItems="center" gap={1}>
                <ThermostatIcon fontSize="small" />
                Suhu
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((sensor, index) => (
            <TableRow
              key={sensor.id}
              sx={{
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#e8f5e9",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#c8e6c9",
                },
              }}
            >
              <TableCell>{sensor.id}</TableCell>
              <TableCell>{sensor.timestamp}</TableCell>
              <TableCell>{sensor.soil_moisture}%</TableCell>
              <TableCell>{sensor.humidity}%</TableCell>
              <TableCell>{sensor.temperature}°C</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SensorTable;
