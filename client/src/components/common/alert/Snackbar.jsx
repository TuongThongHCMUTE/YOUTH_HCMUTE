import * as React from 'react';
// Redux =================================================================== //
import { useSelector, useDispatch } from 'react-redux';
import { alertSelector } from 'redux/selectors/ui-selectors';
import { uiActions } from 'redux/reducers/ui-reducer';
// Helpers ================================================================= //
import { 
  DEFAULT_ALERT_TIMEOUT, 
  DEFAULT_ALERT_SEVERITY, 
  DEFAULT_ALERT_ANCHOR 
} from 'helpers/ui';
// Material UI ============================================================= //
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbar(props) {
  const dispatch = useDispatch();
  const alert = useSelector(alertSelector);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(uiActions.hideAlert());
  };

  if (!alert) {
    return null;
  }

  return (
    <Snackbar
      open={true}
      autoHideDuration={alert.duration || DEFAULT_ALERT_TIMEOUT}
      anchorOrigin={
        props.anchorOrigin || DEFAULT_ALERT_ANCHOR
      }
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity || DEFAULT_ALERT_SEVERITY}
        sx={{ width: '100%' }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
