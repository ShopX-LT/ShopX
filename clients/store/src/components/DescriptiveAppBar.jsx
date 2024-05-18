import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { StyledDescriptionPageAppBar } from '../pages/styles.js';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';

const DescriptiveAppBar = ({ design, handleClosePage, productTitle }) => {
  return (
    <StyledDescriptionPageAppBar design={design}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleClosePage} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
          {productTitle}
        </Typography>
        <Button
          autoFocus
          color="inherit"
          variant="contained"
          onClick={handleClosePage}
          sx={{
            color: design.productContainer.productActionButtonTextColor,
            background: design.productContainer.productActionButtonColor,
          }}
        >
          {design.productContainer.productActionButtonText}
        </Button>
      </Toolbar>
    </StyledDescriptionPageAppBar>
  );
};

export default DescriptiveAppBar;

DescriptiveAppBar.propTypes = {
  design: PropTypes.object,
  handleClosePage: PropTypes.func,
  productTitle: PropTypes.string,
};
