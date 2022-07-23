import React from 'react';

export default function FeatureCard() {

    const featuredImageObject = {
        url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
        title: "Paint Brush Reflection",
        medium: "digital"
    }

    return (
        <div className='feature-card'>
            <div className='feature-img-container'>
                <img 
                src={featuredImageObject.url} 
                alt="featured original art piece" />
            </div>
            <div className='feature-info-container'>
                <h2>{featuredImageObject.title}</h2>
                <p>{featuredImageObject.medium}</p>
                <div>
                    <button>SHOP NOW</button>
                    <img src="" alt="right arrow"/>
                </div>
            </div>
        </div>
    )
}