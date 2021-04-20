import { useEffect, useState } from 'react';
import { getTasksToPlan } from 'firebaseUtils/firebase';
import { TaskToPlan } from 'sharedInterfaces';
import Loading from 'components/atoms/Loading/Loading';
import './ToPlan.scss';

const ToPlan: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tasksToPlan, setTasksToPlan] = useState<TaskToPlan[]>([]);
  const [toPlanVisible, setToPlanVisible] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const firebaseSubscription = getTasksToPlan().onSnapshot((querySnap) => {
      const tasks = querySnap.docs.map((task) => ({ id: task.id, ...task.data() }));
      setTasksToPlan(tasks as unknown as TaskToPlan[]);
      setLoading(false);
    });
    return () => firebaseSubscription();
  }, []);

  /*
  const toPlanOpen = () => {
    setToPlanModalVisible(true);
  };

  const toPlanClose = () => {
    setToPlanModalVisible(false);
  };
  */

  const toggleToPlan = () => {
    setToPlanVisible(!toPlanVisible);
  };

  return (
    <>
      <div className={toPlanVisible ? 'ToPlan__ToPlanOpen' : 'ToPlan__ToPlan'}>
        <div className="ToPlan__Title" onClick={toggleToPlan}>To Plan</div>
        {loading
          ? <Loading />
          : (
            <div>
              {tasksToPlan?.map((task) => <div>{task.name}</div>)}
            </div>
          )}
      </div>
    </>
  );
};

export default ToPlan;
