import styles from './join-form.module.css';

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
      className={styles.joinForm}
      name="joinForm"
      autoComplete="off"
      noValidate
      onSubmit={onSubmit}
    >
      <h1>Join the fun™</h1>
      <div className="avatar"/>
      <label>
        Avatar
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
      <label>
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
      <label>
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
      <button>Cancel</button>
      <button>Join</button>
    </form>
  );
}