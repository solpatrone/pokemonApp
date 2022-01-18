import React from "react";
import { Link } from "react-router-dom";
import s from "./ErrorPage.module.css";
import pikachu from "../../images/surprised.png";

export default function ErrorPage() {
  return (
    <div className={s.ppal}>
      <div className={s.container}>
        <div className={s.surprised}>
          <div className={s.border}>
            <h2>Whoops! Page Not found!</h2>
            <p>
              You are either misspelling the URL the requesting a page that
              doesn't exist!
            </p>
          </div>
          <img src={pikachu} alt="Pikachu sorprendido" width="500px" />
        </div>
        <Link to="/home" className={s.btnContainer}>
          <button className={s.btn}>Go Home</button>
        </Link>
      </div>
    </div>
  );
}
