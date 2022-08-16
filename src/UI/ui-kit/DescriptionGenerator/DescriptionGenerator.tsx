import React from 'react';
import { useTranslation } from 'next-i18next';

type DescriptionGeneratorProps = {
    currencyName: string;
    currencySite: string;
    customClassName: React.HTMLAttributes<HTMLDivElement>['className'];
};

const DescriptionGenerator: React.FC<DescriptionGeneratorProps> = React.memo(({
    currencyName,
    currencySite,
    customClassName,
}) => {
    const { t } = useTranslation('index');
    return (
        <p className={customClassName}>
            {`${t('desFirstPart')} ${currencyName} ${t(
                'desSecPart',
            )} ${currencySite}`}
        </p>
    );
});

export { DescriptionGenerator };
