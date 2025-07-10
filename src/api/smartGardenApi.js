import axios from "axios";

// Ganti dengan URL API yang sesuai
const API_URL = "https://smartgarden-bypanji.my.id/api/index.php";

export const getSensorData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Mengembalikan data array dari API
  } catch (error) {
    console.error("Failed to fetch sensor data:", error);
    throw error;
  }
};
