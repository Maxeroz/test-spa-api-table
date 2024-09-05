import styled, { css } from "styled-components";

// Определите объект стилей
const buttonStyles = {
  primary: css`
    background-color: var(--color-primary-500);
    color: white;
    border: 1px solid transparent; /* Добавляем границу для hover эффекта */

    &:hover {
      background-color: var(--color-primary-600);
    }
  `,
  secondary: css`
    background-color: var(--color-primary-0);
    color: black;
    border: 1px solid var(--color-secondary-200); /* Добавляем границу для hover эффекта */

    &:hover {
      border-color: var(--color-secondary-400);
    }
  `,
};

const StyledButton = styled.button`
  font-size: 20px;

  border-radius: var(--border-radius-md);

  padding: 12px 39px;
  ${({ type }) => buttonStyles[type] || buttonStyles.primary}
`;

function Button({ children, type = "primary", disabled }) {
  return (
    <StyledButton type={type} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

export default Button;
