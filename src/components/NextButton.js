function NextButton({dispatch,i,length}) {
    const finish=i+1===length;
    return (
        <button onClick={()=>{
            if(finish) dispatch({type:'end'})
            else dispatch({type:'next'})
            }} className="btn btn-ui">
            {finish?'Finish':'Next'}
        </button>
    )
}

export default NextButton
