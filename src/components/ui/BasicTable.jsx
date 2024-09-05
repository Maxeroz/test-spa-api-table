import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { useTable } from "../../features/table/useTable";
import Spinner from "./Spinner";
import { format } from "date-fns";

// Стилевой компонент для контейнера таблицы
const StyledTableContainer = styled(TableContainer)`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--color-primary-0);

  padding: 15px;
  border: 1px solid transparent;

  border-radius: var(--border-radius-lg);
`;

const StyledHeadRow = styled(TableRow)`
  font-weight: 600;
`;

// Функция для форматирования даты
const formatDate = (dateString) => {
  return format(new Date(dateString), "dd MMM yyyy HH:mm:ss");
};

export default function BasicTable() {
  const { tableData } = useTable();

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <StyledHeadRow>
            <TableCell align="right">Дата подписи компании</TableCell>
            <TableCell align="right">Подпись компании</TableCell>
            <TableCell align="right">Название</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right">Тип</TableCell>
            <TableCell align="right">Номер работника</TableCell>
            <TableCell align="right">Дата подписи работника</TableCell>
            <TableCell align="right">Подпись работника</TableCell>
          </StyledHeadRow>
        </TableHead>

        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">
                {formatDate(row.companySigDate)}
              </TableCell>
              <TableCell align="right">{row.companySignatureName}</TableCell>
              <TableCell align="right">{row.documentName}</TableCell>
              <TableCell align="right">{row.documentStatus}</TableCell>
              <TableCell align="right">{row.documentType}</TableCell>
              <TableCell align="right">{row.employeeNumber}</TableCell>
              <TableCell align="right">
                {formatDate(row.employeeSigDate)}
              </TableCell>
              <TableCell align="right">{row.employeeSignatureName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
