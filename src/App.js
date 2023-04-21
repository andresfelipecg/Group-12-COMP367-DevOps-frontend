import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import './App.css';

const GET_COURSES = gql`
  query {
    courses {
      _id
      code
      name
      section
      semester
    }
  }
`;
const GET_COURSES_BY_ID = gql`
query($id: ID!) {
  course(id: $id) {
    id
    code
    name
    section
    semester
  }
}
`;
const DELETE_COURSE = gql`
  mutation deleteCourse($_id: String!) {
    deleteCourse(_id: $_id) {
      _id
    }
  }
`;

const ADD_COURSE = gql`
  mutation addCourse($code: String!, $name: String!, $section: String!, $semester: String!) {
    addCourse(code: $code, name: $name, section: $section, semester: $semester) {
      _id
      code
      name
      section
      semester
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation updateCourse($_id: String!, $code: String!, $name: String!, $section: String!, $semester: String!) {
    updateCourse(_id: $_id, code: $code, name: $name, section: $section, semester: $semester) {
      _id
      code
      name
      section
      semester
    }
  }
`;

const GET_COURSES_BY_SEMESTER = gql`
  query getCoursesBySemester($semester: String!) {
    courses(where: { semester: $semester }) {
      _id
      code
      name
      section
      semester
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_COURSES);
  const [deleteCourse] = useMutation(DELETE_COURSE);
  const [addCourse] = useMutation(ADD_COURSE);
  const [updateCourse] = useMutation(UPDATE_COURSE);

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');

  const [updateCourseId, setUpdateCourseId] = useState(null);
  const [updateCode, setUpdateCode] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateSection, setUpdateSection] = useState('');
  const [updateSemester, setUpdateSemester] = useState('');

  const handleUpdate = (course) => {
    setUpdateCourseId(course._id);
    setUpdateCode(course.code);
    setUpdateName(course.name);
    setUpdateSection(course.section);
    setUpdateSemester(course.semester);
  };

  const handleUpdateCancel = () => {
    setUpdateCourseId(null);
    setUpdateCode('');
    setUpdateName('');
    setUpdateSection('');
    setUpdateSemester('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ variables: { code, name, section, semester } })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    deleteCourse({ variables: { _id: id } })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };


  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateCourse({
      variables: {
        _id: updateCourseId,
        code: updateCode,
        name: updateName,
        section: updateSection,
        semester: updateSemester,
      },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Courses</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Code:
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Section:
          <input type="text" value={section} onChange={(e) => setSection(e.target.value)} />
        </label>
        <br />
        <label>
          Semester:
          <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Course</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {data.courses.map((course) => (
            <tr key={course._id}>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.section}</td>
              <td>{course.semester}</td>
              <td>
                <button onClick={() => handleUpdate(course)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(course._id)}>
                  Delete
                </button>


              </td>
            </tr>
          ))}
          {updateCourseId && (
            <tr>
              <td>
                <form onSubmit={handleUpdateSubmit}>
                  <input type="text" value={updateCode} onChange={(e) => setUpdateCode(e.target.value)} />
                  <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                  <input type="text" value={updateSection} onChange={(e) => setUpdateSection(e.target.value)} />
                  <input type="text" value={updateSemester} onChange={(e) => setUpdateSemester(e.target.value)} />
                  <button type="submit">Update</button>
                  <button onClick={handleUpdateCancel}>Cancel</button>
                </form>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
