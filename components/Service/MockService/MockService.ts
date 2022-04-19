/* eslint-disable no-return-await */
import Service from '../Service';
import type { GetTotalValueLockedResponse, iService } from '../../../context/ServiceContext/ServiceContext.interfaces';

export default class MockService extends Service implements iService {
  constructor() {
    super({
      apiBase: '',
    });
  }

  getTotalValueLocked = async (): Promise<GetTotalValueLockedResponse> => ({
    amount: Math.floor(Math.random() * 1e9),
    change: Math.floor(-10000 + Math.random() * (10000 + 1 + 10000)) / 10000,
  });
}
