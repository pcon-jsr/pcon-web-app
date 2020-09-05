import React from 'react';
import styles from './BottomAppBar.module.scss';

const BottomAppBar = (props) => {
    return (
        <nav className={`${styles['app-bar']} ${props.className}`}>
            {props.children}
        </nav>
    );
};

export default BottomAppBar;
