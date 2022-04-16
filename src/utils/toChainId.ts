export default function toChainId(str: string) {
    return `0x${Number(str).toString(16)}`;
}
