import styled, { keyframes, css } from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "./Button";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  HiMiniPlusCircle,
  HiTrash,
  HiPencil,
  HiArrowDownOnSquareStack,
} from "react-icons/hi2";
import Menus from "./Menus";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import { useCreateRow } from "../../features/table/useCreateRow";
import { useTable } from "../../features/table/useTable";
import { useUpdateRow } from "../../features/table/useUpdateRow";
import { useDeleteRow } from "../../features/table/useDeleteRow";
import BackDrop from "./BackDrop";

const fadeInCell = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

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

const animateOnUpdate = keyframes`
  from {
    background-color: var(--color-secondary-light);
  }
  to {
    background-color: var(--color-primary-0);
  }
`;

// Styled components с анимацией
const AnimatedTableRow = styled(TableRow)`
  animation: ${(props) =>
    props.isUpdating
      ? css`
          ${animateOnUpdate} 0.5s ease-out
        `
      : "none"};
`;

const AnimatedTableCell = styled(TableCell)`
  animation: ${fadeInCell} 0.5s ease-out;
`;

const StyledTableContainer = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-primary-0);
  padding: 15px;
  border: 1px solid transparent;
  border-radius: var(--border-radius-lg);
  animation: ${fadeInContainer} 0.5s ease-in-out;
  height: 420px;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-primary-100);
  width: 100%;
`;

const StyledHeadRow = styled(AnimatedTableRow)`
  font-weight: 600;
