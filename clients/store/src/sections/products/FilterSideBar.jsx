import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import useCategory from './hooks/useCategory';
import { capitalize } from 'lodash';
import { useSelector } from 'react-redux';

const FilterSideBar = ({
  categories,
  changeCategory,
  changeCustomCategory,
  customCategories,
  resetFilter,
  selectedCategory,
  selectedCustomCategories,
}) => {
  const heroDesign = useSelector((state) => state.webDesign.hero);
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Box>
      {/* TODO change to general button */}
      <Button
        aria-label={`${openFilter} product filter menu`}
        variant="outlined"
        disableRipple
        onClick={handleOpenFilter}
        sx={{ color: heroDesign.heroActionButtonColor, borderColor: heroDesign.heroActionButtonColor }}
      >
        Filter&nbsp;
        <TuneIcon />
      </Button>
      <Drawer
        anchor="left"
        open={openFilter}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', background: '#313131', color: '#e1e1e1', overflow: 'scroll' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton aria-label="close product filter menu" onClick={handleCloseFilter}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={3} sx={{ p: 3 }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Category
            </Typography>
            <RadioGroup aria-label="select category" onChange={changeCategory} value={selectedCategory}>
              {categories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  value={category.name}
                  control={<Radio />}
                  label={capitalize(category.name)}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box>
            {customCategories.map((option) => (
              <Box key={option.feature}>
                <Typography variant="subtitle1" gutterBottom>
                  {capitalize(option.feature)}
                </Typography>
                <FormGroup>
                  {option.values.map((value) => (
                    <FormControlLabel
                      key={value}
                      control={<Checkbox />}
                      label={capitalize(value)}
                      value={value}
                      checked={selectedCustomCategories.includes(value)}
                      onChange={changeCustomCategory}
                    />
                  ))}
                </FormGroup>
              </Box>
            ))}
          </Box>
          {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </div> */}
        </Stack>
        <Box sx={{ p: 3 }}>
          <Button
            aria-label="clear all selected menu "
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={resetFilter}
            startIcon={<ClearAllIcon />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default FilterSideBar;
