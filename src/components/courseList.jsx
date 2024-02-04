import React, {useState} from 'react';

import{hasConflict, toggle, getCourseTerm, getCourseNumber} from '../utilities/functions.jsx';
import { TermSelector } from './termComponents.jsx';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useUserState } from '../utilities/firebase.jsx';


const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const [user] = useUserState();
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };

  return (
    <div className="card m-1 p-2" 
        style={style}
        onClick={(isDisabled) ? null : () => setSelected(toggle(course, selected))}
        onDoubleClick={!user ? null : () => reschedule(course, getMeetingData(course))}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">{ course.meets }</div>
      </div>
    </div>
  );
};
  
  export  const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);
    if (selected.some(course => course !== courses[course.id])){
      setSelected([]);
    }
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    
    return (
      <>
        <TermSelector term={term} setTerm={setTerm}/>
        <div className="course-list">
        { termCourses.map(course => <Course key={course.id} course={ course }  selected={selected} setSelected={ setSelected }/>) }
        </div>
      </>
    );
  };
  