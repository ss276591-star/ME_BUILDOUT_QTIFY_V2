import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ image, follows, likes, title, type = "album" }) {
  const chipText =
    type === "song"
      ? `${likes} Likes`
      : `${follows} Follows`;

  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <img
          src={image}
          alt={title}
          className={styles.cardImage}
        />

        <div className={styles.chipContainer}>
          <Chip
            label={chipText}
            size="small"
            className={styles.chip}
          />
        </div>
      </div>

      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;