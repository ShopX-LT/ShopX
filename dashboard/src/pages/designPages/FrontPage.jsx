import { Box, Button, Container, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import TabPanel from '../../components/tabPanel/TabPanel';
import useDesign from '../../sections/@dashboard/design/hooks/useDesign';
import NavForm from '../../sections/@dashboard/design/NavForm';
import HeroForm from '../../sections/@dashboard/design/HeroForm';
import ContactForm from '../../sections/@dashboard/design/ContactForm';
import AboutForm from '../../sections/@dashboard/design/AboutForm';

const FrontPage = () => {
  const { design, handleInputChange, handleFormSubmit } = useDesign();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Front Page
        </Typography>
        <Button variant="contained">Preview</Button>
      </Stack>
      <Paper
        elevation={3}
        sx={{
          p: 2,
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
            <Tab label="Contact" />
            <Tab label="About Us" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <NavForm design={design} handleInputChange={handleInputChange} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <HeroForm design={design} handleInputChange={handleInputChange} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ContactForm design={design} handleInputChange={handleInputChange} />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <AboutForm design={design} handleInputChange={handleInputChange} />
          </TabPanel>
        </Box>
        <Button sx={{ marginLeft: 1 }} variant="contained" onClick={handleFormSubmit}>
          Save
        </Button>
      </Paper>
    </>
  );
};

export default FrontPage;
