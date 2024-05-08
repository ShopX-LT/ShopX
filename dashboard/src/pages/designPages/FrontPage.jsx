import React, { useState } from 'react';
import { Box, Button, Container, Modal, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TabPanel from '../../components/tabPanel/TabPanel';
import useDesign from '../../sections/@dashboard/design/hooks/useDesign';
import NavForm from '../../sections/@dashboard/design/NavForm';
import HeroForm from '../../sections/@dashboard/design/HeroForm';
import ContactForm from '../../sections/@dashboard/design/ContactForm';
import AboutForm from '../../sections/@dashboard/design/AboutForm';
import GeneralForm from '../../sections/@dashboard/design/GeneralForm';

const FrontPage = () => {
  const { design, handleInputChange, handleFormSubmit } = useDesign();
  const [tabValue, setTabValue] = useState(0);
  const [openStorePreview, setOpenStorePreview] = useState(false);

  const handleOpenStorePreview = () => setOpenStorePreview(true);
  const handleCloseStorePreview = () => setOpenStorePreview(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Front Page
        </Typography>
        <Button onClick={handleOpenStorePreview} sx={{ display: 'flex', gap: 1 }}>
          Preview <VisibilityIcon />
        </Button>
      </Stack>
      <Box>
        <Tabs
          orientation="horizontal"
          variant="fullWidth"
          visibleScrollbar
          value={tabValue}
          onChange={handleTabChange}
          aria-label="front page tab"
          // sx={{ borderRight: 1, borderColor: 'divider' }}
          TabIndicatorProps={{
            style: {
              height: '10%', // Adjust the height of the indicator
              borderRadius: 4, // Apply border radius to the indicator
            },
          }}
        >
          <Tab label="Nav bar" />
          <Tab label="Hero" />
          <Tab label="About Us" />
          <Tab label="Contact" />
          {/* <Tab label="General" /> */}
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <NavForm design={design} handleInputChange={handleInputChange} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <HeroForm design={design} handleInputChange={handleInputChange} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <AboutForm design={design} handleInputChange={handleInputChange} />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <ContactForm design={design} handleInputChange={handleInputChange} />
        </TabPanel>
        {/* <TabPanel value={tabValue} index={4}>
          <GeneralForm design={design} handleInputChange={handleInputChange} />
        </TabPanel> */}
      </Box>
      <Button sx={{ marginTop: 5 }} variant="contained" onClick={handleFormSubmit}>
        Save
      </Button>
      {/* <Paper
        elevation={3}
        sx={{
          p: 2,
          minWidth: '800px',
          overflowX: 'scroll',
        }}
      >
        
      </Paper> */}
      <Modal
        open={openStorePreview}
        onClose={handleCloseStorePreview}
        aria-labelledby="modal-store-preview"
        aria-describedby="modal-preview-saved-changes"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
          }}
        >
          <Button variant="contained" onClick={handleCloseStorePreview}>
            Close
          </Button>
          <iframe width="900" height="500" src="https://laprisa.myshopx.net" title="Store Site" />
        </Box>
      </Modal>
    </Container>
  );
};

export default FrontPage;
