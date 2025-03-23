import './App.css'
import { LoadingProvider } from './contexts/LoadingProvider'
import Router from './route/router'

function App() {
    return (
        <>
            <LoadingProvider>
                <Router />
            </LoadingProvider>
        </>
    )
}

export default App
