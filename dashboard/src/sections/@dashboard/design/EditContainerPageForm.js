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

const EditContainerPageForm = ({ design, handleInputChange, handleFormSubmit }) => {
  return (
    <Box sx={{ width: '400px', p: 2, border: '1px solid black', borderRadius: '5px' }}>
      <Typography variant="subtitle1" align="center">
        Edit Product Container Page
      </Typography>
      <Divider sx={{ marginBottom: 4 }} />

      <form onSubmit={handleFormSubmit}>
        <Accordion>
          <AccordionSummary
            aria-controls="product container content"
            expandIcon={<ExpandMoreIcon />}
            id="product container header"
          >
            <Typography variant="h6">Product Container</Typography>
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
                  label="Container Style"
                  name="productStyle"
                  // error={Boolean(touched.productStyle) && Boolean(errors.productStyle)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.productStyle}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} mt={7}>
                <Typography variant="subtitle" fontWeight={'500'}>
                  Item Background
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="productBackgroundColor"
                  name="productBackgroundColor"
                  disabled
                  label="Select Item Description Color"
                  // error={Boolean(touched.productBackgroundColor) && Boolean(errors.productBackgroundColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.productBackgroundColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="productBackgroundColor"
                  name="productBackgroundColor"
                  value={design.productBackgroundColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>

              {/* BUTTON */}
              <Grid item xs={12} mt={7}>
                <Typography variant="subtitle" fontWeight={'500'}>
                  Action Button
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="productActionButtonTextColor"
                  name="productActionButtonTextColor"
                  disabled
                  label="Select Item Text color"
                  // error={Boolean(touched.productActionButtonTextColor) && Boolean(errors.productActionButtonTextColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.productActionButtonTextColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="productActionButtonTextColor"
                  name="productActionButtonTextColor"
                  value={design.productActionButtonTextColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="productActionButtonColor"
                  name="productActionButtonColor"
                  disabled
                  label="Select Item Button Color"
                  // error={Boolean(touched.productActionButtonColor) && Boolean(errors.productActionButtonColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.productActionButtonColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="productActionButtonColor"
                  name="productActionButtonColor"
                  value={design.productActionButtonColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} mt={7}>
                <Typography variant="subtitle" fontWeight={'500'}>
                  Item Description
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="productMainTextColor"
                  name="productMainTextColor"
                  disabled
                  label="Select Item Description Color"
                  // error={Boolean(touched.productMainTextColor) && Boolean(errors.productMainTextColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.productMainTextColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="productMainTextColor"
                  name="productMainTextColor"
                  value={design.productMainTextColor}
                  onChange={handleInputChange}
                  style={{ cursor: 'pointer', width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} mt={7}>
                <Typography variant="subtitle" fontWeight={'500'}>
                  Sub text
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="productSubTextColor"
                  name="productSubTextColor"
                  disabled
                  label="Select Subtext Color"
                  // error={Boolean(touched.productSubTextColor) && Boolean(errors.productSubTextColor)}
                  // onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={design.productSubTextColor}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <input
                  type="color"
                  id="productSubTextColor"
                  name="productSubTextColor"
                  value={design.productSubTextColor}
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

export default EditContainerPageForm;
