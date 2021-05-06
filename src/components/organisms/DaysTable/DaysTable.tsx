import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { TaskInterface } from 'sharedInterfaces';
import Loading from 'components/atoms/Loading/Loading';
import Day from 'components/organisms/Day/Day';
import './DaysTable.scss';

dayjs.locale('it');

export interface DaysTableProps {
  week: number;
  tasks: TaskInterface[];
  loading: boolean;
}

const DaysTable: React.FC<DaysTableProps> = ({ week, tasks, loading }: DaysTableProps) => {
  const daysArray = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="DaysTable__Days">
        {!loading ? (
          daysArray.map((index) => (
            <Day
              key={index}
              dayName={dayjs().week(week).day(index).format('dddd DD MMMM')}
              dayNumber={index}
              week={week}
              tasks={tasks
                .filter((task) => task.dayIndex === index)
                .sort((a, b) => (a.length > b.length ? 1 : -1))}
            />
          ))
        ) : <Loading />}
      </div>
    </>
  );
};

export default DaysTable;
