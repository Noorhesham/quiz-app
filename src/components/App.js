import { useEffect, useReducer } from 'react'

import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import Startscreen from './Startscreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import Finishscreen from './Finishscreen'
import Timer from './Timer'
/*we start the app by making a fake api we upload the questions array of object to it then we will use the reducer hook that 
uses reducer function that recives action to update state upon it and the current state and it also has the init value of the state
it returns dispatch function and new state  dispatch function sends an object action to the reducer function to act upon it and a payload 
so now when we fetch the data if it is fetched successfully we call the dispatch function with action type datareceived and payload of data
we accept this data in the reducer function when the action.type===datarecieved we make new object of a success status and questions to the payload   */
const initialstate={
  quizname:'react',
  questions:[],status:"Loading",index:0,answer:null,points:0,highscore:0,secondsRemaining:null,
}
const SECS__PER__QUESTION=10
function reducer(state,action){
  switch (action.type) {
    case "dataReceived":
      return {...state,questions:action.payload,status:'ready'} 
    
    case 'dataFailed':
      return {...state,status:'error'}
    case 'start':
      return{...state,status:"active",secondsRemaining:state.questions.length*SECS__PER__QUESTION}
    case 'next':
      return{...state,index:state.index++,answer:null}
    case 'prev':
      return{...state,index:state.index--}
      case 'newAnswer':
        const curquestion=state.questions[state.index]
        return {...state,answer:action.payload,points:action.payload===curquestion.correctOption?state.points+curquestion.points:state.points}
      case 'end':
        return{...state,status:'finished',highscore: Math.max(state.points, state.highscore)}
      case 'reset':
        return {...initialstate,status:'ready',questions:state.questions}
      case 'tick':
        return{...state,secondsRemaining:state.secondsRemaining-1,status:state.secondsRemaining===0?'finished':state.status}
    default:
      throw new Error("Action unknown")
  }
}
export default function App(){
  const [{questions,status,index,answer,points,highscore,secondsRemaining},dispatch]=useReducer(reducer,initialstate)
  
  useEffect(function(){
  fetch('http://localhost:9000/questions').then(res=>res.json()).then(data=>dispatch({type:"dataReceived",payload:data})).catch(err=>dispatch({type:'dataFailed'}))
  },[])
  const length=questions.length
  const maxpoints=questions.reduce((acc,cur)=>acc+cur.points,0)
return <div>
  <div className="app">
    <Header/>
    <Main>
      {status==='Loading'&&<Loader/>}{status==='error'&&<Error/>}{status==='ready'&&<Startscreen dispatch={dispatch} length={length}/>}
      {status==='active'&&<>
      <Progress i={index} length={length} points={points} maxpoints={maxpoints} answer={answer} />
      <Question questionactive={questions[index]} answer={answer} dispatch={dispatch}/>
      <footer>
        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
      {answer!==null&&<NextButton i={index} length={length} dispatch={dispatch}/>}
      </footer>
      </>}
      {status==='finished'&&<Finishscreen highscore={highscore} points={points} maxpoints={maxpoints} dispatch={dispatch}/>}
    </Main>
  </div>
</div>
}