import React, { Component } from 'react';
import Linkify from 'react-linkify';
import { Button } from 'semantic-ui-react'

class NewsContainer extends Component {
    render(){
        console.log(this.props);
        const zeNews = this.props.news.map((news, i) => {
            return (
                <li key={i}>
                    <br></br>
                    <strong>Title:</strong> {news.title} <br/>
                    <strong>Description:</strong> {news.description} <br/>
                    <strong>URL</strong> <Linkify properties={{target: '_blank', style: {color: 'blue', fontWeight: 'bold'}}}>{news.url}</Linkify> <br/>
                    <Button onClick={this.props.deleteNews.bind(this, i)}>Not Reading This Article? Click Here To Remove</Button>
                </li>
            )
        });
        return(
            <div>
                <strong>Current Headlines:</strong>
                <p>{zeNews}</p>
            </div>
        )
    }
}

export default NewsContainer;


