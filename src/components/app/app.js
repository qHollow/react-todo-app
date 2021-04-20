import React from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import AddItem from '../add-item/add-item';


import './app.css';

export default class App extends React.Component {

  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, done: false, id: 1 },
      { label: 'Make Awesome App', important: false, done: false, id: 2 },
      { label: 'Have a lunch', important: false, done: false, id: 3 }
    ],
    term: '',
    filter: 'all'
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = todoData.slice();
      newData.splice(idx, 1);
      return {
        todoData: newData
      };
    });
  };

  addItem = (text) => {
    this.setState(({todoData}) => {
      const newData = todoData.slice();
      newData.push({label: text, important: false, done: false, id: todoData.length + 1});
      return{
        todoData: newData,
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = todoData.slice();
      newData[idx].important = !todoData[idx].important;
      return {
        todoData: newData,
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = todoData.slice();
      newData[idx].done = !todoData[idx].done;
      return {
        todoData: newData,
      }
    });
  };

  search = (items, term) => {
    if(term.length === 0) {
      return items;
    }

    return items.filter((el) => {
      return el.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  onSearchChange = (term) => {
    this.setState({term});
  };

  onFilterChange = (filter) => {
    this.setState({filter})
  }

  filterItems = (items, filter) => {
    switch(filter){
      case 'all': 
        return items;
      case 'active':
        return items.filter((el) => !el.done);
      case 'done':
        return items.filter((el) => el.done);
      default:
        return items;
    }
  };

  render() {

    const {todoData, term, filter} = this.state;

    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    
    const visibleItems = this.filterItems(this.search(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter filter={filter}
                            onFilterChange={this.onFilterChange}/>
        </div>
        <TodoList 
          todos={visibleItems} 
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          />
          <AddItem onAddItem={this.addItem}/> 
      </div>
    );
  }
}