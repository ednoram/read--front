import { useState, FC, Dispatch, FormEvent, SetStateAction } from "react";

import CloseIcon from "@assets/CloseIcon.svg";
import SearchIcon from "@assets/SearchIcon.svg";

import styles from "./Searchbox.module.scss";

interface Props {
  placeholder: string;
  setSearchFilter: Dispatch<SetStateAction<string | null>>;
}

const Searchbox: FC<Props> = ({ setSearchFilter, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (inputValue) {
      setSearchFilter(inputValue.trim().replace(/\s\s+/g, " ").toLowerCase());
    } else {
      setSearchFilter(null);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setInputIsFocused(false), 200);
  };

  const handleFocus = () => {
    setTimeout(() => setInputIsFocused(true), 200);
  };

  const submitButton = (
    <button
      name="search"
      aria-label="search"
      className={styles.form__submit_button}
    >
      <SearchIcon className={styles.form__search_icon} />
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__input_container}>
        <input
          maxLength={60}
          value={inputValue}
          autoComplete="off"
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && inputIsFocused && (
          <CloseIcon
            aria-label="clear input"
            onClick={() => setInputValue("")}
            className={styles.form__clear_input_icon}
          />
        )}
      </div>
      {submitButton}
    </form>
  );
};

export default Searchbox;
