import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
 
import Task from './Task.jsx';
 
// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
 
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>External Contacts</h1>
          <p>Select the client contacts associated with this offer</p>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>

        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
          <input type="text" ref="textInput" placeholder="Type" />
          <input type="text" ref="textInput" placeholder="Name" />
          <input type="text" ref="textInput" placeholder="Title" />
          <input type="text" ref="textInput" placeholder="Phone" />
          <input type="text" ref="textInput" placeholder="Ext." />
          <input type="text" ref="textInput" placeholder="Fax" />
          <input type="text" ref="textInput" placeholder="Email" />
        </form>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);