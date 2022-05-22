import type React from 'react';

interface IActionProps {
    filter: string;
    search: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export type { IActionProps };
