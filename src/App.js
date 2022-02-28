import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

const cardImages = [
  { src: "/img/card1.png" },
  { src: "/img/card2.png" },
  { src: "/img/card3.png" },
  { src: "/img/card4.png" },
  { src: "/img/card5.png" },
  { src: "/img/card6.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  };

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }
  useEffect(() => {
    if(choiceOne && choiceTwo){

      if(choiceOne.src === choiceTwo.src)
        console.log('those cards match')
        resetTurn()
    } else{
      console.log('those cards do not match')
      resetTurn()
    }
  }, [choiceOne, choiceTwo])



  return (
    <div className="App">
      <h1>Alien Workshop</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}/>
        ))}
      </div>
    </div>
  );
}

export default App;
