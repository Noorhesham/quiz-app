import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Startscreen from "./Startscreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finishscreen from "./Finishscreen";
import Timer from "./Timer";
import ExitButton from "./ExitButton";
import PrevButton from "./PrevButton";
import QuestionHead from "./QuestionHead";
/*we start the app by making a fake api we upload the questions array of object to it then we will use the reducer hook that 
uses reducer function that recives action to update state upon it and the current state and it also has the init value of the state
it returns dispatch function and new state  dispatch function sends an object action to the reducer function to act upon it and a payload 
so now when we fetch the data if it is fetched successfully we call the dispatch function with action type datareceived and payload of data
we accept this data in the reducer function when the action.type===datarecieved we make new object of a success status and questions to the payload   */
const initialstate = {
  quizname: "",
  answers: [],
  questions: [],
  status: "waiting",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
const SECS__PER__QUESTION = 10;
function reducer(state, action) {
  switch (action.type) {
    case "choosing":
      return initialstate;
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.data,
        status: "active",
        secondsRemaining: action.payload.data.length * SECS__PER__QUESTION,
        quizname: action.payload.quizname,
      };
    case "loading":
      return { ...state, status: "Loading" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS__PER__QUESTION,
      };
    case "next":
      return {
        ...state,
        index: state.index++,
        answer:
          state.answers[state.index - 1] || state.answers[state.index - 1] === 0
            ? state.answers[state.index - 1]
            : null,
      };
    case "prev":
      return {
        ...state,
        index: state.index--,
        answer:
          state.answers[state.index + 1] || state.answers[state.index + 1] === 0
            ? state.answers[state.index + 1]
            : null,
      };
    case "review":
      return { ...state, index: 0, status: "review", answer: state.answers[0] };
    case "newAnswer":
      const curquestion = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === curquestion.correctOption
            ? state.points + curquestion.points
            : state.points,
        answers: [...state.answers, action.payload],
      };
    case "end":
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.points, state.highscore),
      };
    case "reset":
      return {
        ...initialstate,
        status: "active",
        questions: state.questions,
        highscore: state.highscore,
        secondsRemaining: state.questions.length * SECS__PER__QUESTION,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}
export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      quizname,
    },
    dispatch,
  ] = useReducer(reducer, initialstate);

  const handlefetch = function (quizname) {
    dispatch({ type: "loading" });
    fetch(`http://localhost:9000/questions-${quizname}`)
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: { data, quizname } })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  };

  const length = questions.length;
  const maxpoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  return (
    <div>
      <div className="app">
        <Header quizname={quizname}>
          {" "}
          {status === "active" ? (
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          ) : (
            ""
          )}
        </Header>
        <Main>
          {status === "Loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "waiting" && (
            <Startscreen
              onfetch={handlefetch}
              dispatch={dispatch}
              length={length}
            />
          )}
          {(status === "active" || status === "review") && (
            <>
              {/* <QuestionHead quizname={quizname}/> */}
              <Progress
                i={index}
                length={length}
                points={points}
                maxpoints={maxpoints}
                answer={answer}
              />

              <Question
                questionactive={questions[index]}
                answer={answer}
                dispatch={dispatch}
              />
              <footer>
                {status === "review" ? (
                  <PrevButton i={index} length={length} dispatch={dispatch} />
                ) : (
                  ""
                )}
                <ExitButton dispatch={dispatch} />
                {answer !== null && (
                  <NextButton i={index} length={length} dispatch={dispatch} />
                )}
              </footer>
            </>
          )}
          {status === "finished" && (
            <Finishscreen
              highscore={highscore}
              points={points}
              maxpoints={maxpoints}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </div>
  );
}
