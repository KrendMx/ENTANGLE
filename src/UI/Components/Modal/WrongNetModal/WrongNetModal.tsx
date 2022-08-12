import React from 'react';

import type { SelectWrongWalletProps } from './WrongNetModal.interface';
import Modal from '../index';
import WrongNetModalContent from './WrongNetModal.content';

const WrongNetModal: React.FC<SelectWrongWalletProps> = ({
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
