import React from 'react';
import styles from './MainNavigation.module.scss';
import { NavLink } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';
import { BsBellFill } from 'react-icons/bs';

import { navigationRoutes } from './routes';
import MainHeader from './MainHeader';
import MainNavLinks from './MainNavLinks';

const MainNavigation = () => {
    return (
        <React.Fragment>
            <MainHeader className={styles['navigation']}>
                <section className={styles['left-section']}>
                    <CgMenu className={styles['menu-btn']} />
                    <h1 className={styles['title']}>
                        <NavLink exact to={navigationRoutes.HOME} activeClassName={styles['active']}>PCON</NavLink>
                    </h1>
                </section>
                <nav className={styles['header-nav']}>
                    <MainNavLinks />
                </nav>
                <section className={styles['right-section']}>
                    <NavLink exact to={navigationRoutes.NOTIFICATIONS} activeClassName={styles['active']}>
                        <BsBellFill className={styles['notification-btn']} />
                        <p>NOTIFICATIONS</p>
                    </NavLink>
                </section>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;
