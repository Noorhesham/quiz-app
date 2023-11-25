function Startscreen({length,dispatch,onfetch}) {
    return (
        <div className="start">
            <h2> welcome to the quiz app !</h2>
            <h3>choose a topic to test your <br></br> <span>programming </span>mastery<span>🌍🤩📝</span> </h3>  
            <div className="quiz">
                <div className="card" onClick={()=>onfetch('html')}>
                    <img className='card-img' src="html.png"/>
                </div>
                <div className="card"  onClick={()=>onfetch('css')}>
                    <img className='card-img-2' src="css.png"/>
                </div>
                <div className="card" onClick={()=>onfetch('react')}>
                    <img className='card-img' src="react.png"/>
                </div>
            </div>
        </div>
    )
}

export default Startscreen
