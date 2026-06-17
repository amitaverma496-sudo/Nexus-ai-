import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));

// Initialize Gemini SDK with client option
const geminiApiKey = process.env.GEMINI_API_KEY || "";
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI({ apiKey: geminiApiKey });
}

// REST APIs
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    api: ai ? "enabled" : "disabled",
  });
});

// AI endpoints
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, systemInstruction } = req.body;
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API is not configured. Please add GEMINI_API_KEY in the Secrets panel.",
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Convert messages for @google/genai format
    const formattedContents = messages.map((m: any) => ({
      role: m.role || (m.sender === "user" ? "user" : "model"),
      parts: [{ text: m.text || m.content || "" }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction || "You are NeuralAI, the core intelligence agent inside NeuralOS. Provide insightful, technical, and precise enterprise-focused answers. Keep replies professional, succinct, and structured.",
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const replyText = response.text || "No response received.";
    res.json({
      reply: replyText,
      tokensUsed: replyText.length / 4, // estimate
    });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the Gemini API." });
  }
});

app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { prompt, preset } = req.body;
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API Key is missing. Please add GEMINI_API_KEY to secrets.",
      });
    }

    let systemInstruction = "You are an expert copywriter and system administrator.";
    if (preset === "blog") {
      systemInstruction = "You are a senior tech writer. Draft an engaging, sophisticated engineering blog post based on the topic. Support your arguments with technical concepts, lists, and a professional tone.";
    } else if (preset === "copilot") {
      systemInstruction = "You are a terminal auto-generation engine. Write complete workflow codes, config maps, or scripts in clean YAML or JSON based on requirements. Return raw content only, without markdown wrappers.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });

    res.json({ result: response.text || "" });
  } catch (error: any) {
    console.error("Gemini Generate Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate text." });
  }
});

// Mock Image Generation (AI Image Simulation or using external safe generative mockup inside single view context)
app.post("/api/gemini/image", async (req, res) => {
  try {
    const { prompt, style = "neo-futurism" } = req.body;
    // Generate a beautiful programmatic abstract canvas layout or gradient to serve as generated visual
    const colors = ["#00D1FF", "#BD00FF", "#00FF41", "#3b11ff", "#ed0050", "#ff00d9"];
    const col1 = colors[Math.floor(Math.random() * colors.length)];
    const col2 = colors[Math.floor(Math.random() * colors.length)];
    const id = "img_" + Math.random().toString(36).substr(2, 9);
    
    // Instead of failing when paid key is not configured, we generate an absolute gorgeous SVG/CSS payload that represents the visual artifact!
    const svgUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${col1}"/><stop offset="100%" stop-color="${col2}"/></linearGradient><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white" opacity="0.15"/></pattern></defs><rect width="100%" height="100%" fill="%23020205"/><rect width="100%" height="100%" fill="url(%23g)" opacity="0.15"/><rect width="100%" height="100%" fill="url(%23p)"/><circle cx="300" cy="200" r="120" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="5 10" opacity="0.3"/><circle cx="300" cy="200" r="80" fill="none" stroke="${col1}" stroke-width="1" opacity="0.5"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="white" letter-spacing="4">${prompt.toUpperCase().substring(0, 30)}</text><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="mono" font-size="12" fill="${col1}" letter-spacing="1">STYLE: ${style.toUpperCase()} • RENDERED STABLE</text></svg>`;

    res.json({
      url: svgUrl,
      id,
      prompt,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create abstract." });
  }
});

// File Upload endpoint simulation (Saves locally inside temporary structure or simply returns mock metadata)
app.post("/api/upload", (req, res) => {
  res.json({
    success: true,
    file: {
      id: "f_up_" + Math.random().toString(36).substr(2, 9),
      name: req.body.fileName || "uploaded_manifest.yaml",
      size: req.body.size || "12 KB",
      type: req.body.type || "document",
      updatedAt: new Date().toLocaleString(),
    }
  });
});

// Express route handling
if (process.env.NODE_ENV === "production") {
  // Serve static assets from build output folder
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // Vite Dev Server middleware inside server.ts represents maximum fullstack cohesion
  import("vite").then(({ createServer }) => {
    createServer({
      server: { middlewareMode: true },
      appType: "custom",
    }).then((viteServer) => {
      app.use(viteServer.middlewares);
      app.use("*", async (req, res, next) => {
        const url = req.originalUrl;
        try {
          let template = await viteServer.transformIndexHtml(
            url,
            `<!doctype html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>NeuralOS — Unified Enterprise Cognition Engine</title>
              </head>
              <body>
                <div id="root"></div>
                <script type="module" src="/src/main.tsx"></script>
              </body>
            </html>`
          );
          res.status(200).set({ "Content-Type": "text/html" }).end(template);
        } catch (e) {
          viteServer.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
    });
  });
}

const serverInstance = app.listen(PORT, () => {
  console.log(`[NeuralOS Engine] Listening on port ${PORT}`);
});
