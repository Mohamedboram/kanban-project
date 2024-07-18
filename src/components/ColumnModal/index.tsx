import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addColumn } from '../../redux/actions';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const AddColumnModal: React.FC<{ isOpen: boolean, onClose: () => void, boardIndex: number }> = ({ isOpen, onClose, boardIndex }) => {
  const [columnTitle, setColumnTitle] = useState('');
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.boards[boardIndex]);

  const handleAddColumn = () => {
    if (columnTitle.trim()) {
      // @ts-ignore
      dispatch(addColumn(boardIndex, { name: columnTitle, tasks: [] }));
      setColumnTitle('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add New Column to {board?.name}</h3>
        <input
          type="text"
          value={columnTitle}
          onChange={(e) => setColumnTitle(e.target.value)}
          placeholder="Column Title"
        />
        <button onClick={handleAddColumn}>Add Column</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddColumnModal;
