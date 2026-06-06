import { Header, Clock, Timer } from './components'

function App() {

  return (
    // <div className="min-h-screen bg-slate-900 flex flex-col items-center pb-12">
    <div className="min-h-screen flex flex-col items-center pb-12">
      <Header title='Dynamic Timer & Clock'/>
      
      {/* Upper Core Real-Time clocks */}
      <div className="mt-6 mb-4">
        <Clock size={200}/>
      </div>

      {/* Pass the stable centralized system down as a prop */}
      <Timer />
    </div>
  )
}

export default App;
