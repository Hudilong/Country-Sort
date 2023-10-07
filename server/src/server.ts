import express, { Express, Request, Response } from "express";
import * as fs from "fs";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./pool.js";
import * as url from "url";
import path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:8080",
    })
);
const port = process.env.PORT;

const createScoresTableQuery = fs.readFileSync(
    path.join(__dirname, "../sql/create_scores_table.sql"),
    "utf8"
);

// Execute the query
pool.query(createScoresTableQuery, (err, res) => {
    if (err) {
        console.error("Error executing query", err);
    } else {
        console.log("Table created successfully");
    }
});

app.get("/scores", async (req, res) => {
    try {
        const result = await pool.query(`
        SELECT * FROM scores
        ORDER BY score DESC
        LIMIT 10;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route handler for creating a new score
app.post("/scores", async (req, res) => {
    const { player, score, game_type, difficulty } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO scores (player, score, game_type, difficulty) VALUES ($1, $2, $3, $4) RETURNING *",
            [player, score, game_type, difficulty]
        );

        const newScore = result.rows[0];
        res.status(201).json(newScore);
    } catch (error) {
        console.error("Error creating score:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
