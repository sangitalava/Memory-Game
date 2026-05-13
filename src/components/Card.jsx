function Card({ card, handleClick }) {
  return (
    <div
      className="card"
      onClick={() => handleClick(card)}
    >
      {card.flipped ? card.emoji : "❓"}
    </div>
  );
}

export default Card;