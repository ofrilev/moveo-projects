import { FC, useState } from "react";
import {
  Column,
  Container,
  TaskTableHeader,
  TaskTableWrapper,
  TaskTitle,
  Title,
  AddButton,
  EditableDiv,
  EditIcon,
} from "./StyledComponents";
import { AddTaskModal } from "../modals/taskModal";
import { FaEdit } from "react-icons/fa";
import { ModalType } from "../modals/Modal";

type Task = {
  id: string;
  title: string;
  status: string;
  description: string;
  role: string;
  projectid: string;
};

interface MainPageProps {
  projectid: string;
  tasks: Task[] | [];
  onModalSubmit: () => void;
}

const getColumnsData = (tasks: Task[]) => {
  return [
    {
      title: "Todo",
      items: tasks
        .filter((task) => task.status === "todo")
        .map((task) => ({
          title: task.title,
          taskid: task.id,
        })),
    },
    {
      title: "In progress",
      items: tasks
        .filter((task) => task.status === "in_progress")
        .map((task) => ({
          title: task.title,
          taskid: task.id,
        })),
    },
    {
      title: "Done",
      items: tasks
        .filter((task) => task.status === "done")
        .map((task) => ({
          title: task.title,
          taskid: task.id,
        })),
    },
  ];
};

export const MainPage: FC<MainPageProps> = ({
  tasks,
  onModalSubmit,
  projectid,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const columnsData = getColumnsData(tasks);
  const [modalType, setModalType] = useState<ModalType>(ModalType.ADD);
  const [chosenTaskid, setChosenTaskid] = useState("");
  const handleModalClose = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "unset";
  };
  const handleModalOpen = () => {
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  const handleIconClick = (e: React.MouseEvent, taskid: string) => {
    e.stopPropagation();
    setChosenTaskid(taskid);
    setModalType(ModalType.EDIT);
    handleModalOpen();
  };
  const handleAddClick = () => {
    setModalType(ModalType.ADD);
    handleModalOpen();
  };
  return (
    <TaskTableWrapper>
      <TaskTableHeader>
        <TaskTitle>Tasks</TaskTitle>
        <AddButton onClick={handleAddClick}>+</AddButton>
      </TaskTableHeader>
      {modalIsOpen && (
        <AddTaskModal
          modalType={modalType}
          taskid={chosenTaskid}
          projectid={projectid}
          handleClose={handleModalClose}
          onModalSubmit={onModalSubmit}
        />
      )}

      <Container>
        {columnsData.map((column, index) => (
          <Column key={index}>
            <Title>{column.title}</Title>
            {column.items.map((task) => (
              <EditableDiv key={task.taskid}>
                {task.title}
                <EditIcon
                  onClick={(e) => handleIconClick(e, task.taskid)}
                  className="edit-icon"
                >
                  <FaEdit />
                </EditIcon>
              </EditableDiv>
            ))}
          </Column>
        ))}
      </Container>
    </TaskTableWrapper>
  );
};
