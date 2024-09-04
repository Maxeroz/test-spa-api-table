import styled from "styled-components";
import AuthForm from "../components/ui/AuthForm";

const StyledLoginPage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  height: 100vh;
`;

function Login() {
  return (
    <StyledLoginPage>
      <AuthForm />
    </StyledLoginPage>
  );
}

export default Login;
