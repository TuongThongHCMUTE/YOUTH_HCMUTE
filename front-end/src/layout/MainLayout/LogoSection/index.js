import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
// Constants =============================================================== //
import { USER_ROLES } from 'store/constant';
import { MENU_OPEN } from 'store/actions';

// ===========================|| MAIN LOGO ||=========================== //

const LogoSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const role = sessionStorage.getItem('role');
    let redirectTo;

    switch(role) {
        case USER_ROLES.DOAN_TRUONG:
            redirectTo = '/admin/dashboard/default';
            break;
        case USER_ROLES.SINH_VIEN:
            redirectTo = '/student/dashboard/default';
            break;
        default:
            redirectTo = config.defaultPath;
            break;
    }
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
}

export default LogoSection;
