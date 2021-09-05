import { FC } from "react";

import Form from "./Form";

const ResetPassword: FC = () => {
  return (
    <section>
      <div className="container">
        <h1 className="page_title">Reset Password</h1>
        <div className="container_small">
          <Form />
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
