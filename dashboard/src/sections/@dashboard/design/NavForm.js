import React, { useState } from 'react';
import { Box, Grid, Tab, TextField, Typography } from '@mui/material';
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
    <>
      <Box>
        <Typography variant="h6">Nav bar</Typography>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabValue}>
            <Box>
              <TabList variant="scrollable" scrollButtons="auto" onChange={handleTabChange} aria-label="nav tabs">
                <Tab label="Layout" value="1" />
                <Tab label="Customize" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">Layout</TabPanel>
            <TabPanel value="2">
              <CustomizeTab design={design} handleInputChange={handleInputChange} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default NavForm;

function CustomizeTab({ design, handleInputChange }) {
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