import { FC, Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid";

import styles from "./Articles.module.scss";

interface Props {
  limit: number;
  limitOptions: number[];
  setLimit: Dispatch<SetStateAction<number>>;
}

const LimitButtonsDiv: FC<Props> = ({ limitOptions, limit, setLimit }) => {
  return (
    <div className={styles.list__limit_buttons}>
      <p>Items per page:</p>
      <ul>
        {limitOptions.map((option) => (
          <li key={nanoid()}>
            <button
              onClick={() => setLimit(option)}
              className={
                option === limit
                  ? styles.list__limit_button_active
                  : styles.list__limit_button
              }
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LimitButtonsDiv;
