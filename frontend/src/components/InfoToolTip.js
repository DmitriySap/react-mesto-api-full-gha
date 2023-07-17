function InfoTooltip({ image, infoMessage, isOpen, onClose }) {
    return (
      <div className={`popup popup_type_auth ${isOpen ? "popup_type_is-open" : ""}`}>
        <div
          className="popup__content popup__content_type_auth"
          style={{ backgroundImage: `url(${image})` }}
        >
          <button
            className="popup__close"
            type="button"
            onClick={onClose}
          />
          <h3 className="popup__title popup__title_type_auth">{infoMessage}</h3>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;