import React from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import StakeTextArea from '../StakeTextArea';

type IChart = {
    title: string;
    value: string;
    extraText?: string;
}

const ChartWrapperWithText: React.FC<IChart> = ({ title, value, extraText }) => (
    <div>
        <div className={styles.graphText}>
            <StakeTextArea title={title} extraText={extraText}>
                {value}
            </StakeTextArea>
        </div>
        <Image
            src="/images/fakeGraphs/ent-stake.svg"
            width={250}
            height={144}
            quality={100}
            alt="fake-graph"
        />
    </div>
);

export default ChartWrapperWithText;
