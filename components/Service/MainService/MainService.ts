/* eslint-disable no-return-await */
import Service from '../Service';
import type { GetTotalValueLockedResponse, iService } from '../../../context/ServiceContext/ServiceContext.interfaces';

export default class MainService extends Service implements iService {
    constructor() {
        super({
            apiBase: `http://${process.env.REACT_APP_API_HOST}/`,
        });
    }

    getTotalValueLocked = async (): Promise<GetTotalValueLockedResponse> => await this.getJson<GetTotalValueLockedResponse>('metrics/tvl').then((data) => {
        const { change, ...other } = data;
        return { change: change * 100, ...other };
    });
}
