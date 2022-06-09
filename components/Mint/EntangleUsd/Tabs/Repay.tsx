import classNames from 'classnames';
import React, { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/ui-kit/Input';
import styles from '../style.module.css';
import Text from '@/components/HomePage/PayModal/Text';

type PropType = {

}

const Repay: React.FC<PropType> = (props) => {
    const [synthLP, setSynthLP] = useState<string>('1');
    const changeSynthLP = (value:string) => { setSynthLP(value); };
    return (
        <div className={styles.wrapper}>

            <div className={classNames(styles.actionCard)}>
                <div>
                    <p className={
                        classNames(styles.sectionTitle, styles.white)
                    }
                    >
                        Enter amount of enUSD
                    </p>
                    <Input type="number" placeholder="Enter amount of enUSD" onChange={() => {}} value="" />
                </div>
                <div>
                    <Text title="Your Balance of enUSD" content="150 enUSD" />
                </div>
            </div>
            <div className={classNames(styles.actionCard)}>
                <div className={styles.arrow}>
                    <Image
                        src="/images/Arrow.svg"
                        width={55}
                        height={55}
                        quality={100}
                        alt="arrow-icon"
                    />
                </div>
                <div>
                    <p className={
                        classNames(styles.sectionTitle, styles.white)
                    }
                    >
                        Unlocked Synth-LP
                    </p>
                    <Input type="number" placeholder="Unlocked Synth-LP" onChange={() => {}} value="" />
                </div>
                <div>
                    <Text title="Exchange rate" content="1 SynthLP = 1.36 enUSD" />
                    <Text title="Curren AVG collaterization" content="88.55%" />
                </div>

            </div>
            <div className={styles.actionCard}>
                <div className={styles.arrow}>
                    <Image
                        src="/images/Arrow.svg"
                        width={55}
                        height={55}
                        quality={100}
                        alt="arrow-icon"
                    />
                </div>
                <div>
                    <p className={
                        classNames(styles.sectionTitle, styles.white)
                    }
                    >
                        Set LTV Rate
                    </p>
                    <Input type="" placeholder="Set LTV Rate" onChange={() => {}} value="" />
                </div>
                <div>
                    <Text title="Current LTV Rate" content="90%" bigFont />
                </div>
            </div>
        </div>
    );
};

export default Repay;
