import React, { Component } from 'react';
import NewsConnection from './NewsConnection/NewsConnection';

class NewsDropdown extends Component {
    constructor(){
        super();
        this.state = {
            news: [],
        }
    }
    getNews = async () => {
        const userOption = this.props.source;
        console.log(userOption);
        const news = await fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=602804e2347045afb6d91e9898eb9e5c', {
        });
        const newsParsedJSON = await news.json();
        return newsParsedJSON;
    }
    handleChange =  (e) => {
        this.setState({source: e.currentTarget.value});
        console.log(e.currentTarget.value); 
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.getNews().then((news)=>{
            this.setState({
                news: news.articles
            })
        })
    }
    render() {
        return (
          <div className="App">
            <h2>Pick Your News Source!</h2>
            <select onChange={this.handleChange}>
                <option value="null">Pick Your News</option>
                <option value="associated-press">Associated Press</option>
                <option value="bloomberg">Bloomberg</option>
                <option value="the-wall-street-journal">Wall Street Journal</option>
                <option value="the-economist">The Economist</option>
            </select>
            <input type='submit' onClick={this.handleSubmit}></input>
            {this.state.news.length > 0 ? <NewsConnection news={this.state.news}/> : <div></div>}
          </div>
        );
      }
}

export default NewsDropdown;