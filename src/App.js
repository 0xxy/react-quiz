import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from "./hoc/Layout/Layout";
import Quiz, { withRouter } from "../src/containers/Quiz/Quiz"
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth';

const App = (props) => {

  useEffect(() => {
    props.autoLogin()
  })

  let routes = (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/quiz/:id' element={<Quiz />} />
      <Route path='/' element={<QuizList />} />
    </Routes>
  )

  if (props.isAuthenticated) {
    routes = (
      <Routes>
        <Route path='/quiz-creator' element={<QuizCreator />} />
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/' element={<QuizList />} />
        <Route path="/auth" element={props.isAuthenticated ? <Navigate to="/" replace /> :  <QuizList />}  />
      </Routes>
    )
  }

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)) 
