import style from "./Child.module.scss";
import React from "react";
import './child1.css';

import Father from "./Father";



function Child() {
  return (
    <div >
      <Father/>
    </div>
  );
}
export default Child;
