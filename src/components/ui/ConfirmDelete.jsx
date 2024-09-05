import styled from "styled-components";

import Heading from "./Heading";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Удалить {resourceName}</Heading>
      <p>
        Вы уверены что хотите удалить {resourceName} ? Это действие невозможно
        отменить.
      </p>

      <div>
        <Button
          type="secondary"
          size="small"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Отменить
        </Button>
        <Button
          type="danger"
          size="small"
          disabled={disabled}
          onClick={onConfirm}
        >
          Удалить
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
