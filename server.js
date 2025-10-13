// STEP 1: include required packages
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// STEP 2: link to your WhatsApp API details
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP_NUMBER; // your phone

// STEP 3: when someone fills the form, send the message
app.post('/contact', async (req, res) => {
  const { name, email, mobile, message } = req.body;

  // message to send to your WhatsApp
  const textBody = `
📩 New Enquiry — Wheelkart Website
Name: ${name}
Mobile: ${mobile}
Email: ${email}
Message: ${message}
`;

  const response = await fetch(`https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: ADMIN_WHATSAPP,
      type: "text",
      text: { body: textBody }
    })
  });

  const data = await response.json();
  console.log("WhatsApp API response:", data);

  res.json({ success: true });
});

// STEP 4: start the small local server
const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
