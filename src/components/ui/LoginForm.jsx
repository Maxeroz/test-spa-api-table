import styled from "styled-components";
import Heading from "./Heading";
import FormInput from "./FormInput";
import { useState } from "react";
import { useLogin } from "../../features/authentication/useLogin";
import Button from "./Button";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StyledLoginForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-direction: column;

  padding: 20px;

  gap: 20px;
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 30px;
`;

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("user10");
  const [password, setPassword] = useState("password");

  const [errors, setErrors] = useState({ username: "", password: "" });

  const { isAuth } = useAuthContext();
  const { login, isPending } = useLogin();

  const validate = () => {
    let isValid = true;
    let errors = { username: "", password: "" };

    if (!username) {
      errors.username = "Username обязательно.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password обязательно.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    login(
      { username, password },
      {
        onSuccess: () => {
          setPassword("");
          setUsername("");
        },
      }
    );
  };

  if (isAuth) navigate("/");

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <Heading>Вход</Heading>
      <FormInputContainer>
        <FormInput
          value={username}
          placeholder="USERNAME"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          errors={errors.username}
        />
      </FormInputContainer>

      <FormInputContainer>
        <FormInput
          value={password}
          placeholder="PASSWORD"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          errors={errors.password}
        />
      </FormInputContainer>

      <Button disabled={isPending}>Войти</Button>
    </StyledLoginForm>
  );
}

export default LoginForm;
