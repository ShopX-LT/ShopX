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
              <CustomizeTab design={design} handleInputChange={handleInputChange} />
            </TabPanel>
            {/* <TabPanel value="2">Layout</TabPanel> */}
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default ContactUsForm;

function CustomizeTab({ design, handleInputChange }) {
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
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle">Description</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextArea
            name="contactDescription"
            onChange={handleInputChange}
            value={design.contactDescription}
            placeholder="Enter any extra description about your store"
          />
        </Grid>

        <ColorPicker
          id="contactBgColor"
          name="contactBgColor"
          label="Background Color"
          onChange={handleInputChange}
          value={design.contactBgColor}
        />
        <ColorPicker
          id="contactHeadingColor"
          name="contactHeadingColor"
          label="Heading Color"
          onChange={handleInputChange}
          value={design.contactHeadingColor}
        />

        <ColorPicker
          id="contactTextColor"
          name="contactTextColor"
          label="Text Color"
          onChange={handleInputChange}
          value={design.contactTextColor}
        />
        <Grid item xs={12}>
          <TextField
            label="Image"
            name="contactImage"
            onChange={handleInputChange}
            value={design.contactImage}
            fullWidth
          />
        </Grid>

        <Typography variant="subtitle1" marginTop={4}>
          Socials URL
        </Typography>

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
