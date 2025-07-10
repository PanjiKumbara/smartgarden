import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import NatureIcon from "@mui/icons-material/Nature";
import SpaIcon from "@mui/icons-material/Spa";

const SensorCard = ({ title, value, unit, trend = "up" }) => {
  // Pilih ikon berdasarkan jenis sensor
  const getIcon = () => {
    if (title.toLowerCase().includes("soil")) {
      return <SpaIcon sx={{ fontSize: 40, color: "white" }} />;
    } else if (title.toLowerCase().includes("humidity")) {
      return <LocalFloristIcon sx={{ fontSize: 40, color: "white" }} />;
    } else if (title.toLowerCase().includes("temperature")) {
      return <NatureIcon sx={{ fontSize: 40, color: "white" }} />;
    } else {
      return null;
    }
  };

  // Warna latar belakang berdasarkan jenis sensor
  const getBackgroundColor = () => {
    if (title.toLowerCase().includes("soil")) return "#43a047"; // hijau tanah
    if (title.toLowerCase().includes("humidity")) return "#00897b"; // hijau kebiruan
    if (title.toLowerCase().includes("temperature")) return "#f57c00"; // oranye hangat
    return "#388e3c"; // default hijau
  };

  return (
    <Card sx={{ backgroundColor: getBackgroundColor(), borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>{getIcon()}</Grid>
          <Grid item>
            {trend === "up" ? (
              <ArrowUpward sx={{ color: "white" }} />
            ) : (
              <ArrowDownward sx={{ color: "white" }} />
            )}
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom sx={{ color: "white", mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
          {value} {unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
