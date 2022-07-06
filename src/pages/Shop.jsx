import React from 'react';
import { useParams } from 'react-router-dom';
import DigitalArt from './shop/DigitalArt';
import MoreOptions from './shop/MoreOptions';
import Sale from './shop/Sale';
import Error from './Error';
import ShopArt from './shop/ShopArt';

export default function Shop(props) {
    const {artType} = props;
    const { path } = useParams('path');
    console.log(path);

    const renderShop = () => {
        switch (path) {
            case 'shopart':
                return <ShopArt artType={artType} />;
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
