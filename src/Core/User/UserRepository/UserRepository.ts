// Deps
import { HttpClient } from 'src/libs/HTTPClient';
import { Notification } from 'src/libs/Notification';

// Interfaces
import type { IProfileChartResponse, IUserRepository } from './UserRepository.interfaces';

export const UserRepository: IUserRepository = {
    getProfileData: async (user: string) => {
        try {
            return await HttpClient.post<IProfileChartResponse>(
                'charts/profileChart',
                { data: { user } },
            );
        } catch (err: any) {
            Notification.error('HTTP Error', 'Error getting txHistory');
        }
    },
};
