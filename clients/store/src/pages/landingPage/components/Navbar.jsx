import { Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { AppBarStyled } from '../styles';

const Navbar = () => {
  return (
    <Box marginBottom={5}>
      <AppBarStyled>
        <Toolbar>
          <Container>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="h6" component="div">
                SHOPX
              </Typography>
              <Stack direction={'row'} gap={2}>
                <Button variant="outlined">Login</Button>
                <Button variant="outlined">SignUp</Button>
              </Stack>
            </Box>
          </Container>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
};

export default Navbar;
