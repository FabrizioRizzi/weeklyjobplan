import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { getTasksByWeek } from 'firebaseUtils/firebase';
import { TaskInterface } from 'sharedInterfaces';
import Header from 'components/organisms/Header/Header';
import DaysTable from 'components/organisms/DaysTable/DaysTable';
import ToPlan from 'components/organisms/ToPlan/ToPlan';

dayjs.extend(weekOfYear);

const Home: React.FC = () => {
  const [week, setWeek] = useState<number>(dayjs().week());
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    setLoading(true);
    const fbaseSubscription = getTasksByWeek(week).onSnapshot((querySnapshot) => {
      const parsedTasks = querySnapshot.docs.map((task) => (
        { id: task.id, ...task.data() }
      )) as TaskInterface[];
      setTasks(parsedTasks);
      setLoading(false);
    });
    return () => fbaseSubscription();
  }, [week]);

  const previousWeek = () => {
    setWeek(week > 1 ? week - 1 : week);
  };

  const nextWeek = () => {
    setWeek(week < 52 ? week + 1 : week);
  };

  const resetWeek = () => {
    setWeek(dayjs().week());
  };

  return (
    <>
      <Header
        week={week}
        previousWeek={previousWeek}
        nextWeek={nextWeek}
        resetWeek={resetWeek}
      />

      <DaysTable week={week} tasks={tasks} loading={loading} />

      <ToPlan />
    </>
  );
};

export default Home;
