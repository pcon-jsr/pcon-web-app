import React from 'react';
import styles from './MainHeader.module.scss';

const MainHeader = (props) => {
    return (
        <header className={`${styles['main-header']} ${props.className}`}>
            {props.children}
        </header>
    );
};

export default MainHeader;
