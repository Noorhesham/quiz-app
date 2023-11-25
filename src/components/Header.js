function Header({quizname,children}) {
  return (
  <>
      <header className='app-header'>
      <h1 className={`${quizname?'title':''}`}>{quizname?quizname.toUpperCase():'Programming Quiz'}</h1>
      <img src={quizname?`${quizname}.png`:`4412009.png`} className="logo" alt='React logo' />
      {children}
    </header>
  </>

  );
}

export default Header;
