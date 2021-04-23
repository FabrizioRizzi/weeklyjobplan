import './TaskLength.scss';

export interface TaskLengthProps {
  length: number;
}

const Task: React.FC<TaskLengthProps> = ({ length }: TaskLengthProps) => (
  <div
    className="TaskLength__Length"
    style={{ backgroundImage: `linear-gradient(${90 + (360 * (length / 480))}deg, white 50%, transparent 50%), linear-gradient(-90deg, transparent 50%, white 50%` }}
  >
    {length}
  </div>
);

export default Task;
