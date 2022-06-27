import React from 'react';
import { data } from "../data/data.json"

export default function Home() {

    const homeData = data;

    return (
        <div>
            <main className="home-main">
                <div className="hero-banner">
                    <div className="hero-image">
                        <img src="../images/homeLogo.svg" alt="hero logo" />
                    </div>
                    <div className="home-title">
                        <h2>ARIEL JAY</h2>
                        <h2>NEWMAN</h2>
                        <p>Artist - Painter. Muralist.</p>
                    </div>
                </div>
            </main>
            <section className='feature-section'>
                <div className='home-card'>
                    {/* <FeatureCard /> */}
                </div>
                {
                    homeData.map((routedata) => (
                        <div className='home-card'>
                            {/* TODO: NEED TO MAKE THIS COMPONENT */}
                            {/* <RoutingCard routedata={routedata}/> */}
                        </div>
                    ))
                }
            </section>
        </div>
        
    );
}
