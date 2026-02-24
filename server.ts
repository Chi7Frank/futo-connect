import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("futo_connect.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS announcements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    tag TEXT NOT NULL,
    time TEXT NOT NULL,
    isUrgent INTEGER DEFAULT 0,
    isRead INTEGER DEFAULT 0,
    isSaved INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed initial data if empty
const count = db.prepare("SELECT count(*) as count FROM announcements").get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO announcements (id, title, description, category, tag, time, isUrgent, isRead, isSaved)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  insert.run('1', 'Rescheduling of GST 101 Exams', 'All students of the Federal University of Technology, Owerri are hereby informed that the GST 101 examinations scheduled for Friday...', 'Urgent', 'EXAMS', '2 hours ago', 1, 0, 0);
  insert.run('2', 'Inter-Faculty Football Championship 2024', 'The Directorate of Sports is pleased to announce the kick-off of the annual Inter-faculty football tournament. Registration for teams...', 'General', 'SPORTS', '5 hours ago', 0, 0, 0);
  insert.run('3', 'Release of 2022/2023 Harmattan Results', 'The Senate has approved the release of results for the 2022/2023 Harmattan semester. Students can now check their portals...', 'Academic', 'RESULTS', 'Yesterday', 0, 1, 1);
  insert.run('4', 'FUTO Tech Innovation Summit', 'Join us for the 5th Annual Tech Innovation Summit featuring guest speakers from major tech companies across Nigeria...', 'Events', 'WORKSHOP', 'Oct 12', 0, 0, 0);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/announcements", (req, res) => {
    const announcements = db.prepare("SELECT * FROM announcements ORDER BY createdAt DESC").all();
    res.json(announcements.map((a: any) => ({
      ...a,
      isUrgent: Boolean(a.isUrgent),
      isRead: Boolean(a.isRead),
      isSaved: Boolean(a.isSaved)
    })));
  });

  app.post("/api/announcements", (req, res) => {
    const { title, description, category, tag, isUrgent } = req.body;
    const id = Math.random().toString(36).substr(2, 9);
    const time = "Just now";
    
    try {
      const insert = db.prepare(`
        INSERT INTO announcements (id, title, description, category, tag, time, isUrgent, isRead, isSaved)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insert.run(id, title, description, category, tag, time, isUrgent ? 1 : 0, 0, 0);
      
      const newAnnouncement = db.prepare("SELECT * FROM announcements WHERE id = ?").get(id);
      res.status(201).json(newAnnouncement);
    } catch (error) {
      res.status(500).json({ error: "Failed to create announcement" });
    }
  });

  app.patch("/api/announcements/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, category, tag, isUrgent } = req.body;
    
    try {
      db.prepare(`
        UPDATE announcements 
        SET title = ?, description = ?, category = ?, tag = ?, isUrgent = ?
        WHERE id = ?
      `).run(title, description, category, tag, isUrgent ? 1 : 0, id);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to update announcement" });
    }
  });

  app.delete("/api/announcements/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM announcements WHERE id = ?").run(id);
    res.status(204).send();
  });

  app.patch("/api/announcements/:id/read", (req, res) => {
    const { id } = req.params;
    db.prepare("UPDATE announcements SET isRead = 1 WHERE id = ?").run(id);
    res.status(200).send();
  });

  app.patch("/api/announcements/:id/toggle-save", (req, res) => {
    const { id } = req.params;
    const announcement = db.prepare("SELECT isSaved FROM announcements WHERE id = ?").get(id) as any;
    if (announcement) {
      const newValue = announcement.isSaved ? 0 : 1;
      db.prepare("UPDATE announcements SET isSaved = ? WHERE id = ?").run(newValue, id);
      res.status(200).json({ isSaved: Boolean(newValue) });
    } else {
      res.status(404).send();
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
