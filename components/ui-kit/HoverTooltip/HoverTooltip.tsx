import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

type CopyBtnProps = {
    text: string,
    isVisible: boolean,
    wrapperClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
}
const HoverTooltip: React.FC<CopyBtnProps> = ({text, isVisible = false, wrapperClassName}) => <div className={styles.relative}>
    <div className={classNames({[styles.visible]: isVisible, [styles.showUpHover]: isVisible}, wrapperClassName, styles.upHover)}>{text}</div>
</div>;

export default HoverTooltip;
