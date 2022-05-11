import React from 'react';
import './App.css';
import './Responsive.css';

let timerPower = false;

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            session: 25,
            break: 5,
            timer: 1500,
            timerLabel: 'Session',
            switchButton: 'fa fa-play'
        }
        this.timerDisplay = this.timerDisplay.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.timerSetting = this.timerSetting.bind(this);
        this.resetButton = this.resetButton.bind(this);
    }

    timerSetting(e){
        let button = e.target.id;
        if(button === 'session-increment' && this.state.session < 60 && timerPower === false){
            this.setState({
                session: this.state.session + 1,
                timer: this.state.timerLabel === 'Session' ? (this.state.session * 60) + 60 : this.state.timer
            })
        }
        else if(button === 'session-decrement' && this.state.session > 1 && timerPower === false){
            this.setState({
                session: this.state.session - 1,
                timer: this.state.timerLabel === 'Session' ? (this.state.session * 60) - 60 : this.state.timer
            })
        }

        else if(button === 'break-increment' && this.state.break < 60 && timerPower === false){
            this.setState({
                break: this.state.break + 1,
                timer: this.state.timerLabel === 'Break' ? (this.state.break * 60) + 60 : this.state.timer
            })
        }
        else if(button === 'break-decrement' && this.state.break > 1 && timerPower === false){
            this.setState({
                break: this.state.break - 1,
                timer: this.state.timerLabel === 'Break' ? (this.state.break * 60) - 60 : this.state.timer
            })
        }
    }

    startTimer(){
        timerPower = !timerPower
        this.setState({
          switchButton: timerPower === false ? 'fa fa-play' : 'fa fa-pause'
        })
        let timerInterval = setInterval (() => {
            if(timerPower === true){
                this.setState({
                    timer: this.state.timer - 1
                })
                if(this.state.timer <= 0 && this.state.timerLabel === 'Session'){
                    this.setState({
                        timer: this.state.break * 60,
                        timerLabel: 'Break'
                    })
                }
                else if(this.state.timer <= 0 && this.state.timerLabel === 'Break'){
                    this.setState({
                        timer: this.state.session * 60,
                        timerLabel: 'Session'
                    })
                }
                if(this.state.timer <= 1){
                    this.audioBeep.play();
                }
            }
            else if(timerPower === false){
                clearInterval(timerInterval)
            }
        }, 1000)
    }

    timerDisplay(){
        let minute = Math.floor(this.state.timer / 60);
        let second = this.state.timer - minute * 60;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        return minute + ':' + second;
    }

    resetButton(){
        timerPower = false;
        this.setState({
            session: 25,
            break: 5,
            timer: 1500,
            timerLabel: 'Session',
            switchButton: 'fa fa-play'
        })
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
    }

    render(){
      let shadowColor;
      if(this.state.timerLabel === 'Session'){
        shadowColor = {
          boxShadow:'0 5px 30px 0 #15f4ee inset, 0 5px 30px 0 #15f4ee, 0 5px 30px 0 #15f4ee inset, 0 5px 30px 0 #15f4ee',
          textShadow:'0 0 5px #15f4ee, 0 0 5px #15f4ee'
        }
      } else if(this.state.timerLabel === 'Break'){
        shadowColor = {
          boxShadow:'0 5px 30px 0 red inset, 0 5px 30px 0 red, 0 5px 30px 0 red inset, 0 5px 30px 0 red',
          textShadow:'0 0 5px red, 0 0 5px red'
        }
      }
        return(
            <div className="container">
                <div className="timer-display" style={shadowColor}>
                    <p id="timer-label">{this.state.timerLabel}</p>
                    <p id="time-left">{this.timerDisplay()}</p>
                </div>
                <div className='wrapper'>
                    <div className="setting-wrapper">
                        <div className="time-setting-wrapper">
                            <div className="break">
                                <p id="break-label">Break Length</p> 
                                <div className="break-button-wrapper">
                                    <button id="break-decrement" onClick={this.timerSetting} className="fa fa-caret-down"></button>
                                    <p id="break-length">{this.state.break}</p>           
                                    <button id="break-increment" onClick={this.timerSetting} className="fa fa-caret-up"></button>
                                </div>
                            </div>
                            <div className="session">
                                <p id="session-label">Session Length</p>
                                <div className="session-button-wrapper">
                                    <button id="session-decrement" onClick={this.timerSetting} className="fa fa-caret-down"></button>
                                    <p id="session-length">{this.state.session}</p>            
                                    <button id="session-increment" onClick={this.timerSetting} className="fa fa-caret-up"></button>
                                </div>
                            </div>
                        </div>
                        <div className="button-power">
                            <button className={this.state.switchButton} id="start_stop" onClick={this.startTimer}></button>
                            <button className="fa fa-refresh" id="reset" onClick={this.resetButton}></button>
                        </div>
                    </div>
                </div>
                {console.log(this.state.timer)}
                <audio id="beep" preload="auto" ref={(audio) => {this.audioBeep = audio;}} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
            </div>
        )
    }
}

export default App;
