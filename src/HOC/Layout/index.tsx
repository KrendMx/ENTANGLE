import { useTranslation } from 'react-i18next';
import React from 'react';
import Footer from '../../../components/Footer/index';
import Header from '../../../components/Header';
import styles from './style.module.css';

type ILayoutProps = {
    children: JSX.Element
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.layout}>
                <main>
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
