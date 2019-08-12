import React, {Component} from "react";
import {makeApplication} from '../core/factory';
import {COLORS} from "../colors";
import {ENCOURAGEMENTS} from "../encouragements";

const app = makeApplication();

class Thing extends Component {
  constructor() {
    super();

    this.state = {
      backgroundColor: this.getRandomColor(),
      thing: {
        id: null,
        title: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this._asyncRequest = app.getTodaysTask()
      .then(response => {
        this.setState({
          thing: {
            id: response.task.id,
            title: response.task.title,
            completed: response.task.completed,
          }
        })
      });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  onComplete = () => {
    app.completeTask()
      .then(response => {
        this.setState({
          thing: {
            id: response.task.id,
            title: response.task.title,
            completed: response.task.completed,
          }
        })
      });
  }

  onSkip() {
    // doGood.skipThing(() => {
    //   console.log('skipped');
    // });
  }

  getRandom(itemList) {
    return itemList[Math.floor(Math.random() * itemList.length)];
  }

  getRandomColor() {
    return this.getRandom(COLORS);
  }

  getRandomEncouragement() {
    return this.getRandom(ENCOURAGEMENTS);
  }

  renderActionButtons() {
    if (this.state.thing.completed) {
      return <p>{this.getRandomEncouragement()}</p>
    }

    return (
      <div>
        <button type="button"
                onClick={this.onComplete}
                className="block w-full bg-white text-gray-900 rounded-sm py-2 px-4"
        >
          I did it!
        </button>

        <button type="button"
                onClick={this.onSkip}
                className="block w-full py-2 px-4 mt-3"
        >
          I can't do that thing today.
        </button>
      </div>
    );
  }

  render() {
    const titleStyle = {
      'textDecoration': this.state.thing.completed ? 'line-through' : '',
    };

    const mainStyle = {
      'backgroundColor': this.state.backgroundColor,
    };

    return (
      <div style={mainStyle} className="h-screen bg-blue-500 text-white flex justify-center items-center">
        <div className="min-h-screen flex flex-col justify-between py-20 w-64">
          <h1 style={titleStyle} className="text-3xl">
            {this.state.thing.title}
          </h1>

          <div className="text-center">
            {this.renderActionButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default Thing;
