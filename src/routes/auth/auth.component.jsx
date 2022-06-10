import FormSignup from "../../components/signup-form/signup-form.component";
import FormSignin from "../../components/signin-form/signin-form.component";

import "./auth.styles.scss";

const Auth = () => {
  return (
    <div className="auth-container">
      <FormSignin />
      <FormSignup />
    </div>
  );
};

export default Auth;
