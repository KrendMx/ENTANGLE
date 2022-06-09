import type { ContainerStateType } from '../Dashboard/DashboardItem/containers/types';

type PayModalPropsType = {
    handleClose: () => void;
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>

export type { PayModalPropsType };
