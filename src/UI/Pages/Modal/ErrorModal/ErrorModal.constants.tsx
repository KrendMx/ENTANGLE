const MetamaskErrorUserMessages = {
    4001: { head: 'Wallet Error', message: 'Canceled request.' },
    4100: { head: 'Auth Error', message: 'You need to authorize' },
    4200: { head: 'Internal Error', message: 'This method is unsupported.' },
    4900: { head: 'Provider Error', message: 'Disconnected' },
    4901: { head: 'Chain Error', message: 'Disconnected.' },
} as const;

export { MetamaskErrorUserMessages };
