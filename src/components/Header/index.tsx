import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import logoDark from "../../assets/images/logo-dark.svg";
import logoMobile from "../../assets/images/logo-mobile.svg";
import Button from "../Button";
import {iconAddTaskMobile, iconChevronDown, iconChevronUp, iconVerticalEllipsis} from "../../assets/icons";
import "./style.css";
import {Dropdown, MenuProps, Modal} from "antd";
import AddBoardModal from "../BoardModal";
// @ts-ignore
import {RootState} from "../../redux/reducers"; // Adjust the path according to your structure
import {deleteBoard} from "../../redux/actions"; // Adjust according to your action structure

interface HeaderProps {
  openModal: (type: "view" | "edit" | "delete" | "add", task?: any) => void;
  activeBoardIndex: any;
  setMobileDropdownTrigger: React.Dispatch<React.SetStateAction<boolean>>
  mobileDropdownTrigger: boolean;
}


const Header: React.FC<HeaderProps> = ({
                                         mobileDropdownTrigger,
                                         setMobileDropdownTrigger,
                                         openModal,
                                         activeBoardIndex
                                       }) => {
  const [editBoardModalOpen, setEditBoardModalOpen] = useState(false);
  const [deleteBoardModalOpen, setDeleteBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards); // Adjust selector according to your state structure
  const currentBoard = boards[activeBoardIndex]; // Adjust according to how you determine the current board

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a onClick={() => setEditBoardModalOpen(true)}>
          Edit board
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => setDeleteBoardModalOpen(true)}>
          Delete board
        </a>
      ),
    },
  ];


  const closeBoardModal = () => {
    setEditBoardModalOpen(false);
  };

  const handleDelete = () => {
    console.log(currentBoard)
    // @ts-ignore
    dispatch(deleteBoard(activeBoardIndex)); // Ensure you have the correct board ID
    setDeleteBoardModalOpen(false);
  };

  const handleCancel = () => {
    setDeleteBoardModalOpen(false);
  };



  return (
    <header className='header'>
      <h1 className="logo">
        <picture>
          <source media="(max-width: 767px)" srcSet={logoMobile}/>
          <img src={logoDark} alt="Logo"/>
        </picture>
      </h1>
      <div className={`mobile-dropdown-trigger ${mobileDropdownTrigger ? "opened" : ""}`}
           onClick={() => setMobileDropdownTrigger(!mobileDropdownTrigger)}>
        <h2>{currentBoard && currentBoard.name}</h2>
        {mobileDropdownTrigger ? <img src={iconChevronUp} alt=""/> :
          <img src={iconChevronDown} alt=""/>
        }
      </div>
      <div className="header-side">
        <p className="board-name heading-xl">{currentBoard && currentBoard.name}</p>
        <div className="buttons-wrapper">
          <Button
            hasIcon
            text={<span><img src={iconAddTaskMobile} alt="Add Task Icon"/> <span
              className='button-text'>Add New Task</span></span>}
            onClick={() => openModal("add")}
            type={"primary"}
            size={"large"}
          />
          <Dropdown menu={{items}} placement="bottomLeft">
             <span className="dropdown-icon">
               <img src={iconVerticalEllipsis} alt="More Options"/>
             </span>
          </Dropdown>
        </div>

      </div>

      {/*handle edit of board*/}
      <AddBoardModal
        type="edit"
        isOpen={editBoardModalOpen}
        onClose={closeBoardModal}
        boardIndex={activeBoardIndex}
      />

      {/*handle delete of board*/}
      <Modal className='modal-delete' title="Delete this board?" open={deleteBoardModalOpen} onOk={handleDelete}
             onCancel={handleCancel}>
        <p>Are you sure you want to delete the '{currentBoard && currentBoard.name}' board?
          This action will remove all columns and tasks
          and cannot be reversed.</p>
      </Modal>

    </header>
  );
};

export default Header;
