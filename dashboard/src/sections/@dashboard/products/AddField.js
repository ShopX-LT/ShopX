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
          <TextField
            autoFocus
            margin="dense"
            label="Feature name"
            type="text"
            fullWidth
            variant="standard"
            onChange={props.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="error">
            Cancel
          </Button>
          <Button onClick={props.save} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddField;
