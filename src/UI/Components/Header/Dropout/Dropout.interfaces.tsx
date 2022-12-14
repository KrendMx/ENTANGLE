import type React from 'react';

type DropoutProps = {
    title: string;
    wrapperClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    wrapperTextClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    wrapperPickerClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    wrapperListClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    textClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    isSoon?: boolean;
    offset?: string;
    arrowImg?: React.ReactElement;
    children?: JSX.Element;
    active?: boolean;
};

export type {
    DropoutProps,
};
