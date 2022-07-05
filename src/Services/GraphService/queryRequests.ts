import axios from 'axios';
import type { IQueryRequests, IQueryResponse } from './GraphService.interfaces';
import { GRAPH_CONFIG } from './config';
import type { TransactionHistoryEntity } from '../context/ServiceContext/ServiceContext.interfaces';

class QueryRequests implements IQueryRequests {
    getGraphDataBuyData = async (account: string, url: string) => {
        const body = {
            query: `{exchanges(where: {to: "${account}"}) {id block from to amount}}`,
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
        const res: { [key: string]: number } = {};
        const counter: {[key: string]: number} = {};
        const names = Object.keys(GRAPH_CONFIG);
        for (const name of names) {
            const ids = Object.keys(GRAPH_CONFIG[name]);
            for (const id of ids) {
                const { data: rawData }: { data: IQueryResponse } = await this.getGraphDataBuyData(
                    account,
                    GRAPH_CONFIG[name][id].url,
                );
                rawData.data.exchanges.map((el) =>
                    (res[id]
                        ? (res[id] += Number(el.amount))
                        : (res[id] = Number(el.amount))));
                if (counter[id]) {
                    counter[id] += rawData.data.exchanges.length;
                } else {
                    counter[id] = rawData.data.exchanges.length;
                }
            }
        }
        for (const el of Object.keys(res)) {
            res[el] = Number(((res[el] / counter[el]) / 10 ** 18).toFixed(3));
        }
        return res;
    };

    calculateProfit = async (transactions: TransactionHistoryEntity[], balance: number, chainId: string) => {
        let [Sout, Sstart, Sin] = [0, 0, 0];
        const filteredTxs = transactions.filter((el) => String(el.crypto) === chainId);
        Sstart = Number(filteredTxs[filteredTxs.length - 1]?.amount);
        for (let j = 0; j < filteredTxs.length; j++) {
            if (filteredTxs[j].type === 'buy') {
                Sin += Number(filteredTxs[j].amount) / 10 ** 18;
            } else {
                Sout += Number(filteredTxs[j].amount) / 10 ** 18;
            }
        }
        const stable = (balance + Sout) - (Sstart + Sin);
        return {
            stable: Number(stable.toFixed(6)),
            percentage: Number((stable / Sstart).toFixed(6)),
        };
    };
}

export default new QueryRequests();
