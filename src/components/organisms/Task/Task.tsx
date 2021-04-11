import { updateDoneTask } from '../../../firebase/firebase';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import './Task.scss';

export interface TaskProps {
  id: string;
  name: string;
  done: boolean;
  length?: number;
};

const Task: React.FC<TaskProps> = (props) => {

  const check = (checked: boolean) => {
    updateDoneTask(props.id, checked)
  }

  return (
    <div className="Task">
      <Checkbox checked={props.done} onChange={check} />
      <div className={props.done ? "Crossed" : ""}>
        {props.name}
      </div>
        {props.length && <div className="Length">{props.length}</div>}
    </div>
  )
};

export default Task;
