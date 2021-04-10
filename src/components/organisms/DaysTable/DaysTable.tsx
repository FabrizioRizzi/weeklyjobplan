import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { TaskInterface } from '../../../sharedInterfaces';
import Task from '../../atoms/Task/Task';
import Loader from '../../atoms/Loader/Loader';
import './DaysTable.scss';

dayjs.locale('it');

export interface DaysTableProps {
  week: number;
  tasks: TaskInterface[];
  loading: boolean;
}

const DaysTable: React.FC<DaysTableProps> = (props) => {
  return (
    <>
      <div className="Days">
        {[1, 2, 3, 4, 5].map(index => {
          return (
            <div key={index}>
              <h3 className="DayTitle">{dayjs().week(props.week).day(index).format('dddd DD MMMM')}</h3>
              {!props.loading && props.tasks.filter(task => task.dayIndex === index).map(task => <Task key={task.id} id={task.id!} name={task.name} done={task.done} />)}
            </div>
          )
        })}
      </div>
      { props.loading && <Loader />}
    </>
  )
};

export default DaysTable;
