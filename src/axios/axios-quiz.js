import axios from "axios";

export default axios.create({
  baseURL: 'https://react-quiz-a788c-default-rtdb.firebaseio.com'
})