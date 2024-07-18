// @ts-ignore


import Button from "../Button";
import {iconAddTaskMobile} from "../../assets/icons";

const EmptyState = () => {
  return (
    <div className="empty-state">
      <p className='heading-l'>This board is empty. Create a new column to get started.</p>
      <Button size={'large'} text={<span><img src={iconAddTaskMobile} alt=""/> Add New Column</span>} onClick={() => {
      }} type={"primary"}/>
    </div>
  );
};

export default EmptyState;
