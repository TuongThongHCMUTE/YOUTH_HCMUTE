import React from 'react';
// Redux =================================================================== //
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MENU_OPEN } from 'redux/actions/customization-actions';
import { defaultPathSelector } from 'redux/selectors/ui-selectors';
// Material UI ============================================================= //
import { ButtonBase } from '@mui/material';
// Components ============================================================== //
import Logo from 'components/common/Logo';

// ===========================|| MAIN LOGO ||=========================== //

const LogoSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectTo = useSelector(defaultPathSelector);

  return (
    <ButtonBase
      disableRipple
      onClick={() => {
        dispatch({ type: MENU_OPEN, id: 'dashboard' });
        navigate(redirectTo);
      }}
    >
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
