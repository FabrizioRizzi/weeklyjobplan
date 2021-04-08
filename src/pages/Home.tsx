import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useEffect, useState } from 'react';
import Header from '../components/atoms/Header/Header';
import DaysTable from '../components/organisms/DaysTable/DaysTable';
import { Task } from '../sharedInterfaces';
import { getTasksByWeek } from '../firebase/firebase';
import './Home.css'


dayjs.extend(weekOfYear);

const Home: React.FC = () => {
  const [week, setWeek] = useState<number>(dayjs().week());
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
     const getTasks = async () => {
      setLoading(true);
       try {
        setTasks(await getTasksByWeek(week) as Task[]);
       } finally {
        setLoading(false);
       }
     }
     getTasks();
  }, [week])

  const previousWeek = () => setWeek(week > 1 ? week - 1 : week);
  const nextWeek = () => setWeek(week < 52 ? week + 1 : week);
  const resetWeek = () => setWeek(dayjs().week())

  return (
    <>
      <Header week={week} previousWeek={previousWeek} nextWeek={nextWeek} resetWeek={resetWeek} />

      <DaysTable week={week} tasks={tasks} loading={loading}/>
    </>
  )
};

export default Home;
