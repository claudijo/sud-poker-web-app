import './app.css';
import GameOfPoker from './scenes/game-of-poker';
import useFonts from './hooks/use-fonts';
import RealTimeEventHandler from './components/real-time-event-handler';

const appFonts = [
  {
    family: 'Krungthep',
    source: 'url("./fonts/krungthep.woff2") format("woff2"), url("./fonts/krungthep.woff") format("woff"), url("./fonts/krungthep.ttf") format("truetype")',
    descriptor: {
      weight: 'normal',
      style: 'normal',
    },
  },
  {
    family: 'CardCharacters',
    source: 'url("./fonts/card-characters.woff2") format("woff2"), url("./fonts/card-characters.woff") format("woff"), url("./fonts/card-characters.ttf") format("truetype")',
    descriptor: {
      weight: 'normal',
      style: 'normal',
    },
  },
  {
    family: 'Commando',
    source: 'url("./fonts/commando.woff2") format("woff2"), url("./fonts/commando.woff") format("woff"), url("./fonts/commando.ttf") format("truetype")',
    descriptor: {
      weight: 'normal',
      style: 'normal',
    },
  },
];

export default function App() {
  const [fontsAreLoaded] = useFonts(appFonts);

  if (!fontsAreLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <RealTimeEventHandler tableId="sandbox"/>
      <GameOfPoker tableId="sandbox"/>
    </>
  );
}