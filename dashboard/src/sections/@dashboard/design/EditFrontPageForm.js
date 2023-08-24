import React from 'react';
import { styled } from '@mui/system';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  TextareaAutosize,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Yup from 'yup';

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    border: 1px solid grey;
  `
);

const colorFormat = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const EditFrontPageForm = ({ design, handleInputChange, handleFormSubmit }) => {
  return (
    <Box sx={{ width: '400px', p: 2, border: '1px solid black', borderRadius: '5px' }}>
      <Typography variant="subtitle1" align="center">
        Edit Front Page
      </Typography>
      <Divider sx={{ marginBottom: 4 }} />

      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={1} marginBottom={4}>
          <Grid item xs={9}>
            <TextField
              id="mainBackgroundColor"
              name="mainBackgroundColor"
              disabled
              label="Set site backgoround Color"
              // error={Boolean(touched.navTextColor) && Boolean(errors.navTextColor)}
              // onBlur={handleBlur}
              onChange={handleInputChange}
              value={design.mainBackgroundColor}
              variant="standard"
            />
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
            <input
              type="color"
              id="mainBackgroundColor"
              name="mainBackgroundColor"
              value={design.mainBackgroundColor}
              onChange={handleInputChange}
              style={{ cursor: 'pointer', width: '100%' }}
            />
          </Grid>
        </Grid>
        <Accordion>
          <AccordionSummary
            aria-controls="navigation bar content"
            expandIcon={<ExpandMoreIcon />}
            id="navigation bar header"
          >
            <Typography variant="h6">Nav bar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={9}>
                <TextField
                  id="navTextColor"
                  name="navTextColor"
                  disabled
                  label="Select Nav Text Color"
                  // error={Boolean(touched.navTextColor) && Boolean(errors.navTextColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.navTextColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="navTextColor"
                  name="navTextColor"
                  value={design.navTextColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="navBackgroundColor"
                  name="navBackgroundColor"
                  disabled
                  label="Select Nav Background Color"
                  // error={Boolean(touched.navBackgroundColor) && Boolean(errors.navBackgroundColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.navBackgroundColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="navBackgroundColor"
                  name="navBackgroundColor"
                  value={design.navBackgroundColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* HERO SECTION */}

        <Accordion>
          <AccordionSummary
            aria-controls="navigation bar content"
            expandIcon={<ExpandMoreIcon />}
            id="navigation bar header"
          >
            <Typography variant="h6">Hero Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              {/* STYLE */}
              <Grid item xs={12}>
                <Typography variant="subtitle" fontWeight={'500'}>
                  Style
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Hero's Style"
                  name="heroStyle"
                  // error={Boolean(touched.heroStyle) && Boolean(errors.heroStyle)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroStyle}
                  fullWidth
                  disabled
                />
              </Grid>

              {/* IMAGE */}
              <Grid item xs={12} mt={7}>
                <Typography variant="subtitle" fontWeight={'500'}>
                  Image
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  name="heroImageUrl"
                  // error={Boolean(touched.heroImageUrl) && Boolean(errors.heroImageUrl)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroImageUrl}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Blur"
                  name="heroImageBlur"
                  // error={Boolean(touched.heroImageBlur) && Boolean(errors.heroImageBlur)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroImageBlur}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Cover opacity"
                  name="heroImageCoverOpacity"
                  // error={Boolean(touched.heroImageCoverOpacity) && Boolean(errors.heroImageCoverOpacity)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroImageCoverOpacity}
                  fullWidth
                />
              </Grid>

              {/* BUTTON */}
              <Grid item xs={12} mt={7}>
                <Typography variant="subtitle" fontWeight={'500'}>
                  Action Button
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="heroActionButtonText"
                  label="Button Text"
                  name="heroActionButtonText"
                  // error={Boolean(touched.heroActionButtonText) && Boolean(errors.heroActionButtonText)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroActionButtonText}
                  fullWidth
                />
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={9}>
                <TextField
                  id="heroActionButtonTextColor"
                  name="heroActionButtonTextColor"
                  disabled
                  label="Text color"
                  // error={Boolean(touched.heroActionButtonTextColor) && Boolean(errors.heroActionButtonTextColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroActionButtonTextColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="heroActionButtonTextColor"
                  name="heroActionButtonTextColor"
                  value={design.heroActionButtonTextColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="heroActionButtonColor"
                  name="heroActionButtonColor"
                  disabled
                  label="Background color"
                  // error={Boolean(touched.heroActionButtonColor) && Boolean(errors.heroActionButtonColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroActionButtonColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="heroActionButtonColor"
                  name="heroActionButtonColor"
                  value={design.heroActionButtonColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>
              {/* HEADINLINE */}
              <Grid item xs={12} mt={7}>
                <Typography variant="subtitle" fontWeight={'500'}>
                  Headline
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StyledTextarea
                  minRows={4}
                  name="heroHeadline"
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroHeadline}
                  placeholder="Enter Headline text here"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="heroHeadlineColor"
                  name="heroHeadlineColor"
                  disabled
                  label="Select Headline Color"
                  // error={Boolean(touched.heroHeadlineColor) && Boolean(errors.heroHeadlineColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroHeadlineColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="heroHeadlineColor"
                  name="heroHeadlineColor"
                  value={design.heroHeadlineColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} mt={7}>
                <Typography variant="subtitle" fontWeight={'500'}>
                  Sub text
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StyledTextarea
                  minRows={4}
                  name="heroSubText"
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroSubText}
                  placeholder="Enter Headline text here"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="heroSubTextColor"
                  name="heroSubTextColor"
                  disabled
                  label="Select Subtext Color"
                  // error={Boolean(touched.heroSubTextColor) && Boolean(errors.heroSubTextColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.heroSubTextColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="heroSubTextColor"
                  name="heroSubTextColor"
                  value={design.heroSubTextColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Box sx={{ mx: 'auto' }}>
          <Button variant="contained" sx={{ mt: 4 }} type="submit" fullWidth>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditFrontPageForm;
