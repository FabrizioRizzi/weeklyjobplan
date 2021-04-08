import './Task.css';

export interface TaskProps {
  name: string;
  done: boolean;
  length?: number;
};

const Task: React.FC<TaskProps> = (props) => {
  return (
    <div className="Task">
      <input type="checkbox" checked={props.done} />
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
