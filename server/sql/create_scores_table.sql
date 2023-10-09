CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    player VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL,
    game_type VARCHAR(10) CHECK (game_type IN ('area', 'name', 'population')) NOT NULL,
    difficulty VARCHAR(10) CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL,
    date_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);