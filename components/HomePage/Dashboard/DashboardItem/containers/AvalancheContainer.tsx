import React, {
  useContext,
    useEffect,
    useReducer,
    useState,
    useMemo,
} from 'react';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';
import { ProviderContext } from '../../../../../context/ProviderContext';

import ChainService from '../../../../../src/ChainService/ChainService';

const AvalancheContainer = () => {
  const {
    provider,
    account,
    changeLoadingTx,
    txLoading,
    setSucInfo,
    setPositionSum,
  } = useContext(ProviderContext);
  const [state, setState] = useReducer(
    (
      containerState: ContainerStateType,
      stateUpdate: Partial<ContainerStateType>,
    ) => ({ ...containerState, ...stateUpdate }),
    {
      apr: null,
      currentDeposits: null,
      totalDeposits: null,
      available: null,
      totalAvailable: null,
      price: null,
      positions: null,
      totalPositions: null,
      rowGradient: '',
    },
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => setIsOpenModal(false);
  const openModal = () => setIsOpenModal(true);

<<<<<<< HEAD
  const AvaxService = useMemo(() => new ChainService('AVAX'), []);
=======
    const AvaxService = useMemo(() => new ChainService('AVAX'), []);
>>>>>>> d9c209c3ab87d896cc1883c9761c3e6379d6207a

  useEffect(() => {
    (async () => {
      const {
        apr,
        totalAvailable,
        totalDeposits,
        currentDeposits,
        available,
        price,
      } = await AvaxService.getCardData();

      setState({
        apr,
        totalDeposits,
        currentDeposits,
        available,
        totalAvailable,
        price,
        rowGradient:
                    'linear-gradient(90deg, #E93038 0%, rgba(239, 70, 78, 0) 100%)',
      });
    })();
  }, [txLoading]);

  useEffect(() => {
    (async () => {
      if (account) {
        const { positions, totalPositions } = await AvaxService.getPersonalData(account);
        setPositionSum(positions, 'fantom');
        setState({
          ...state,
          positions: `$${Number(positions.toFixed(2))}`,
          totalPositions,
        });
      }
    })();
  }, [account, txLoading]);

  const buyToken = async (value: number) => {
    try {
      const data = await AvaxService.buyToken(value);
      if (data) {
        changeLoadingTx(true);
      }
      const res = await data.wait();
      if (res?.status) {
        changeLoadingTx(false);
        setSucInfo({
          value,
          symbol: 'USDT/USDT Synthetic LP',
          isReceived: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sellToken = async (value: number) => {
    try {
      const data = await AvaxService.sellToken(value);

      if (data) {
        changeLoadingTx(true);
      }
      const res = await data.wait();

      if (res?.status) {
        changeLoadingTx(false);
        setSucInfo({
          value,
          symbol: 'USDT/USDT Synthetic LP',
          isReceived: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const data = {
    icon: 'avalancheDashboard.png',
    bgGradient:
            'linear-gradient(90deg, rgba(233, 48, 56, 0.2) 0%, rgba(239, 70, 78, 0) 100%)',
    heading: 'USDT-USDT.e',
    chainId: '43114',
    priceCurrency: 'USDT/USDT.e Synthetic LP',
    description:
            'Generates yield by running autocompounded USDT/USDT.e strategy on traderjoexyz.com',
    disabled: false,
    openModal,
    ...state,
  } as const;

  return (
      <>
          {isOpenModal && (
          <Modal handleClose={closeModal}>
              <PayModal
                  buyToken={buyToken}
                  sellToken={sellToken}
                  available={state.available}
                  totalAvailable={state.totalAvailable}
                  price={state.price}
                  handleClose={closeModal}
              />
          </Modal>
          )}
          <DashboardItem {...data} />
      </>
  );
};

export default AvalancheContainer;
