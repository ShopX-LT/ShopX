import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Tab,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ColorPicker from '../../../components/colorPicker';
import TextArea from '../../../components/textArea';

const AboutForm = ({ design, handleInputChange }) => {
  const [tabValue, setTabValue] = useState('1');
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <>
      <Box>
        <Typography variant="h6">Contact</Typography>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabValue}>
            <Box>
              <TabList variant="scrollable" scrollButtons="auto" onChange={handleTabChange} aria-label="contact tabs">
                <Tab label="Customize" value="1" />
                {/* <Tab label="Layout" value="2" /> */}
              </TabList>
            </Box>
            <TabPanel value="1">
              {/* <TabPanel value="2">Layout</TabPanel> */}
              <CustomizeTab design={design} handleInputChange={handleInputChange} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default AboutForm;

function CustomizeTab({ design, handleInputChange }) {
  return (
    <Box>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle">Heading</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextArea
            name="aboutHeading"
            onChange={handleInputChange}
            value={design.aboutHeading}
            placeholder="Enter what you want the about section heading to be"
          />
        </Grid>
        <ColorPicker
          id="aboutHeadingColor"
          name="aboutHeadingColor"
          label="Heading Color"
          onChange={handleInputChange}
          value={design.aboutHeadingColor}
        />

        <Grid item xs={12} marginTop={8}>
          <Typography variant="subtitle">Description</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextArea
            name="aboutDescription"
            onChange={handleInputChange}
            value={design.aboutDescription}
            placeholder="Enter what you want to be displayed in the about section"
          />
        </Grid>

        <ColorPicker
          id="aboutTextColor"
          name="aboutTextColor"
          label="Text Color"
          onChange={handleInputChange}
          value={design.aboutTextColor}
        />

        <ColorPicker
          id="aboutBgColor"
          name="aboutBgColor"
          label="Background Color"
          onChange={handleInputChange}
          value={design.aboutBgColor}
        />
        <Grid item xs={12}>
          <TextField label="Image" name="aboutImage" onChange={handleInputChange} value={design.aboutImage} fullWidth />
        </Grid>
      </Grid>
    </Box>
  );
}
