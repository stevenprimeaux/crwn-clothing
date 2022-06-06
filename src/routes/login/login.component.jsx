import {
  signInWithPopupGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormSignup from "../../components/signup-form/signup-form.component";

const Login = () => {
  const logUserGoogle = async () => {
    const { user } = await signInWithPopupGoogle();
    createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>login</h1>
      <button onClick={logUserGoogle}>login with google popup</button>
      <FormSignup />
    </div>
  );
};

export default Login;
