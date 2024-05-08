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
  Button,
  Container,
  Paper,
  CircularProgress,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ColorPicker from '../../../components/colorPicker';
import TextArea from '../../../components/textArea';
import useColorScheme from './hooks/useColorScheme';

const schemeNames = { 0: 'Split Compliment', 1: 'Triad', 2: 'Tetrad', 3: 'GPT' };

const GeneralForm = ({ design, handleInputChange }) => {
  const { isLoading, generateScheme, baseColor, colorSchemes, handleBaseColorChange } = useColorScheme();
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
        <Box>
          <Typography variant="body1" fontWeight={'bold'} my={1}>
            General Customizations
          </Typography>
          <Box>
            <TabContext value={tabValue}>
              <Box>
                <TabList variant="scrollable" scrollButtons="auto" onChange={handleTabChange} aria-label="contact tabs">
                  <Tab label="Colors" value="1" />
                  {/* <Tab label="Texts" value="2" /> */}
                </TabList>
              </Box>

              <TabPanel value="1">
                <ColorsTab
                  baseColor={baseColor}
                  handleInputChange={handleBaseColorChange}
                  generateScheme={() => generateScheme(baseColor)}
                  isLoading={isLoading}
                  colorSchemes={colorSchemes}
                />
              </TabPanel>
              {/* <TabPanel value="2">
              <TextsTab design={design} handleInputChange={handleInputChange} />
            </TabPanel> */}
            </TabContext>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default GeneralForm;

function TextsTab({ design, handleInputChange }) {
  return (
    <Box>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle">Contact Info</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextArea
            name="contactDescription"
            onChange={handleInputChange}
            value={design.contactDescription}
            placeholder="Enter any extra description about your store"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function ColorsTab({ baseColor, handleInputChange, generateScheme, isLoading, colorSchemes }) {
  return (
    <Box>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle">Choose a colour scheme</Typography>
        </Grid>
        <Grid item xs={8}>
          <ColorPicker
            id="baseColor"
            name="baseColor"
            label="Base color"
            onChange={handleInputChange}
            value={baseColor}
          />
        </Grid>

        <Grid item xs={4}>
          <Button variant="contained" onClick={generateScheme}>
            Generate
          </Button>
        </Grid>
        {isLoading ? (
          <CircularProgress />
        ) : (
          colorSchemes.map((scheme, index) => (
            <Grid key={`${schemeNames[index]}`} item xs={12}>
              <ColourSchemeDisplay name={schemeNames[index]} colours={scheme} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

function ColourSchemeDisplay({ name, colours }) {
  console.log(colours);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* <Typography variant="subtitle1">{name}:</Typography> */}
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '300px' }}>
        {colours.map((color) => {
          return (
            <Grid item xs={4} key={`${name}+${color}`}>
              <Box
                sx={{
                  width: '90%',
                  height: '50px',
                  backgroundColor: color,
                  border: '1px solid #000',
                  borderRadius: '4px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
