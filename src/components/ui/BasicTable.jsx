import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled, { keyframes } from "styled-components";
import { useTable } from "../../features/table/useTable";
import { format } from "date-fns";
import { useState } from "react";
import Button from "./Button";

// Создание анимации для плавного появления
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Стилевой компонент для контейнера таблицы
const StyledTableContainer = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-primary-0);
  padding: 15px;
  border: 1px solid transparent;
  border-radius: var(--border-radius-lg);
  animation: ${fadeIn} 0.3s ease-in-out;
`;

// Стилевой компонент для формы добавления нового ряда
const StyledForm = styled.form`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 1200px;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-primary-100);
  width: 100px;
`;

const StyledButtonContainer = styled.div`
  margin-top: 20px;
`;

const StyledHeadRow = styled(TableRow)`
  font-weight: 600;
`;

// Функция для форматирования даты
const formatDate = (dateString) => {
  return format(new Date(dateString), "dd MMM yyyy");
};

export default function BasicTable() {
  const { tableData, addRow } = useTable();
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

  const [isAddingSession, setIsAddingSession] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRow(newRow);
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
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledHeadRow>
            <TableCell sx={{ width: 100 }} align="center">
              Дата подписи компании
            </TableCell>
            <TableCell sx={{ width: 100 }} align="center">
              Подпись компании
            </TableCell>
            <TableCell sx={{ width: 100 }} align="center">
              Название
            </TableCell>
            <TableCell sx={{ width: 100 }} align="center">
              Статус
            </TableCell>
            <TableCell sx={{ width: 100 }} align="center">
              Тип
            </TableCell>
            <TableCell sx={{ width: 100 }} align="center">
              Номер работника
            </TableCell>
            <TableCell sx={{ width: 100 }} align="center">
              Дата подписи работника
            </TableCell>
            <TableCell sx={{ width: 100 }} align="center">
              Подпись работника
            </TableCell>
            <TableCell sx={{ width: 100 }} align="center"></TableCell>
          </StyledHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                {formatDate(row.companySigDate)}
              </TableCell>
              <TableCell align="center">{row.companySignatureName}</TableCell>
              <TableCell align="center">{row.documentName}</TableCell>
              <TableCell align="center">{row.documentStatus}</TableCell>
              <TableCell align="center">{row.documentType}</TableCell>
              <TableCell align="center">{row.employeeNumber}</TableCell>
              <TableCell align="center">
                {formatDate(row.employeeSigDate)}
              </TableCell>
              <TableCell align="center">{row.employeeSignatureName}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isAddingSession && (
        <>
          <StyledForm onSubmit={handleSubmit}>
            <StyledInput
              name="companySigDate"
              value={newRow.companySigDate}
              placeholder="Дата подписи компании"
              type="text"
              onChange={handleChange}
            />
            <StyledInput
              name="companySignatureName"
              value={newRow.companySignatureName}
              placeholder="Подпись компании"
              type="text"
              onChange={handleChange}
            />
            <StyledInput
              name="documentName"
              value={newRow.documentName}
              placeholder="Название документа"
              type="text"
              onChange={handleChange}
            />
            <StyledInput
              name="documentStatus"
              value={newRow.documentStatus}
              placeholder="Статус документа"
              type="text"
              onChange={handleChange}
            />
            <StyledInput
              name="documentType"
              value={newRow.documentType}
              placeholder="Тип документа"
              type="text"
              onChange={handleChange}
            />
            <StyledInput
              name="employeeNumber"
              value={newRow.employeeNumber}
              placeholder="Номер работника"
              type="text"
              onChange={handleChange}
            />
            <StyledInput
              name="employeeSigDate"
              value={newRow.employeeSigDate}
              placeholder="Дата подписи работника"
              type="text"
              onChange={handleChange}
            />
            <StyledInput
              name="employeeSignatureName"
              value={newRow.employeeSignatureName}
              placeholder="Подпись работника"
              type="text"
              onChange={handleChange}
            />
            <div></div>
          </StyledForm>

          <StyledButtonContainer>
            <Button type="submit" onClick={handleSubmit}>
              Добавить новый ряд
            </Button>
          </StyledButtonContainer>
        </>
      )}
    </StyledTableContainer>
  );
}
