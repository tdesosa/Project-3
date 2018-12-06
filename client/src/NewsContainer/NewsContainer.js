import React, { Component } from 'react';
// import App from '../App'
import NewsConnection from './NewsConnection/NewsConnection';
// import NewsSearch from './NewsSearch/NewsSearch'
import EditUser from '../EditUser/EditUser'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
// import Select from 'react-select'
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
          showEditModal: false,
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
    cancelModal = () => {
      this.setState({
        showEditModal: false,
      })
    }
    render() {
        return (
          <div className="App">
            <Navbar color="secondary" light>
              <NavbarBrand><h2>YourNewsApp</h2></NavbarBrand>
              <Button color="secondary" onClick={this.props.handleLogout}>Logout</Button>
            </Navbar>
            <select onChange={this.handleAPIChange}>
              <option value="null">Pick Your News</option>
              <option value="associated-press">Associated Press</option>
              <option value="bbc-news">BBC News</option>
              <option value="bleacher-report">Bleacher report</option>
              <option value="bloomberg">Bloomberg</option>
              <option value="buzzfeed">Buzzfeed</option>
              <option value="cnn">CNN</option>
              <option value="espn">ESPN</option>
              <option value="fox-news">Fox News</option>
              <option value="hacker-news">Hacker News</option>
              <option value="mashable">Mashable</option>
              <option value="national-geographic">National Geographic</option>
              <option value="techcrunch">Techcrunch</option>
              <option value="the-economist">The Economist</option>
              <option value="the-new-york-times">The New York Times</option>
              <option value="the-wall-street-journal">The Wall Street Journal</option>
              <option value="wired">Wired</option>
            </select>
            <input id='newsSelctor' type='submit' onClick={this.handleAPISubmit}></input>
            {this.state.news.length > 0 ? <NewsConnection news={this.state.news} deleteNews={this.deleteNews}/> : <div></div>}
            <Button color="secondary" onClick={this.openAndEdit}>Edit Your Profile</Button>
            <EditUser isOpen={this.state.showEditModal} userToEdit={this.state.userToEdit} editUser={this.editUser} closeAndEdit={this.closeAndEdit} cancelModal={this.cancelModal}/>
            <br></br>
            <Button color="secondary" onClick={this.props.deleteUser} userToEdit={this.state.userToEdit}>Delete Your Profile</Button>
          </div>
        );
      }
}

export default NewsContainer;