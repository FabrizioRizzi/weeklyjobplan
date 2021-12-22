import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { getTasksByWeekAndYear } from 'firebaseUtils/firebase';
import { TaskInterface } from 'sharedInterfaces';
import Header from 'components/organisms/Header/Header';
import DaysTable from 'components/organisms/DaysTable/DaysTable';
import ToPlan from 'components/organisms/ToPlan/ToPlan';
import { onSnapshot } from 'firebase/firestore';

dayjs.extend(weekOfYear);

const Home: React.FC = () => {
  const [year, setYear] = useState<number>(dayjs().year());
  const [week, setWeek] = useState<number>(dayjs().week());
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  const maxWeekNum = 52;

  useEffect(() => {
    setLoading(true);
    const getTasksByWeekSubscription = onSnapshot(
      getTasksByWeekAndYear(year, week),
      (querySnapshot) => {
        const parsedTasks = querySnapshot.docs.map((task) => (
          { id: task.id, ...task.data() }
        )) as TaskInterface[];
        setTasks(parsedTasks);
        setLoading(false);
      },
    );
    return () => getTasksByWeekSubscription();
  }, [year, week]);

  const changeYear = useCallback((newYear: number) => setYear(newYear), []);
  const changeWeek = useCallback((newWeek: number) => setWeek(newWeek), []);

  const previousWeek = useCallback(() => {
    if (week > 1) {
      setWeek(week - 1);
    } else {
      setWeek(maxWeekNum);
      setYear(year - 1);
    }
  }, [year, week, maxWeekNum]);

  const nextWeek = useCallback(() => {
    if (week < maxWeekNum) {
      setWeek(week + 1);
    } else {
      setWeek(1);
      setYear(year + 1);
    }
  }, [year, week, maxWeekNum]);

  const reset = useCallback(() => {
    setYear(dayjs().year());
    setWeek(dayjs().week());
  }, []);

  return (
    <>
      <Header
        year={year}
        week={week}
        changeYear={changeYear}
        changeWeek={changeWeek}
        previousWeek={previousWeek}
        nextWeek={nextWeek}
        reset={reset}
      />

      <DaysTable
        year={year}
        week={week}
        tasks={tasks}
        loading={loading}
      />

      <ToPlan />
    </>
  );
};

export default React.memo(Home);
