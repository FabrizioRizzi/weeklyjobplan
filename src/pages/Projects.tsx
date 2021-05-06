import { useEffect, useState } from 'react';
import { ProjectInterface } from 'sharedInterfaces';
import { useHistory } from 'react-router';
import { ArrowLeft } from 'react-feather';
import Button from 'components/atoms/Button/Button';
import Loading from 'components/atoms/Loading/Loading';
import Project from 'components/molecules/Project/Project';
import { getProjects } from '../firebaseUtils/firebase';

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

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <Button primary onClick={goBack}>
        <ArrowLeft />
      </Button>
      {loading
        ? <Loading />
        : projects?.map((project) => <Project project={project} />)}
    </>
  );
};

export default Projects;
