import FaceUpCard from './face-up-card';
import { animated, useTransition } from '@react-spring/web';
import { Sound } from '../lib/sound';
import dealCardAudio from '../audio/deal-card.mp3';
import { useCallback } from 'react';
import { isWinningCard } from '../util/card';

const AnimatedFaceUpCard = animated(FaceUpCard);
const dealCardSound = new Sound(dealCardAudio);

export default function CommunityCards(
  {
    x,
    y,
    cards,
    winners,
    immediate = false,
  },
) {
  const transitions = useTransition(cards, {
    enter: { y, globalAlpha: 1 },
    from: immediate ? null : { y: y - 82, globalAlpha: 0 },
    trail: 800,
    keys: card => card.rank + card.suit,
    onStart: (result, spring, item) => {
      dealCardSound.play();
    },
  });

  return transitions((animatedProps, card, transition, index) => (
    <AnimatedFaceUpCard
      {...animatedProps}
      x={x + index * 64}
      rank={card.rank}
      suit={card.suit}
      elevated={isWinningCard(winners, card)}
      dimmed={winners.length && !isWinningCard(winners, card)}
    />
  ));
}