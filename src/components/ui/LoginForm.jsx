import styled from "styled-components";
import Heading from "./Heading";
import FormInput from "./FormInput";

const StyledLoginForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-direction: column;

  padding: 20px;

  gap: 20px;
`;

function LoginForm() {
  return (
    <StyledLoginForm>
      <Heading>Вход</Heading>
      <FormInput placeholder="EMAIL" type="text" />
      <FormInput type="password" />
    </StyledLoginForm>
  );
}

export default LoginForm;
