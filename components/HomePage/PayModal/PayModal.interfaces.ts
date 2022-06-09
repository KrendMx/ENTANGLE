import type { ContainerStateType } from '../Dashboard/DashboardItem/containers/types';

type PayModalPropsType = {
    handleClose: () => void;
    apr: string;
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>

export type { PayModalPropsType };
