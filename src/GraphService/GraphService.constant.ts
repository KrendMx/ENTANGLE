import axios from 'axios';

const getGraphData = async (account: string, url: string, type = 'buy') => {
    const query = `${type === 'buy' ? `to: ${account}` : `from: ${account}`}`;

    const body = {
        query: `{
            exchanges(where:{${query}}) {
                id
                block
                from
                to
                amount
                }
            }`,
    };
    return axios.post(url, body, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers':
                'Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type',
        },
    });
};

export { getGraphData };
