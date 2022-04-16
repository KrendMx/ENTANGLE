import type {MetamaskErrorUserMessages} from './ErrorModal.constants';

type ErrorModalProps = {
    error: ErrorI;
    handleClose: () => any;
};

interface ErrorI extends Error {
    code: keyof typeof MetamaskErrorUserMessages
}

export type {ErrorModalProps, ErrorI}
