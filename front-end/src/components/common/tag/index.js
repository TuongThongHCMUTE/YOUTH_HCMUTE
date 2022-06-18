// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './index.module.scss';
// Material UI ============================================================= //
import { Tooltip } from '@mui/material';

// =================================|| TAG||================================ //
const Tag = ({ tag, actived }) => {
  return (
    <Tooltip title={tag.description} arrow>
      <div className={clsx({
        [styles.Tag]: true,
        [styles.ActivedTag]: actived
      })}>
          #{tag.id}
      </div>
    </Tooltip>
  )
}

export default Tag;