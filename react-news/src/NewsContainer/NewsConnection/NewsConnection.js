import React, { Component } from 'react';
import Linkify from 'react-linkify';

class NewsContainer extends Component {
    render(){
        console.log(this.props);
        const zeNews = this.props.news.map((news, i) => {
            return (
                <li key={i}>
                    Title: {news.title} <br/>
                    Description: {news.description} <br/>
                    URL: <Linkify>{news.url}</Linkify> <br/>
                </li>
            )
        });
        return(
            <div>
                <h4>Current Headlines:</h4>
                <p>{zeNews}</p>
            </div>
        )
    }
}

export default NewsContainer;


