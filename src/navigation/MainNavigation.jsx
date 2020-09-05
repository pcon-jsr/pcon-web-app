import React from 'react';
import styles from './MainNavigation.module.scss';
import { NavLink } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';

import MainHeader from './MainHeader';

const MainNavigation = () => {
    return (
        <React.Fragment>
            <MainHeader className={styles['navigation']}>
                <section>
                    <CgMenu className={styles['menu-btn']} />
                    <h1 className={styles['title']}>
                        <NavLink to="/" activeClassName={styles['active']}>PCON</NavLink>
                    </h1>
                </section>
                <nav className={styles['header-nav']}>

                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;
