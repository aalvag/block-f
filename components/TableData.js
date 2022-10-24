import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "batch",
    label: "Lote",
    minWidth: 110,
  },
  { id: "name", label: "Nombre" },
  {
    id: "phone",
    label: "Teléfono",
    //format: (value) => formatPhone(value),
    minWidth: 130,
  },
  {
    id: "security",
    label: "Seguridad",
    format: (value) => (value ? "Si" : "No"),
  },
  {
    id: "paymentMethods",
    label: "Medio de Pago",
  },
  {
    id: "status",
    label: "Informe",
  },
  {
    id: "payment",
    label: "Pagado",
    format: (value) => (value ? "Si" : "No"),
  },
];

// format number 1212341234 => 12-1234-1234
function formatPhone(phone) {
  return `${phone.slice(0, 2)}-${phone.slice(2, 6)}-${phone.slice(6)}`;
}

export default function TableData({ setOpen, data, setSelected }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleShow = (value) => {
    setSelected(value);
    setOpen(true);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data ? (
              <TableRow>
                <TableCell colSpan={7}>Cargando...</TableCell>
              </TableRow>
            ) : (
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => handleShow(row)}
                          sx={{ backgroundColor: row.payment ? "#f8d7da" : "" }}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
