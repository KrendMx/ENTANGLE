import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

type GradientButtonProps = {
    title: string;
    titleElement?: React.ReactElement;
    gradient?: string;
    onClick: () => void;
    disabled?: boolean;
    loader?: JSX.Element
};

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  titleElement,
  onClick,
  disabled,
  loader,
  gradient = 'linear-gradient(90deg, #FF5EBA 0%, #6831D6DE 87%, #0094FF 100%)',
}) => (
    <div
        onClick={onClick}
        style={{ background: gradient }}
        className={classNames(styles.wrapper, {
          [styles.disabled]: disabled,
        })}
    >
        {titleElement ? (
            <div className={styles.titleElement}>{titleElement}</div>
        ) : (
            <p className={styles.title}>
                {title}
                {loader}
            </p>
        )}
    </div>
);

export default GradientButton;
