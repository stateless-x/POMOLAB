import React, {useState} from 'react'
import Header from './Header'
import Route from './Route'
import Timer from './Timer'
import About from './About'

const App = () =>{

    return(
        <div>
           
            <Header />
            <Route path="/" >
                <div className="timerLayout">
                    <Timer/>                   
                 </div>
            </Route>
            <Route path="/about">
                <About />
            </Route>
        </div>
    )
}
export default App