import React from "react";
import spinner from "../../images/pokeball.gif";
import s from "./LoadingPage.module.css";

export default function LoadingPage() {
  return (
    <div className={s.container}>
      <img src={spinner} alt="" />
      <h5>Loading...</h5>
    </div>
  );
}
