import { useEffect, useState } from 'react';
import FaceUpCard from './face-up-card';

export default function CommunityCards({ x, y, cards }) {

  const [communityCards, setCommunityCards] = useState(cards)

  useEffect(() => {
    setCommunityCards(cards)
  }, [cards.length])

  return (
    <>
      { communityCards.map((card, index) => (
        <FaceUpCard
          key={index}
          x={x + index * 64}
          y={y}
          rank={card.rank}
          suit={card.suit}
        />
      ))}
    </>
  )

}