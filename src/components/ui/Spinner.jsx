import React from "react";
import styled from "styled-components";

// Styled компонент для контейнера спиннера
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const SpinnerElement = styled.div`
  border: 8px solid var(--color-secondary-200);
  border-radius: 50%;
  border-top: 8px solid var(--color-secondary-500);
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Spinner() {
  return (
    <SpinnerContainer>
      <SpinnerElement />
    </SpinnerContainer>
  );
}

export default Spinner;
