import axios from "axios";

//axios object that takes the given url as default base url,
export default axios.create({baseURL: 'http://localhost:8080/todo'})