import React from 'react';
// Material UI ============================================================= //
import { Typography } from '@mui/material';
// Components ============================================================== //
import NavGroup from './NavGroup';

// ===========================|| SIDEBAR MENU LIST ||=========================== //

const MenuList = ({ menuItems }) => {
  if (menuItems?.items) {
    const navItems = menuItems.items.map(item => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });

    return navItems;
  } else {
    return (
      <Typography variant="h6" color="error" align="center">
        Menu Items Error
      </Typography>
    );
  }
};

export default MenuList;
