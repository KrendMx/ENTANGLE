import React from 'react';

import type {iService} from './ServiceContext.interfaces';


const ServiceContext = React.createContext({} as iService);
const {
    Provider: ServiceProvider,
    Consumer: ServiceConsumer
} = ServiceContext;

export {
    ServiceProvider,
    ServiceConsumer,
    ServiceContext
};
