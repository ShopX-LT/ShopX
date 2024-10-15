import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Tab, TextField, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ColorPicker from '../../../components/colorPicker';

const NavForm = ({ design, handleInputChange }) => {
  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mt: 5,
        }}
      >
        <>
          <Typography variant="body1" fontWeight={'bold'} my={1}>
            Customize Navbar
          </Typography>
          <Box>
            <TabContext value={tabValue}>
              <Box>
                <TabList variant="scrollable" scrollButtons="auto" onChange={handleTabChange} aria-label="nav tabs">
                  <Tab label="Colors" value="1" />
                  {/* <Tab label="Layout" value="2" /> */}
                </TabList>
              </Box>
              <TabPanel value="1">
                <ColorTab design={design} handleInputChange={handleInputChange} />
              </TabPanel>
              {/* <TabPanel value="2">Layout</TabPanel> */}
            </TabContext>
          </Box>
        </>
      </Paper>
    </Container>
  );
};

export default NavForm;

function ColorTab({ design, handleInputChange }) {
  return (
    <Box>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <ColorPicker
          id="navTextColor"
          name="navTextColor"
          label="Text Color"
          onChange={handleInputChange}
          value={design.navTextColor}
        />
        <ColorPicker
          id="navBackgroundColor"
          name="navBackgroundColor"
          label="Background Color"
          onChange={handleInputChange}
          value={design.navBackgroundColor}
        />
      </Grid>
    </Box>
  );
}
