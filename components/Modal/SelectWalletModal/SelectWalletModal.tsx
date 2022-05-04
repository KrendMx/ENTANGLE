import React from 'react';

import type { SelectWalletProps } from './SelectWalletModal.interface';
import Modal from '../index';
import SelectWalletModalContent from './SelectWalletModalContent';

const SelectWalletModal: React.FC<SelectWalletProps> = ({
    selectWallet,
    handleClose,
}) => (
    <Modal handleClose={handleClose}>
        <SelectWalletModalContent
            handleClose={handleClose}
            selectWallet={selectWallet}
        />
    </Modal>
);

export default SelectWalletModal;
