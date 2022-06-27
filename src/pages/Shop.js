import React from 'react';
import { useParams } from 'react-router-dom';
import LimitedEdition from './shop/LimitedEdition';
import OriginalArt from './shop/OriginalArt';
import OnDemandPrints from './shop/OnDemandPrints';
import NicheArt from './shop/NicheArt';
import MoreOptions from './shop/MoreOptions';
import Sale from './shop/Sale';
import Error from './Error';

export default function Shop() {
    const { path } = useParams('path');
    console.log(path);

    const renderShop = () => {
        switch (path) {
            case 'originals':
                return <OriginalArt />;
            case 'limitededition':
                return <LimitedEdition />;
            case 'ondemand':
                return <OnDemandPrints />;
            case 'niche':
                return <NicheArt />;
            case 'more':
                return <MoreOptions />;
            case 'sale':
                return <Sale />;
            default:
                return <Error />;
        }
    };

    return <div>{renderShop()}</div>;
}
