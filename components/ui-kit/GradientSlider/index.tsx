import React, { useState } from 'react';
import styles from './style.module.css';

type PropTypes = {
    min: number;
    max: number;
    extraSymbol?: string;
    outsideVariable: string;
    setOutsideVariable: (x: string) => void;
};

const GradientSlider: React.FC<PropTypes> = ({
    min,
    max,
    setOutsideVariable,
    outsideVariable,
    ...props
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [xCoordinate, setXCoordinate] = useState<number>(50);

    const returnActualChange = (value: number): number =>
        Math.floor(((max - min) * value) / 100 + min);

    const getStatusPosition = (value: number): number =>
        ((79 - 6) * value) / 100 + 6;

    function changeColor(e: React.ChangeEvent<HTMLInputElement>): void {
        e.target.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, 
            rgba(0, 0, 0, 0) ${e.target.value}%, 
            rgba(0, 0, 0, 0.5) ${e.target.value}%, 
            rgba(0, 0, 0, 0.5) 100%), 
            linear-gradient( 90deg, rgb(255, 94, 186) 0%, rgb(104, 49, 214) 87%, rgb(0, 148, 255) 100%)`;
    }

    return (
        <div className={styles.wrapper}>
            {isVisible ? (
                <div
                    className={styles.progressStatus}
                    style={{ left: `${getStatusPosition(xCoordinate)}%` }}
                >
                    <span style={{ position: 'relative' }}>
                        {outsideVariable}
                        <div className={styles.pointer} />
                    </span>
                </div>
            ) : null}
            <p>
                {min}
                {props.extraSymbol}
            </p>
            <input
                type="range"
                min={0}
                max={100}
                onMouseDown={() => {
                    setIsVisible(true);
                }}
                onTouchStart={() => {
                    setIsVisible(true);
                }}
                onMouseUp={() => {
                    setIsVisible(false);
                }}
                onTouchEnd={() => {
                    setIsVisible(false);
                }}
                onChange={(e) => {
                    changeColor(e);
                    setXCoordinate(Number(e.target.value));
                    setOutsideVariable(
                        returnActualChange(Number(e.target.value)).toString(),
                    );
                }}
                data-content={outsideVariable}
            />
            <p>
                {max}
                {props.extraSymbol}
            </p>
        </div>
    );
};

export default GradientSlider;
