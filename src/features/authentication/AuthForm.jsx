import styled from "styled-components";
import LoginForm from "../../components/ui/LoginForm";

const StyledFormContainer = styled.div`
  width: 600px;
  height: 400px;

  border-radius: var(--border-radius-lg);

  background-color: var(--color-primary-0);
`;

function AuthForm() {
  return (
    <StyledFormContainer>
      <LoginForm />
    </StyledFormContainer>
  );
}

export default AuthForm;
