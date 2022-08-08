import React from 'react';

type IModalProps = {
    children: JSX.Element | JSX.Element[];
    deeps: boolean
};

export const ModalAnimationWrapper: React.FC<IModalProps> = ({ children, deeps }) => (
    <div>{children}</div>
);
