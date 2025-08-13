// routes/metaCapi.js
import express from "express";
import crypto from "crypto";
import fetch from "node-fetch";

const router = express.Router();

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

function sha256Norm(value) {
  if (!value) return undefined;
  return crypto
    .createHash("sha256")
    .update(String(value).trim().toLowerCase())
    .digest("hex");
}

function getCookie(req, name) {
  const match = (req.headers.cookie || "").match(
    new RegExp(`(?:^|; )${name}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

router.post("/meta/purchase", async (req, res) => {
  try {
    const {
      eventId,
      orderId,
      total,
      currency = "INR",
      items,
      email,
      phone,
      eventSourceUrl,
    } = req.body;

    const payload = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: eventSourceUrl,
          action_source: "website",
          event_id: eventId,
          user_data: {
            em: email ? [sha256Norm(email)] : undefined,
            ph: phone ? [sha256Norm(phone)] : undefined,
            client_user_agent: req.get("user-agent"),
            client_ip_address: req.ip,
            fbp: getCookie(req, "_fbp"),
            fbc: getCookie(req, "_fbc"),
          },
          custom_data: {
            currency,
            value: Number(total),
            order_id: orderId,
            contents: items,
            content_type: "product",
            num_items: items?.reduce((n, i) => n + (i.quantity || 0), 0),
          },
        },
      ],
      test_event_code: TEST_EVENT_CODE || undefined,
    };

    const url = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    res.status(response.ok ? 200 : 400).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
