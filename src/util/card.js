import { BLACK_SUITS_COLOR, FACE_UP_CARD_BACKGROUND_COLOR, RED_SUITS_COLOR } from './colors';

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
      return RED_SUITS_COLOR;
    case 'spades':
    case 'clubs':
      return BLACK_SUITS_COLOR;
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
  'Royal flush',
];

const relevantCardsCount = ranking => {
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

export const generateFaceUpCard = (card) => {
  const svg = `
<svg version="1.1" width="50" height="70" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${FACE_UP_CARD_BACKGROUND_COLOR}"/>
  <text font-family="CardCharacters" font-size="34px" class="rank" fill="${suitColor(card.suit)}" x="4" y="36">${parseRank(card.rank)}</text>
  <text font-family="CardCharacters" font-size="28px" class="suite" fill="${suitColor(card.suit)}" x="21" y="63">${parseSuit(card.suit)}</text>
</svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};