import { FC } from "react";

import Form from "./Form";

const ResetPasswordEmail: FC = () => {
  return (
    <section>
      <div className="container">
        <h1 className="page_title">Reset Password Email</h1>
        <div className="container_small">
          <Form />
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordEmail;
