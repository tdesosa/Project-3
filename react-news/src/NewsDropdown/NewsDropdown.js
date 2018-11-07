import React, { Component } from 'react';
import Select from 'react-select';
import NewsContainer from '../NewsContainer/NewsContainer';


class NewsDropdown extends Component {
    constructor(){
        super();
        this.state = {
          source: {
            value: null,
            label: ""
            }
        }
    }
    handleChange = async (selectedOption) => {
        await this.setState({source: selectedOption});
        console.log(this.state.source.value);
    }
    render() {
        const newsOptions = [
            { value: 'associated-press', label: 'Associated Press' },
            { value: 'bloomberg', label: 'Bloomberg' },
            { value: 'the-wall-street-journal', label: 'Wall Street Journal' },
            { value: 'the-economist', label: 'The Economist' }
        ]
        return (
          <div className="App">
            <h2>Pick Your News Source!</h2>
            <Select value={newsOptions.value} onChange={this.handleChange} defaultValue={null} isMulti name="news" options={newsOptions} className="basic-multi-select" classNamePrefix="select" />
            {this.state.source.value !== null ? <NewsContainer source={this.state.source.value}/> : <div></div>}
          </div>
        );
      }
}

export default NewsDropdown;