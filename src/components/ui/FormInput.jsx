import styled from "styled-components";

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 500px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 20px;
  font-size: 12px;
  background-color: var(--color-primary-0);
  border: 1px solid var(--color-primary-100);
  border-radius: var(--border-radius-md);
  box-sizing: border-box;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
`;

function FormInput({ placeholder, type, value, onChange, errors }) {
  return (
    <StyledInputContainer>
      <StyledInput
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
      <ErrorMessage>{errors || ""}</ErrorMessage>{" "}
    </StyledInputContainer>
  );
}

export default FormInput;
