import { FC, Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid";

import { getPaginationButtonNames } from "@utils";
import RightArrowIcon from "@assets/RightArrowIcon.svg";

import styles from "./Pagination.module.scss";

interface Props {
  limit: number;
  offset: number;
  totalItemsCount: number;
  setOffset: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<Props> = ({
  limit,
  offset,
  setOffset,
  totalItemsCount,
}) => {
  const handleNextPageClick = () => {
    setOffset(Math.min(totalItemsCount - 1, offset + limit));
  };

  const handlePrevPageClick = () => {
    setOffset(Math.max(0, offset - limit));
  };

  const goToPage = (page: number) => {
    setOffset(limit * (page - 1));
  };

  const currentPage = offset / limit + 1;
  const lastPage = Math.ceil(totalItemsCount / limit);

  const buttonNames = getPaginationButtonNames(currentPage, lastPage);

  const numberButtons = buttonNames.map((name) => (
    <li key={nanoid()}>
      <button
        onClick={() => goToPage(Number(name))}
        className={
          currentPage === Number(name)
            ? styles.content__active_page_button
            : styles.content__page_button
        }
      >
        {name}
      </button>
    </li>
  ));

  return (
    <ul className={styles.content}>
      <li>
        <button
          disabled={offset <= 0}
          onClick={handlePrevPageClick}
          className={styles.content__page_button}
        >
          <RightArrowIcon className={styles.content__left_arrow_icon} />
        </button>
      </li>
      {numberButtons}
      <li>
        <button
          onClick={handleNextPageClick}
          className={styles.content__page_button}
          disabled={offset + limit >= totalItemsCount}
        >
          <RightArrowIcon className={styles.content__right_arrow_icon} />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
