import type { ErrorI } from '@/src/Redux/store/interfaces/App.interfaces';

type ErrorModalProps = {
    error: ErrorI;
    handleClose: () => any;
};

export type { ErrorModalProps };
