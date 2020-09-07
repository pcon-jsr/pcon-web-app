import React from 'react';
import styles from './index.module.scss';

const CustomInput = (props) => {


    let element = (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
        />
    );

    if (props.element === 'textarea') {
        element = (
            <textarea
                id={props.id}
                rows={props.rows || 3}
            />
        );
    }


    return (
        <div className={`${styles['form-control']}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>
    );
};

export default CustomInput;
