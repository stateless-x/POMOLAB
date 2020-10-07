import React, {useState} from 'react'
import Timer from './Timer'

const App = () =>{

    return(
        <div>
            <div className="ui container segment center aligned padded"> 
                <div>
                    <Timer/>
                </div>
            </div>
        </div>
    )
}
export default App