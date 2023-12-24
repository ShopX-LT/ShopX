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
  Slider,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import minimal from './images/minimal.png';
import legacy from './images/legacy.png';
import leftText from './images/leftText.png';
import ColorPicker from '../../../components/colorPicker';
import ImageRadio from '../../../components/image-radio';
import TextArea from '../../../components/textArea';

const HeroForm = ({ design, handleInputChange }) => {
  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <>
      <Box>
        <Typography variant="h6">Customize Hero</Typography>
        <Box sx={{ maxWidth: '90%', typography: 'body1' }}>
          <TabContext value={tabValue}>
            <Box>
              <TabList aria-label="nav tabs" onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                <Tab label="Layout" value="1" />
                <Tab label="Texts" value="2" />
                <Tab label="Colors" value="3" />
                <Tab label="Image" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <StyleTab design={design} handleInputChange={handleInputChange} />
            </TabPanel>
            <TabPanel value="2">
              <TextsTab design={design} handleInputChange={handleInputChange} />
            </TabPanel>
            <TabPanel value="3">
              <ColorsTab design={design} handleInputChange={handleInputChange} />
            </TabPanel>
            <TabPanel value="4">
              <ImageTab design={design} handleInputChange={handleInputChange} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default HeroForm;

function StyleTab({ design, handleInputChange }) {
  const options = [
    {
      image: legacy,
      label: 'Legacy',
      value: 'legacy',
    },
    {
      image: minimal,
      label: 'Minimalist',
      value: 'minimalist',
    },
    {
      image: leftText,
      label: 'LeftText',
      value: 'leftText',
    },
  ];

  return (
    <Box>
      <FormControl>
        <FormLabel id="hero style" />
        <RadioGroup
          row
          aria-labelledby="hero style radio label"
          name="heroStyle"
          onChange={handleInputChange}
          value={design.heroStyle}
        >
          {options.map((option) => (
            <ImageRadio
              key={option.value}
              image={option.image}
              label={option.label}
              value={option.value}
              selectedValue={design.heroStyle}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {console.log(design.heroStyle)}
    </Box>
  );
}

function TextsTab({ design, handleInputChange }) {
  return (
    <Box>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle">Headline Text</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextArea
            name="heroHeadline"
            onChange={handleInputChange}
            value={design.heroHeadline}
            placeholder="Enter Headline text here"
          />
        </Grid>

        <Grid item xs={12} mt={4}>
          <Typography variant="subtitle">Sub Text</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextArea
            name="heroSubText"
            onChange={handleInputChange}
            value={design.heroSubText}
            placeholder="Enter paragraph text here"
          />
        </Grid>

        <Grid item xs={12} mt={4}>
          <Typography variant="subtitle">Action Button</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="heroActionButtonText"
            label="Text"
            name="heroActionButtonText"
            onChange={handleInputChange}
            value={design.heroActionButtonText}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function ColorsTab({ design, handleInputChange }) {
  return (
    <Box>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle">Main Background Color</Typography>
        </Grid>
        <ColorPicker
          id="mainBackgroundColor"
          name="mainBackgroundColor"
          label="Background Color"
          onChange={handleInputChange}
          value={design.mainBackgroundColor}
        />

        <Grid item xs={12} mt={4}>
          <Typography variant="subtitle">Headline Color</Typography>
        </Grid>
        <ColorPicker
          id="heroHeadlineColor"
          name="heroHeadlineColor"
          label="Headline Color"
          onChange={handleInputChange}
          value={design.heroHeadlineColor}
        />

        <Grid item xs={12} mt={4}>
          <Typography variant="subtitle">Sub Text Color</Typography>
        </Grid>
        <ColorPicker
          id="heroSubTextColor"
          name="heroSubTextColor"
          label="Subtext Color"
          onChange={handleInputChange}
          value={design.heroSubTextColor}
        />

        <Grid item xs={12} mt={4}>
          <Typography variant="subtitle">Action Button Text Color</Typography>
        </Grid>
        <ColorPicker
          id="heroActionButtonTextColor"
          name="heroActionButtonTextColor"
          label="Text color"
          onChange={handleInputChange}
          value={design.heroActionButtonTextColor}
        />
        <Grid item xs={12} mt={4}>
          <Typography variant="subtitle">Action Button Background Color</Typography>
        </Grid>
        <ColorPicker
          id="heroActionButtonColor"
          name="heroActionButtonColor"
          label="Background Color"
          onChange={handleInputChange}
          value={design.heroActionButtonColor}
        />
      </Grid>
    </Box>
  );
}

function ImageTab({ design, handleInputChange }) {
  return (
    <Box>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Grid item xs={12}>
          <TextField
            label="Image URL"
            name="heroImageUrl"
            onChange={handleInputChange}
            value={design.heroImageUrl}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Blur"
            name="heroImageBlur"
            onChange={handleInputChange}
            value={design.heroImageBlur}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={8}>
          <Slider
            name="heroImageBlur"
            value={design.heroImageBlur}
            min={0}
            step={1}
            max={10}
            onChange={handleInputChange}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Cover opacity"
            name="heroImageCoverOpacity"
            onChange={handleInputChange}
            value={design.heroImageCoverOpacity}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={8}>
          <Slider
            name="heroImageCoverOpacity"
            value={design.heroImageCoverOpacity}
            min={0}
            step={0.1}
            max={1}
            onChange={handleInputChange}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
