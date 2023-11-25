function ExitButton({dispatch}) {
    return (
        <button className="btn btn-ui still" onClick={()=>dispatch({type:'choosing'})}>
            Exit quiz
        </button>
    )
}

export default ExitButton
