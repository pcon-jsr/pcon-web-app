import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const CustomButton = (props) => {
    const btnRef = useRef();
    const [touchHover, setTouchHover] = useState(false);

    const toggleTouchHover = () => {
        setTouchHover(prev => !prev);
    }

    const touchStartHandler = useCallback((e) => {
        // e.preventDefault();
        toggleTouchHover();
    }, []);

    const touchEndHandler = useCallback((e) => {
        // e.preventDefault();
        toggleTouchHover();
    }, []);

    const { to, href } = props;
    useEffect(() => {
        if (href) {
            return;
        }

        if (!to) {
            btnRef.current.ontouchstart = touchStartHandler;
            btnRef.current.ontouchend = touchEndHandler;
        }

    }, [to, href, touchStartHandler, touchEndHandler]);

    if (props.href) {
        return (
            <a target="_blank" rel="noopener noreferrer" href={props.href} className={`${styles['btn']} ${styles['link']} ${props.light ? styles['light'] : null} ${touchHover ? styles['touch-hover'] : null} ${props.className}`}>
                {props.children}
            </a>
        );
    }


    const generalButtonProps = { ...props };
    if (generalButtonProps.light) {
        delete generalButtonProps.light;
    }

    return props.to ? (
        <Link to={props.to} className={`${styles['btn']} ${styles['link']} ${props.light ? styles['light'] : null} ${touchHover ? styles['touch-hover'] : null} ${props.className}`}>
            {props.children}
        </Link>

    ) : (
            <button {...generalButtonProps} ref={btnRef} onClick={props.onClick} className={`${styles['btn']} ${props.light ? styles['light'] : null} ${touchHover ? styles['touch-hover'] : null} ${props.className}`}>
                {props.children}
            </button>
        );
};

export default CustomButton;
