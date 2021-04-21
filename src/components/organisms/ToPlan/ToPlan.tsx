import { useEffect, useState } from 'react';
import { List } from 'react-feather';
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
      const tasks = querySnap.docs.map((task) => ({ id: task.id, ...task.data() })) as TaskToPlan[];
      setTasksToPlan(tasks);
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
        <div className="ToPlan__Content">
          {loading
            ? <Loading />
            : (
              <div className="ToPlan__ItemContainer">
                {tasksToPlan?.map((taskToPlan) => (
                  <div key={taskToPlan.id} className="ToPlan__Item">
                    <div>{taskToPlan.name}</div>
                    <div>{taskToPlan.priority}</div>
                    {taskToPlan.description && (
                    <div className="ToPlan__Description" data-description={taskToPlan.description}>
                      <List />
                    </div>
                    )}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default ToPlan;
