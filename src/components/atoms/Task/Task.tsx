import { updateDoneTask } from '../../../firebase/firebase';
import Checkbox from '../Checkbox/Checkbox';
import './Task.css';

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
      <div>
        {props.name}
      </div>
      <div>
        {props.length}
      </div>
    </div>
  )
};

export default Task;
