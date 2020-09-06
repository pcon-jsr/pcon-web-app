import React from 'react';
import styles from './index.module.scss';

const Avatar = (props) => {
    return (
        <div className={`${styles['avatar']} ${props.className}`}>
            <img
                alt="avatar"
                src={props.src}
            />
        </div>
    );
};

export default Avatar;
