import { Modal, ModalType } from "./Modal";
import {
  ModalContent,
  StyledTitle,
  StyledInputWrapper,
  CloseButton,
  InfoButtonWrapper,
  SubmitButton,
  RadioButton,
  StatusItem,
  RadiosTitle,
  RadiosWrapper,
  DeleteButton,
} from "./StyledComponents";
import { useRef, useState } from "react";

import { deleteTask, postTask, updateTask } from "../../api/tasks";

export const AddTaskModal = ({
  modalType,
  taskid,
  onModalSubmit,
  handleClose,
  projectid,
}: {
  modalType: ModalType;
  taskid?: string;
  projectid: string;
  onModalSubmit: () => void;
  handleClose: () => void;
}) => {
  const handleSubmitClick = async (taskid?: string) => {
    let title = titleRef.current?.value ?? "";
    let description = descriptionRef.current?.value ?? "";
    let status = selectedStatus;
    if (modalType == ModalType.ADD) {
      postTask({
        title: title,
        description: description,
        projectid: projectid,
        status: status,
      }).then(() => {
        handleClose();
        onModalSubmit();
      });
    } else {
      updateTask({ title, description, status, taskid: taskid ?? "" }).then(
        () => {
          handleClose();
          onModalSubmit();
        }
      );
    }
  };
  const [selectedStatus, setSelectedStatus] = useState<
    "TODO" | "IN PROGRESS" | "DONE"
  >("TODO");
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const handleDeleteClick = async (taskid: string) => {
    deleteTask(taskid).then(() => {
      handleClose();
      onModalSubmit();
    });
  };
  const renderRadios = () => (
    <InfoButtonWrapper>
      <StatusItem
        onClick={() => setSelectedStatus("TODO")}
        selected={selectedStatus == "TODO"}
      >
        <RadioButton selected={selectedStatus == "TODO"} />
        {"TODO"}
      </StatusItem>

      <StatusItem
        onClick={() => setSelectedStatus("IN PROGRESS")}
        selected={selectedStatus == "IN PROGRESS"}
      >
        <RadioButton selected={selectedStatus == "IN PROGRESS"} />
        {"IN PROGRESS"}
      </StatusItem>
      <StatusItem
        onClick={() => setSelectedStatus("DONE")}
        selected={selectedStatus == "DONE"}
      >
        <RadioButton selected={selectedStatus == "DONE"} />
        {"DONE"}
      </StatusItem>
    </InfoButtonWrapper>
  );
  return (
    <Modal>
      <ModalContent>
        <StyledTitle>
          {" "}
          {modalType == ModalType.ADD ? "Add new task" : "Edit task"}
        </StyledTitle>
        <StyledInputWrapper>
          <div>Task Title</div>
          <input
            type="text"
            placeholder="Enter your task title"
            ref={titleRef}
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <div>Task description</div>
          <input
            type="text"
            placeholder="Enter your task description"
            ref={descriptionRef}
          />
        </StyledInputWrapper>
        <RadiosWrapper>
          <RadiosTitle>Task status </RadiosTitle>
          {renderRadios()}
        </RadiosWrapper>
        <InfoButtonWrapper>
          <SubmitButton
            shouldShow={true}
            onClick={() => handleSubmitClick(taskid)}
          >
            Submit
          </SubmitButton>
          <CloseButton onClick={handleClose}> Close</CloseButton>
          {modalType == ModalType.EDIT && (
            <DeleteButton
              onClick={() => handleDeleteClick(projectid as string)}
            >
              Delete
            </DeleteButton>
          )}
        </InfoButtonWrapper>
      </ModalContent>
    </Modal>
  );
};
