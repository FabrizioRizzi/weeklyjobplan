import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import './Home.css'

interface Task {
  name: string;
  description: string;
  dayIndex: number;
  done: boolean;
  week: number;
  year: number;
}

const Home: React.FC = () => {

  dayjs.extend(weekOfYear);

  const [week, setWeek] = useState<number>(dayjs().week());
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setLoading(true);
    firebase.firestore().collection('tasks').where("year", "==", 2021).where("week", "==", week).get()
      .then(tasks => setTasks(tasks.docs.map(task => task.data() as Task)))
      .finally(() => setLoading(false));
  }, [week])

  const previousWeek = () => setWeek(week - 1);
  const nextWeek = () => setWeek(week + 1);

  return (
    <>
      <Header week={week} previousWeek={previousWeek} nextWeek={nextWeek} />
      <div className="days">
        <div>
          <h3>Lunedì</h3>
        </div>
        <div>
          <h3>Martedì</h3>
        </div>
        <div>
          <h3>Mercoledì</h3>
        </div>
        <div>
          <h3>Giovedì</h3>
        </div>
        <div>
          <h3>Venerdì</h3>
        </div>
      </div>
      {loading ?
      <div className="circleThing"></div> :
        <div className="days">
          <div></div>
          <div></div>
          <div>
            {tasks.filter(task => task.dayIndex === 2).map(task => <div>{task.name}</div>)}
          </div>
          <div></div>
          <div></div>
        </div>
      }
    </>
  )
};

export default Home;
