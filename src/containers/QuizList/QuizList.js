import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import classes from './QuizList.module.css'

export default class QuizList extends React.Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://react-quiz-a788c-default-rtdb.firebaseio.com/quizes.json')

      const quizes = []

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test - ${index + 1}`
        })
      })

      this.setState({
        quizes, loading: false
      })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Tests List</h1>

          {this.state.loading
            ? <Loader />
            : <ul>
              {this.renderQuizes()}
            </ul>
          }
        </div>
      </div>
    )
  }
}