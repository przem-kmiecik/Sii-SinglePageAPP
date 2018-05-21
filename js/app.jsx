import React from 'react';
import ReactDOM from 'react-dom';
import "./main.css";

class ContactForm extends React.Component{

    state = {
        name: 'Name',
        age: '',
        prefix: 'Mr',
        email : 'E-mail address',
        nameCheck: '',
        ageCheck: '',
        emailCheck: '',
        readyToSubmit: ''
    }

    handleSubmit = (e)=>{
       e.preventDefault()

       function status(response) {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      }

       function json(response) {
        return response.json()
      }

      
       var url = 'http://localhost:3000/applications'; //Configurable endpoint
       fetch(url, {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'name='+this.state.name+'&age='+this.state.age+'&prefix='+this.state.prefix+'&email='+this.state.email,
      })
      .then(json)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });

    this.setState({
            nameCheck: this.state.name.length <= 0 && 'Name field has to be filled.',
            ageCheck: this.state.age.length <= 0 && 'Age has to be more than 0',
            emailCheck: this.state.email.search('@') <= 0 && 'Email field has to be filled and consist @',
            readyToSubmit: this.state.name.length > 0 && this.state.age.length > 0 && this.state.email.search('@') > 0 ? `Success ${this.state.name} application has been sent` : '',
    })
    }

    handleChange = e =>{
        this.setState({
            name: e.target.value,
        })
    }

    handleChange2 = e =>{
        this.setState({
            age: e.target.value
        })
    }

    handleChange3 = e =>{
        this.setState({
            prefix: e.target.value
        })
    }

    handleChange4 = e =>{
        this.setState({
            email: e.target.value
        })
    }

    clearForm = () => {
        document.getElementById("sendForm").reset(); 
        this.setState({
          name: "",
          age: "",
          prefix: "Mr",
          email: "  "
        })
      }


      
    render(){

        const {name, age, prefix} = this.state;
        const isEnabled = this.state.name.length > 0 && this.state.age.length > 0 && this.state.prefix.value !== '';

        return(
            <div>
        
           <span className="tooltip">{this.state.readyToSubmit}</span>
            
                <form onSubmit = {this.handleSubmit} id="sendForm" className="send_JSON">
                <h2>Sii Application</h2>
                <img src="../img/logo.png"/>
                    <p>Your Name</p>
                    <span className="tooltip">{this.state.nameCheck}</span>
                    <input onChange = {this.handleChange} value ={this.state.name} className="get_name"/>
                    <p>Your Age</p>
                    <span className="tooltip">{this.state.ageCheck}</span>
                    <input onChange = {this.handleChange2} value ={this.state.age} type="number" min="10" max="100" className="get_age"/>
                    <p>Your Prefix</p>
                    <select onChange = {this.handleChange3} value = {this.state.prefix} className="get_prefix">
                    <option value = 'Mr'>Mr</option>
                    <option value = 'Ms'>Ms</option>
                    <option value = 'Mrs'>Mrs</option>
                    </select>
                    <p>Your Email</p>
                    <span className="tooltip">{this.state.emailCheck}</span>
                    <input onChange = {this.handleChange4} value ={this.state.email} type="email" className="get_email"/>
                    
                    <button type="reset" onClick = {this.clearForm} name="clear">Clear</button>
                    <button type="submit" name="send" disabled={!isEnabled}>Send</button>
                </form>
                
        
            </div>
        )
    }
}

class App extends React.Component {
    render(){
        return <ContactForm/>
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});