import { useEffect, useState } from 'react';
import { addProject, deleteProject, updateProject } from 'firebaseUtils/firebase';
import { CreateProjectRequest, ProjectInterface } from 'sharedInterfaces';
import Modal from 'components/atoms/Modal/Modal';
import TextInput from 'components/atoms/TextInput/TextInput';
import TextArea from 'components/atoms/TextArea/TextArea';
import Button from 'components/atoms/Button/Button';
import Checkbox from 'components/atoms/Checkbox/Checkbox';
import './UpdateProjectModal.scss';

export interface UpdateProjectModalProps {
  isVisible: boolean;
  project: ProjectInterface | CreateProjectRequest;
  closeModal: () => void;
}

const UpdateProjectModal: React.FC<UpdateProjectModalProps> = ({
  isVisible, project, closeModal,
}: UpdateProjectModalProps) => {
  const [name, setName] = useState<string>(project.name);
  const [description, setDescription] = useState<string>(project.description || '');
  const [technologies, setTechnologies] = useState<string>(project.technologies);
  const [deploy, setDeploy] = useState<string>(project.deploy);
  const [notes, setNotes] = useState<string>(project.notes);
  const [closed, setClosed] = useState<boolean>(project.closed);
  const [repository, setRepository] = useState<string>(project.repository);
  const [loadingAddUpdate, setLoadingAddUpdate] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  useEffect(() => {
    setName(project.name);
    setDescription(project.description || '');
    setTechnologies(project.technologies);
    setDeploy(project.deploy);
    setNotes(project.notes);
    setClosed(project.closed);
  }, [project]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const changeTechnologies = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTechnologies(event.target.value);
  };

  const changeDeploy = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDeploy(event.target.value);
  };

  const changeNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const changeRepository = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepository(event.target.value);
  };

  const changeClosed = (checked: boolean) => {
    setClosed(checked);
  };

  const onAddProject = async () => {
    setLoadingAddUpdate(true);
    const request = {
      name, description, technologies, deploy, notes, closed, repository,
    };
    await addProject(request);
    setLoadingAddUpdate(false);
    closeModal();
  };

  const onUpdateProject = async () => {
    if ('id' in project) {
      setLoadingAddUpdate(true);
      const request = {
        name, description, technologies, deploy, notes, closed, repository,
      };
      await updateProject(project.id, request);
      setLoadingAddUpdate(false);
      closeModal();
    }
  };

  const deleteSelectedProject = async () => {
    if ('id' in project) {
      setLoadingDelete(true);
      await deleteProject(project.id);
      setLoadingDelete(false);
      closeModal();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      closeModal={closeModal}
      title="Aggiungi Project"
      width={window.innerWidth < 400 ? window.innerWidth : 400}
    >
      <form>
        <div className="UpdateProjectModal__Fields">

          <div>Name</div>
          <TextInput onChange={changeName} value={name} />

          <div>Description</div>
          <TextArea onChange={changeDescription} value={description} />

          <div>Technologies</div>
          <TextArea onChange={changeTechnologies} value={technologies} />

          <div>Deploy</div>
          <TextArea onChange={changeDeploy} value={deploy} />

          <div>Notes</div>
          <TextArea onChange={changeNotes} value={notes} />

          <div>Repository</div>
          <TextInput onChange={changeRepository} value={repository} />

          <div>Closed</div>
          <Checkbox checked={closed} onChange={changeClosed} />
        </div>

        {'id' in project
          ? (
            <div className="UpdateProjectModal__Buttons">
              <Button
                primary={false}
                onClick={deleteSelectedProject}
                loading={loadingDelete}
              >
                Cancella
              </Button>
              <Button
                primary
                onClick={onAddProject}
                loading={loadingAddUpdate}
              >
                Duplica
              </Button>
              <Button
                primary
                onClick={onUpdateProject}
                loading={loadingAddUpdate}
              >
                Aggiorna
              </Button>
            </div>
          )
          : (
            <div className="UpdateProjectModal__Add">
              <Button
                primary
                onClick={onAddProject}
                loading={loadingAddUpdate}
              >
                Aggiungi
              </Button>
            </div>
          )}
      </form>
    </Modal>
  );
};

export default UpdateProjectModal;
