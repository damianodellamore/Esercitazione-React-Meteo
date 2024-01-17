import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './NavigationBar';
import Meccanismo from './Meccanismo'; 
import Footer from './Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <NavigationBar/>
                <Meccanismo />
                <Footer/>
            </header>
        </div>
    );
}

export default App;