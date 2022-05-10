import "./App.scss";
import { Notes } from "./components/notes/Notes";

function App() {
    return (
        <div className="app">
            <header>
                <h1>Notes App</h1>
            </header>
            <Notes />
        </div>
    );
}

export default App;
