function Options({question,answer,dispatch}) {
    const {correctOption,options,points}=question
    return (
        <div className="options">
                {options.map((op,i)=><button onClick={()=>dispatch({type:'newAnswer',payload:i})} 
                className={`btn btn-option ${i===answer?'answer':''}${answer!==null?i===correctOption?' correct':' wrong':''}`} 
                disabled={answer!==null} key={op}>{op}</button>)}
            </div>
    )
}

export default Options
