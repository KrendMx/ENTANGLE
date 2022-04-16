
interface IResponse {
    price: {
        avaxSynth: number,
        fantomSynth: number,
    },
}

async function getChangeData(): Promise<IResponse[]> {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}/metrics/price`)

    return (await response).json()
}

export {
    getChangeData
}