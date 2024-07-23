import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Button
        onClick={(e) => {
          if (e.detail === 1) console.log("Single Click");
          if (e.detail === 2) console.log("Double Click");
        }}
      >
        Click me
      </Button>
    </div>
  );
}

export default App;
