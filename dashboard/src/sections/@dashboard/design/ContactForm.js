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
  Container,
  Paper,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ColorPicker from '../../../components/colorPicker';
import TextArea from '../../../components/textArea';

const ContactUsForm = ({ design, handleInputChange }) => {
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
            Customize Contact
          </Typography>
          <Box>
            <TabContext value={tabValue}>
              <Box>
                <TabList variant="scrollable" scrollButtons="auto" onChange={handleTabChange} aria-label="contact tabs">
                  <Tab label="Texts" value="1" />
                  <Tab label="Colors" value="2" />
                  <Tab label="Image" value="3" />
                  <Tab label="Socials" value="4" />
                  {/* <Tab label="Layout" value="2" /> */}
                </TabList>
              </Box>
              <TabPanel value="1">
                <TextsTab design={design} handleInputChange={handleInputChange} />
              </TabPanel>
              <TabPanel value="2">
                <ColorsTab design={design} handleInputChange={handleInputChange} />
              </TabPanel>
              <TabPanel value="3">
                <ImageTab design={design} handleInputChange={handleInputChange} />
              </TabPanel>
              {/* <TabPanel value="2">Layout</TabPanel> */}
            </TabContext>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactUsForm;

function TextsTab({ design, handleInputChange }) {
  return (
    <Box>
      <Grid container spacing={1} mb={4} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle">Contact Info</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextArea
            name="contactDescription"
            onChange={handleInputChange}
            value={design.contactDescription}
            placeholder="Enter any extra description about your store"
            tips={'Specify how your customers can reach you, hours of operations, etc.'}
          />
        </Grid>
      </Grid>
      <SocialsTab design={design} handleInputChange={handleInputChange} />
    </Box>
  );
}

function ColorsTab({ design, handleInputChange }) {
  return (
    <Box>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle">Background Color</Typography>
        </Grid>
        <ColorPicker
          id="contactBgColor"
          name="contactBgColor"
          label="Background Color"
          onChange={handleInputChange}
          value={design.contactBgColor}
        />
        <Grid item xs={12} mt={4}>
          <Typography variant="subtitle">Heading Color</Typography>
        </Grid>
        <ColorPicker
          id="contactHeadingColor"
          name="contactHeadingColor"
          label="Heading Color"
          onChange={handleInputChange}
          value={design.contactHeadingColor}
        />

        <Grid item xs={12} mt={4}>
          <Typography variant="subtitle">Subtext Color</Typography>
        </Grid>
        <ColorPicker
          id="contactTextColor"
          name="contactTextColor"
          label="Text Color"
          onChange={handleInputChange}
          value={design.contactTextColor}
        />
      </Grid>
    </Box>
  );
}

function ImageTab({ design, handleInputChange }) {
  return (
    <Box>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Typography variant="subtitle1">Image URL</Typography>

        <Grid item xs={12}>
          <TextField
            label="Image"
            name="contactImage"
            onChange={handleInputChange}
            value={design.contactImage}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function SocialsTab({ design, handleInputChange }) {
  const socials = [
    {
      name: 'contactWhatsApp',
      label: 'WhatsApp',
      icon: { startAdornment: <WhatsAppIcon /> },
      value: design.contactWhatsApp,
    },
    {
      name: 'contactTwitter',
      label: 'Twitter Username',
      icon: { startAdornment: <TwitterIcon /> },
      value: design.contactTwitter,
    },
    {
      name: 'contactInstagram',
      label: 'Instagram Username',
      icon: { startAdornment: <InstagramIcon /> },
      value: design.contactInstagram,
    },
    {
      name: 'contactEmail',
      label: 'Email',
      icon: { startAdornment: <MailIcon /> },
      value: design.contactEmail,
    },
  ];
  return (
    <Box>
      <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Typography variant="subtitle">Socials</Typography>
        {socials.map((social) => (
          <Grid item xs={12} key={social.name}>
            <TextField
              label={social.label}
              id={social.id}
              name={social.name}
              onChange={handleInputChange}
              value={social.value}
              type={social.name === 'email' ? 'email' : 'text'}
              fullWidth
              InputProps={social.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
