import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
// Constants =============================================================== //
import { USER_ROLES } from 'helpers/constants/user';
import { MENU_OPEN } from 'store/actions';

// ===========================|| MAIN LOGO ||=========================== //

const LogoSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const role = sessionStorage.getItem('role');
    let redirectTo;

    switch(role) {
        case USER_ROLES.DOAN_TRUONG:
            redirectTo = '/admin/dashboard/';
            break;
        case USER_ROLES.CONG_TAC_VIEN: 
            redirectTo = '/cong-tac-vien/dashboard';
            break;
        case USER_ROLES.DOAN_VIEN:
            redirectTo = '/sinh-vien/dashboard/';
            break;
        default:
            redirectTo = config.defaultPath;
            break;
    };

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
