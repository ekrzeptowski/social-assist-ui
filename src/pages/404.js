import React from "react";
import { Link } from "gatsby";
import SEO from "../components/Seo";

const NotFound = () => {
  return (
    <div className="not-found-page">
        <SEO title="Page not found"/>
      <h1>Not Found 404</h1>
      <p>
        Go back to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
