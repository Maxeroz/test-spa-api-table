import React from "react";
import styled from "styled-components";

const StyledHeading = styled.h1`
  color: var(--color-secondary-500);
  margin-bottom: 1rem;
  font-weight: bold;

  font-size: ${({ as }) => {
    switch (as) {
      case "h1":
        return "2.5rem";
      case "h2":
        return "2rem";
      case "h3":
        return "1.75rem";
      case "h4":
        return "1.5rem";
      case "h5":
        return "1.25rem";
      case "h6":
        return "1rem";
      default:
        return "2.5rem";
    }
  }};
`;

function Heading({ children, as = "h1" }) {
  return <StyledHeading as={as}>{children}</StyledHeading>;
}

export default Heading;
