import { useState } from 'react';

import { Alert, Snackbar } from '@mui/material';

function ErrorSnackbar({ error, setError, vertical = 'top', horizontal = 'right', duration = 4000 }) {
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setError('');
  };
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackbar;
