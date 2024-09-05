import styled from "styled-components";
import BasicTable from "../components/ui/BasicTable";
import { useTable } from "../features/table/useTable";
import Spinner from "../components/ui/Spinner";
import { useLogOut } from "../features/authentication/useLogOut";
import Button from "../components/ui/Button";

// Стилевой компонент для главной страницы
const StyledMainPage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative; /* Устанавливаем позиционирование родителя */
`;

// Стилевой компонент для кнопки выхода
const LogOutButton = styled.div`
  position: absolute; /* Позиционируем кнопку абсолютно */
  top: 20px; /* Расстояние от верхнего края */
  left: 20px; /* Расстояние от левого края */
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
      <BasicTable />
    </StyledMainPage>
  );
}

export default MainPage;
