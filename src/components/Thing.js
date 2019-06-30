import React, { Component } from "react";
import {doGood} from '../core/factory.js';

class Thing extends Component {
  constructor() {
    super();

    this.state = {
        thing: {
            title: "",
            completed: false,
            color: ""
        },
        completedThings: [],
    };
  }

  componentWillMount() {
    doGood.subscribe((viewModal) => {
        this.setState({
            thing: {
                title: viewModal.todaysThing.title,
                completed: viewModal.todaysThing.completed,
            },
            completedThings: viewModal.completedThings,
        });
    });

    doGood.fetchTodaysThing(() => {
        console.log('fetched todays thing');
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
    const titleStyle = {
        'textDecoration': this.state.thing.completed ? 'line-through' : '',
    };
    
    return (
    <div className="App">
      <div style={titleStyle}>
          {this.state.thing.title}
      </div>
      <div>
          {this.state.thing.completed}
      </div>

      <div>
        <button type="button" onClick={this.onComplete}>I did it!</button>
      </div>
      <div>
        <button type="button" onClick={this.onSkip}>I can't do that thing today.</button>
      </div>

      <div>
          {this.renderCompleted()}
      </div>
    </div>
    );
  }

  renderCompleted() {
      const completedThings = this.state.completedThings.map(thing => {
        return <li key={thing.title}>{thing.title} - {thing.completedAt}</li>
      });

      return <ul>{completedThings}</ul>
  }
}

export default Thing;
