import React from 'react';

import type {SuccessModalProps} from './SuccessModal.interface';
import Modal from '../index';
import SuccessModalContent from './SuccessModalContent';


const SuccessModal: React.FC<SuccessModalProps> = ({transactionInfo, handleClose}) => (
    <Modal handleClose={handleClose}>
        <SuccessModalContent handleClose={handleClose} transactionInfo={transactionInfo}/>
    </Modal>
);

export default SuccessModal;
