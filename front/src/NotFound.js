import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <main class="main">
        <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
          <div class="container">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Accueil</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                404
              </li>
            </ol>
          </div>
        </nav>

        <div
          class="error-content text-center"
        >
          <div class="container">
            <h1 class="error-title">Erreur 404</h1>
            <p>
              Nous sommes désolés, la page que vous avez demandée n'est pas
              disponible.
            </p>
            <Link to="/" class="btn btn-outline-primary-2 btn-minwidth-lg">
              <span>RETOUR À LA PAGE D'ACCUEIL</span>
              <i class="icon-long-arrow-right"></i>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
