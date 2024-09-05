import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "./Button";

import { format } from "date-fns";

import { useCreateRow } from "../../features/table/useCreateRow";
import { useTable } from "../../features/table/useTable";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { HiMiniPlusCircle, HiTrash } from "react-icons/hi2";
import Menus from "./Menus";
import Modal from "./Modal";
import { Menu } from "@mui/material";
import { useDeleteRow } from "../../features/table/useDeleteRow";
import ConfirmDelete from "./ConfirmDelete";

// Анимация появления строк
const fadeInRow = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Стиль для строки таблицы с анимацией
const AnimatedTableRow = styled(TableRow)`
  animation: ${fadeInRow} 0.5s ease-out;
`;

// Анимация появления ячеек
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

// Стиль для ячейки таблицы с анимацией
const AnimatedTableCell = styled(TableCell)`
  animation: ${fadeInCell} 0.5s ease-out;
`;

// Анимация для контейнера таблицы
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

const formatDate = (dateString) => {
  return format(new Date(dateString), "dd MMM yyyy");
};

export default function BasicTable() {
  const { tableData } = useTable();
  const { addRow, isPending: isAdding } = useCreateRow();
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

  const [searchParams, setSearchParams] = useSearchParams();
  const isAddingSession =
    searchParams.get("isAddingSession") === "true" || false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, fieldName) => {
    setNewRow((prev) => ({
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

  return (
    <Menus>
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
            {tableData.map((row) => (
              <AnimatedTableRow key={row.id}>
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
                    type="text"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="documentName"
                    value={newRow.documentName}
                    placeholder="Название документа"
                    type="text"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="documentStatus"
                    value={newRow.documentStatus}
                    placeholder="Статус документа"
                    type="text"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="documentType"
                    value={newRow.documentType}
                    placeholder="Тип документа"
                    type="text"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <StyledInput
                    name="employeeNumber"
                    value={newRow.employeeNumber}
                    placeholder="Номер работника"
                    type="text"
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
                    type="text"
                    onChange={handleChange}
                    disabled={isAdding}
                  />
                </AnimatedTableCell>
                <AnimatedTableCell align="center">
                  <Button type="submit" size="small" onClick={handleSubmit}>
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
