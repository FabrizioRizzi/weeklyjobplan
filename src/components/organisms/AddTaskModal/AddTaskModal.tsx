
import Modal from '../../atoms/Modal/Modal';
import './AddTaskModal.css';

export interface AddTaskModalProps {
  isVisible: boolean;
  closeModal: () => void;
};

const Home: React.FC<AddTaskModalProps> = (props) => {
  return (
    <Modal isVisible={props.isVisible} closeModal={props.closeModal} title="Aggiungi Task">Proviamo</Modal>
    
  )
};

export default Home;
