import type { languages } from 'utils/Global/Types';

type siteThemes = 'default';

interface IAppEntityState {
    language: languages;
    theme: siteThemes;
}

export type {
    IAppEntityState,
    siteThemes,
};
