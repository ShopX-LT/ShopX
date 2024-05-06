import React from 'react';
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider,
  Button,
} from '@mui/material';

const AddFieldDialog = ({ children, close, open }) => {
  return (
    <Box>
      <Dialog open={open} onClose={close}>
        <DialogTitle align="center">
          New Feature <Divider />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Add a new feature to your product</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddFieldDialog;
