import style from "./Child.module.scss";
import React from "react";

function Child() {
  return (
    <div>
      <ul>
        <li className={style.item}>111</li>
        <li className={style.item}>111</li>
        <li className={style.item}>111</li>
      </ul>
    </div>
  );
}
export default Child;
