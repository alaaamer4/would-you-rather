import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found">
      <Link className="close-not-found" to="/">
        Close
      </Link>
    </div>
  );
};

export default NotFound;
