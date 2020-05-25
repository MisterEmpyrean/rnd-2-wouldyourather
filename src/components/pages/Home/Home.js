import "./Home.css";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Container from "../../atoms/Container";
import QuestionGroup from "../../organisms/QuestionGroup/QuestionGroup";
import Chrome from "../../templates/Chrome";

const Home = () => {
  const baseclass = "home";

  const [unansweredQuestions] = useState(
    useSelector(
      state => state.questions,
      state => Object.keys(state.users[state.authedUser].answers),
      state => Object.keys(state.questions),
      (questions, answeredQuestions, questionsId) =>
        questionsId
          .filter(id => !answeredQuestions.includes(id))
          .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    )
  );

  const [answeredQuestions] = useState(
    useSelector(
      state => state.questions,
      state => Object.keys(state.users[state.authedUser].answers),
      (questions, answers) =>
        answers.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    )
  );

  return (
    <Container className={baseclass}>
      <Chrome>
        <section className={`${baseclass}__contents`}>
          <QuestionGroup
            setOne={unansweredQuestions}
            setTwo={answeredQuestions}
          />
        </section>
      </Chrome>
    </Container>
  );
};

export default Home;
