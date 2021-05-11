import { useEffect, useState } from 'react';
import { ProjectInterface } from 'sharedInterfaces';
import { ArrowLeft, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import Project from '../components/molecules/Project/Project';
import { getProjects } from '../firebaseUtils/firebase';
import './Projects.scss';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>();
  const [loading, setLoading] = useState<boolean>();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const fbaseSubscription = getProjects().onSnapshot((querySnapshot) => {
      const parsedProjects = querySnapshot.docs.map((task) => (
        { id: task.id, ...task.data() }
      )) as ProjectInterface[];
      setProjects(parsedProjects);
      setLoading(false);
    });
    return () => fbaseSubscription();
  }, []);

  const backHome = () => {
    history.replace('./');
  };

  return (
    <>
      <div className="Projects__Buttons">
        <Button primary onClick={backHome}>
          <ArrowLeft />
        </Button>
        <Button primary onClick={backHome}>
          <Plus />
        </Button>
      </div>
      {!loading && projects?.map((project) => (<Project project={project} />))}

    </>
  );
};

export default Projects;
