
import { useState } from 'react';
import { addTask } from '../../../firebase/firebase';
import Modal from '../../atoms/Modal/Modal';
import TextInput from '../../atoms/TextInput/TextInput';
import TextArea from '../../atoms/TextArea/TextArea';
import './AddTaskModal.scss';
import Button from '../../atoms/Button/Button';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

export interface AddTaskModalProps {
  isVisible: boolean;
  closeModal: () => void;
};

const AddTaskModal: React.FC<AddTaskModalProps> = (props) => {
  const [name, setName] = useState<string>('')
  const [dayIndex, setDayIndex] = useState<number>(dayjs().day())
  const [week, setWeek] = useState<number>(dayjs().week())
  const [year, setYear] = useState<number>(2021)
  const [description, setDescription] = useState<string>('')
  const [length, setLength] = useState<number>(0)
  const done = false;

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
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
    const request = {
      name,
      dayIndex,
      done,
      week,
      year,
      description,
      length
    }
    await addTask(request);
    props.closeModal();
  }

  return (
    <Modal isVisible={props.isVisible} closeModal={props.closeModal} title="Aggiungi Task" width={400}>
      <form>
        <div className="AddTaskModal__Fields">

          <div>Name</div>
          <TextInput onChange={changeName} value={name} />

          <div>Description</div>
          <TextArea onChange={changeDescription} value={description} />

          <div>Day</div>
          {/* <Dropdown options={['Lunedì', 'Martedì']} onChange={changeDay}/> */}
          <TextInput onChange={changeDay} value={dayIndex} type="number" />

          <div>Week</div>
          <TextInput onChange={changeWeek} value={week} type="number" />

          <div>Length</div>
          <TextInput onChange={changeLength} value={length} type="number" />
        </div>

        <div className="AddTaskModal__Submit">
          <Button primary={true} onClick={handleSubmit}>Aggiungi</Button>
        </div>
      </form>
    </Modal>

  )
};

export default AddTaskModal;
