import React from 'react';
import { Link } from 'react-router-dom';


export default function RoutingCard(props) {

    const { routedata } = props;
    console.log(routedata);

    return (
        <div className='routing-card'>
            <div className='picture-frame'>
                <div className='picture-container'>
                    <img src="" alt="" />
                </div>
            </div>
            <div className='card-info-frame'>
                <h2>{routedata.title}</h2>
                <p>{routedata.description}</p>
                <Link to={routedata.route}>
                    <button>{routedata.btntitle}</button>
                </Link>
            </div>
            
            
        </div>
    )
}