import './Task.css';

export interface TaskProps {
  name: string;
  done: boolean;
  length?: number;
};

const faiQualcosa = (event: any) => {
  console.log(event.target.value)
}

const Task: React.FC<TaskProps> = (props) => {
  return (
    <div className="Task">
      <input className="Checkbox" type="checkbox" checked={props.done} onChange={faiQualcosa}/>
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
