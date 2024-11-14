import React, { useState } from 'react';
import Tile from './Tile';
import './Home.css';

import forestImage from '../images/forest-3.jpg';
import bugImage from '../images/ladybug.jpg';
import libraryImage from '../images/library.jpg';
import burgerImage from '../images/burger.jpg';

const allArticles = [
    { title: "Forests", description: "A great place for bugs to thrive", image: forestImage },
    { title: "A cool bug", description: "A ladybug, isn't she cute?", image: bugImage },
    { title: "A weird bug", description: "What??? This is not a bug!? That's a burger!!!", image: burgerImage },
    { title: "Ants", description: "Hard-working little insects", image: forestImage },
    { title: "Bees", description: "The essential pollinators", image: bugImage },
    { title: "Spiders", description: "The eight-legged hunters", image: burgerImage },
    { title: "Butterflies", description: "Graceful insects with colorful wings", image: forestImage },
    { title: "Dragonflies", description: "Fast flyers with sharp vision", image: bugImage }
];

const Home = () => {
    const [showAll, setShowAll] = useState(false);

    const handleViewAllClick = () => {
        setShowAll(true);
    };

    const handleShowLessClick = () => {
        setShowAll(false);
    };

    const articlesToDisplay = showAll ? allArticles : allArticles.slice(0, 3);

    return (
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
                {articlesToDisplay.map((article, index) => (
                    <Tile
                        key={index}
                        title={article.title}
                        description={article.description}
                        image={article.image}
                    />
                ))}
            </section>
            {!showAll ? (
                <button className="view-more" onClick={handleViewAllClick}>
                    View All Articles
                </button>
            ) : (
                <button className="view-more" onClick={handleShowLessClick}>
                    Show Less
                </button>
            )}
        </main>
    );
};

export default Home;
