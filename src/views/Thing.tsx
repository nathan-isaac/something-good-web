import React, {Component} from "react";
import {makeApplication, makeRandomizer} from '../core/factory';
import {COLORS} from "../colors";
import {ENCOURAGEMENTS} from "../encouragements";
import {Response} from "../core/DoGood/application";

const app = makeApplication();
const randomizer = makeRandomizer();

type ThingState = {
    backgroundColor: string,
    thing: {
        id: number|null,
        title: string,
        completed: boolean,
    }
}

class Thing extends Component<{}, ThingState> {
  constructor() {
    super({});

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
    app.getTodaysTask()
    .then(response => {
      this.setResponseState(response);
    });
  }

  componentWillUnmount() {
  }

  onComplete = () => {
    app.completeTask()
      .then(response => {
        this.setResponseState(response);
      });
  }

  onSkip = () => {
    app.skipTask()
      .then(response => {
        this.setResponseState(response);
      });
  }

  setResponseState(response: Response) {
    if (!response.task) {
      return;
    }

    this.setState({
      thing: {
        id: response.task.id,
        title: response.task.title,
        completed: response.task.completed,
      }
    })
  }

  getRandomColor(): string {
    return randomizer.getRandomItem(COLORS);
  }

  getRandomEncouragement(): string {
    return randomizer.getRandomItem(ENCOURAGEMENTS);
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
}

export default Thing;
