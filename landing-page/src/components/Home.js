import React from 'react';
import Tile from './Tile';
import './Home.css';

import forestImage from '../images/forest-3.jpg';
import bugImage from '../images/ladybug.jpg';
import libraryImage from '../images/library.jpg';
import burgerImage from '../images/burger.jpg';

const Home = () => (
    <main className="home">
        <section className="hero">
            <div className="hero-content">
                <img src={libraryImage} alt="Hero Library" className="hero-image" />
                <div className="hero-text">
                    <h1>Bugs Network</h1>
                    <p>Informational Hub about bugs</p>
                </div>
            </div>
        </section>
        <section className="product-tiles">
            <Tile title="Forests" description="A great place for bugs to thrive" image={forestImage} />
            <Tile title="A cool bug" description="A ladybug, isn't she cute?." image={bugImage} />
            <Tile title="A weird bug" description="what??? this is not a bug!? That's a burger!!!" image={burgerImage} />
        </section>
        <button className="view-more">View All Articles</button>
    </main>
);

export default Home;