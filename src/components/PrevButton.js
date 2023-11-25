function PrevButton({dispatch,i,length}) {
    if(i===0) return
    else return (
        <button className="btn btn-ui" onClick={()=>dispatch({type:'prev'})}>
        previous
    </button>
    )
}

export default PrevButton
