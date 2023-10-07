import { ReactNode, createContext, useContext } from "react";
import useGameLogic from "../hooks/useGameLogic";
import { DragEndEvent } from "@dnd-kit/core";
import { CountryInfo, GameSettings, GameState } from "../types";

type Props = {
    children: ReactNode;
};

type GameProviderProps = {
    handleDragEnd: (event: DragEndEvent) => void;
    playerAnswer: (CountryInfo | undefined)[];
    playerCards: (CountryInfo | undefined)[];
    resetAnswer: () => void;
    newGame: () => void;
    submit: () => void;
    clearSlot: (id: number) => void;
    gameSettings: GameSettings | undefined;
    gameState: GameState;
    setGamesSettings: (gameSettings: GameSettings) => void;
    updateGameState: (field: keyof GameState, value: number | boolean) => void;
};

const GameContext = createContext<GameProviderProps | undefined>(undefined);

export function useGameContext() {
    return useContext(GameContext);
}

export function GameProvider({ children }: Props) {
    const {
        handleDragEnd,
        playerAnswer,
        playerCards,
        newGame,
        submit,
        resetAnswer,
        clearSlot,
        gameSettings,
        setGamesSettings,
        gameState,
        updateGameState,
    } = useGameLogic();

    return (
        <GameContext.Provider
            value={{
                handleDragEnd,
                playerAnswer,
                playerCards,
                newGame,
                submit,
                resetAnswer,
                clearSlot,
                gameSettings,
                gameState,
                updateGameState,
                setGamesSettings,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}
