import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import ListItemHead from './ListItemHead';
import useSortTable from './useSortTable';
import Scrollbar from '../scrollbar';

const SortableTable = ({ headerArray, defaultOrderBy = 'asc', listItems, bodyComponent }) => {
  const {
    filteredListItems,
    searchBarInput,
    page,
    rowsPerPage,
    order,
    orderBy,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleFilterByTextInput,
  } = useSortTable({
    defaultOrderBy,
    listItems,
  });

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredListItems.length) : 0;

  const isNotFound = !filteredListItems.length && !!searchBarInput;

  return (
    <>
      <Scrollbar>
        <TableContainer>
          <Table>
            <ListItemHead
              order={order}
              orderBy={orderBy}
              headLabel={headerArray}
              rowCount={listItems.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredListItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => bodyComponent(row))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found for &nbsp;
                        <strong>&quot;{searchBarInput}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={listItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SortableTable;
