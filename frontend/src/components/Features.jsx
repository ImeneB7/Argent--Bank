import React from "react";
import data from '../datas/data.json';


function Feature() {
    const features = data.features;

    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {features.map((feature, index) => (
                <div key={index} className="feature-item">
                    <img src={require(`../assets/img/${feature.img}`)} alt={feature.alt} className="feature-icon" />
                    <h3 className="feature-item-title">{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </section>
    );
}


export default Feature;