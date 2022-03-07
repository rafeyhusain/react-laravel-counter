import { useState, useEffect } from 'react';

function App() {
  const [ count, setCount ] = useState(0)

  useEffect(() => {
    get_counter()
  }, [])

  const get_counter = () => {
    fetch('http://127.0.0.1:8000/api/counter')
    .then(response => response.json())
    .then(json => {
      setCount(+json.value)
      console.log(json)
    })
  }

  return (
    <>
      <button onClick={() => get_counter()}>{count}</button>
    </>
  );
}

export default App;
