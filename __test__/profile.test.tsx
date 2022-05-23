import { render, screen } from '@testing-library/react';
import Profile from '@/pages/profile';

describe('Home', () => {
    it('renders a heading', () => {
        render(<Profile />);

        expect(<Profile />).toBeVisible();
    });
});
