import classNames from 'classnames';
import styles from './join-form.module.css';
import Avatar, { AvatarStyle } from './avatar';
import '../styles/grid.css';
import '../styles/typography.css';
import '../styles/interaction.css';
import '../styles/layout.css';
import Button from './button';

export default function JoinForm(
  {
    disabled,
    onSubmit,
    onCancel,
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
      disabled={disabled}
      className={styles.form}
      name="joinForm"
      autoComplete="off"
      noValidate
      onSubmit={onSubmit}
    >
      <header className={styles.header}>
        <h1>Join the fun™</h1>
      </header>
      <main className={styles.main}>
        <div className={classNames(styles.avatarContainer, 'centeredColumnContainer')}>
          <div className={styles.avatar}>
            <Avatar
              style={AvatarStyle[avatar]}
              width="100%"
              heigth="100%"
              radius={8}
              margin={8}
              seed={nickname}
            />
          </div>
        </div>

        <section className="grid gridMargin">
          <label className="colGutter col7of12">
            Nickname
            <input
              disabled={disabled}
              value={nickname}
              onChange={onNicknameChange}
              spellCheck="false"
              type="text"
              required="required"
              title="Nickname"
              minLength="2"
              maxLength="20"
            />
          </label>
          <label className="colGutter col5of12">
            Avatar
            <select
              disabled={disabled}
              name="avatar"
              onChange={onAvatarChange}
              value={avatar}
            >
              {
                [
                  { name: 'Initials', value: 'INITIALS' },
                  { name: 'Male', value: 'MALE' },
                  { name: 'Female', value: 'FEMALE' },
                  { name: 'Gridy', value: 'GRIDY' },
                ].map(item => (
                  <option key={item.value} value={item.value}>{item.name}</option>
                ))
              }
            </select>
          </label>
          <label className="colGutter col5of12">
            Buy-in
            <input
              disabled={disabled}
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
        <div className={styles.buttonRow}>
          <section className="grid gridMargin">
            <div className="colGutter col6of12">
              <Button disabled={disabled} theme="secondary" wide={true} onClick={onCancel}>Cancel</Button>
            </div>
            <div className="colGutter col6of12">
              <Button disabled={disabled} wide={true}>Join</Button>
            </div>
      </section>
        </div>
    </main>
</form>
)
  ;
}