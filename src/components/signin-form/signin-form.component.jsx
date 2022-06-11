import { useState } from "react";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithPopupGoogle,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./signin-form.styles.scss";

const formFieldsDefault = {
  email: "",
  password: "",
};

const FormSignin = () => {
  const [formFields, setFormFields] = useState(formFieldsDefault);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) return;

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("wrong password");
          break;
        case "auth/user-not-found":
          alert("user not found");
          break;
        default:
          console.log(error);
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(formFieldsDefault);
  };

  const signInWithGoogle = async () => {
    await signInWithPopupGoogle();
  };

  return (
    <div className="signin-container">
      <h2>Already have an account?</h2>
      <span>Sign in with email and password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          required
        />

        <FormInput
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          required
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormSignin;
