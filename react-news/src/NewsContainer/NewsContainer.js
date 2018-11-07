import React, { Component } from 'react';

class NewsContainer extends Component {
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
    componentDidMount(){
        this.getNews().then((news) => {
          this.setState({news: news.articles})
          console.log(news);
        }).catch((err) => {
          console.log(err);
        })
    }
    render(){
        const zeNews = this.state.news.map((news, i) => {
            return (
                <li key={i}>
                    Title: {news.title} <br/>
                    Description: {news.description} <br/>
                    URL: {news.url} <br/>
                </li>
            )
        });
        return(
            <div>
                <h4>Current Headlines (Your Source):</h4>
                <p>{zeNews}</p>
            </div>
        )
    }
}

export default NewsContainer;

