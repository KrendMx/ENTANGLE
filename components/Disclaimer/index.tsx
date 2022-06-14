import React, { useState } from 'react';
import ScrollLock from 'react-scrolllock';
import styles from './styles.module.css';
import GradientButton from '@/ui-kit/GradientButton';
import GradientCheckbox from '@/ui-kit/GradientCheckbox';

interface DisclaimerProps {
    handleClose: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ handleClose }) => {
    const [checked, setChecked] = useState(false);
    return (
        <div className={styles.wrapper}>
            <ScrollLock>
                <div className={styles.content}>
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.headerText}>Disclaimer</h1>
                        </div>
                        <div className={styles.mainContent}>
                            <p className={styles.blockText}>
                                <p className={styles.paragraph}>
                                    <span className={styles.highLight}>
                                        Unaudited MVP
                                    </span>
                                    : Please do NOT use more than a very small
                                    amount of funds (
                                    <span className={styles.blueText}>
                                        max $30 USD
                                    </span>
                                    ) as there have been no audits of any smart
                                    contracts on the protocol.
                                </p>
                                <p className={styles.paragraph}>
                                    Welcome to Entangle Protocol. Entangle
                                    allows trustless exposure to cross-chain
                                    yields via Synthetic LP Vaults.
                                </p>
                                <p className={styles.paragraph}>
                                    In the near future, Entangle Protocol will
                                    allows you to borrow Entangle USD (
                                    <span className={styles.blueText}>
                                        enUSD
                                    </span>
                                    ) a cross-chain fully collateralised
                                    stable-coin against your synthetic yield
                                    bearing assets.
                                </p>

                                <p className={styles.paragraph}>
                                    No representation or warranty is made
                                    concerning any aspect of the Entangle
                                    Protocol.
                                </p>
                                <p className={styles.paragraph}>
                                    You take full responsibility for your use of
                                    the Entangle Protocol, and acknowledge that
                                    you use it on the basis of your own accord,
                                    without solicitation or inducement by
                                    contributors.
                                </p>
                                <p className={styles.paragraph}>
                                    Entangle Protocol is not available to
                                    residents of&nbsp;
                                    <span className={styles.highLight}>
                                        Belarus, the Central African Republic,
                                        the Democratic Republic of Congo, the
                                        Democratic People’s Republic of Korea,
                                        the Crimea region of Ukraine, Cuba,
                                        Iran, Libya, Somalia, Sudan, South
                                        Sudan, Syria, the USA, Yemen, and
                                        Zimbabwe or any other jurisdiction in
                                        which accessing or using the Protocol is
                                        prohibited (“Prohibited Jurisdictions”).
                                    </span>
                                </p>
                                <p className={styles.paragraph}>
                                    By Using Entangle , you confirm that you are
                                    not located in, incorporated or otherwise
                                    established in, or a citizen or resident of,
                                    a Prohibited Jurisdiction.
                                </p>
                            </p>
                            <GradientCheckbox
                                text={`
                            I confirm that I have read, understand and 
                            accept the Terms of Use and the Risks statement
                            `}
                                gradient="linear-gradient(90deg, #FF5EBA 1.04%, #00F0FF 103.25%)"
                                isChecked={checked}
                                onClickHandler={() => setChecked(!checked)}
                                additionalClass={styles.extraForCheckbox}
                            />
                            <div className={styles.blockButton}>
                                <GradientButton
                                    title="Enter"
                                    gradient="linear-gradient(90deg, #FF5EBA 1.04%, #00F0FF 103.25%)"
                                    onClick={checked ? handleClose : undefined}
                                    wrapperClass={styles.btn}
                                    disabled={!checked}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollLock>
        </div>
    );
};

export default Disclaimer;
