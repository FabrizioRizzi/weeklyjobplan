import './TaskLength.scss';

export interface TaskLengthProps {
  length: number;
}

const Task: React.FC<TaskLengthProps> = ({ length }: TaskLengthProps) => (
  <div className={
        `TaskLength__Length
              ${length <= 30 && 'TaskLength__Length--quarter'}
              ${(length > 30 && length <= 60) && 'TaskLength__Length--half'}
              ${(length > 60 && length <= 90) && 'TaskLength__Length--halfandquarter'}`
              }
  >
    {length}
  </div>
);

export default Task;
