
import React from 'react';
import ReactDOM from 'react-dom';
import "./main.css";
import $ from 'jquery'; 

class ContactForm extends React.Component{

    state = {
        name: 'First Name',
        age: '0',
        prefix: '-',
        email : 'Your E-mail address',
        nameCheck: '',
        ageCheck: '',
        emailCheck: '',
        readyToSubmit: ''
    }

    handleSubmit = (e)=>{
       e.preventDefault()
        

    $(function(){
        var $form = $('.sendJSON');
        var $name = $('.get_name');
        var $age = $('.get_age');
        var $prefix = $('.get_prefix');
        var $email = $('.get_email');
        var url = 'http://localhost:3000/db';


        function sendJSON(name, age, prefix, email){
            $.ajax({
                url: url,
                method: 'post',
                dataType: 'json',
                data : {
                    name : name,
                    age : age,
                    prefix : prefix,
                    email : email
                }
            }).done(function(res){
                loadMovies();
                console.log(res);
            }).fail(function(error){
                console.log(error);
            });
                
            }

        $sendJSON.on('submit', function(e){
            e.preventDefault();
        
            var name = $name.val();
            var age = $age.val();
            var prefix = $prefix.val();
            var email = $email.val();
        
            if(name !== '' && age > 0 && prefix !== '' && email !== ''){
            sendJSON(name,age,prefix,email)
            $name.val('');
            $age.val('');
            $prefix.val('');
            $email.val('');
            }
        
        });
    });


    this.setState({
            nameCheck: this.state.name.length <= 0 && 'Name field has to be filled.',
            ageCheck: this.state.age.value <= 0 && 'Age has to be more than 0',
            emailCheck: this.state.email.search('@') <= 0 && 'Email field has to be filled and consist @',
            readyToSubmit: this.state.name.length > 0 && this.state.email.search('@') > 0 ? `Thank you ${this.state.name} your entry has been submitted. za wiadomość. Wysłano do wydziału ${this.state.department}` : '',
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
        document.getElementById("form").reset(); 
        this.setState({
          name: "",
          age: 0,
          prefix: "Mr",
          email: "  "
        })
      }

    render(){
        return(
            <div>
            
           <p>{this.state.nameCheck}</p> 
           <p>{this.state.ageCheck}</p>
           <p>{this.state.emailCheck}</p>
           <p style = {{color: 'green'}}>{this.state.readyToSubmit}</p>
                <form onSubmit = {this.handleSubmit} class="sendJSON" id="form">
                <h2>Sii Application</h2>
                <img src="../img/logo.png"/>
                <p type="Name:"><input onChange = {this.handleChange} value ={this.state.name} class="get_name"/></p>
                    <p>Your Age</p>
                    <input onChange = {this.handleChange2} value ={this.state.age} type="number" min="0" max="100" class="get_age"/>
                    <p>Your Prefix</p>
                    <select onChange = {this.handleChange3} value = {this.state.prefix} class="get_prefix">
                    <option value = 'Mr'>Mr</option>
                    <option value = 'Ms'>Ms</option>
                    <option value = 'Mrs'>Mrs</option>
                    </select>
                    <p>Your Email</p>
                    <input onChange = {this.handleChange4} value ={this.state.email} type='email' class="get_email"/>
                    
                    <button type="submit">Send</button>
                    
                </form>
                <button onClick = {this.clearForm} >Clear</button>
            </div>
        )
    }
}


fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })
})

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