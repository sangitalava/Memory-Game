
import "./App.css";
import "./components/styles/style.css";
import Board from "./components/Board";

import { useState, useEffect } from "react";
import "./App.css";

const emojis = ["🐶", "🐱", "🐸", "🦊", "🐼", "🐵", "🐷", "🐰"];

function App() {
  //  ALL hooks here (TOP LEVEL ONLY)
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [moves, setMoves] = useState(0);
  const [hasWon, setHasWon] = useState(false);
/* shuffle logic */
  function shuffleCards() {
    const duplicated = [...emojis, ...emojis];

    const shuffled = duplicated
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
      }))
      .sort(() => Math.random() - 0.5); // this randomize card

    setCards(shuffled);
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  //  NORMAL FUNCTION (no hooks inside)
  function handleClick(card) {
    if (card.flipped || secondCard) return;

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c)),
    );

    const updatedCard = { ...card, flipped: true };

if (!firstCard) {
  setFirstCard(updatedCard);
} else {
  setSecondCard(updatedCard);
  setMoves((prev) => prev + 1);
}
  }

  // here added reset logic 

  function handleRestart() {
  shuffleCards();
  setFirstCard(null);
  setSecondCard(null);
  setMoves(0);
  setHasWon(false);
}

  // end of reset logic

  //  MATCH LOGIC
  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.emoji === secondCard.emoji) {
        setFirstCard(null);
        setSecondCard(null);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card,
            ),
          );

          setFirstCard(null);
          setSecondCard(null);
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  //Win Detection
  useEffect(() => {
  if (cards.length > 0 && cards.every(card => card.flipped)) {
    setTimeout(() => {
      setHasWon(true);
    }, 300);
  }
}, [cards]);

  return (
    <div className="app">
      <h1>Memory Game </h1>
      <p>Moves: {moves}</p>
      

      {hasWon && (
  <div className="win-message">
    🎉 You Won in {moves} moves!
  </div>
)}

      <div className="board">
        {cards.map((card) => (
          <div className="card" key={card.id} onClick={() => handleClick(card)}>
            {card.flipped ? card.emoji : "❓"}
          </div>
        ))}
        
      </div>
      <button className="restart" onClick={handleRestart}>
  Restart Game
</button>
    </div>
  );
}

export default App;
