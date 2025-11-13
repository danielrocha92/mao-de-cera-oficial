import styles from './Input.module.css';

const Input = ({ type = 'text', placeholder, value, onChange, name, label }) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
