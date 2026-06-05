import { Header, Clock, BreakManager } from './components'

function App() {

  return (
    <>
      <Header title='Dynamic Timer'/>
      <Clock size={150}/>
      <BreakManager/>
    </>
  )
}

export default App
