import React, { Component } from 'react';
import NewsContainer from '../NewsContainer/NewsContainer';

class NewsDropdown extends Component {
    constructor(){
        super();
        this.state = {
          source: '',
        }
    }
    handleChange = async (e) => {
        await this.setState({source: e.currentTarget.value});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.source);
    }
    render() {
        return (
          <div className="App">
            <h2>Pick Your News Source!</h2>
            <select onChange={this.handleChange}>
                <option value="associated-press">Associated Press</option>
                <option value="bloomberg">Bloomberg</option>
                <option value="the-wall-street-journal">Wall Street Journal</option>
                <option value="the-economist">The Economist</option>
            </select>
            <input type='submit' onClick={this.handleSubmit}></input>
            {this.state.source !== null ? <NewsContainer source={this.state.source}/> : <NewsDropdown />}
          </div>
        );
      }
}

export default NewsDropdown;