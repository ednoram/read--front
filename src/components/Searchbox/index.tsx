import { useState, FC, FormEvent, Dispatch, SetStateAction } from "react";

import SearchIcon from "@assets/SearchIcon.svg";

import styles from "./Searchbox.module.scss";

interface Props {
  placeholder: string;
  setSearchFilter: Dispatch<SetStateAction<string | null>>;
}

const Searchbox: FC<Props> = ({ setSearchFilter, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (inputValue) {
      setSearchFilter(inputValue.trim().replace(/\s\s+/g, " ").toLowerCase());
    } else {
      setSearchFilter(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__input_container}>
        <input
          maxLength={60}
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <button className={styles.form__submit_button}>
        <SearchIcon className={styles.form__search_icon} />
      </button>
    </form>
  );
};

export default Searchbox;
