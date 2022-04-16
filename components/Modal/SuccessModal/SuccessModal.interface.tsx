type TransactionInfo = { value: number, symbol: string, isReceived: boolean }
type SuccessModalProps = {
    transactionInfo: TransactionInfo;
    handleClose: () => any;
};

export type {SuccessModalProps, TransactionInfo}
