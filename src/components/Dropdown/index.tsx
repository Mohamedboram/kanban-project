// import React, { useState, useRef, useEffect } from 'react';
// import "./style.css"
//
// interface DropdownProps {
//   show: boolean;
//   onClose: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }
//
// const Dropdown: React.FC<DropdownProps> = ({ show, onClose, onEdit, onDelete }) => {
//   const dropdownRef = useRef<HTMLDivElement>(null);
//
//   const handleClickOutside = (event: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//       onClose();
//     }
//   };
//
//   useEffect(() => {
//     if (show) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }
//
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [show]);
//
//   return (
//     <div ref={dropdownRef} className={`body-l custom-dropdown ${show ? 'collapsed' : ''}`}>
//       <div onClick={onEdit} className="option">Edit task</div>
//       <div onClick={onDelete} className="option">Delete task</div>
//     </div>
//   );
// };
//
// export default Dropdown;
