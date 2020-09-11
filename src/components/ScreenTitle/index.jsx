import React from 'react';
import styles from './index.module.scss';

const ScreenTitle = (props) => {
    return (
        <h3 className={`${styles['screen-title']} ${props.className}`}>
            {props.children}
        </h3>
    );
};

export default ScreenTitle;
