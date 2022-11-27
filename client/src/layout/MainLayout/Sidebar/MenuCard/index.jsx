import React from 'react';
// Material UI ============================================================= //
import { makeStyles } from '@mui/styles';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Stack,
  Typography
} from '@mui/material';
// Components ============================================================== //
import AnimateButton from 'components/common/extended/AnimateButton';
// Style Constant ========================================================== //
const useStyles = makeStyles(theme => ({
  card: {
    display: 'none',
    background: theme.palette.warning.light,
    marginTop: '16px',
    marginBottom: '16px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '200px',
      height: '200px',
      border: '19px solid ',
      borderColor: theme.palette.warning.main,
      borderRadius: '50%',
      top: '65px',
      right: '-150px'
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '200px',
      height: '200px',
      border: '3px solid ',
      borderColor: theme.palette.warning.main,
      borderRadius: '50%',
      top: '145px',
      right: '-70px'
    }
  },
  tagLine: {
    color: theme.palette.grey[900],
    opacity: 0.6
  },
  button: {
    color: theme.palette.grey[800],
    borderRadius: '0',
    backgroundColor: theme.palette.warning.main,
    textTransform: 'capitalize',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  }
}));

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

const UpgradePlanCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">Sinh viên 5 tốt</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" className={classes.tagLine}>
              Website hỗ trợ tư vấn & bình xét phong trào &quot;Sinh viên 5 tốt&quot;
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row">
              <AnimateButton>
                <Button
                  component={Link}
                  href="https://main.d2w26m07cywgez.amplifyapp.com/"
                  target="_blank"
                  variant="contained"
                  className={classes.button}
                >
                  Truy cập ngay
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UpgradePlanCard;
