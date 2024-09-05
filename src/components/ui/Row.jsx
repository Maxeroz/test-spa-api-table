import styled from "styled-components";

const StyledRow = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

function Row({ children }) {
  return <StyledRow>{children}</StyledRow>;
}

export default Row;
