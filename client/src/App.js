import { useState, useEffect } from 'react';

function App() {
  const [ count, setCount ] = useState(0)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(response => console.log(response))
  }, [])

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}

export default App;
