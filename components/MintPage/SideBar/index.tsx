import React from 'react';
import type { MintDashboardItemCardType } from '../types';

type SidebarProps = MintDashboardItemCardType;

const SideBar: React.FC<SidebarProps | null> = (props) =>
    // const {
    //     bgGradient,
    //     icon,
    //     heading,
    //     description,
    //     priceCurrency,
    //     disabled,
    //     apr,
    //     price,
    //     currentDeposits,
    // } = props;
    (
        <div
            style={{
                width: '356px',
                position: 'absolute',
                height: 'calc(100% + 56px)',
                zIndex: '48',
                right: '-341px',
                top: '-56px',
                overflowX: 'hidden',
            }}
        >
            <div
                style={{
                    marginLeft: '0vw',
                    height: '100%',
                    backdropFilter: 'blur(5px)',
                    background: 'red',
                }}
            >
                <p>123</p>
            </div>
        </div>
    );
export default SideBar;
