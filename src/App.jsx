import { useState } from 'react';
import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { CourseList } from './components/courseList.jsx';
import { addScheduleTimes } from './utilities/functions.jsx';
import { schedule } from './utilities/variables';
import { TermButton, TermSelector } from './components/termComponents';
import { useData } from './utilities/firebase';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import EditForm from './components/EditForm';



const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  const response = await fetch(url);
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());
};


const Banner = ({ title }) => (
  <h1>{ title }</h1>
);


const Main = () =>  {
  
  const [schedule, isLoading, error] = useData('/schedule', addScheduleTimes);
  
  if (error) return <h1>error</h1>;
  if (isLoading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseList courses={ schedule.courses } />} />
          <Route path="/edit" element={ <EditForm /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;


