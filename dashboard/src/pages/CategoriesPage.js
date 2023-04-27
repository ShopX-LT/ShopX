import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Iconify from '../components/iconify';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getCategories, createCategory } from '../services/CategoryService';
import { AddCategory, CategoryListHead, CategoryListToolbar } from '../sections/@dashboard/category';
import Scrollbar from '../components/scrollbar/Scrollbar';

const TABLE_HEAD = [{ id: 'name', label: 'Name', alignRight: false }, { id: '' }];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const CategoriesPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [FilterCategory, setFilterCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterCategory(event.target.value);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoryList.length) : 0;

  const filteredCategory = applySortFilter(categoryList, getComparator(order, orderBy), FilterCategory);

  const isNotFound = !filteredCategory.length && !!FilterCategory;

  // CREATING A NEW CATEGORY
  const handleSubmitForm = async (values, onSubmitProps) => {
    const formData = new FormData();
    // Append each form value to the formData object.
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    console.log(formData);

    try {
      const response = await createCategory(axiosPrivate, JSON.stringify(formData));
      onSubmitProps.resetForm();
    } catch (error) {
      alert(error.message);
    }
  };

  // GET ALL THE CATEGORIES
  const retreiveCategories = async () => {
    const response = await getCategories(axiosPrivate);
    if (!response) {
      setCategoryList([]);
    } else {
      setCategoryList(response);
    }
  };

  // USE EFFECT
  useEffect(() => {
    retreiveCategories();
  }, []);
  return (
    <>
      <Helmet>
        <title> Categories </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
        </Stack>

        <Card>
          <CategoryListToolbar FilterCategory={FilterCategory} onFilterCategory={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CategoryListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={categoryList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, name } = row;
                    return (
                      <TableRow hover key={name} tabIndex={-1}>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                            <Typography variant="subtitle1" noWrap sx={{ textTransform: 'capitalize' }}>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit">
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
                            <strong>&quot;{FilterCategory}&quot;</strong>.
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
            count={categoryList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Typography sx={{ marginTop: 5 }} variant="h4" gutterBottom>
          Add Category
        </Typography>
        <Card>
          <AddCategory handleSubmitForm={handleSubmitForm} />
        </Card>
      </Container>
    </>
  );
};

export default CategoriesPage;
