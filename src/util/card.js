import { BLACK_SUITS_COLOR, FACE_UP_CARD_BACKGROUND_COLOR, RED_SUITS_COLOR } from './colors';

export const parseRank = rank => rank === 'T' ? '=' : rank.charAt(0).toUpperCase();

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
  const svg = `<svg version="1.1" width="50" height="70" xmlns="http://www.w3.org/2000/svg">
    <style>
      @font-face {
          font-family: "CardCharacters";
          src: url("data:application/font-woff2;charset=utf-8;base64,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");
      }
    </style>
    <rect width="100%" height="100%" fill="${FACE_UP_CARD_BACKGROUND_COLOR}"/>
    ${card 
    ? `<text font-family="CardCharacters" font-size="34px" fill="${suitColor(card.suit)}" x="4" y="36">${parseRank(card.rank)}</text>
    <text font-family="CardCharacters" font-size="28px" fill="${suitColor(card.suit)}" x="21" y="63">${parseSuit(card.suit)}</text>`
    : ''}
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};