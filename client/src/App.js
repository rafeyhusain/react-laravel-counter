import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    get_counter()
  }, [])

  const get_counter = () => {
    fetch('http://127.0.0.1:8000/api/counter')
      .then(response => response.json())
      .then(json => {
        setCount(+json.value)
      })
  }

  return (
    <>
      <h1>{count}</h1>
      <button className='neutral' onClick={() => get_counter()}>Click Me!</button>
    </>
  );
}

export default App;
