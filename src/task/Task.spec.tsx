import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import { flushPromises } from "../../tests/helpers"
import Task from './Task';

let container: any = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should render with no task', async () => {
  // act(() => {
  //   // Tasks.update(null);
  //   ReactDOM.render(<Task />, container);
  // });

  // await flushPromises()
  // expect(container.textContent).toContain("Animation");
});

it('should render a task', async () => {
  // act(() => {
  //   Tasks.update(null);
  //   ReactDOM.render(<Task />, container);
  // });

  // await flushPromises()
  // expect(container.textContent).toContain("Animation");
});

it('should complete a task', async () => {

});

it('should cancel skip a task', async () => {

});

it('should skip a task', async () => {

});
