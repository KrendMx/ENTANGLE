import type {InfoBlockTypes} from './SummaryInfoBoard.constants';
// TODO MIGRATE TO INFO BLOCK
type InfoBlockProps = {
    info: string;
    value: number | null;
    type: InfoBlockTypes;
    isShort?: boolean;
};

export type {InfoBlockProps};