`;

// Форматирование даты
const formatDate = (dateString) => {
  return format(new Date(dateString), "dd MMM yyyy");
};

export default function BasicTable() {
  const { tableData } = useTable();
  const { addRow, isPending: isAdding } = useCreateRow();
  const { updateRow, isPending: isUpdating } = useUpdateRow();
  const { deleteRow, isPending: isDeleting } = useDeleteRow();

  const [newRow, setNewRow] = useState({
    companySigDate: "",
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: "",
    employeeSignatureName: "",
  });

  const [editingRowId, setEditingRowId] = useState(null);
  const [editRowData, setEditRowData] = useState(null);
  const [updatedRowIds, setUpdatedRowIds] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const isAddingSession =
    searchParams.get("isAddingSession") === "true" || false;

  useEffect(() => {
    if (!isUpdating && editingRowId !== null) {
      setUpdatedRowIds((prev) => [...prev, editingRowId]);
    }
  }, [isUpdating, editingRowId]);

  // Обработчики изменений
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRowData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, fieldName) => {
    setNewRow((prev) => ({
      ...prev,
      [fieldName]: date ? date.toISOString() : "",
    }));
  };

  const handleEditDateChange = (date, fieldName) => {
    setEditRowData((prev) => ({
      ...prev,
      [fieldName]: date ? date.toISOString() : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRow(newRow, {
      onSuccess: () => {
        searchParams.delete("isAddingSession");
        setSearchParams(searchParams);
        setNewRow({
          companySigDate: "",
          companySignatureName: "",
          documentName: "",
          documentStatus: "",
          documentType: "",
          employeeNumber: "",
          employeeSigDate: "",
          employeeSignatureName: "",
        });
      },
    });
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    updateRow(
      { id, updatedRow: editRowData },
      {
        onSuccess: () => {
          setEditingRowId(null);
          setEditRowData(null);
        },
      }
    );
  };

  const startEditing = (row) => {
    setEditingRowId(row.id);
    setEditRowData(row);
  };

  const sortedTableData = tableData.slice().sort((a, b) => {
    const dateA = new Date(a.companySigDate);
    const dateB = new Date(b.companySigDate);
    return dateA - dateB;
  });

  return (
    <Menus>
      {isUpdating && <BackDrop />}
      <StyledTableContainer>
        <Table sx={{ width: 1000 }}>
          <TableHead>
            <StyledHeadRow>
              <AnimatedTableCell sx={{ width: 100 }} align="center">
                Дата подписи компании
              </AnimatedTableCell>
              <AnimatedTableCell sx={{ width: 100 }} align="center">
                Подпись компании
              </AnimatedTableCell>
              <AnimatedTableCell sx={{ width: 100 }} align="center">
                Название
              </AnimatedTableCell>
              <AnimatedTableCell sx={{ width: 100 }} align="center">
                Статус
              </AnimatedTableCell>
              <AnimatedTableCell sx={{ width: 100 }} align="center">
                Тип
              </AnimatedTableCell>
              <AnimatedTableCell sx={{ width: 100 }} align="center">
                Номер работника
              </AnimatedTableCell>
              <AnimatedTableCell sx={{ width: 100 }} align="center">
                Дата подписи работника
              </AnimatedTableCell>
              <AnimatedTableCell sx={{ width: 100 }} align="center">
                Подпись работника
              </AnimatedTableCell>
              <AnimatedTableCell
                sx={{ width: 100 }}
                align="center"
              ></AnimatedTableCell>
            </StyledHeadRow>
          </TableHead>
          <TableBody>
            {sortedTableData.map((row) => (
              <AnimatedTableRow
                key={row.id}
                isUpdating={updatedRowIds.includes(row.id)}
              >
                {editingRowId === row.id ? (
                  <>
                    <AnimatedTableCell align="center">
                      <DatePicker
                        selected={
                          editRowData.companySigDate
                            ? new Date(editRowData.companySigDate)
                            : null
                        }
                        onChange={(date) =>
                          handleEditDateChange(date, "companySigDate")
                        }
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Дата..."
                        disabled={isUpdating}
                      />
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      <StyledInput
                        name="companySignatureName"
                        value={editRowData.companySignatureName}
                        placeholder="Подпись компании"
                        onChange={handleEditChange}
                        disabled={isUpdating}
                      />
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      <StyledInput
                        name="documentName"
                        value={editRowData.documentName}
                        placeholder="Название документа"
                        onChange={handleEditChange}
                        disabled={isUpdating}
                      />
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      <StyledInput
                        name="documentStatus"
                        value={editRowData.documentStatus}
                        placeholder="Статус документа"
                        onChange={handleEditChange}
                        disabled={isUpdating}
                      />
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      <StyledInput
                        name="documentType"
                        value={editRowData.documentType}
                        placeholder="Тип документа"
                        onChange={handleEditChange}
                        disabled={isUpdating}
                      />
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      <StyledInput
                        name="employeeNumber"
                        value={editRowData.employeeNumber}
                        placeholder="Номер работника"
                        onChange={handleEditChange}
                        disabled={isUpdating}
                      />
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      <DatePicker
                        selected={
                          editRowData.employeeSigDate
                            ? new Date(editRowData.employeeSigDate)
                            : null
                        }
                        onChange={(date) =>
                          handleEditDateChange(date, "employeeSigDate")
                        }
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Дата..."
                        disabled={isUpdating}
                      />
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      <StyledInput
                        name="employeeSignatureName"
                        value={editRowData.employeeSignatureName}
                        placeholder="Подпись работника"
                        onChange={handleEditChange}
                        disabled={isUpdating}
                      />
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      <Button
                        disabled={isUpdating}
                        type="submit"
                        size="small"
                        onClick={(e) => handleEditSubmit(e, row.id)}
                      >
                        <HiArrowDownOnSquareStack />
                      </Button>
                    </AnimatedTableCell>
                  </>
                ) : (
                  <>
                    <AnimatedTableCell align="center">
                      {formatDate(row.companySigDate)}
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      {row.companySignatureName}
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      {row.documentName}
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      {row.documentStatus}
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      {row.documentType}
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      {row.employeeNumber}
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      {formatDate(row.employeeSigDate)}
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      {row.employeeSignatureName}
                    </AnimatedTableCell>
                    <AnimatedTableCell align="center">
                      <Modal>
                        <Menus.Menu>
                          <Menus.Toggle id={row.id} />
                          <Menus.List id={row.id}>
                            <Modal.Open opens="delete">
                              <Menus.Button icon={<HiTrash />}>
                                Удалить
                              </Menus.Button>
                            </Modal.Open>
                            <Menus.Button
                              icon={<HiPencil />}
                              onClick={() => startEditing(row)}
                            >
                              Редактировать
                            </Menus.Button>
                          </Menus.List>
                        </Menus.Menu>
                        <Modal.Window name="delete">
                          <ConfirmDelete
                            resourceName="ряд"
                            disabled={isDeleting}
                            onConfirm={() => deleteRow(row.id)}
                          />
                        </Modal.Window>
                      </Modal>
                    </AnimatedTableCell>
                  </>
                )}
              </AnimatedTableRow>
            ))}
            {isAddingSession && (
              <AnimatedTableRow>
                <AnimatedTableCell align="center">
                  <DatePicker
                    selected={
                      newRow.companySigDate
                        ? new Date(newRow.companySigDate)
                        : null
                    }
                    onChange={(date) =>
                      handleDateChange(date, "companySigDate")
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Дата..."
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="companySignatureName"
                    value={newRow.companySignatureName}
                    placeholder="Подпись компании"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="documentName"
                    value={newRow.documentName}
                    placeholder="Название документа"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="documentStatus"
                    value={newRow.documentStatus}
                    placeholder="Статус документа"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="documentType"
                    value={newRow.documentType}
                    placeholder="Тип документа"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="employeeNumber"
                    value={newRow.employeeNumber}
                    placeholder="Номер работника"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <DatePicker
                    selected={
                      newRow.employeeSigDate
                        ? new Date(newRow.employeeSigDate)
                        : null
                    }
                    onChange={(date) =>
                      handleDateChange(date, "employeeSigDate")
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Дата..."
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="employeeSignatureName"
                    value={newRow.employeeSignatureName}
                    placeholder="Подпись работника"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <Button
                    disabled={isAdding}
                    type="submit"
                    size="small"
                    onClick={handleSubmit}
                  >
                    <HiMiniPlusCircle />
                  </Button>
                </AnimatedTableCell>
              </AnimatedTableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Menus>
  );
}
