import Button from './button';
import '../styles/grid.css';
import '../styles/typography.css';
import '../styles/interaction.css';
import '../styles/layout.css';

export default function ActionForm(
  {
    onBetClick,
    actions = [],
  },
) {
  return (
    <form>
      <section className="grid gridMargin">
        <div className="colGutter col2of12 colOffset3of12">
          { actions.includes('fold') && (
            <Button theme="wide danger">Fold</Button>
          )}
        </div>
        <div className="colGutter col2of12">
          <Button theme="wide primary">Check</Button>
        </div>
        <div className="colGutter col2of12">
          <Button onClick={onBetClick} type="button" theme="wide success">Bet</Button>
        </div>
      </section>
    </form>
  );
}