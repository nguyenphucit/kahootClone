import React from "react";
import { Link } from "react-router-dom";
export const AdminTest = () => {
  const userId = 1;
  return (
    <div>
      <Link to="/lobby/bPDhCACXQA" state={{ userId }}>
        createGame
      </Link>
    </div>
  );
};
