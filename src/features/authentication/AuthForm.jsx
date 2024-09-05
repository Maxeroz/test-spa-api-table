import styled from "styled-components";
import LoginForm from "../../components/ui/LoginForm";

const StyledFormContainer = styled.div`
  width: 600px;
  height: 360px;

  border-radius: var(--border-radius-lg);

  background-color: var(--color-secondary-100);
`;

function AuthForm() {
  return (
    <StyledFormContainer>
      <LoginForm />
    </StyledFormContainer>
  );
}

export default AuthForm;
