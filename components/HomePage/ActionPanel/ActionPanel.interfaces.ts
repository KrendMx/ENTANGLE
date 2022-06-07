import type React from 'react';

interface IActionProps {
    filter: string;
    search: string;
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export type { IActionProps };
