import React, {Component} from "react";
import {ManageTasksFactory} from "../factory";
import {ManageTasks, TaskResponse} from "../use_cases/manage_tasks";

type TaskState = {
  task: {
    id: number | null,
    title: string,
    encouragement: string,
    completed: boolean,
    showEncouragement: boolean,
    backgroundColor: string,
  }
};

class Task extends Component<{}, TaskState> {
  private app: ManageTasks;

  constructor(props = {}) {
    super(props);
    this.app = ManageTasksFactory.getInstance();

    this.state = {
      task: {
        id: null,
        title: "",
        backgroundColor: "",
        encouragement: "",
        completed: false,
        showEncouragement: false,
      },
    };
  }

  componentDidMount() {
    this.getTodaysTask();
  }

  componentWillUnmount() {
  }

  getTodaysTask = () => {
    this.app.getTodaysTask()
      .then((response: TaskResponse) => {
        this.setResponseState(response);
      });
  }

  // TODO: add refresh button
  onRefresh = () => {
    this.getTodaysTask();
  }

  onComplete = () => {
    this.app.completeTodaysTask()
      .then(() => {
        this.getTodaysTask();
      });
  }

  onSkipButtonPressed = () => {
    const result = window.confirm("Are you sure you want a new thing?");

    if (result) {
      this.app.skipTodaysTask()
        .then(() => {
          this.getTodaysTask();
        });
    }
  }
  
  setResponseState(response: TaskResponse) {
    this.setState({
      task: {
        id: response.id,
        title: response.title,
        encouragement: response.encouragement,
        backgroundColor: response.color,
        completed: response.completed,
        showEncouragement: response.showEncouragement,
      }
    })
  }

  render() {
    const titleStyle = {
      'textDecoration': this.state.task.completed ? 'line-through' : '',
    };

    const mainStyle = {
      'backgroundColor': this.state.task.backgroundColor,
    };

    return (
      <div style={mainStyle} className="h-screen bg-blue-500 text-white flex justify-center items-center">
        <div className="min-h-screen flex flex-col justify-between py-20 w-64">
          <h1 style={titleStyle} className="text-3xl">
            {this.state.task.title}
          </h1>

          <div className="text-center">
            {this.renderActionButtons()}
          </div>
        </div>
      </div>
    );
  }

  renderActionButtons() {
    if (this.state.task.showEncouragement) {
      return <p>{this.state.task.encouragement}</p>
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
                onClick={this.onSkipButtonPressed}
                className="block w-full py-2 px-4 mt-3"
        >
          I can't do this today.
        </button>
      </div>
    );
  }
}

export default Task;
