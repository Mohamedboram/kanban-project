// @ts-ignore
import React, {useState, useEffect} from "react";
// @ts-ignore
import {Task} from "../../data";
import "./style.css";
import {Dropdown, MenuProps, Select, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addTask, deleteTask, updateTask} from "../../redux/actions";
import {RootState} from "../../redux/store";
import {getUniqueStatuses} from "../../utils";
import Button from "../Button";
import {iconCross, iconVerticalEllipsis} from "../../assets/icons";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  type: "view" | "edit" | "delete" | "add";
  onSave: (task: Task) => void;
  boardIndex: number;
  columnIndex: number;
  taskIndex: number;
}

const TaskModal: React.FC<TaskModalProps> = ({
                                               isOpen,
                                               onClose,
                                               task,
                                               type,
                                               onSave,
                                               boardIndex,
                                               columnIndex,
                                               taskIndex,
                                             }) => {
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [modalType, setModalType] = useState<TaskModalProps["type"]>(type);
  const [errors, setErrors] = useState<{ title?: string; description?: string; subtasks?: string[] }>({});
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);
  const statuses = getUniqueStatuses(boards, boardIndex);

  useEffect(() => {
    if (task) {
      setModalTask(task);
    } else if (type === "add") {
      setModalTask({ title: "", description: "", status: "", subtasks: [] });
    }
    setModalType(type);
    setErrors({});
  }, [task, type]);

  const handleEditTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalType("edit");
  };

  const handleDeleteTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    // @ts-ignore
    dispatch(deleteTask(boardIndex, columnIndex, taskIndex));
    onClose(); // Optionally close the modal after deleting the task
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={handleEditTask}>Edit task</a>,
    },
    {
      key: "2",
      label: <a onClick={handleDeleteTask}>Delete task</a>,
    },
  ];

  const handleChangeSelect = (value: string) => {
    if (modalTask) {
      const updatedTask = {...modalTask, status: value};
      setModalTask(updatedTask);
      if (type !== "add") {
        // @ts-ignore
        dispatch(updateTask(boardIndex, columnIndex, taskIndex, updatedTask));
      }
    }
  };

  const handleCheckboxChange = (index: number) => {
    if (modalTask) {
      const newSubtasks = [...modalTask.subtasks];
      newSubtasks[index].isCompleted = !newSubtasks[index].isCompleted;
      const updatedTask = {...modalTask, subtasks: newSubtasks};
      setModalTask(updatedTask);
      if (type !== "add") {
        // @ts-ignore
        dispatch(updateTask(boardIndex, columnIndex, taskIndex, updatedTask));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (modalTask) {
      const updatedTask = {...modalTask, [e.target.name]: e.target.value};
      setModalTask(updatedTask);
      if (type !== "add") {
        // @ts-ignore
        dispatch(updateTask(boardIndex, columnIndex, taskIndex, updatedTask));
      }
    }
  };

  const handleSave = () => {
    if (modalTask) {
      const newErrors: { title?: string; description?: string; subtasks?: string[] } = {};
      if (!modalTask.title.trim()) newErrors.title = "Title cannot be empty.";
      if (!modalTask.description.trim()) newErrors.description = "Description cannot be empty.";
      if (modalTask.subtasks.some((subtask:any) => !subtask.title.trim())) {
        newErrors.subtasks = modalTask.subtasks.map((subtask:any) =>
          !subtask.title.trim() ? "Subtask title cannot be empty." : ""
        );
      }
      console.log(newErrors)
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      if (type === "add") {
        // @ts-ignore
        dispatch(addTask(boardIndex, columnIndex, modalTask));
      } else {
        onSave(modalTask);
      }
      onClose();
    }
  };

  const handleAddSubtask = () => {
    if (modalTask) {
      const updatedSubtasks = [...modalTask.subtasks, {title: "", isCompleted: false}];
      setModalTask({...modalTask, subtasks: updatedSubtasks});
    }
  };

  const handleSubtaskChange = (index: number, value: string) => {
    if (modalTask) {
      const updatedSubtasks = modalTask.subtasks.map((subtask:any, i:any) =>
        i === index ? {...subtask, title: value} : subtask
      );
      setModalTask({...modalTask, subtasks: updatedSubtasks});
      const newErrors = { ...errors };
      if (value.trim()) {
        newErrors.subtasks![index] = "";
      } else {
        newErrors.subtasks![index] = "Subtask title cannot be empty.";
      }
      setErrors(newErrors);
    }
  };

  const handleRemoveSubtask = (index: number) => {
    if (modalTask) {
      const updatedSubtasks = modalTask.subtasks.filter((_:any, i:any) => i !== index);
      setModalTask({...modalTask, subtasks: updatedSubtasks});
    }
  };

  useEffect(() => {
    if (task) {
      setModalTask(task);
    } else if (type === "add") {
      setModalTask({title: "", description: "", status: "", subtasks: []});
    }
    setModalType(type);
  }, [task, type]);

  const renderModalContent = () => {
    if (!modalTask) return null;

    return (
      <div className="">
        <div className={`modal-content ${modalType}`}>
          {modalType === "view" && (
            <>
              <div className="modal-header">
                <h3 className="heading-l">{modalTask.title}</h3>
                <Dropdown menu={{items}} placement="bottomLeft">
                  <span className="dropdown-icon">
                    <img src={iconVerticalEllipsis} alt="More Options"/>
                  </span>
                </Dropdown>
              </div>
              <p className="body-l modal-description">{modalTask.description}</p>
              <p className="body-m subtasks-title">
                Subtasks ({modalTask.subtasks.filter((item:any) => item.isCompleted).length} of {modalTask.subtasks.length})
              </p>
              <ul className="body-m subtasks-list">
                {modalTask.subtasks.map((subtask:any, index:any) => (
                  <li onClick={() => handleCheckboxChange(index)}
                      className={`subtasks-item ${subtask.isCompleted ? "completed" : ""}`} key={index}>
                    <input
                      type="checkbox"
                      checked={subtask.isCompleted}
                    />
                    {subtask.title}
                  </li>
                ))}
              </ul>
              <p className="body-m select-title">Current Status</p>
              <Select
                className={"current-status"}
                value={modalTask.status}
                style={{width: "100%"}}
                onChange={handleChangeSelect}
                options={statuses.map(status => ({value: status, label: status}))}
              />
            </>
          )}
          {modalType === "edit" && (
            <>
              <div className="modal-header">
                <h3 className="heading-l">Edit Task</h3>
              </div>
              <div className="input-wrapper">
                <p className='input-title body-m'>Title</p>
                <input name="title" value={modalTask.title} onChange={handleChange} placeholder="Task Title"/>
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>
              <div className="input-wrapper">
                <p className='input-title body-m'>Description</p>
                <textarea
                  name="description"
                  value={modalTask.description}
                  onChange={handleChange}
                  placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                />
                {errors.description && <span className="error-message">{errors.description}ss</span>}
              </div>
              <div className="subtasks-wrapper">
                <p className='body-m'>Subtasks</p>
                {modalTask.subtasks.map((subtask:any, index:any) => (
                  <div key={index} className="input-wrapper-row">
                    <input
                      type="text"
                      value={subtask.title}
                      onChange={(e) => handleSubtaskChange(index, e.target.value)}
                      placeholder={`e.g. Subtask ${index + 1}`}
                    />
                    <button onClick={() => handleRemoveSubtask(index)}>
                      <img src={iconCross} alt="Remove Subtask"/>
                    </button>
                    {errors.subtasks && errors.subtasks[index] && (
                      <span className="error-message">{errors.subtasks[index]}</span>
                    )}
                  </div>
                ))}
                <Button
                  text={<span>+ Add New Subtask</span>}
                  onClick={handleAddSubtask}
                  type={"secondary"}
                  hasIcon={true}
                  size={"large"}
                />
              </div>
              <div className="select-wrapper">
                <p className="body-m select-title">Current Status</p>
                <Select
                  className={"current-status"}
                  value={modalTask.status}
                  style={{width: "100%"}}
                  onChange={handleChangeSelect}
                  options={statuses.map(status => ({value: status, label: status}))}
                />
              </div>
              <Button text={<span>Save Task</span>} type={'primary'} size={"large"} onClick={handleSave}/>
            </>
          )}
          {modalType === "delete" && (
            <>
              <p>Are you sure you want to delete this task?</p>
              <button onClick={handleDeleteTask}>Delete</button>
            </>
          )}
          {modalType === "add" && (
            <>
              <div className="modal-header">
                <h3 className="heading-l">Add New Task</h3>
              </div>
              <div className="input-wrapper">
                <p className='input-title body-m'>Title</p>
                <input name="title" value={modalTask.title} onChange={handleChange} placeholder="Task Title"/>
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>
              <div className="input-wrapper">
                <p className='input-title body-m'>Description</p>
                <textarea
                  name="description"
                  value={modalTask.description}
                  onChange={handleChange}
                  placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>
              <div className="subtasks-wrapper">
                <p className='body-m'>Subtasks</p>
                {modalTask.subtasks.map((subtask:any, index:any) => (
                  <div key={index} className="input-wrapper-row">
                    <input
                      type="text"
                      value={subtask.title}
                      onChange={(e) => handleSubtaskChange(index, e.target.value)}
                      placeholder={`e.g. Subtask ${index + 1}`}
                    />
                    <button onClick={() => handleRemoveSubtask(index)}>
                      <img src={iconCross} alt="Remove Subtask"/>
                    </button>
                    {errors.subtasks && errors.subtasks[index] && (
                      <span className="error-message">{errors.subtasks[index]}</span>
                    )}
                  </div>
                ))}
                <Button
                  text={<span>+ Add New Subtask</span>}
                  onClick={handleAddSubtask}
                  type={"secondary"}
                  hasIcon={true}
                  size={'large'}
                />
              </div>
              <div className="select-wrapper">
                <p className="body-m select-title">Current Status</p>
                <Select
                  className={"current-status"}
                  value={modalTask.status}
                  style={{width: "100%"}}
                  onChange={handleChangeSelect}
                  options={statuses.map(status => ({value: status, label: status}))}
                />

              </div>
              <Button text={<span>Add Task</span>} type={'primary'} size={"large"} onClick={handleSave}/>
            </>
          )}
        </div>
      </div>
    );

  };

  return (
    <Modal
      // title={type === "view" ? modalTask?.title : "Task"}
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {renderModalContent()}
    </Modal>
  );
};

export default TaskModal;
