const express = require("express");
const router = express.Router();
const connectDb = require("../models/db");

function createAccentInsensitiveRegex(str) {
  const accentMap = {
    a: "[aàáâãäåâă]",
    c: "[cç]",
    e: "[eèéêë]",
    i: "[iìíîï]",
    n: "[nñ]",
    m: "[m]",
    o: "[oòóôõö]",
    u: "[uùúûü]",
    y: "[yÿ]",
    A: "[AÀÁÂÃÄÅ]",
    C: "[CÇ]",
    E: "[EÈÉÊ]",
    I: "[IÌÍÎÏ]",
    N: "[NÑ]",
    O: "[OÒÓÔÕÖ]",
    U: "[UÙÚÛÜ]",
    Y: "[YŸ]",
  };
  const regexStr = str
    .split("")
    .map((char) => accentMap[char] || char)
    .join("");
  console.log("Generated regex string:", regexStr); // Log the generated regex string
  return new RegExp(regexStr, "i"); // Case-insensitive
}

// GET route for searching movies
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection("phim");
    const searchTerm = req.query.name;
    // Log the received search term
    console.log("Received search term:", searchTerm);

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Create a regex from the search term
    const searchRegex = createAccentInsensitiveRegex(searchTerm);
    console.log("Constructed regex:", searchRegex);

    // Perform the query
    const phim = await productCollection
      .find({
        $or: [{ Ten: { $regex: searchRegex } }],
      })
      .toArray();

    if (phim.length > 0) {
      res.status(200).json(phim);
    } else {
      res.status(404).json({ message: "No movies found" });
    }
  } catch (error) {
    // Log the entire error object for more information
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
