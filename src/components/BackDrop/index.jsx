import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';
import { CSSTransition } from 'react-transition-group';

const BackDrop = (props) => {
    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames={{
                enterActive: styles['slide-in-left-enter'],
                enterDone: styles['slide-in-left-enter-active'],
                exitActive: styles['slide-in-left-exit'],
                exit: styles['slide-in-left-exit-active'],
            }}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles['backdrop']} onClick={props.onClick}></div>
        </CSSTransition>,
        document.getElementById('backdrop-hook')
    );
};

export default BackDrop;