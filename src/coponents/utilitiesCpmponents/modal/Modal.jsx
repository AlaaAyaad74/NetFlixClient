import PropTypes from "prop-types";
import "./modal.scss";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = (props) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(props.active);
  }, [props.active]);
  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);
  const closeModal = () => {
    if (props.onClose) props.onClose();
    contentRef.current.parentNode.classList.remove("active");
  };
  return (
    <div ref={contentRef} className={`modal__content`}>
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node,
};
ModalContent.propTypes = {
  onClose: PropTypes.func,
  active: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node,
};
export default Modal;
