import axios from 'axios';
const url = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(url);
  return request.then((res) => res.data);
};

const addPerson = (newPerson) => {
  const request = axios.post(url, newPerson);
  return request.then((res) => {
    return res.data;
  });
};

const editPerson = (editedInfo) => {
  const request = axios.put(`${url}/${editedInfo.id}`, editedInfo);
  return request.then((res) => res.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((res) => res.data);
};

export default { getAll, addPerson, deletePerson, editPerson };