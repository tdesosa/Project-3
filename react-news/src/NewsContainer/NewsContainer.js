import React, { Component } from 'react';
// import App from '../App'
import NewsConnection from './NewsConnection/NewsConnection';
import EditUser from '../EditUser/EditUser'
// import AddNews from './AddNews/AddNews'

class NewsContainer extends Component {
    constructor(){
        super();
        this.state = {  
          source: null,
          news: [],
          userToEdit: {
            username: '',
            password: '',
            _id: '',
          },
          showEditModal: false
        }
    }
    getNews = async () => {
        const userOption = this.state.source;
        const news = await fetch('https://newsapi.org/v2/top-headlines?sources=' + userOption + '&apiKey=602804e2347045afb6d91e9898eb9e5c', {
        });
        const newsParsedJSON = await news.json();
        return newsParsedJSON;
    }
    handleAPIChange = async (e) => {
        await this.setState({source: e.currentTarget.value});
    }
    handleAPISubmit = (e) => {
        e.preventDefault();
        this.getNews().then((news)=>{
            this.setState({
                news: news.articles
            })
        })
    }
    deleteNews = (articleIndex, event) => {
        this.setState((priorState) => (
          {news: priorState.news.filter((news, index) => index !== articleIndex)}
        ))
    }
    editUser = (e) => {
      console.log(this.state.userToEdit.username);
        this.setState({
          userToEdit: {
            ...this.state.userToEdit,
            [e.currentTarget.name]: e.currentTarget.value
          }
        });
    }
    closeAndEdit = async (e) => {
        e.preventDefault();
        console.log(this.props);
        try {
    
          const editResponse = await fetch('http://localhost:9000/api/v1/users/' + this.props.user._id, {
            method: 'PUT',
            body: JSON.stringify({
              username: this.state.userToEdit.username,
              password: this.state.userToEdit.password
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const editResponseParsed = await editResponse.json();

          const newUserWithEdit = (user) => {
    
            if(this.props.user._id === editResponseParsed.data._id){
              user = editResponseParsed.data
            }
    
            return user
          };

          this.setState({
            showEditModal: false,
            users: newUserWithEdit
          });
    
          console.log('click');

        } catch(err){
          console.log(err)
        }
    }
    openAndEdit = (userFromTheList) => {
        this.setState({
          showEditModal: true,
          userToEdit: {
            ...userFromTheList
          }
        })
    }
    render() {
        return (
          <div className="App">
            <h2>See Your News!</h2>
            <select onChange={this.handleAPIChange}>
                <option value="null">Pick Your News</option>
                <option value="associated-press">Associated Press</option>
                <option value="bloomberg">Bloomberg</option>
                <option value="the-wall-street-journal">Wall Street Journal</option>
                <option value="the-economist">The Economist</option>
                <option value="reddit-r-all">Reddit</option>
                <option value="mashable">Mashable</option>
                <option value="espn">ESPN</option>
            </select>
            <input type='submit' onClick={this.handleAPISubmit}></input>
            {this.state.news.length > 0 ? <NewsConnection news={this.state.news} deleteNews={this.deleteNews}/> : <div></div>}
            <br></br>
            <button onClick={this.openAndEdit} editUser={this.editUser} >Edit Your Profile</button>
            <EditUser open={this.state.showEditModal} userToEdit={this.state.userToEdit} editUser={this.editUser} closeAndEdit={this.closeAndEdit}/>
            <br></br>
            <button onClick={this.props.deleteUser} userToEdit={this.state.userToEdit}>Delete Your Profile</button>
            <br></br>
            <button onClick={this.props.handleLogout} editUser={this.editUser} >Logout</button>
          </div>
        );
      }
}

export default NewsContainer;