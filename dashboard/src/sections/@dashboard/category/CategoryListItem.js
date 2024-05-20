import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import Iconify from '../../../components/iconify';

const CategoryListItem = ({ category, handleDeleteCategory }) => {
  return (
    <>
      <TableRow hover id={category.id} tabIndex={-1}>
        {/* <TableCell padding="checkbox" /> */}
        <TableCell component="th" scope="row">
          <Typography variant="subtitle1" noWrap sx={{ textTransform: 'capitalize' }}>
            {category.name}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton
            size="large"
            sx={{ color: 'error.main' }}
            onClick={() => handleDeleteCategory(category.id, category.name)}
          >
            <Iconify icon={'eva:trash-2-outline'} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CategoryListItem;
