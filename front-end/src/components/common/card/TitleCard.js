import React from 'react'

const TitleCard = (props) => {
    const { title, children } = props;

    const padding = props.padding || '8px 16px';
    const borderColor = props.borderColor || "var(--color-grey-400)";
    const topColor = props.topColor || "var(--color-primary-400)";

    const styles = {
        TitleCard: {
            // padding: "32px",
            border: `1px solid ${borderColor}`,
            borderTop: `4px solid ${topColor}`,
        },
        Header: {
            margin: '0',
            padding: padding,
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'var(--color-grey-800)'
        },
        Divider: {
            width: '100%',
            height: '1px',
            background: borderColor
        },
        Body: {
            padding: padding,
        }
    }

    return (
        <div style={styles.TitleCard}>
            <h3 style={styles.Header}>{title}</h3>
            <div style={styles.Divider} />
            <div style={styles.Body}>{children}</div>
        </div>
    )
}

export default TitleCard