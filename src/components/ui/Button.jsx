import styled, { css } from "styled-components";

// Объект стилей кнопки
const buttonStyles = {
  primary: css`
    background-color: var(--color-primary-500);
    color: white;
    border: 1px solid transparent;

    &:hover {
      background-color: var(--color-primary-600);
    }
  `,
  secondary: css`
    background-color: var(--color-primary-0);
    color: black;
    border: 1px solid var(--color-secondary-200);
    color: var(--color-secondary-400);

    &:hover {
      border-color: var(--color-secondary-400);
      color: var(--color-secondary-500);
    }
  `,
  danger: css`
    background-color: var(--color-error-500);
    color: white;
    border: 1px solid transparent;

    &:hover {
      background-color: var(--color-error-600);
    }
  `,
};

// Объект стилей для разных размеров кнопки
const buttonSizes = {
  small: css`
    font-size: 14px;
    padding: 8px 20px;
  `,
  medium: css`
    font-size: 18px;
    padding: 10px 30px;
  `,
  large: css`
    font-size: 20px;
    padding: 12px 39px;
  `,
};

const StyledButton = styled.button`
  border-radius: var(--border-radius-md);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  /* Применение стилей на основе типа кнопки */
  ${({ type }) => buttonStyles[type] || buttonStyles.primary}

  /* Применение стилей на основе размера кнопки */
  ${({ size }) => buttonSizes[size] || buttonSizes.large}

  /* Стили для состояния disabled */
  &:disabled {
    background-color: var(--color-grey-400);
    color: var(--color-grey-100);
    cursor: not-allowed;
  }
`;

function Button({
  children,
  type = "primary",
  size = "large",
  disabled,
  onClick,
}) {
  return (
    <StyledButton type={type} size={size} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
