import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { Task } from '../../../sharedInterfaces';
import './DaysTable.css';

dayjs.locale('it');

export interface DaysTableProps {
  week: number;
  tasks: Task[];
  loading: boolean;
}

const DaysTable: React.FC<DaysTableProps> = (props) => {
  return (
    <>
    <div className="days">
      {[1, 2, 3, 4, 5].map(index => {
        return (
          <div key={index}>
            <h3 className="dayTitle">{dayjs().week(props.week).day(index).format('dddd DD MMMM')}</h3>
            {!props.loading && props.tasks.filter(task => task.dayIndex === index).map(task => <div key={index}>{task.name}</div>)}
          </div>
        )
      })}
    </div>
    { props.loading && <div className="circleThing"></div> }
    </>
  )
};

export default DaysTable;
