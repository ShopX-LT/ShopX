import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Iconify from '../../components/iconify/Iconify';
import Drawer from '../../components/drawer/Drawer';
import EditFrontPageForm from '../../sections/@dashboard/design/EditFrontPageForm';
import useDesign from '../../sections/@dashboard/design/hooks/useDesign';
import Navbar from './components/Navbar';
import { FlexContainer, LegacyImageContainer, LegacyTextContainer, PageContainer } from './styles';

const FrontPage = () => {
  const { design, handleInputChange, handleFormSubmit } = useDesign();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Container sx={{ my: 'auto', mx: 'auto' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Front Page
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
          <EditFrontPageForm
            design={design}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
          {/* WEBPAGE */}
          <Box sx={{ border: '1px black dashed' }}>
            <Navbar design={design} />
            <PageContainer sx={{ background: design.mainBackgroundColor, px: 3 }}>
              <FlexContainer>
                <LegacyTextContainer>
                  <Box marginTop={4} sx={{ maxWidth: { xs: '350px', md: '400px' } }}>
                    <Typography variant="h2" align="left" sx={{ color: design.heroHeadlineColor }}>
                      {design.heroHeadline}
                    </Typography>
                  </Box>
                  <Box marginBottom={3} sx={{ maxWidth: { xs: '300px', md: '350px', align: 'left' } }}>
                    <Typography variant="body1" align="left" sx={{ color: design.heroSubTextColor }}>
                      {design.heroSubText}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      width: '150px',
                      background: design.heroActionButtonColor,
                      color: design.heroActionButtonTextColor,
                    }}
                  >
                    {design.heroActionButtonText}
                  </Button>
                </LegacyTextContainer>
                <LegacyImageContainer>
                  <img
                    src={design.heroImageUrl}
                    alt="hero"
                    style={{ width: '350px', height: '300px', imageFit: 'cover', borderRadius: '10px' }}
                  />
                </LegacyImageContainer>
              </FlexContainer>
            </PageContainer>
          </Box>
        </Paper>
        {/* <Drawer title="Edit Front Page" openDrawer={openDrawer} onCloseDrawer={handleCloseDrawer} width={400}>
          x
        </Drawer> */}
      </Container>
    </>
  );
};

export default FrontPage;
