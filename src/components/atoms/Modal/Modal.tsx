export interface ModalProps {
  isVisible: boolean;
};

const Modal: React.FC<ModalProps> =(props) => {
  return (
    <div className="Modal">Modal {props.isVisible}</div>
  )
}

export default Modal;