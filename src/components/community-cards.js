import { animated, useTransition } from '@react-spring/web';
import { Sound } from '../lib/sound';
import dealCardAudio from '../audio/deal-card.mp3';
import { isWinningCard } from '../util/card';
import { PlayingCard } from './playing-card';

const AnimatedPlayingCard = animated(PlayingCard)
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
    enter: { y: y - 35, globalAlpha: 1 },
    from: immediate ? null : { y: y - 105, globalAlpha: 0 },
    trail: 800,
    keys: card => card.rank + card.suit,
    onStart: () => {
      dealCardSound.play();
    },
  });

  return transitions((animatedProps, card, transition, index) => (
    <AnimatedPlayingCard
      {...animatedProps}
      x={x - 25 + index * 64}
      card={card}
      elevated={isWinningCard(winners, card)}
      dimmed={winners.length && !isWinningCard(winners, card)}
    />
  ));
}