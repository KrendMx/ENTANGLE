import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import { Provider } from 'react-redux';
import { setupStore } from '@/src/Redux/store/store';
import { useMemo } from 'react';
import { MainService, MockService } from '@/src/Service';
import { ServiceProvider } from '@/src/context/ServiceContext';

describe('Home', () => {
    it('renders a heading', () => {
        const store = setupStore();
        const service = useMemo(
            () =>
                Number(process.env.NEXT_PUBLIC_REACT_APP_IS_MOCK_API) === 1
                    ? new MockService()
                    : new MainService(),
            [],
        );

        render(
            <Provider store={store}>
                <ServiceProvider value={service}>
                    <Home />
                </ServiceProvider>
            </Provider>,
        );

        const heading = screen.getByRole('heading', {
            name: /welcome to next\.js!/i,
        });

        expect(heading).toBeInTheDocument();
    });
});
