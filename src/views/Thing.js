import React, {Component} from "react";
import {doGood} from '../core/factory.js';
import {COLORS} from "../colors";

class Thing extends Component {
  constructor() {
    super();

    this.state = {
      backgroundColor: this.getRandomColor(),
      thing: {
        title: "",
        completed: false,
      },
    };
  }

  componentWillMount() {
    doGood.subscribe((viewModal) => {
      this.setState({
        thing: {
          title: viewModal.todaysThing.title,
          completed: viewModal.todaysThing.completed,
        },
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

  getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
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
        <div className="max-w-5xl min-h-screen flex flex-col justify-between py-20">
          <h1 style={titleStyle} className="text-3xl">
            {this.state.thing.title}
          </h1>

          <div className="text-center">
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
        </div>
      </div>
    );
  }
}

export default Thing;
