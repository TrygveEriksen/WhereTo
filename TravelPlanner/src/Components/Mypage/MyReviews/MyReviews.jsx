import React from "react";
import "../Mypage.css";

function MyReviews() {
  return (
    <div className="myReviews">
      <h1>Mine vurderinger</h1>
      <hr />
      {/**Dette må fjernes når vi får lagt til funksjonalitet */}
      <p>Du har ikke skrevet noen vurderinger ennå!</p>
    </div>
  );
}

export default MyReviews;
