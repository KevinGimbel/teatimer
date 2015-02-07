/** @jsx React.DOM */
/*
 * Creating a new React Class
 *
 */

/*
 * TODO: 
 *  - Notifications
 *  - Real tea handling
 */

var Time = (function(window, document, undefined) {
    "use strict";

      function _toMinutes(seconds) {
        // taken from
        // http://stackoverflow.com/a/6312999/2777153
        var secs = Math.round(seconds);

        var minuteDivisor = secs % (60 * 60);
        var minutes = Math.floor(minuteDivisor / 60);

        var secondDivisor = minuteDivisor % 60;
        var seconds = Math.ceil(secondDivisor);
        if(seconds.toString().length <= 1) {
          seconds = +'0' + seconds;  
        } 
        var time = {
        m: minutes,
        s: seconds
        };
        return time.m + '.' + time.s;
      }

      return {
        toMinutes: _toMinutes,
      }
}(window, document));

var TeaTimer = React.createClass({
  getDefaultProps: function() {
    return {
        defaultTeas: [
          {
            name: 'Black Tea',
            time: 180,
            temp: 100  
          },
          {
            name: 'Green Tea',
            time: 120,
            temp: 80
          },
          {
            name: 'White Tea',
            time: 120,
            temp: 75
          }
        ],
        count: 0,
        timer: null
      }  
  },
  
  getInitialState: function() {
    return {
      time: 0,
      tea: 'Choose a tea.'  
    }  
  },
  
  startTimer: function() {
    var time = event.target.dataset.time;
    var self = this;
    var count = 0;
    console.log(time);
    
    self.setState({
      timerActive: true
    });

    this.props.timer = setInterval(function() { 
      if(count++ >= time) {
        clearInterval(self.props.timer);
        alert('Tea is ready!'); 
      } else {
        var timeLeft = time - count;
       self.setState({
          time: timeLeft
        });
      }
    }, 1000);
  },
  cancelTimer: function() {
    clearInterval(this.props.timer);
    this.setState({
      time: 0  
    });
  },
  setActiveTea: function() {
    var tea = event.target.dataset.name;
    var time = event.target.dataset.time;
    
    this.setState({
      time: time,
      tea: tea
    });
  },
  render: function() {
    
   //  var common = this.state.commonTimes.map(function(time, index) {
   //   return(
   //     <li data-time={time.name} key={index} onClick={this.handleCommon}>{time.name} Minutes &bull;</li>
   //   )
  //  }.bind(this)); 
    
    var quickSelect = this.props.defaultTeas.map(function(tea, index) {
      return (
        <li data-name={tea.name} data-time={tea.time} key={index} onClick={this.setActiveTea} className="tea-box">
         <span className="name">{tea.name}</span>
          <p className="temp">{tea.temp}°C</p>
          <p className="time">{Time.toMinutes(tea.time)}min</p>
          <span className="note">
            Brew with {tea.temp}°C water for {tea.time}s.
          </span>
       </li>
      )
    }.bind(this));

    var timeLeft;
    if(this.state.time > 0) {
      timeLeft = 'min left';  
    }

    var cancelButton;
    if(this.state.timerActive) {
      cancelButton = <a onClick={this.cancelTimer} className="btn-cancel">Cancel</a>;
    } else {
      cancelButton = ''; 
    }
   
   
   
   return (
      <section className="tea">
        <p className="title">{this.state.tea}</p>
        <h4 className="output">{Time.toMinutes(this.state.time)}{timeLeft}</h4>
        <ul className="list">
          {quickSelect}
        </ul>
        <a className="btn" data-time={this.state.time} data-name={this.state.tea} onClick={this.startTimer}>
          Start Timer
        </a>
       {cancelButton}     
      </section>
    )
  }  
});

 // Add the defined component to the document.
 React.renderComponent(<TeaTimer />, document.querySelector('#app'));
