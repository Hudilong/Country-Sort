export type CountryInfo = {
    id: number;
    name: string;
    population: number;
    area: number;
    flagUrl: string;
};

export type CountryData = {
    name?: Data;
    flags?: Data;
    independent?: boolean;
    population?: number;
    area?: number;
    [key: string]: unknown;
};

export type Data = {
    common?: string;
    svg?: string;
    [key: string]: unknown;
};

export type APIResponse = {
    data?: CountryData | CountryData[];
    message?: string;
};

export type GameSettings = {
    type: GameType;
    difficulty: GameDifficulty;
};

export type GameType = "name" | "area" | "population";

export type GameDifficulty = "easy" | "medium" | "hard";

export type GameState = {
    isGameOngoing: boolean;
    round: number;
    score: number;
    triesLeft: number;
    roundTime: number;
};

export type Score = {
    player: string;
    score: number;
    gameType: GameType;
    date: Date;
};

export type ServerScore = {
    player: string;
    score: number;
    game_type: GameType;
    date_played: Date;
};
