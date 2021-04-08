
import { useState } from 'react';
import { addTask } from '../../../firebase/firebase';
import { TaskInterface } from '../../../sharedInterfaces';
import Modal from '../../atoms/Modal/Modal';
import TextInput from '../../atoms/TextInput/TextInput'
import './AddTaskModal.css';

export interface AddTaskModalProps {
  isVisible: boolean;
  closeModal: () => void;
};

const AddTaskModal: React.FC<AddTaskModalProps> = (props) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [dayIndex, setDayIndex] = useState<number>(5)
  const [done, setDone] = useState<boolean>(false)
  const [week, setWeek] = useState<number>(15)
  const [year, setYear] = useState<number>(2021)
  const [length, setLength] = useState<number>(0)

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent) => {
    addTask({name, description, dayIndex, done, week, year, length});
    console.log(name)
    event.preventDefault();
  }

  return (
    <Modal isVisible={props.isVisible} closeModal={props.closeModal} title="Aggiungi Task">
      <form onSubmit={handleSubmit}>
        <div className="AddTaskModalContainer">
          <div>Name</div>
          <TextInput value="name" onChange={changeName} />
        </div>
      </form>
    </Modal>

  )
};

export default AddTaskModal;
