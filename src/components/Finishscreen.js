function Finishscreen({points,maxpoints,highscore,dispatch}) {
    const percentage=(points/maxpoints)*100;
    let emoji;
    if(percentage===100) emoji='🥳❤️🏅';
    if(percentage>=80 &&percentage<100) emoji='⭐😊';
    if(percentage>=50 &&percentage<80) emoji='😃😸';
    if(percentage>0 &&percentage<50) emoji='🤔😔';
    if(percentage===0) emoji='🤦‍♂️😢';

    return (
        <>
        <p className="result">
         <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxpoints} ({Math.ceil(percentage)}% )  
        </p>
        <p className="highscore">( highscore : {highscore} points)</p>
        <footer>
        <button className="btn btn-ui" onClick={()=>dispatch({type:'reset'})}>Reset quiz</button>
        <button className="btn btn-ui" onClick={()=>dispatch({type:'choosing'})}>choose another quiz</button>
        <button className="btn btn-ui" onClick={()=>dispatch({type:'review'})}>Review Answers</button>
        </footer>
        </>
    )
}

export default Finishscreen
