import styled from "styled-components";

const StyledInput = styled.input`
  width: 500px;
  padding: 20px;

  font-size: 12px;

  border: 1px solid var(--color-primary-100);

  border-radius: var(--border-radius-md);
`;

function FormInput({ placeholder, type }) {
  return <StyledInput placeholder={placeholder} type={type} />;
}

export default FormInput;
