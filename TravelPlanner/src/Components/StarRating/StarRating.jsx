import React from "react";

function StarRating({ stars }) {
  const starArray = Array.from({ length: stars });

  return (
    <div>
      {starArray.map((_, index) => (
        <i key={index} className="fas fa-star"></i>
      ))}
    </div>
  );
}

export default StarRating;