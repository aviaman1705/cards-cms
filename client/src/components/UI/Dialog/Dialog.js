import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";

import "./Dialog.css";

const Dialog = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid rgb(204, 204, 204)",
      background: "#fff",
      overflow: "auto",
      width: "40%",
      height: "60%",
      outline: "none",
      padding: "20px",
    },
  };

  //let subtitle;
  //const [modalIsOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   //setIsOpen(true);
  // };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
    console.log("afterOpenModal event");
  };

  const closeModal = (event) => {
    event.preventDefault();
    props.close();
  };

  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={props.modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Example Modal"
      >
        <a id="close-modal-btn" href="/#" onClick={closeModal}>
          <IoIosClose />
        </a>
        {props.children}
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal>
    </div>
  );
};

export default Dialog;
