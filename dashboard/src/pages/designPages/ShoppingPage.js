import { Box, Button, Card, Container, Paper, Stack, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import Iconify from '../../components/iconify/Iconify';
import Drawer from '../../components/drawer/Drawer';
import useDesign from '../../sections/@dashboard/design/hooks/useDesign';
import EditContainerPageForm from '../../sections/@dashboard/design/EditContainerPageForm';
import { fCurrency } from '../../utils/formatNumber';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const ShoppingPage = () => {
  const { design, handleInputChange, handleFormSubmit } = useDesign();

  return (
    <>
      <Container sx={{ my: 'auto', mx: 'auto' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Shop Page
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="fe:edit" />} onClick={handleOpenDrawer}>
            Edit Page
          </Button> */}
        </Stack>
        <Paper
          elevation={3}
          sx={{
            p: 5,
            mb: 1,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: '100px',
            justifyContent: 'center',
            overflowX: 'scroll',
          }}
        >
          <EditContainerPageForm
            design={design}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
          <Box sx={{ width: '350px' }}>
            <Card sx={{ background: design.productBackgroundColor }}>
              <Box sx={{ pt: '100%', position: 'relative' }}>
                <StyledProductImg
                  alt={'default helper'}
                  src={
                    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
                  }
                />
              </Box>
              <Stack spacing={2} direction="row" alignItems={'center'} justifyContent={'space-between'}>
                <Stack
                  sx={{
                    p: 1,
                    flexGrow: 1,
                    flexBasis: 'auto',
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: design.productMainTextColor }}>
                    The Name Of An Item
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="start">
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: design.productSubTextColor,
                      }}
                    >
                      {fCurrency(10000)}
                    </Typography>
                  </Stack>
                </Stack>
                <Box px={1}>
                  <Button
                    sx={{ color: design.productActionButtonTextColor, background: design.productActionButtonColor }}
                    p={1}
                  >
                    BUY
                  </Button>
                </Box>
              </Stack>
            </Card>
          </Box>
        </Paper>
      </Container>
      {/* <Drawer title="Edit Product Container" openDrawer={openDrawer} onCloseDrawer={handleCloseDrawer} width={400}>
        ADD FORM COMPONENT HERE
      </Drawer> */}
    </>
  );
};

export default ShoppingPage;
