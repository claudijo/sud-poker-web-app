export const parseRank = rank => rank === '10' ? '=' : rank.charAt(0).toUpperCase()

export const parseSuit = suit => {
  switch(suit) {
    case 'hearts':
      return '{'
    case 'diamonds':
      return '['
    case 'spades':
      return '}';
    case 'clubs':
      return ']'
    default:
      throw new Error(`Invalid rank "${suit}"`)
  }
}

export const suitColor = suit => {
  switch(suit) {
    case 'hearts':
    case 'diamonds':
      return '#e16057'
    case 'spades':
    case 'clubs':
      return '#33333'
    default:
      throw new Error(`Invalid rank "${suit}"`)
  }
}

export const isWinningCards = (winners, card) => {
  for (const winner of winners) {
    const isWinningCard = winner.cards.some(winningCard => {
      return card.rank === winningCard.rank && card.suit === winningCard.suit
    })
    if (isWinningCard) {
      return true
    }
  }

  return false;
}