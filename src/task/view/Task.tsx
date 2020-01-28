import React, {Component} from "react";
import {DoGoodApplication, Response} from "../application";
import {DoGoodApplicationFactory} from "../factory";

type TaskState = {
    backgroundColor: string,
    encouragement: string,
    thing: {
        id: number|null,
        title: string,
        completed: boolean,
    }
}

class Task extends Component<{}, TaskState> {
  private app: DoGoodApplication;

  constructor(props = {}) {
    super(props);
    this.app = DoGoodApplicationFactory.getInstance();

    this.state = {
      backgroundColor: "",
      encouragement: "",
      thing: {
        id: null,
        title: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.app.getTodaysTask()
      .then(response => {
        this.setResponseState(response);
      });
  }

  componentWillUnmount() {
  }

  // TODO: add refresh button
  onRefresh = () => {
    console.log('refresh today\'s task');
  }

  onComplete = () => {
    this.app.completeTask()
      .then(response => {
        this.setResponseState(response);
      });
  }

  onSkip = () => {
    this.app.skipTask()
      .then(response => {
        this.setResponseState(response);
      });
  }

  setResponseState(response: Response) {
    // TODO: check error states

    if (!response.task) {
      return;
    }

    this.setState({
      task: response.task
    })
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
    if (this.state.encouragement) {
      return <p>{this.state.encouragement}</p>
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
          I can't do this today.
        </button>
      </div>
    );
  }
}

export default Task;
