import React from 'react'
const Header = () =>{
    return(
        <div>
            <div className="ui secondary pointing menu">
                <a href="/" className="item">Home</a>
                <a href="/about" className="item">About</a>
                <a href="https://github.com/xwanats" className="item">Other Projects</a>
                <h3 className="item right align">POMOLAB</h3>
            </div>
        </div>
    )
}
export default Header