import React from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import css from "./AddCardModal.module.css";
import PropTypes from "prop-types";

const AddCardModal = ({ visible, onClose, handleCardAdd }) => {
  const customStyles = {
    background: "rgb(58 58 58)",
    padding: "20px",
    width: "50%",
    top: "-3rem",
    height: "fit-content",
    maxWidth: "40rem",
  };
  const [title, setTitle] = React.useState("");
  const [detail, setDetail] = React.useState("");

  return (
    <Rodal customStyles={customStyles} visible={visible} onClose={onClose}>
      <div className={css.container}>
        <div>
          <span className={css.label}>Card Title</span>
          <input
            type="text"
            className={css.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <span className={css.label}>Detail</span>
          <textarea
            rows={10}
            className={css.input}
            value={detail}
            type="text"
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <button
          disabled={title === "" && detail === ""}
          className={css.saveButton}
          onClick={() => {
            handleCardAdd(title, detail);
            setDetail("");
            setTitle("");
          }}
        >
          Add
        </button>
      </div>
    </Rodal>
  );
};

AddCardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCardAdd: PropTypes.func.isRequired,
};

export default AddCardModal;
