import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AppLayout() {
  return (
    <MainContent>
      <main>
        <Outlet />
      </main>
    </MainContent>
  );
}

export default AppLayout;
