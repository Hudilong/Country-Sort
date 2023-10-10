import { DragEndEvent } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import {
    CountryInfo,
    CountryData,
    GameSettings,
    GameType,
    GameState,
} from "../types";
import toCountry from "../utils/toCountry";

const defaultState: GameState = {
    isGameOngoing: true,
    round: 1,
    roundTime: 0,
    triesLeft: 3,
    score: 0,
};

const defaultSettings: GameSettings = {
    type: "area",
    difficulty: "easy",
};

export default function useGameLogic() {
    const [gameSettings, setGamesSettings] =
        useState<GameSettings>(defaultSettings);
    const [gameState, setGameState] = useState<GameState>({
        ...defaultState,
        isGameOngoing: false,
    });
    const [countries, setCountries] = useState<CountryInfo[]>([]);
    const [inGameCountries, setInGameCountries] = useState<CountryInfo[]>([]);
    const [solution, setSolution] = useState<CountryInfo[]>([]);
    const [playerCards, setPlayerCards] = useState<(CountryInfo | undefined)[]>(
        []
    );
    const [playerAnswer, setPlayerAnswer] = useState<
        (CountryInfo | undefined)[]
    >([]);

    //Call RESTCountries API and load countries into memory
    useEffect(() => {
        loadCountries();
    }, []);

    //Select new countries when we change game settings
    useEffect(() => {
        selectNewCountries();
    }, [countries, gameSettings]);

    // Sorts the in-game countries
    useEffect(() => {
        inGameCountries && sortCountriesBy(gameSettings.type);
    }, [inGameCountries]);

    useEffect(() => {
        resetPlayerAnswer();
    }, [solution]);

    //Update time every second if game is ongoing
    useEffect(() => {
        const interval = setInterval(() => {
            if (gameState.isGameOngoing) {
                updateGameState("roundTime", gameState.roundTime + 1);
            }
        }, 1000); // Update every second

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [gameState.roundTime, gameState.isGameOngoing]);

    //Update Game UI when player makes a move
    useEffect(() => {
        updateCards();
    }, [playerAnswer]);

    //Display message when game is over
    useEffect(() => {
        !gameState.isGameOngoing &&
            gameState.triesLeft === 0 &&
            console.log("Game Over!\nYou scored:", gameState.score, "points");
    }, [gameState.isGameOngoing]);

    //Display message when user makes unsuccessful try
    //End game if no more tries left
    useEffect(() => {
        gameState.triesLeft !== 3 &&
            console.log(
                "Wrong answer, you have ",
                gameState.triesLeft,
                " tries left"
            );
        gameState.triesLeft === 0 && updateGameState("isGameOngoing", false);
    }, [gameState.triesLeft]);

    async function loadCountries() {
        fetch(
            `https://restcountries.com/v3.1/all?fields=name,flags,independent,population,area`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const independent = data.filter(
                    (country: { independent: boolean }) =>
                        country.independent === true
                );
                const filtered: CountryInfo[] = independent.map(
                    (country: CountryData, index: number) =>
                        toCountry(country, index)
                );
                setCountries(filtered);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function newGame() {
        setGameState(defaultState);
        //Select 5 random countries
        selectNewCountries();
    }

    //Check answer and decrement triesLeft if wrong
    function submit() {
        if (JSON.stringify(playerAnswer) !== JSON.stringify(solution)) {
            updateGameState("triesLeft", gameState.triesLeft - 1);
        } else {
            const pointsEarned = calculateScore();
            setGameState({
                ...gameState,
                score: gameState.score + pointsEarned,
                round: gameState.round + 1,
                triesLeft: 3,
                roundTime: 0,
            });
            resetPlayerAnswer();
            selectNewCountries();
        }
    }

    function calculateScore() {
        const { triesLeft, roundTime } = gameState;
        const difficultyMultiplier = () => {
            switch (gameSettings?.difficulty) {
                case "easy":
                    return 10;
                case "medium":
                    return 13;
                case "hard":
                    return 16;
            }
        };
        const roundTimeMultiplier = () => {
            switch (true) {
                case roundTime < 5:
                    return 30;
                case roundTime < 10:
                    return 20;
                case roundTime < 15:
                    return 15;
                default:
                    return 1;
            }
        };
        const pointsEarned =
            1 * triesLeft * difficultyMultiplier()! * roundTimeMultiplier();
        return pointsEarned;
    }

    function updateGameState(field: keyof GameState, value: boolean | number) {
        setGameState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    }

    function resetAnswer() {
        resetPlayerAnswer();
        setPlayerCards(inGameCountries);
    }

    //If game type is by name, the sorting is opposite
    function sortCountriesBy(type: GameType) {
        const orderedCountries = [...inGameCountries].sort(function (a, b) {
            if (a[type] < b[type]) {
                return type === "name" ? -1 : 1;
            }
            if (a[type] > b[type]) {
                return type === "name" ? 1 : -1;
            }
            return 0;
        });
        setSolution(orderedCountries);
    }

    //Select 3, 4 or 5 random countries base on difficulty setting
    function selectNewCountries() {
        const selectedIndices: CountryInfo[] = [];
        const numberOfCountries = () => {
            switch (gameSettings?.difficulty) {
                case "easy":
                    return 3;
                case "medium":
                    return 4;
                case "hard":
                    return 5;
            }
        };
        let i = 0;
        while (i < numberOfCountries()! && i < countries.length) {
            const cIndex = Math.floor(Math.random() * countries.length);
            if (!selectedIndices.includes(countries[cIndex])) {
                selectedIndices.push(countries[cIndex]);
                i++;
            }
        }
        setInGameCountries(selectedIndices);
        setPlayerCards(selectedIndices);
    }

    //Check for match between playerCard and playerAnswer
    function updateCards() {
        const match = playerCards.filter((country) =>
            playerAnswer.includes(country)
        );
        const newCountryList = [...playerCards];
        newCountryList.forEach((country, index) => {
            if (match.includes(country)) {
                //Remove matches from playerCards
                newCountryList[index] = undefined;
            }
        });
        setPlayerCards(newCountryList);
    }

    //Add the country removed from the playerAnswer to the playerCards
    function clearSlot(id: number) {
        const index = inGameCountries.findIndex((country) => country.id === id);
        const newCountryList = [...playerCards];
        newCountryList[index] = inGameCountries[index];
        setPlayerCards(newCountryList);
        const jndex = playerAnswer.findIndex((country) => country?.id === id);
        const newPlayerCards = [...playerAnswer];
        newPlayerCards[jndex] = undefined;
        setPlayerAnswer(newPlayerCards);
    }

    function resetPlayerAnswer() {
        setPlayerAnswer(inGameCountries.map(() => undefined));
    }

    //Using DnDKit library to pass information between Draggable & Droppables
    //Copy  dropped item from PlayerCard to PlayerAnswer
    function handleDragEnd(event: DragEndEvent) {
        const { over, active } = event;
        const index = over?.id as number; //I chose to use numbers
        const data = active.data as { current: CountryInfo }; //Don't know why data has a 'current' field instead of just having value.
        const newAnswer = [...playerAnswer];
        if (over) {
            newAnswer[index] = data.current as CountryInfo;
            setPlayerAnswer(newAnswer);
        }
    }

    return {
        handleDragEnd,
        playerAnswer,
        playerCards,
        newGame,
        resetAnswer,
        submit,
        clearSlot,
        gameSettings,
        gameState,
        setGamesSettings,
        updateGameState,
    };
}
