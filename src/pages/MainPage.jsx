import styled from "styled-components";
import BasicTable from "../components/ui/BasicTable";
import { useTable } from "../features/table/useTable";
import Spinner from "../components/ui/Spinner";
import { useLogOut } from "../features/authentication/useLogOut";
import Button from "../components/ui/Button";
import TableOperations from "../components/ui/TableOperations";
import Row from "../components/ui/Row";
import Heading from "../components/ui/Heading";

// Стилевой компонент для главной страницы
const StyledMainPage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  flex-direction: column;

  gap: 10px;
`;

// Стилевой компонент для кнопки выхода
const LogOutButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

function MainPage() {
  const { isLoading } = useTable();
  const logout = useLogOut();

  // Отображение спиннера при загрузке данных
  if (isLoading) return <Spinner />;

  return (
    <StyledMainPage>
      <LogOutButton onClick={logout}>
        <Button type="secondary">Выйти</Button>
      </LogOutButton>

      <Row>
        <Heading as="h2">Таблица данных</Heading>
        <TableOperations />
      </Row>

      <BasicTable />
    </StyledMainPage>
  );
}

export default MainPage;
