import axios from 'axios';
import type { TransactionHistoryEntity } from 'utils/Global/Types';
import type { IQueryRequests, IQueryResponse } from './GraphService.interfaces';
import { GRAPH_CONFIG } from './config';

class QueryRequests implements IQueryRequests {
    getGraphDataBuyData = async (account: string, url: string) => {
        const body = {
            query: `{exchanges(where: {to: "${account.toLowerCase()}"}) {id block from to amount}}`,
        };
        return axios.post(url, body);
    };

    getGraphDataTxData = async (account: string, url: string) => {
        const body = {
            query: `{exchanges(where: {from: "${account.toLowerCase()}"}) {id block from to amount}}`,
        };
        return axios.post(url, body);
    };

    calculateAVG = async (account: string) => {
        const res: { [key: string]: {[key: string]: number} } = {
            'FTM': {
                '56': 0, '43114': 0, '250': 0, '100': 0, '1': 0,
            },
            'AVAX': {
                '56': 0, '43114': 0, '250': 0, '100': 0, '1': 0,
            },
            'BSC': {
                '56': 0, '43114': 0, '250': 0, '100': 0, '1': 0,
            },
        };
        const counter: { [key: string]: {[key: string]: number} } = {
            'FTM': {
                '56': 0, '43114': 0, '250': 0, '100': 0, '1': 0,
            },
            'AVAX': {
                '56': 0, '43114': 0, '250': 0, '100': 0, '1': 0,
            },
            'BSC': {
                '56': 0, '43114': 0, '250': 0, '100': 0, '1': 0,
            },
        };
        const names = Object.keys(GRAPH_CONFIG);
        for (const name of names) {
            const ids = Object.keys(GRAPH_CONFIG[name]);
            for (const id of ids) {
                const { data: rawData }: { data: IQueryResponse } = await this.getGraphDataBuyData(
                    account,
                    GRAPH_CONFIG[name][id].url,
                );
                rawData.data.exchanges.map((el) => (res[name][id] += Number(el.amount)));
                counter[name][id] = rawData.data.exchanges.length;
            }
        }
        const keys = Object.keys(GRAPH_CONFIG);
        for (const key of keys) {
            const ids = Object.keys(GRAPH_CONFIG[key]);
            for (const id of ids) {
                if (res[key][id]) res[key][id] = Number(((res[key][id] / counter[key][id]) / 10 ** 18).toFixed(3));
            }
        }
        return res;
    };

    calculateProfit = async (
        transactions: TransactionHistoryEntity[],
        balance: number,
        chainId: string,
        price: number,
    ) => {
        let [Sout, Sstart, Sin] = [0, 0, 0];
        const filteredTxs = transactions.filter((el) => String(el.crypto) === chainId);
        Sstart = Number(filteredTxs[filteredTxs.length - 1]?.amount) * price;
        for (let j = 0; j < filteredTxs.length; j++) {
            if (filteredTxs[j].type === 'buy') {
                Sin += Number(filteredTxs[j].amount) * price;
            } else {
                Sout += Number(filteredTxs[j].amount) * price;
            }
        }
        Sin -= Sstart;
        const stable = (balance + Sout) - (Sstart + Sin);
        return {
            stable: Number(stable.toFixed(6)),
            percentage: Number((stable / Sstart).toFixed(6)),
        };
    };
}

export default new QueryRequests();
