import Options from "./Options";
function Question({ questionactive, dispatch,answer }) {
  return (
    <div>
      <h4>{questionactive?.question}</h4>
      <Options question={questionactive} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Question;
