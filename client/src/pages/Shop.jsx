import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MoreOptions from './shop/MoreOptions';
import Sale from './shop/Sale';
import Error from './Error';
import ShopFront from './shop/ShopFront';

export default function Shop() {
    const { path } = useParams('path');

    const [shop, setShop] = useState(path);

    useEffect(() => {
        setShop(path);
    }, [path]);

    const renderShop = () => {
        if (shop === 'shopart' || shop === 'shopdigital') {
            return <ShopFront shop={shop} />;
        } else if (shop === 'more') {
            return <MoreOptions />;
        } else if (shop === 'sale') {
            return <Sale />;
        } else {
            return <Error />;
        }
    };

    return <div>{renderShop()}</div>;
}
