const express = require("express");
const cors = require("cors"); // Import the cors package

const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json());

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate the input
    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, error: "Invalid input format" });
    }

    // Separate numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter(
      (item) => isNaN(item) && typeof item === "string"
    );

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter((char) => /^[a-z]$/.test(char));
    const highestLowercaseAlphabet =
      lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    res.status(200).json({
      is_success: true,
      user_id: "PALADUGU AASHRITHA",
      email: "aashritha.21bce7241@vitapstudent.ac.in",
      roll_number: "21BCE7241",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
