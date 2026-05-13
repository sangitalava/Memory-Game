import Card from "./Card";

function Board({ cards, handleClick }) {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}

export default Board;