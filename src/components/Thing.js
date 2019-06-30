import React, { Component } from "react";
import {doGood} from '../core/factory.js';

class Thing extends Component {
  constructor() {
    super();

    this.state = {
        thing: {
            title: "Make a list of things you like about yourself.",
            completed: false,
            color: ""
        }
    };

  }

  componentWillMount() {
    doGood.getTodaysThing((thing) => {
        this.setState({
            thing: {
                title: thing.title,
            }
        })
    });
  }

  onComplete() {
    doGood.completeThing(() => {
        console.log('completed');
    });
  }

  onSkip() {
    doGood.skipThing(() => {
        console.log('skipped');
    });
  }

  render() {
    return (
    <div className="App">
      <div>
          {this.state.thing.title}
      </div>

      <div>
        <button type="button" onClick={this.onComplete}>I did it!</button>
      </div>
      <div>
        <button type="button" onClick={this.onSkip}>I can't do that thing today.</button>
      </div>
    </div>
    );
  }
}

export default Thing;
