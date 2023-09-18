import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import "./style.css";
import toast, { Toaster } from "react-hot-toast";
axios.defaults.withCredentials = true;

const Comments = (props) => {
  const { itemId } = props; // Extract the itemId from props
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  var Filter = require('bad-words');
  const filter = new Filter();
  filter.addWords('nik', 'zebi', 'sormek' , "3asba" , "asba" , "omek" , "ki zebi" , "3asba" , "ta7ayol" , "ka7ba" , "kahba" );


  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://amazony-backend.vercel.app/comment/comments/${itemId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des commentaires :",
          error
        );
      }
      setIsLoading(false);
    };

    fetchComments();
  }, [itemId]);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez si le commentaire contient des gros mots
    if (filter.isProfane(comment)) {
      toast.error(
        "Votre commentaire contient des mots interdits. Veuillez modifier votre commentaire."
      );

      return;
    }

     // Vérifiez si le commentaire a plus de 5 lettres différentes et au moins 20 caractères
     const uniqueLetters = new Set(comment.replace(/\s/g, '').split(''));
     if (uniqueLetters.size < 5 || comment.length < 20) {
       toast.error(
         "Votre commentaire doit contenir au moins 20 caractères et 5 lettres différentes."
       );
       return;
     }

    const newCommentData = {
      itemId: itemId,
      comment,
      rating,
    };

    try {
      const response = await axios.post(
        "https://amazony-backend.vercel.app/comment/comments",
        newCommentData
      );

      setComments([...comments, response.data]);

      // Réinitialisez les champs du formulaire
      setComment("");
      setRating(5);
      axios.post("https://amazony-backend.vercel.app/produit/mostRated");

    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="review">
        {isLoading ? (
          <p>Chargement des commentaires...</p>
        ) : (
          <>
            <h3>Reviews ({comments.length})</h3>
            <div className="comment-list">
              {comments.length === 0 ? ( // Vérifiez si la liste des commentaires est vide
                <p>Pas de commentaires.</p>
              ) : (
                comments.map((comment) => (
                  <div className="row no-gutters" key={comment._id}>
                    <div className="col-auto">
                      <div className="ratings-container">
                        <div
                          className="ratings-val"
                          style={{ width: `${comment.rating * 20}%` }}
                        ></div>
                      </div>
                      <span className="review-date">6 days ago</span>
                    </div>
                    <div className="col">
                      <div className="review-content">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          value={rating}
          size={40}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#FCB941"
          required // Rend le champ Commentaire requis
        />
        <label>Commentaire :</label>
        <textarea
          className="form-control"
          cols="10"
          rows="4"
          placeholder="Veuillez saisir votre commentaire"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required // Rend le champ Commentaire requis
        ></textarea>
        <button type="submit" className="btn btn-outline-primary-2">
          Ajouter un commentaire
        </button>
      </form>
    </div>
  );
};

export default Comments;
