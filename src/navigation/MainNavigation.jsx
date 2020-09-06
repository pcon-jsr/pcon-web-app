import React, { useState } from 'react';
import styles from './MainNavigation.module.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';
import { BsBellFill } from 'react-icons/bs';

import { navigationRoutes } from './routes';
import MainHeader from './MainHeader';
import MainNavLinks from './MainNavLinks';
import SideDrawer from './SideDrawer';
import BackDrop from '../components/BackDrop';
import SideNavLinks from './SideNavLinks';
import BottomAppBar from './BottomAppBar';
import { useEffect } from 'react';

const MainNavigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const browserHistory = useHistory();

    const openDrawerHandler = () => {
        setDrawerOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerOpen(false);
    }

    useEffect(() => {
        const popListener = browserHistory.listen(location => {
            if (drawerOpen && browserHistory.action === 'POP') {
                closeDrawerHandler();
                browserHistory.goForward();
            }
        });

        return () => {
            popListener();
        }
    }, [drawerOpen, browserHistory]);

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
            <BottomAppBar>
                <MainNavLinks />
            </BottomAppBar>
        </React.Fragment>
    );
};

export default MainNavigation;
