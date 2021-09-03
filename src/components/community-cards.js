import { useEffect, useState } from 'react';
import FaceUpCard from './face-up-card';
import { animated, useTransition } from '@react-spring/web';
import { Sound } from '../lib/sound';
import dealCardAudio from '../audio/deal-card.mp3';

const AnimatedFaceUpCard = animated(FaceUpCard);
const dealCardSound = new Sound(dealCardAudio);

export default function CommunityCards({ x, y, cards }) {
  const [communityCards, setCommunityCards] = useState(cards);

  const transitions = useTransition(communityCards, {
    enter: { y, globalAlpha: 1 },
    from: { y: y - 82, globalAlpha: 0 },
    trail: 800,
    keys: card => card.rank + card.suit,
    onStart: () => {
      dealCardSound.play();
    },
  });

  useEffect(() => {
    setCommunityCards(cards);
    // eslint-disable-next-line
  }, [cards.length]);

  return transitions((animatedProps, card, transition, index) => (
    <AnimatedFaceUpCard
      {...animatedProps}
      x={x + index * 64}
      rank={card.rank}
      suit={card.suit}
    />
  ));
}