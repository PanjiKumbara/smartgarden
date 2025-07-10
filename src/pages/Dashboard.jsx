import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import SpaIcon from "@mui/icons-material/Spa";
import NatureIcon from "@mui/icons-material/Nature";
import { getSensorData } from "../api/smartGardenApi";
import SensorCard from "../components/sensorcard";
import SensorTable from "../components/SensorTable";
import Loading from "../components/Loading";
import Chart from "../components/Chart";
import ChatAI from "../components/ChatAI";

const drawerWidth = 240;

const Dashboard = () => {
  const [sensorList, setSensorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Tabel");
  const [showCard, setShowCard] = useState(true);

  // Ambil data sensor secara otomatis dan polling setiap 10 detik
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const data = await getSensorData();
        setSensorList(data); // Update state dengan data terbaru
      } catch (error) {
        console.error("Error mengambil data:", error);
        setSensorList([]); // Set list kosong jika gagal
      } finally {
        setLoading(false); // Set loading false setelah data diambil
      }
    };

    // Ambil data pertama kali saat halaman dimuat
    fetchSensorData();

    // Polling setiap 10 detik
    const intervalId = setInterval(fetchSensorData, 10000);

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading || sensorList.length === 0) {
    return <Loading />; // Tampilkan loading jika data belum diambil
  }

  const latestData = sensorList[0];

  const navItems = [
    { text: "Tabel", icon: <LocalFloristIcon /> },
    { text: "Grafik", icon: <SpaIcon /> },
    { text: "Chat AI", icon: <NatureIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#e8f5e9",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" fontWeight="bold" color="green">
            🌱 Smart Garden
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={selectedTab === item.text}
              onClick={() => setSelectedTab(item.text)}
            >
              <ListItemIcon sx={{ color: "#388e3c" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f1f8e9",
          minHeight: "100vh",
        }}
      >
        <AppBar
          position="sticky"
          elevation={1}
          sx={{ backgroundColor: "#66bb6a", mb: 2 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Smart Garden Dashboard
            </Typography>
            <Typography variant="body2">
              Monitor Tanaman Secara Real-time
            </Typography>
          </Toolbar>
        </AppBar>

        <Container>
          {/* Header dan Tombol */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4" color="green" fontWeight="bold">
              {selectedTab === "Tabel"
                ? "Data Sensor"
                : selectedTab === "Grafik"
                ? "Grafik Sensor"
                : "Chat AI"}
            </Typography>
            {selectedTab === "Tabel" && (
              <Button
                variant="contained"
                color="success"
                onClick={() => setShowCard(!showCard)}
              >
                {showCard ? "Sembunyikan Card" : "Tampilkan Card"}
              </Button>
            )}
          </Box>

          {/* Konten Berdasarkan Tab */}
          {selectedTab === "Tabel" && (
            <>
              {showCard && (
                <Box display="flex" justifyContent="center" mb={4}>
                  <Grid container spacing={3} maxWidth="md">
                    <Grid item xs={12} sm={4}>
                      <SensorCard
                        title="Soil Moisture"
                        value={latestData.soil_moisture}
                        unit="%"
                        icon={<SpaIcon sx={{ color: "green" }} />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <SensorCard
                        title="Humidity"
                        value={latestData.humidity}
                        unit="%"
                        icon={<LocalFloristIcon sx={{ color: "teal" }} />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <SensorCard
                        title="Temperature"
                        value={latestData.temperature}
                        unit="°C"
                        icon={<NatureIcon sx={{ color: "orange" }} />}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
              <Paper elevation={2}>
                <SensorTable data={sensorList} />
              </Paper>
            </>
          )}

          {selectedTab === "Grafik" && (
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Chart data={sensorList} />
            </Paper>
          )}

          {selectedTab === "Chat AI" && (
            <Paper elevation={2} sx={{ padding: 4 }}>
              <ChatAI />
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
