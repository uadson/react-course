import Form1 from './components/Form1'

import './App.css'

function App() {


  return (
    <>
      <div>
        <h1>Formulários</h1>
        <Form1 user={{ name: "Foo", email: "foo@gmail.com"}} />
      </div>
    </>
  )
}

export default App
