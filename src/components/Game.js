import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Game.css';

const Game = () => {
    const [score, setScore] = useState(0);
    const [currentLetter, setCurrentLetter] = useState('');
    const [position, setPosition] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [gameSpeed, setGameSpeed] = useState(5);
    const [consecutiveHits, setConsecutiveHits] = useState(0);
    const [isHit, setIsHit] = useState(false);


    const jump = useCallback(() => {
        if (!isJumping) {
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 500);
        }
    }, [isJumping]);

    const generateNewLetter = useCallback(() => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        setCurrentLetter(randomLetter);
        setIsHit(false);
    }, []);
    
    const handleKeyPress = useCallback((event) => {
        if (event.key.toUpperCase() === currentLetter) {
            jump();
            setScore(prev => prev + 1);
            setConsecutiveHits(prev => prev + 1);
            setIsHit(true);
            
            setTimeout(generateNewLetter, 300); // Wait for the disappear animation

            if (consecutiveHits >= 10) {
                setGameSpeed(prev => prev + 1);
                setConsecutiveHits(0);
            }
        } else {
            setConsecutiveHits(0);
        }
    }, [currentLetter, consecutiveHits, jump, generateNewLetter]);
    useEffect(() => {
        generateNewLetter();
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentLetter]);

    return (
        <div className="game-container">
            <div className="score">Pontos: {score}</div>
            <div className={`mario-character ${isJumping ? 'jump' : ''}`} />
            <div className={`block ${isHit ? 'hit' : ''}`} style={{ right: position }}>
                {currentLetter}
            </div>
        </div>
    );
};

export default Game;