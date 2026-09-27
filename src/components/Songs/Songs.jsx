import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab } from "@mui/material";
import Carousel from "../../Carousel/Carousel";
import Card from "../Card/Card";
import styles from "./Songs.module.css";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsResponse = await axios.get(
          "https://qtify-backend.labs.crio.do/songs"
        );

        const genresResponse = await axios.get(
          "https://qtify-backend.labs.crio.do/genres"
        );

        setSongs(songsResponse.data);
        setGenres(genresResponse.data.data);
      } catch (error) {
        console.error("Error fetching songs/genres:", error);
      }
    };

    fetchData();
  }, []);

  const filteredSongs =
    selectedGenre === "all"
      ? songs
      : songs.filter(
          (song) =>
            song.genre?.key?.toLowerCase() === selectedGenre.toLowerCase()
        );

  const renderSongCard = (song) => (
    <Card
      image={song.image}
      likes={song.likes}
      title={song.title}
      type="song"
    />
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Songs</h2>

      <Tabs
        value={selectedGenre}
        onChange={(event, newValue) => setSelectedGenre(newValue)}
        className={styles.tabs}
      >
        <Tab label="All" value="all" />

        {genres.map((genre) => (
          <Tab
            key={genre.key}
            label={genre.label}
            value={genre.key}
          />
        ))}
      </Tabs>

      <Carousel
        data={filteredSongs}
        renderComponent={renderSongCard}
      />
    </section>
  );
}

export default Songs;