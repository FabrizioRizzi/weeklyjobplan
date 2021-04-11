
import { useState } from 'react';
import { addTask } from '../../../firebase/firebase';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import Modal from '../../atoms/Modal/Modal';
import TextInput from '../../atoms/TextInput/TextInput';
import TextArea from '../../atoms/TextArea/TextArea';
import './AddTaskModal.scss';
import Button from '../../atoms/Button/Button';

export interface AddTaskModalProps {
  isVisible: boolean;
  closeModal: () => void;
};

const AddTaskModal: React.FC<AddTaskModalProps> = (props) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [dayIndex, setDayIndex] = useState<number>(5)
  const [done, setDone] = useState<boolean>(false)
  const [week, setWeek] = useState<number>(16)
  const [year, setYear] = useState<number>(2021)
  const [length, setLength] = useState<number>(60)

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }

  const changeDone = (event: boolean) => {
    setDone(event);
  }

  const changeDay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDayIndex(Number(event.target.value));
  }

  const changeWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeek(Number(event.target.value));
  }

  const changeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(event.target.value));
  }

  const handleSubmit = async () => {
    setYear(2021);
    await addTask({ name, description, dayIndex, done, week, year, length });
    props.closeModal();
  }

  return (
    <Modal isVisible={props.isVisible} closeModal={props.closeModal} title="Aggiungi Task">
      <form>
        <div className="AddTaskModalContainer">

          <div className="Fields">

            <div>Name</div>
            <TextInput onChange={changeName} />

            <div>Description</div>
            <TextArea onChange={changeDescription} />

            <div>Done</div>
            <Checkbox checked={done} onChange={changeDone} />

            <div>Day</div>
            {/* <Dropdown options={['Lunedì', 'Martedì']} onChange={changeDay}/> */}
            <TextInput onChange={changeDay} />

            <div>Week</div>
            <TextInput onChange={changeWeek} />

            <div>Length</div>
            <TextInput onChange={changeLength} />
          </div>

          <Button primary={true} onClick={handleSubmit}>Submit</Button>

        </div>
      </form>
    </Modal>

  )
};

export default AddTaskModal;
