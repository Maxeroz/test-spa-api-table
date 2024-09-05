import styled from "styled-components";

const StyledInput = styled.input`
  width: 500px;
  padding: 20px;

  font-size: 12px;

  background-color: var(--color-primary-0);

  border: 1px solid var(--color-primary-100);
  border-radius: var(--border-radius-md);
`;

function FormInput({ placeholder, type, value, onChange }) {
  return (
    <StyledInput
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  );
}

export default FormInput;
