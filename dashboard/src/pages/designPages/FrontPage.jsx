import React, { useState } from 'react';
import { Box, Button, Container, Modal, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TabPanel from '../../components/tabPanel/TabPanel';
import useDesign from '../../sections/@dashboard/design/hooks/useDesign';
import NavForm from '../../sections/@dashboard/design/NavForm';
import HeroForm from '../../sections/@dashboard/design/HeroForm';
import ContactForm from '../../sections/@dashboard/design/ContactForm';
import AboutForm from '../../sections/@dashboard/design/AboutForm';

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
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Front Page
        </Typography>
        <Button variant="contained" onClick={handleOpenStorePreview} sx={{ display: 'flex', gap: 1 }}>
          Preview <VisibilityIcon />
        </Button>
      </Stack>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          minWidth: '800px',
          overflowX: 'scroll',
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={handleTabChange}
            aria-label="front page tab"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Nav bar" />
            <Tab label="Hero" />
            <Tab label="About Us" />
            <Tab label="Contact" />
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
        </Box>
        <Button sx={{ marginLeft: 1 }} variant="contained" onClick={handleFormSubmit}>
          Save
        </Button>
      </Paper>
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
          <iframe width="900" height="500" src="https://myshopx.net/laprisa" title="Store Site" />
        </Box>
      </Modal>
    </>
  );
};

export default FrontPage;
