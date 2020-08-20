import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1>Not Found 404</h1>
      <p>
        Go back to{" "}
        <Link className="bold" to="/">
          Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
