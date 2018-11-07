import React, { Component } from 'react';

class AddNews extends Component {
    constructor(){
        super();
        this.state = {
            source: '',
        }
    }
    updateNews = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
    }
    render(){
        return (
            <form>
                <input type='text' name='source' value={this.state.source} onChange={this.updateNews}/>
                <button color="green" type='Submit'>Add News</button>
            </form>
        )
    }
}

export default AddNews;