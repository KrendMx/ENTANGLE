import React, {
  useContext, useEffect, useState, useMemo,
} from 'react';
import classNames from 'classnames';
import { Contract, providers } from 'ethers';
import SoonChart from '../ui-kit/SoonChart/SoonChart';

import InvestCard from './InvestCard';
import Typography from '../Typography';
import Select, { Option } from '../ui-kit/Select';
import InfoBlock from '../ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from '../ui-kit/InfoBlock/InfoBlock.constants';
import {
  ftmDex,
  ftmSynth,
  avaDex,
  avaSynth,
} from '../HomePage/Dashboard/DashboardItem/containers/abi/index';
import { ProviderContext } from '../../context/ProviderContext';
import { getChangeData } from '../../src/api/index';

import styles from './style.module.css';

export interface IState {
    positions: string;
    price: string;
}

const Profile = () => {
  const { getPositionSum, positionSum } = useContext(ProviderContext);
  const [balance, setBalance] = useState<number>(0);
  const [filter, setFilter] = React.useState('');
  const [avaxState, setAvaxState] = useState<IState>();
  const [ftmState, setFtmState] = useState<IState>();
  const [change, setChange] = useState<number>();
  const { account, txLoading } = useContext(ProviderContext);

  const ftmSynthContract = useMemo(
    () => new Contract(
      '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71',
      ftmSynth,
      new providers.JsonRpcProvider('https://rpc.ftm.tools'),
    ),
    [],
  );

  const ftmDEXContract = useMemo(
    () => new Contract(
      '0x9A43E738194DE3369D457C918E2A4CF6FA8BdB8d',
      ftmDex,
      new providers.JsonRpcProvider('https://rpc.ftm.tools'),
    ),
    [],
  );

  const avaSynthContract = useMemo(
    () => new Contract(
      '0xf4fB65ecbc1F01ADa45617a5CcB6348Da59c03F3',
      avaSynth,
      new providers.JsonRpcProvider(
        'https://api.avax.network/ext/bc/C/rpc',
      ),
    ),
    [],
  );

  const avaDEXContract = useMemo(
    () => new Contract(
      '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
      avaDex,
      new providers.JsonRpcProvider(
        'https://api.avax.network/ext/bc/C/rpc',
      ),
    ),
    [],
  );

  // useEffect(() => {
  //     (async function() {
  //         const data = await getChangeData();
  //         const avaxChange = (1 /data[0].price.avaxSynth) * Number(avaxState?.positions) - (1 /data[1].price.avaxSynth) * Number(avaxState?.positions)
  //         const ftmChange = (1 /data[0].price.fantomSynth) * Number(ftmState?.positions) - (1 /data[1].price.fantomSynth) * Number(ftmState?.positions)
  //         setChange(avaxChange + ftmChange);
  //     }())
  // }, [])

  useEffect(() => {
    (async () => {
      if (account) {
        const ftmDec = await ftmSynthContract.decimals();

        const avaxRate = await ftmDEXContract.rate();
        const avaxPrice = 1 / (Number(avaxRate.toBigInt()) / 10 ** 18);

        const avaxAccountBalance = await ftmSynthContract.balanceOf(
          account,
        );
        const avaxSynthPosition = Number(avaxAccountBalance.toBigInt()) / 10 ** ftmDec;

        const avaxPosition = avaxSynthPosition * avaxPrice;
        const avaDec = await avaSynthContract.decimals();

        const rate = await avaDEXContract.rate();
        const price = 1 / (Number(rate.toBigInt()) / 10 ** 18);

        const accountBalance = await avaSynthContract.balanceOf(
          account,
        );
        const synthPosition = Number(accountBalance.toBigInt()) / 10 ** avaDec;
        const position = synthPosition * price;
        setFtmState({
          price: `${Number(price.toFixed(6))}`,
          positions: `${Number(position.toFixed(2))}`,
        });
        setAvaxState({
          positions: `${Number(avaxPosition.toFixed(2))}`,
          price: `${Number(avaxPrice.toFixed(6))}`,
        });
      }
    })();
  }, [account, txLoading]);

  useEffect(() => {
    if (ftmState?.positions && ftmState?.price || avaxState?.positions && avaxState?.price) {
      const ftmBalance = Number(ftmState?.positions!) * Number(ftmState?.price!);
      const avaxBalance = Number(avaxState?.positions!) * Number(avaxState?.price!);
      setBalance(ftmBalance + avaxBalance);
    }
  }, [ftmState?.positions, avaxState?.positions]);

  // useEffect(() => {
  //     setBalance(getPositionSum());
  // }, [positionSum]);

  const handleChangeFilter = (value: string) => setFilter(value);

  return (
      <div>
          <section className={styles.section}>
              <div className={styles.verticalWrapper}>
                  <div
                      className={classNames(
                        styles.horisontalWrapper,
                        styles.pt2,
                        styles.smCol,
                      )}
                  >
                      <SoonChart />
                      <div
                          className={classNames(
                            styles.verticalWrapper,
                            styles.flex1,
                            styles.smRow,
                          )}
                      >
                          <div
                              className={classNames(
                                styles.flex1,
                                styles.flex,
                              )}
                          >
                              <InfoBlock
                                  info="Current balance"
                                  value={balance}
                                  type={InfoBlockTypes.BALANCE}
                                  options={{ changeValue: change || 0 }}
                              />
                          </div>
                          <div
                              className={classNames(
                                styles.smFlex1,
                                styles.smFlex,
                              )}
                          >
                              <InfoBlock
                                  info="All time profit"
                                  value={change || 0}
                                  options={{ changeValue: change || 0 }}
                                  type={InfoBlockTypes.PERCENTAGE_MIXED}
                              />
                          </div>
                      </div>
                  </div>
                  <div className={styles.horisontalWrapper}>
                      <div className={styles.flex1}>
                          <InfoBlock
                              info="Best performer (soon)"
                              value={+0.000001}
                              options={{
                                changeValue: 0,
                                image: (
                                    <img
                                        src="./images/networks/avalancheDashboard.png"
                                        alt=""
                                    />
                                ),
                              }}
                              type={InfoBlockTypes.PERCENTAGE_MIXED}
                          />
                      </div>
                      <div className={styles.flex1}>
                          <InfoBlock
                              info="Worst permormer (soon)"
                              value={-0.000001}
                              options={{
                                changeValue: -0,
                                image: (
                                    <img
                                        src="./images/networks/fantomDashboard.png"
                                        alt=""
                                    />
                                ),
                              }}
                              type={InfoBlockTypes.PERCENTAGE_MIXED}
                          />
                      </div>
                  </div>
              </div>
          </section>
          <section className={styles.section}>
              <div className={styles.panel}>
                  <Typography type="title">Your Entangle Assets</Typography>
                  <div className={styles.selectWrapper}>
                      <Select value={filter} onChange={handleChangeFilter}>
                          <Option value="">Sort by</Option>
                          <Option value="l1">Price</Option>
                      </Select>
                  </div>
              </div>
              <InvestCard ftmState={ftmState!} avaxState={avaxState!} />
          </section>
          <section className={styles.section}>
              <div className={styles.panel}>
                  <Typography type="title">Transaction history</Typography>
                  <div className={styles.selects}>
                      <div className={styles.selectWrapper}>
                          <Select
                              value={filter}
                              onChange={handleChangeFilter}
                          >
                              <Option value="">All activity</Option>
                              <Option value="l1">Soon</Option>
                          </Select>
                      </div>
                      <div className={styles.selectWrapper}>
                          <Select
                              value={filter}
                              onChange={handleChangeFilter}
                          >
                              <Option value="">Latest first</Option>
                              <Option value="l1">Soon</Option>
                          </Select>
                      </div>
                  </div>
              </div>
              <h2
                  style={{
                    textAlign: 'center',
                    fontSize: '5rem',
                    marginBottom: '50px',
                  }}
              >
                  Soon
              </h2>
          </section>
      </div>
  );
};

export default Profile;
