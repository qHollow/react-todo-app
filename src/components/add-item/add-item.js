import React from 'react';
import './add-item.css';

export default class AddItem extends React.Component{

  state = {
    label: ''
  }

  onFormChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    })
  };

  render() { 
    return (
      <form className="add-item d-flex"
        onSubmit={this.onSubmit}>
        <input type="text" 
          className="form-control"
          onChange={this.onFormChange}
          placeholder="What need to do?"
          value={this.state.label}
          />
        <button 
          className="btn btn-outline-secondary">
          Add
        </button>
      </form>
    );
  }
};