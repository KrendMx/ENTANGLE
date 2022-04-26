import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

type TypographyType = 'title' | 'textBody'

type TypographyProps = {
    type: TypographyType,
    children: React.ReactNode | string,
    underline?: boolean,
    classNameModifier?: string
}

const Typography: React.FC<TypographyProps> = ({
    type,
    children,
    underline,
    classNameModifier,
}) => {
    const className = React.useMemo(
        () => classNames(styles[type], classNameModifier, { [styles.underline]: underline }),
        [underline, type],
    );

    switch (type) {
    case 'title':
        return <h2 className={className}>{children}</h2>;
    case 'textBody':
        return <p className={className}>{children}</p>;
    default:
        return null;
    }
};

export default Typography;
