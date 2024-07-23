import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Button onClick={() => console.log}>Click me</Button>
    </div>
  );
}

export default App;
