export const parseRank = rank => rank === '10' ? '=' : rank.charAt(0).toUpperCase();

export const parseSuit = suit => {
  switch (suit) {
    case 'hearts':
      return '{';
    case 'diamonds':
      return '[';
    case 'spades':
      return '}';
    case 'clubs':
      return ']';
    default:
      throw new Error(`Invalid rank "${suit}"`);
  }
};

export const suitColor = suit => {
  switch (suit) {
    case 'hearts':
    case 'diamonds':
      return '#e16057';
    case 'spades':
    case 'clubs':
      return '#33333';
    default:
      throw new Error(`Invalid rank "${suit}"`);
  }
};

export const rankingDescriptions = [
  'High card',
  'Pair',
  'Two pair',
  'Three of a kind',
  'Straight',
  'Flush',
  'Full house',
  'Four of a kind',
  'Straight flush',
  'Royal flush'
];

const relevantCardsCount = ranking => {
  console.log('Winner', rankingDescriptions[ranking], ranking)
  switch (ranking) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 3:
      return 3;
    case 2:
    case 7:
      return 4;
    default:
      return 5;
  }
};

export const isWinningCard = (winners, card) => {
  for (const winner of winners) {
    const isWinningCard = winner.cards
      .slice(0, relevantCardsCount(winner.ranking))
      .some(winningCard => {
        return card.rank === winningCard.rank && card.suit === winningCard.suit;
      });
    if (isWinningCard) {
      return true;
    }
  }

  return false;
};