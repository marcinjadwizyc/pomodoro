import Timer from "./Timer/Timer";

const App: React.FC = () => {
  return (
    <div>
      <Timer session={5} shortBreak={2} longBreak={4} />
    </div>
  )
}

export default App;