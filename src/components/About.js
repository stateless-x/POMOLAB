import React from 'react'
import './about.css'
const About = () =>{
    return(
        <div>
            <div className="ui vertical segment center aligned">
                <h2>About this project</h2>
                <p>POMOLAB is a simple and customable pomodoro timer which helps users accomplishing the so called Pomodoro Technique. 
                <br/>
                I developed this front-end web application as my free time side project using React-Hooks Library</p>
                <img className='imgAbout'
                 src='https://images.unsplash.com/photo-1499377193864-82682aefed04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1061&q=80'
                 />
            </div>

            <div className="ui vertical segment center aligned">
                <h2>How does is work?</h2>
                <img className='imgAbout'
                src="https://cdn-images-1.medium.com/max/1200/1*PCfris4pC2MGK5bV9TfkUQ.jpeg"
                />
                <p>Image from: <a href="https://inkley.us/">Inkley.us</a></p>
            </div>

            <div  className="ui raised segment center aligned">
                <h2>Learn more about Pomodoro technique: <a href="/">Click Here</a> (Thai Version)</h2>
            </div>

            <div className="ui vertical segment center aligned">
                <h3>Donation</h3>
                <h5>I decided not to put ads because it can be incredibly annoying to you guys.
                <br/>But If you guys feel generous today, feel free to donate me for some cups of coffee ;)</h5>
                
                <div className="donation">
                    <div className="ui segment">
                        <div className="ui small header">Paypal:</div>
                        <div> b.wanats@gmail.com</div>
                        <div className="ui small header">PromptPay:</div>
                        <div> 084-534-4560</div>
                        <div className="ui small header">Bitcoin:</div>
                        <div>TBA</div>
                </div>
            </div>

            </div>     
    </div>
    )
}
export default About