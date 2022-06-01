import axios from 'axios';

const getGraphData = async (account: string, url: string, type = 'buy') => {
    const query = `${type === 'buy' ? `to: ${account}` : `from: ${account}`}`;

    const body = `{
        query {
            exchanges(where:{${query}}) {
                id
                block
                from
                to
                amount
                }
            }
        }`;
    return axios.post(url, body);
};

export { getGraphData };
