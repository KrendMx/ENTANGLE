import classNames from 'classnames';
import React, { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/ui-kit/Input';
import styles from '../style.module.css';
import Select, { Option } from '@/components/ui-kit/Select';
import Text from '@/components/HomePage/PayModal/Text';

type PropType = {

}

const Borrow: React.FC<PropType> = (props) => {
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
                        Select your Synth-Lp

                    </p>
                    <Select
                        onChange={() => {}}
                        value={synthLP}
                    >
                        <Option value="2">Select your Synth-Lp</Option>
                        <Option value="1">Select your Synth-Lp</Option>
                    </Select>
                </div>
                <div>

                    <p className={
                        classNames(styles.sectionTitle, styles.white)
                    }
                    >
                        Lock Synth-LP Amount
                    </p>
                    <Input type="number" placeholder="Enter amount of Synth-LP" onChange={() => {}} value="" />
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
                        You will get enUSD
                    </p>
                    <Input type="number" placeholder="You will get enUSD" onChange={() => {}} value="" />
                </div>
                <div>
                    <Text title="Curren AVG collaterization" content="88.55%" />
                    <Text title="Exchange rate" content="1 SynthLP = 1.36 enUSD" />
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

export default Borrow;
