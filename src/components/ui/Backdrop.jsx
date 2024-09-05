import styled, { keyframes } from "styled-components";
import Spinner from "./Spinner";

const fadeInContainer = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;

  animation: ${fadeInContainer} 0.3s ease-in-out;
`;

function Backdrop() {
  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
}

export default Backdrop;
