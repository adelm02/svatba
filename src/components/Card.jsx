import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./Card.css";
function Card({ imagen, onClick }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",

  });
  return (
    <animated.div
      className="card"
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img src={imagen} alt="" onClick={() => onClick && onClick(imagen)} style={{ cursor: "pointer" }} />
    </animated.div>
  );
}

export default Card;