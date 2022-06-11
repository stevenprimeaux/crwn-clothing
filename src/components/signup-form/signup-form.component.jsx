import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./signup-form.styles.scss";

const formFieldsDefault = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const FormSignup = () => {
  const [formFields, setFormFields] = useState(formFieldsDefault);
  const { displayName, email, password, passwordConfirm } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already in use");
      } else {
        console.log("error creating user", error);
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(formFieldsDefault);
  };

  return (
    <div className="signup-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          type="text"
          required
        />

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

        <FormInput
          label="Confirm Password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={handleChange}
          type="password"
          required
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FormSignup;
