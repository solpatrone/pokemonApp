import React from "react";
import surprised from "../../images/surprised.png";
import s from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={s.container}>
      <img src={surprised} alt="Not found pic" width="300p" />
      <h5>Pokemon not found</h5>
    </div>
  );
}
