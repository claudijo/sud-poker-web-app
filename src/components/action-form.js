import Button from './button';
import styles from './action-form.module.css';
import '../styles/grid.css';
import '../styles/typography.css';
import '../styles/interaction.css';
import '../styles/layout.css';
import { ReactComponent as ArrowUpIcon } from '../icons/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../icons/arrow-down.svg';
import classNames from 'classnames';

export default function ActionForm(
  {
    disabled,
    actions = [],
    min,
    max,
    betSize,
    onBetSizeChange,
    onSubmit,
    onActionButtonClick,
    betSizeStep = 1,
  },
) {

  const offensiveAction = betSize >= max
    ? 'All-in'
    : actions.includes('bet') ? 'Bet' : 'Raise';

  const passiveAction = actions.includes('check') ? 'Check' : 'Call';

  const onIncreaseBetClick = event => {
    onBetSizeChange({ target: { value: Math.min( max, betSize + betSizeStep) }})
  }

  const onDecreaseBetClick = event => {
    onBetSizeChange({ target: { value: Math.max(min, betSize - betSizeStep)}})
  }

  return (
    <form
      disabled={disabled}
      onSubmit={onSubmit}
    >
      <section className="grid gridMargin">
        <div className="colGutter col2of12 colOffset2of12">
          <Button
            disabled={disabled}
            onClick={onActionButtonClick('fold')}
            theme="wide danger"
          >
            Fold
          </Button>
        </div>
        <div className="colGutter col2of12">
          <Button
            disabled={disabled}
            onClick={onActionButtonClick(passiveAction.toLowerCase())}
            theme="wide primary"
          >
            {passiveAction}
          </Button>
        </div>
        <div className="colGutter col2of12">
          <Button
            disabled={disabled}
            type="submit"
            theme={`wide ${betSize >= max ? 'extra' : 'success'}`}
          >
            {offensiveAction}
          </Button>
        </div>
        <div className="colGutter col2of12">
          <div className={styles.amountInputContainer}>
            <input
              disabled={disabled}
              className={styles.amountInput}
              required="required"
              title="Amount"
              min={min}
              max={max}
              value={betSize}
              step="1"
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={onBetSizeChange}
            />
            <div className={classNames('centeredColumnContainer', styles.amountInputButtonContainer)}>
              <Button disabled={disabled}  theme="iconic">
                <ArrowUpIcon onClick={onIncreaseBetClick}/>
              </Button>
              <Button disabled={disabled}  theme="iconic">
                <ArrowDownIcon onClick={onDecreaseBetClick}/>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}