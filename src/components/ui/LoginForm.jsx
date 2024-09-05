import styled from "styled-components";
import Heading from "./Heading";
import FormInput from "./FormInput";
import { useState } from "react";
import { useLogin } from "../../features/authentication/useLogin";
import Button from "./Button";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const StyledLoginForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-direction: column;

  padding: 20px;

  gap: 20px;
`;

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isAuth } = useAuthContext();

  const { login, isLoading } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();

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

  if (isLoading) return <Spinner />;

  if (isAuth) navigate("/");

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <Heading>Вход</Heading>
      <FormInput
        value={username}
        placeholder="USERNAME"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />

      <FormInput
        value={password}
        placeholder="PASSWORD"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button disabled={isLoading}>Log in</Button>
    </StyledLoginForm>
  );
}

export default LoginForm;
