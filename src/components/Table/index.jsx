import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useQuery} from 'react-query';
import { getLogs } from '../../queries/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { tableColumns } from './constants';

function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}

function handleRowType(column, value) {
  if (typeof value == "boolean") {
    if (value === true) {
      return "✅"
    } else {
      return "❌"
    }
  }
  if (column.type && column.type === "Timestamp") {
    return new Date(value).toUTCString();
  }
  return value;
}

export default function StickyHeadTable({ startDate, endDate, dateChanged, setDateChanged }) {
  const [page, setPage] = React.useState(0);
  const [logsData, setLogsData] = React.useState([]);

  console.log(startDate, endDate)

  const { data, error, isLoading: logsLoader } = useQuery(["logs", page], () => getLogs(startDate, endDate, page))

  React.useEffect(() => {
    if (dateChanged) {
      setPage(0);
    }
  }, [dateChanged]);

  React.useEffect(() => {
    if (data && data.length > 0 && !logsLoader) {
      setLogsData([...logsData, ...data]);
    }
  }, [data, logsLoader]);

  const handleScroll = React.useCallback((e) => {
    const tableContainer = e.target;
    // Check if we are at the end of the table body
    if (tableContainer.scrollTop >= tableContainer.scrollHeight - tableContainer.clientHeight) {
      setPage(page + 1);
    }
  }, [page]);

  
  React.useEffect(() => {
    if (!logsLoader) {
      const tableContainer = document.querySelector('.MuiTableContainer-root');
      tableContainer.addEventListener("scroll", handleScroll);
      return () => tableContainer.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, logsLoader]);

  if (error) return <></>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableColumns.map((column, index) => (
                <TableCell
                  key={`${column.id}_${Math.random().toString(36).slice(2, 7)}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {logsData
              .map((row, idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {tableColumns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {handleRowType(column, value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
          {logsLoader ? <div key={"kkasd"}><CircularIndeterminate /></div> : <></>}
        </Table>
      </TableContainer>
    </Paper>
  );
}