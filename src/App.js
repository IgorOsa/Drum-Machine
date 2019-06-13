import React from 'react';
import './App.scss';

const soundBank = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const activeStyle = {
  backgroundColor: 'greenyellow',
  marginTop: 10
}

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10
}

class DrumPad extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    padStyle: inactiveStyle
  }
  this.playSound = this.playSound.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);
  this.activatePad = this.activatePad.bind(this);
}
componentDidMount() {
  document.addEventListener('keydown', this.handleKeyPress);
}
componentWillUnmount() {
  document.removeEventListener('keydown', this.handleKeyPress);
}
handleKeyPress(e) {
  if (e.keyCode === this.props.keyCode) {
    this.playSound();
  }
}
activatePad() {
  this.state.padStyle.backgroundColor === activeStyle.backgroundColor ?
    this.setState({
      padStyle: inactiveStyle
    }) :
    this.setState({
      padStyle: activeStyle
  });
}
playSound(e) {
  const sound = document.getElementById(this.props.keyTrigger);
  sound.currentTime = 0;
  sound.play();
  this.activatePad();
  setTimeout(() => this.activatePad(), 100);
  this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
}
render() {
  return (
    <div id={this.props.clipId} 
      onClick={this.playSound} 
      className="drum-pad" 
      style={this.state.padStyle} >
        <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
        {this.props.keyTrigger}
    </div>
  )
}
}

class PadBank extends React.Component {
render() {
  let padBank;
  padBank = soundBank.map((drumObj, i, padBankArr) => {
    return (
      <DrumPad 
          clipId={padBankArr[i].id} 
          clip={padBankArr[i].url}
          keyTrigger={padBankArr[i].keyTrigger}
          keyCode={padBankArr[i].keyCode} 
          updateDisplay={this.props.updateDisplay} 
      />
    )
  })
  return (
    <div className="pad-bank" >
      {padBank}
    </div>
  )
}
}

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    display: String.fromCharCode(160),
  }
  this.displayClipName = this.displayClipName.bind(this);
  this.clearDisplay = this.clearDisplay.bind(this);
}
displayClipName(name) {
  this.setState({
      display: name
  });
}
clearDisplay() {
  this.setState({
    display: String.fromCharCode(160)
  });
}
render() {
  return (
    <div id="drum-machine" className="inner-container">
      <h2 className="heading">FCC Drum Machine</h2>
      <PadBank  	
        updateDisplay={this.displayClipName}
      />
      <div className="controls-container">
        <p id="display">
          {this.state.display}
        </p>
      </div>

    </div>
  )
}
}

export default App;