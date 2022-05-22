import type { ContainerStateType } from '../Dashboard/DashboardItem/containers/types';

type PayModalPropsType = {
    handleClose: () => void;
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>

type namesValues = 'AVAX' | 'FTM' | 'BSC';

export type { PayModalPropsType, namesValues };
