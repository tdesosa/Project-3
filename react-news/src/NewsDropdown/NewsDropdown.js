import React, { Component } from 'react';
import NewsContainer from '../NewsContainer/NewsContainer';

class NewsDropdown extends Component {
    constructor(){
        super();
        this.state = {
          source: '',
          newsToEdit: {
            title: '',
            description: '',
            url: '',
          }
        }
    }
    createNews = async (e) => {
        e.preventDefault();
        const newNews = await fetch("http://localhost:9000/news", {
            method: "POST",
            body: JSON.stringify(this.state.source),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const newNewsParsed = await newNews.json();
        if(newNewsParsed.status === 200){
            document.getElementById("new-news-form").reset();
            this.setState({
                source: [...this.state.source, newNewsParsed.data]
            })
        }
    }
    handleChange = async (e) => {
        console.log(this.state.source)
        await this.setState({
            source: {
                [e.currentTarget.name]: e.currentTarget.value
            }
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.source);
    }
    deleteNews = async (id) => {
        const deleteNewsResponse = await fetch('http://localhost:9000/api/v1/news/' + id, {
            method: 'DELETE'
        });
        const deleteNewsParsed = await deleteNewsResponse.json();
        this.setState({news: this.state.news.filter((news) => news._id !== id )})
        console.log(deleteNewsParsed, ' response from express server')
    }
    handleEdit = (e) => {
        this.setState({
            newsToEdit: {
              ...this.state.newsToEdit,
              [e.currentTarget.name]: e.currentTarget.value
            }
        });
    }
    closeAndEdit = async (e) => {
        e.preventDefault();
        try {
          const editResponse = await fetch('http://localhost:9000/api/v1/news/' + this.state.newsToEdit._id, {
            method: 'PUT',
            body: JSON.stringify({
              title: this.state.newsToEdit.title,
              description: this.state.newsToEdit.description,
              url: this.state.newsToEdit.url,
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const editResponseParsed = await editResponse.json();
          const newNewsArrayWithEdit = this.state.news.map((news) => {
            if(news._id === editResponseParsed.data._id){
              news = editResponseParsed.data
            }
            return news
          });
          this.setState({
            showEditModal: false,
            news: newNewsArrayWithEdit
          });
          console.log(editResponseParsed, ' parsed edit')
        } catch(err){
          console.log(err)
        }
        // If you feel up to make the modal (EditMovie Component) and show at the appropiate times
    }
    openAndEdit = (newsFromTheList) => {
        console.log(newsFromTheList, ' newsToEdit  ');
        this.setState({
          showEditModal: true,
          newsToEdit: {
            ...newsFromTheList
          }
        })
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