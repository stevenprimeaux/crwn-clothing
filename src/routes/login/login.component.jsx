import {
  signInWithPopupGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const Login = () => {
  const logUserGoogle = async () => {
    const { user } = await signInWithPopupGoogle();
    const userDocRef = createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>login</h1>
      <button onClick={logUserGoogle}>login with google</button>
    </div>
  );
};

export default Login;
