// Deps
import { HttpClient } from 'src/libs/HTTPClient';
import { Notification } from 'src/libs/Notification';

// Interfaces
import type { ICardRepository, IAprResponse } from './CardRepository.interfaces';

export const CardRepository: ICardRepository = {
    getAprs: async () => {
        try {
            return await HttpClient.get<IAprResponse>('scrapper/apr');
        } catch (err: any) {
            Notification.error('HTTP Error', 'Error sending request');
        }
    },
};
