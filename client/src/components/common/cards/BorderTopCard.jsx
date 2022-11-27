import React from 'react';

const BorderTopCard = ({ borderColor, topColor, children }) => {
  const styles = {
    BorderTopCard: {
      border: `1px solid ${borderColor}`,
      borderTop: `4px solid ${topColor}`
    }
  };

  return <div style={styles.BorderTopCard}>{children}</div>;
};

export default BorderTopCard;
