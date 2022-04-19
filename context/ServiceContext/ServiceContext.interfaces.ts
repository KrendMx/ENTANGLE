type TotalValueLockedData = {
    amount: number;
    change: number;
}

type GetTotalValueLockedResponse = TotalValueLockedData;

interface iService {
    getTotalValueLocked: () => Promise<GetTotalValueLockedResponse>,
}

type ServiceConfigOptions = {
    apiBase?: string
}

export type {
  iService,
  ServiceConfigOptions,
  TotalValueLockedData,
  GetTotalValueLockedResponse,
};
