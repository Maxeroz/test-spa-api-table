import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const StyledTableOperations = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-primary-0);
  border: 1px solid var(--color-primary-100);
  border-radius: var(--border-radius-md);
  gap: 10px;
  padding: 0.4rem;
`;

function TableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Получаем значение isAddingSession из URL
  const isAddingSession = searchParams.get("isAddingSession") === "true";

  // Функция для обработки нажатия кнопки
  const handleButtonClick = () => {
    // Если isAddingSession уже true, удаляем его из URL, иначе устанавливаем его
    if (isAddingSession) {
      searchParams.delete("isAddingSession");
    } else {
      searchParams.set("isAddingSession", "true");
    }
    // Обновляем строку запроса с новым значением
    setSearchParams(searchParams);
  };

  return (
    <StyledTableOperations>
      <Button
        size="small"
        type={isAddingSession ? "primary" : "secondary"}
        onClick={handleButtonClick}
      >
        Добавить ряд
      </Button>
    </StyledTableOperations>
  );
}

export default TableOperations;
