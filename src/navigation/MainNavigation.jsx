import React, { useState } from 'react';
import styles from './MainNavigation.module.scss';
import { NavLink } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';
import { BsBellFill } from 'react-icons/bs';

import { navigationRoutes } from './routes';
import MainHeader from './MainHeader';
import MainNavLinks from './MainNavLinks';
import SideDrawer from './SideDrawer';
import BackDrop from '../components/BackDrop';
import SideNavLinks from './SideNavLinks';

const MainNavigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerOpen(false);
    }

    return (
        <React.Fragment>
            <BackDrop show={drawerOpen} onClick={closeDrawerHandler} />
            <SideDrawer show={drawerOpen} onClick={closeDrawerHandler}>
                <nav className={styles['drawer-nav']}>
                    <SideNavLinks />
                </nav>
            </SideDrawer>
            <MainHeader className={styles['navigation']}>
                <section className={styles['left-section']}>
                    <CgMenu className={styles['menu-btn']} onClick={openDrawerHandler} />
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
