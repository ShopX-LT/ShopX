import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const SearchBar = ({ searchParam, handleSearch, handleChange }) => {
  const heroDesign = useSelector((state) => state.webDesign.hero);

  return (
    <form onSubmit={handleSearch}>
      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for a product"
          inputProps={{ 'aria-label': 'search for a product' }}
          onChange={handleChange}
          value={searchParam}
        />
        <Divider orientation="vertical" />

        <IconButton
          aria-label="search"
          sx={{
            p: '5px',
            background: heroDesign.heroActionButtonColor,
            borderRadius: '0px 3px 3px 0px',
            color: heroDesign.heroActionButtonTextColor,
          }}
          type="submit"
          variant="contained"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </form>
  );
};

export default SearchBar;
