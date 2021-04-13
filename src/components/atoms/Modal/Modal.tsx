import { X } from 'react-feather';
import './Modal.scss';

export interface ModalProps {
  isVisible: boolean;
  title: string;
  width?: number;
  height?: number;
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      {props.isVisible &&
        <>
          <div className="Modal__TransparentLayer" onClick={props.closeModal}></div>
          <div className="Modal__Modal" style={{width: props.width, height: props.height}}>
            <div className="Modal__ModalTitle">
              <div>{props.title}</div>
              <div className="Modal__CloseModal" onClick={props.closeModal}>
                <X />
              </div>
            </div>
            <div className="Modal__ModalBody">
              {props.children}
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Modal;