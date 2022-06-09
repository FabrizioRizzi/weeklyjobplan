import { PropsWithChildren, ReactElement } from 'react';
import { X } from 'react-feather';
import './Modal.scss';

export interface ModalProps {
  isVisible: boolean;
  title: string;
  width?: number;
  height?: number;
  closeModal: () => void;
  children: ReactElement;
}

const Modal: React.FC<ModalProps> = ({
  isVisible, title, width, height, closeModal, children,
}: PropsWithChildren<ModalProps>) => (
  <>
    {isVisible
      && (
        <>
          <div className="Modal__TransparentLayer" onClick={closeModal} />
          <div className="Modal__Modal" style={{ width, height }}>
            <div className="Modal__ModalTitle">
              <div>{title}</div>
              <div className="Modal__CloseModal" onClick={closeModal}>
                <X />
              </div>
            </div>
            <div className="Modal__ModalBody" style={{ maxHeight: window.innerHeight - 50 }}>
              {children}
            </div>
          </div>
        </>
      )}
  </>
);

export default Modal;
