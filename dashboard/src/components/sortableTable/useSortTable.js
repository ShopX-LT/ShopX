import React, { useState } from 'react';
import { getComparator, applySortFilter } from './hepler';

const useSortTable = ({ defaultOrderBy, listItems = [] }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchBarInput, setSearchBarInput] = useState('');

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

  const handleFilterByTextInput = (event) => {
    setPage(0);
    setSearchBarInput(event.target.value);
  };

  const filteredListItems = applySortFilter(listItems, getComparator(order, orderBy), searchBarInput);

  return {
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
  };
};

export default useSortTable;
