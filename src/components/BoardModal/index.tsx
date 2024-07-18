// @ts-ignore
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard, updateBoard } from '../../redux/actions';
import { Modal } from "antd";
import { iconCross } from "../../assets/icons";
import Button from "../Button";
import "./style.css";
// @ts-ignore
import { RootState } from '../../redux/reducers'; // Adjust the path according to your structure

interface AddBoardModalProps {
  type?: "add" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onSave?: (title: string) => void;
  boardIndex?: number; // Add this prop to identify the board being edited
}

const AddBoardModal: React.FC<AddBoardModalProps> = ({ type = "add", isOpen, onClose, boardIndex }) => {
  const boards = useSelector((state: RootState) => state.boards);
  const [boardTitle, setBoardTitle] = useState('');
  const [columns, setColumns] = useState<string[]>(['']);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "edit" && boardIndex !== undefined) {
      const board = boards[boardIndex];
      if (board) {
        setBoardTitle(board.name);
        setColumns(board.columns.map((column:any) => column.name));
      }
    } else {
      setBoardTitle('');
      setColumns(['']);
    }
  }, [type, boardIndex, boards]);

  const handleSaveBoard = () => {
    const trimmedTitle = boardTitle.trim();

    if (!trimmedTitle) {
      alert("Board title cannot be empty.");
      return;
    }

    if (type === "add" && boards.some((board:any) => board.name && board.name.toLowerCase() === trimmedTitle.toLowerCase())) {
      alert("Board title already exists.");
      return;
    }

    if (columns.some(column => !column.trim())) {
      alert("Column names cannot be empty.");
      return;
    }

    if (type === "edit" && boardIndex !== undefined) {
      const updatedBoard = {
        name: trimmedTitle,
        columns: columns.map((name, index) => ({
          name,
          tasks: boards[boardIndex].columns[index]?.tasks || [],
        })),
      };
      // @ts-ignore
      dispatch(updateBoard(boardIndex, updatedBoard));
    } else {
      // @ts-ignore
      dispatch(addBoard({ name: trimmedTitle, columns: columns.map(name => ({ name, tasks: [] })) }));
    }

    setBoardTitle('');
    setColumns(['']);
    onClose();
  };

  const handleColumnChange = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };

  const handleAddColumn = () => {
    setColumns([...columns, '']);
  };

  const handleRemoveColumn = (index: number) => {
    if (columns.length === 1) {
      alert("There must be at least one column.");
      return;
    }
    const newColumns = columns.filter((_, i) => i !== index);
    setColumns(newColumns);
  };

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className="modal-content">
        <>
          <div className="modal-header">
            <h3 className="heading-l">{type === "edit" ? "Edit Board" : "Add New Board"}</h3>
          </div>
          <div className="input-wrapper">
            <p className='input-title body-m'>Name</p>
            <input
              name="title"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              placeholder="e.g. Web Design"
            />
          </div>

          <div className="subtasks-wrapper">
            <p className='body-m'>Columns</p>
            {columns.map((column, index) => (
              <div key={index} className="input-wrapper-row">
                <input
                  type="text"
                  value={column}
                  onChange={(e) => handleColumnChange(index, e.target.value)}
                  placeholder={`Column ${index + 1}`}
                />
                <button onClick={() => handleRemoveColumn(index)}>
                  <img src={iconCross} alt="Remove column" />
                </button>
              </div>
            ))}
          </div>
          <Button text={<span>+Add New Column</span>} onClick={handleAddColumn} type={"secondary"} hasIcon={true} size={'large'} />

          <Button text={<span>{type === "edit" ? "Save Changes" : "Create New Board"}</span>} type={"primary"} size={"large"} onClick={handleSaveBoard} />
        </>
      </div>
    </Modal>
  );
};

export default AddBoardModal;
