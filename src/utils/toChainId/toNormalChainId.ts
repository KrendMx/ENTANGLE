export default function toNormalChainId(str: string) {
    if (str.includes('0x')) {
        return Number(str).toString();
    }
    return str;
}
