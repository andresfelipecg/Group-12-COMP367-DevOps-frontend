import gql from 'graphql-tag';

export const GET_COURSES = gql`
  query {
    courses {
      id
      code
      name
      section
      semester
    }
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse($code: String!, $name: String!, $section: String!, $semester: String!) {
    addCourse(code: $code, name: $name, section: $section, semester: $semester) {
      id
      code
      name
      section
      semester
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse($id: ID!, $code: String, $name: String, $section: String, $semester: String) {
    updateCourse(id: $id, code: $code, name: $name, section: $section, semester: $semester) {
      id
      code
      name
      section
      semester
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`;
