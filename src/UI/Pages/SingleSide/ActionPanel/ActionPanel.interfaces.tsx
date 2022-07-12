import type React from 'react';

interface IActionPanelProps {
    search: string;
    timeStatus: string;
    network: string;
    setSearch: (x: string) => void;
    setTimeStatus: (x: string) => void;
    setNetwork: (x: string) => void;
}

export type { IActionPanelProps };
