import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import {Route, withRouter} from 'react-router-dom';

class NewsSearch extends Component {
    constructor() {
        super();
        this.state = {
            userNews: [],
        }
    }

    getNewsSources = async () => {
        // Fetch Call To Get All News Sources
        const newsSources = await fetch('https://newsapi.org/v2/sources?apiKey=602804e2347045afb6d91e9898eb9e5c');
        const newsSourcesParsedJSON = await newsSources.json();
        console.log(newsSourcesParsedJSON);
        return newsSourcesParsedJSON
    }

    componentDidMount = () => {
        this.getNewsSources().then((news)=>{
            this.setState({
                userNews: news.sources
            })
        })
    }

    render() {
        let userNews = this.state.userNews;
        console.log(userNews);
        let optionItems = userNews.map((userNews) =>
            <option key={userNews.id}>
                {userNews.name}
            </option>
        );
        console.log(optionItems)                                    
        return (
        <div className="App">
            <h2>See Your Specific News!</h2>
            <select>
                <option>{optionItems[0]}</option>
            </select>
        </div>
        );
    }

    // render(){
    //     return <ul>
    //       {friends.map(p => <li key={p.id}>{p.name}</li>)}
    //     </ul>;
    //   }

}

export default NewsSearch;