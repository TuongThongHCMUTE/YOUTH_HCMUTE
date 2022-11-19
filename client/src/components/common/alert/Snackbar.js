import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbar(props) {
  const { onClose, message, duration, severity, anchorOrigin } = props;

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 6000}
      anchorOrigin={anchorOrigin || { vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity || 'success'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
