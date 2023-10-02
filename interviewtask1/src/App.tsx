import { useState } from 'react'
import './App.css'
import { Layout } from 'components/Layout'
import ApplicationForm from './pages/ApplicationForm/Index'
import { DataValueProvider } from './context/AppContext'

function App() {

  return (
    <div className="App">
      <DataValueProvider>
        <ApplicationForm />
      </DataValueProvider>
    </div>
  );
}

export default App
