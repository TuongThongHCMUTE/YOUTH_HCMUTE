// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from './index.module.scss';

// =================================|| TAG||================================ //
const Tag = ({ tag }) => {
  return (
    <div className={styles.Tag}>
        {tag.id}
    </div>
  )
}

export default Tag;