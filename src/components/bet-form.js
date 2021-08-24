import styles from './bet-form.module.css';
import '../styles/grid.css';
import '../styles/typography.css';
import '../styles/interaction.css';
import '../styles/layout.css';
import Button from './button';
import { ReactComponent as RemoveIcon } from '../icons/remove.svg';
import { ReactComponent as AddIcon } from '../icons/add.svg';

export default function BetForm(
  {
    disabled,
    onSubmit,
    onCancel,
    amount,
    onAmountChange,
    min = 1,
    max,
    potSize,
  },
) {
  return (
    <form
      disabled={disabled}
      className={styles.form}
      name="betForm"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <header className={styles.header}>
        <h1>Pick your amount</h1>
      </header>
      <main className={styles.main}>
        <section className="grid gridMargin">
          <div className="colGutter col3of12 rightAlignedCenteredRowContainer">
            <Button type="button" disabled={disabled} theme="iconic" onClick={onCancel}>
              <RemoveIcon/>
            </Button>
          </div>
          <div className="colGutter col6of12">
            <input
              disabled={disabled}
              value={amount}
              onChange={onAmountChange}
              required="required"
              title="Amount"
              min={min}
              max={max}
              step="1"
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          <div className="colGutter col3of12 centeredRowContainer">
            <Button type="button" disabled={disabled} theme="iconic" onClick={onCancel}>
              <AddIcon/>
            </Button>
          </div>
        </section>
        <section className="grid gridMargin">
          <div className="colGutter colFull">
            <input
              type="range"
              min={min}
              max={max}
              step="1"
            />
          </div>
        </section>
        <section className="grid gridMargin">
          <div className="colGutter col2of12">
            <Button type="button" disabled={disabled} theme="tertiary" wide={true} onClick={onCancel}>Min</Button>
          </div>
          <div className="colGutter col2of12">
            <Button type="button" disabled={disabled} theme="tertiary" wide={true} onClick={onCancel}>1/2</Button>
          </div>
          <div className="colGutter col2of12">
            <Button type="button" disabled={disabled} theme="tertiary" wide={true} onClick={onCancel}>3/4</Button>
          </div>
          <div className="colGutter col2of12">
            <Button type="button" disabled={disabled} theme="tertiary" wide={true} onClick={onCancel}>Pot</Button>
          </div>
          <div className="colGutter col4of12">
            <Button type="button" disabled={disabled} theme="tertiary" wide={true} onClick={onCancel}>All-in</Button>
          </div>
        </section>
        <div className={styles.buttonRow}>
          <section className="grid gridMargin">
            <div className="colGutter col6of12">
              <Button type="button" disabled={disabled} theme="secondary" wide={true} onClick={onCancel}>Cancel</Button>
            </div>
            <div className="colGutter col6of12">
              <Button type="submit" disabled={disabled} wide={true}>Go!</Button>
            </div>
          </section>
        </div>
      </main>
    </form>
  );
}