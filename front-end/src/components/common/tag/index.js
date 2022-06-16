// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';
// Material UI ============================================================= //
import { Tooltip } from '@mui/material';

// =================================|| TAG||================================ //
const Tag = ({ tag }) => {
  return (
    <Tooltip title={tag.description} arrow>
      <div className={styles.Tag}>
          {tag.id}
      </div>
    </Tooltip>
  )
}

export default Tag;