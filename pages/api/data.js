// File: /api/data.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.irricheckdata.co.za/jonker/sample.php"
    );
    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
}
