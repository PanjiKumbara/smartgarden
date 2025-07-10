import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

// Fungsi untuk mengambil data cuaca real-time
const fetchWeatherData = async () => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Ganti dengan API key Anda
  const city = "Tangerang";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`;

  try {
    const response = await axios.get(url);
    if (response.data.cod === 200) {
      return `Cuaca hari ini di ${city} adalah ${response.data.weather[0].description} dengan suhu ${response.data.main.temp}°C.`;
    } else {
      return "Tidak dapat mengambil data cuaca.";
    }
  } catch (error) {
    console.error(error);
    return "Terjadi kesalahan saat mengambil data cuaca.";
  }
};

// Fungsi untuk menggunakan OpenAI API
const generateAIResponse = async (query) => {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Ganti dengan API Key OpenAI Anda

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Pastikan model yang digunakan benar
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: query },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Return the AI's response
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    return "Maaf, saya tidak dapat memahami pertanyaan ini.";
  }
};

// Fungsi untuk menangani input dari pengguna
const handleChatInput = async (query) => {
  if (query.toLowerCase().includes("cuaca")) {
    return await fetchWeatherData(); // Mengambil data cuaca real-time
  } else {
    return await generateAIResponse(query); // Menggunakan GPT untuk menjawab pertanyaan lainnya
  }
};

// Komponen Chatbot
const ChatAI = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: "User", message: userInput },
    ]);

    const response = await handleChatInput(userInput);

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: "AI", message: response },
    ]);

    setUserInput(""); // Clear input field
  };

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 500,
        margin: "0 auto",
        backgroundColor: "#f1f8e9",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" color="green" gutterBottom>
        Chatbot Smart Garden
      </Typography>
      <Box sx={{ maxHeight: "300px", overflowY: "auto", mb: 2 }}>
        {chatHistory.map((chat, index) => (
          <Typography
            key={index}
            sx={{ color: chat.sender === "AI" ? "green" : "blue" }}
          >
            <strong>{chat.sender}: </strong>
            {chat.message}
          </Typography>
        ))}
      </Box>
      <TextField
        label="Tanya sesuatu..."
        fullWidth
        variant="outlined"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handleSendMessage}
      >
        Kirim
      </Button>
    </Box>
  );
};

export default ChatAI;
