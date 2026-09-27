import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../../Carousel/Carousel";
import styles from "./Section.module.css";

function Section({ title, apiUrl }) {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(apiUrl);
        setAlbums(response.data);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    };

    fetchAlbums();
  }, [apiUrl, title]);

  const renderCard = (album) => (
    <Card
      image={album.image}
      follows={album.follows}
      title={album.title}
    />
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{title}</h2>

        <button
          className={styles.toggleButton}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Collapse" : "Show all"}
        </button>
      </div>

      {showAll ? (
        <div className={styles.cards}>
          {albums.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              follows={album.follows}
              title={album.title}
            />
          ))}
        </div>
      ) : (
        <Carousel
          data={albums}
          renderComponent={renderCard}
        />
      )}
    </section>
  );
}

export default Section;