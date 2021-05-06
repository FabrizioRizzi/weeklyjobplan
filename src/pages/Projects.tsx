import { useEffect, useState } from 'react';
import { Project } from 'sharedInterfaces';
import { getProjects } from '../firebaseUtils/firebase';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    const fbaseSubscription = getProjects().onSnapshot((querySnapshot) => {
      const parsedProjects = querySnapshot.docs.map((task) => (
        { id: task.id, ...task.data() }
      )) as Project[];
      setProjects(parsedProjects);
      setLoading(false);
    });
    return () => fbaseSubscription();
  }, []);

  return (
    <>
      {!loading && projects?.map((project) => (<div>{project.name}</div>))}
    </>
  );
};

export default Projects;
