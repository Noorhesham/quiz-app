function Progress({i,length,points,maxpoints,answer}) {
    return (
        <header className="progress">
            <progress max={length} value={i+Number(answer!==null)}/>
            <p>Question <strong>{i+1}</strong> / {length}</p>
            <p><strong>{points}</strong>/ {maxpoints}</p>
        </header>
    )
}

export default Progress
