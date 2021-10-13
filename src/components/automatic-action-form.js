import RadioButton from './radio-button';
import { capitalizeFirstLetter } from '../lib/text';

export default function AutomaticActionForm(
  {
    disabled,
    onChange,
    automaticActions,
    automaticAction,
    onClick
  },
) {
  return (
    <form
      disabled={disabled}
    >
      <section className="grid gridMargin">
        {['fold', 'check/fold', 'check', 'call', 'call any', 'all-in'].map(title => (
          <div key={title} className="colGutter col2of12">
            <RadioButton
              name="automaticAction"
              value={title}
              disabled={!automaticActions.includes(title)}
              onChange={onChange}
              checked={automaticAction === title}
              onClick={onClick}
            >
              {capitalizeFirstLetter(title)}
            </RadioButton>
          </div>
        ))}
      </section>


    </form>
  );
}