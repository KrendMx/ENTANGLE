import axios from 'axios';

interface IResponsePrice {
    price: {
        avaxSynth: number,
        fantomSynth: number,
    },
}

interface IResponseProfit {
    stable: number;
    percentage: number;
}

class APIService {
    getChangeData = async (): Promise<IResponsePrice[]> => {
        const { data } = await axios.get(`http://${'localhost:7000'}/metrics/price`);

        return data;
    };

    getProfit = async (user: string, pid: number): Promise<IResponseProfit> => {
        const { data = { stable: 0 } } = await axios.post(`http://${'localhost:7000'}/metrics/profit`, {
            user,
            pid,
        });

        return data;
    };

    getAVGPrice = async (user: string) => {
        const { data } = await axios.post(`http://${'localhost:7000'}/metrics/avgBuy`, {
            user,
        });

        return data;
    };
}

export default new APIService();
