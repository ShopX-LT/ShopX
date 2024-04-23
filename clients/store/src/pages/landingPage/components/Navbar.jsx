import { Box, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { AppBarStyled } from '../styles';

const Navbar = () => {
  return (
    <Box marginBottom={5}>
      <AppBarStyled>
        <Toolbar>
          <Container>
            <Typography variant="h6" component="div">
              {/* SHOPX */}
            </Typography>
          </Container>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
};

export default Navbar;
