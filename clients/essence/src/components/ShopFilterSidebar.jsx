import PropTypes from "prop-types";
import * as _ from "lodash";
import { useState, useEffect } from "react";
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
// components
import Iconify from "./iconify";
import Scrollbar from "./scrollbar";
import { getAllCategories } from "../services/categoryService";

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];
export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  categories: PropTypes.array,
  customCategories: PropTypes.object,
  selectedCategory: PropTypes.string,
  selectedCustomCategories: PropTypes.array,
  onFilterOptionsChange: PropTypes.func,
  changeCustomCategory: PropTypes.func,
  resetFilter: PropTypes.func,
};

export default function ShopFilterSidebar({
  openFilter,
  onOpenFilter,
  onCloseFilter,
  categories,
  selectedCategory,
  customCategories,
  selectedCustomCategories,
  changeCustomCategory,
  onFilterOptionsChange,
  resetFilter,
}) {
  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="left"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: "none", overflow: "hidden" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup
                onChange={onFilterOptionsChange}
                value={selectedCategory}
              >
                {categories.map((category) => (
                  <FormControlLabel
                    key={category.id}
                    value={category.name}
                    control={<Radio />}
                    label={_.capitalize(category.name)}
                  />
                ))}
              </RadioGroup>
            </div>

            {Object.keys(customCategories).map((key) => {
              return (
                <div key={key}>
                  <Typography variant="subtitle1" gutterBottom>
                    {_.capitalize(key)}
                  </Typography>
                  <FormGroup>
                    {customCategories[key].map((option) => {
                      return (
                        <FormControlLabel
                          key={option}
                          control={<Checkbox />}
                          label={_.capitalize(option)}
                          value={option}
                          checked={selectedCustomCategories.includes(option)}
                          onChange={changeCustomCategory}
                        />
                      );
                    })}
                  </FormGroup>
                </div>
              );
            })}

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
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={resetFilter}
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
