import classNames from 'classnames';
import styles from './join-form.module.css';
import '../styles/grid.css';
import '../styles/typography.css';
import '../styles/interaction.css';


export default function JoinForm(
  {
    onSubmit,
    nickname,
    onNicknameChange,
    avatar,
    onAvatarChange,
    buyIn,
    onBuyInChange,
  },
) {

  return (
    <form
      className={classNames(styles.form)}
      name="joinForm"
      autoComplete="off"
      noValidate
      onSubmit={onSubmit}
    >

      <h1>Join the fun™</h1>
      <div className="avatar"/>

        <section className="grid gridMargin">
          <label className="colGutter col5of12">
            Avatar style
            <select
              name="avatarStyle"
              value={avatar}
              onChange={onAvatarChange}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="GRIDY">Gridy</option>
            </select>
          </label>
          <label className="colGutter col7of12">
            Nickname
            <input
              value={nickname}
              onChange={onNicknameChange}
              spellCheck="false"
              type="text"
              required="required"
              title="Nickname"
              minLength="2"
              maxLength="20"
              autoFocus="autofocus"
            />
          </label>
          <label className="colGutter col7of12">
            Buy-in
            <input
              value={buyIn}
              onChange={onBuyInChange}
              type="number"
              required="required"
              title="Buy-in"
              min="1"
              max="99999"
            />
          </label>
        </section>
        <section>
          <button>Cancel</button>
          <button>Join</button>
        </section>

    </form>
  );
}