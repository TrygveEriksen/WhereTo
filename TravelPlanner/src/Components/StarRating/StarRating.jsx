import React from "react";

function StarRating({ stars }) {
  const starArray = Array.from({ length: 5 });

  return (
    <div className="stars">
      {starArray.map((_, index) => {
        const starClassName = index < stars ? "fas fa-star filled" : "fas fa-star empty";
        return <i key={index} className={starClassName}></i>;
      })}
    </div>
  );
}
export default StarRating;