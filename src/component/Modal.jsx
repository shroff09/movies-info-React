import React from 'react';
import ReactDOM from 'react-dom';
import './Style1.css'

const Modal = ({ids,info, isShowing, hide}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <img alt={info.Title} src={info.Poster === 'N/A' ? `http://img.omdbapi.com/?s=${ids}&apikey=dbc9f77a`: info.Poster}/>
<h1>{info.Title}</h1>
<h2>{info.Type}</h2>
<h2>{info.Year}</h2>
<h3>{info.imdbID}</h3>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;