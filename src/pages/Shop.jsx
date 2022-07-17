import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DigitalArt from './shop/DigitalArt';
import MoreOptions from './shop/MoreOptions';
import Sale from './shop/Sale';
import Error from './Error';
import ShopArt from './shop/ShopArt';

export default function Shop() {
    const location = useLocation();
    const { artTypeProp } = location.state;
    const { path } = useParams('path');

    const renderShop = () => {
        switch (path) {
            case 'shopart':
                return <ShopArt artTypeProp={artTypeProp} />;
            case 'shopdigital':
                return <DigitalArt />;
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
