import { KeyboardEvent } from "react";

const disableEnterSubmit = (event: KeyboardEvent<HTMLInputElement>): void => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};

export default disableEnterSubmit;
