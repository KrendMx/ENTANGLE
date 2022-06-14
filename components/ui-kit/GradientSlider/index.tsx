import React from 'react';
import styles from './style.module.css';

type PropTypes = {
    min: number;
    max: number;
    extraSymbol?: string;
    outsideVariable: string;
    setOutsideVariable: (x: string) => void;
};

const GradientSlider: React.FC<PropTypes> = (props) => {
    const {
        min, max, setOutsideVariable, outsideVariable, ...otherProps
    } = props;

    const returnActualChange = (value: number): number =>
        Math.floor(((max - min) * value) / 100 + min);

    function changeColor(e: React.ChangeEvent<HTMLInputElement>): void {
        e.target.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, 
            rgba(0, 0, 0, 0) ${e.target.value}%, 
            rgba(0, 0, 0, 0.5) ${e.target.value}%, 
            rgba(0, 0, 0, 0.5) 100%), 
            linear-gradient( 90deg, rgb(255, 94, 186) 0%, rgb(104, 49, 214) 87%, rgb(0, 148, 255) 100%)`;
    }

    return (
        <div className={styles.wrapper}>
            <p>
                {min}
                {otherProps.extraSymbol}
            </p>
            <input
                type="range"
                min={0}
                max={100}
                onChange={(e) => {
                    changeColor(e);
                    setOutsideVariable(
                        returnActualChange(Number(e.target.value)).toString(),
                    );
                }}
                data-content={outsideVariable}
            />
            <p>
                {max}
                {otherProps.extraSymbol}
            </p>
        </div>
    );
};

export default GradientSlider;
