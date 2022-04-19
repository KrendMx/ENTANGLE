import React from 'react';

import type { ErrorModalProps } from './ErrorModal.interfaces';
import Modal from '../index';
import ErrorModalContent from './ErrorModalContent';

const ErrorModal: React.FC<ErrorModalProps> = ({ error, handleClose }) => (
    <Modal handleClose={handleClose}>
        <ErrorModalContent handleClose={handleClose} error={error} />
    </Modal>
);

export default ErrorModal;
