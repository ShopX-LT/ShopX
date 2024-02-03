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

const AddField = (props) => {
  return (
    <Box>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle align="center">
          New Feature <Divider />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Add a new feature to your product</DialogContentText>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddField;
