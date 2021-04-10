import { X } from 'react-feather';
import './Modal.scss';

export interface ModalProps {
  isVisible: boolean;
  title: string;
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      {props.isVisible &&
        <>
          <div className="TransparentLayer" onClick={props.closeModal}></div>
          <div className="Modal">
            <div className="ModalTitle">
              <div>{props.title}</div>
              <div className="CloseModal" onClick={props.closeModal}>
                <X />
              </div>
            </div>
            <div className="ModalBody">
              {props.children}
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Modal;