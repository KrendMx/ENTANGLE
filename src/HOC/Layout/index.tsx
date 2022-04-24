import React, { useEffect } from 'react';

import {
    useAppDispatch,
    useAppSelector,
} from '../../../Redux/store/hooks/redux';
import { appSlice } from '../../../Redux/store/reducers/AppSlice';
import Preloader from '../../../components/Preloader';

import Footer from '../../../components/Footer/index';
import Header from '../../../components/Header';

import styles from './style.module.css';

type ILayoutProps = {
    children: JSX.Element;
};

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const { isLoaded } = useAppSelector((state) => state.appReducer);
    const { appLoaded } = appSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(appLoaded(true));
    }, []);

    return (
        <div className={styles.wrapper}>
            <Preloader isVisible={!isLoaded} />
            <Header />
            <div className={styles.layout}>
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
