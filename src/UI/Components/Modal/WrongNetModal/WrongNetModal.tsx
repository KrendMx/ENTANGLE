import React from 'react';

import type { SelectWalletProps } from './WrongNetModal.interface';
import Modal from '../index';
import WrongNetModalContent from './WrongNetModal.content';

const WrongNetModal: React.FC<SelectWalletProps> = ({
    selectChain,
    handleClose,
}) => (
    <Modal handleClose={handleClose}>
        <WrongNetModalContent
            handleClose={handleClose}
            selectChain={selectChain}
        />
    </Modal>
);

export default WrongNetModal;
