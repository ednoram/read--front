import { useState, FC, FormEvent } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { Loader } from "@components";
import { LOGIN_ROUTE } from "@constants";
import { getGraphqlErrorMessage } from "@utils";
import { SEND_VERIFICATION_MUTATION, VERIFY_ACCOUNT_MUTATION } from "@graphql";

import styles from "./AuthForm.module.scss";

interface Props {
  email: string;
}

const VerificationForm: FC<Props> = ({ email }) => {
  const [code, setCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const router = useRouter();

  const [
    submitVerification,
    { loading: loadingVerification, error: verificationError },
  ] = useMutation(VERIFY_ACCOUNT_MUTATION, {
    onError: () => {},
    onCompleted: () => {
      router.push(LOGIN_ROUTE);
    },
  });

  const [sendVerification, { loading: loadingSend }] = useMutation(
    SEND_VERIFICATION_MUTATION,
    {
      onError: () => {},
      onCompleted: () => setEmailSent(true),
    }
  );

  const handleVerificationSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitVerification({
      variables: { userEmail: email, code },
    });
  };

  const handleSendAgain = () => {
    sendVerification({ variables: { userEmail: email } });
  };

  const errorMessage = getGraphqlErrorMessage(verificationError);

  const errorDiv = errorMessage && (
    <div className="error_div">
      <p>{errorMessage}</p>
    </div>
  );

  const loadingDiv = (
    <div className="loading_div">
      <Loader />
    </div>
  );

  const sendAgainButton = loadingSend ? (
    loadingDiv
  ) : emailSent ? (
    <button
      type="button"
      onClick={handleSendAgain}
      className={styles.form__send_again_button}
    >
      Send Again
    </button>
  ) : (
    <p className="color_green text_align_center">Email was sent</p>
  );

  return (
    <form onSubmit={handleVerificationSubmit} className={styles.form}>
      {errorDiv}
      {loadingVerification && loadingDiv}
      <div className={styles.form__inputs}>
        <p>
          Please check your inbox and enter the six digit verification code to
          verify your account.
        </p>
        <input
          value={code}
          placeholder="Verification Code"
          className={styles.form__text_input}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          disabled={loadingVerification}
          className={styles.form__submit_button}
        >
          Submit
        </button>
        {sendAgainButton}
      </div>
    </form>
  );
};

export default VerificationForm;
