import './Modal.css';

export interface ModalProps {
  isVisible: boolean;
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      {props.isVisible &&
        <>
          <div className="TransparentLayer"></div>
          <div className="Modal">
            <div onClick={props.closeModal}>
              Chiudi
            </div>
            {props.children}
            </div>
        </>
      }
    </>
  )
}

export default Modal;