import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-form/iron-form.js';

class MyLogin extends PolymerElement {
  static get properties(){
    return{
      userName : {
        type: String,
        
      },
      password:{
        type: String,
       
      }
    }
  }

  Login(){
    // if(this.$.loginForm.validate()){
       var ajaxLogin = this.$.ajaxLogin;
       //let objUser = {"userName":this.userName, "password": this.password};
       //console.log(objUser);
       ajaxLogin.method="post";
       ajaxLogin.body= {"userName":this.userName, "password": this.password};
       ajaxLogin.generateRequest();      
     //}
   }
 
   loginCredential(event){
     var status = event.detail.response.status;
     if(status==="success"){
       sessionStorage.setItem('username',this.userName);
       this.dispatchEvent(new CustomEvent('userdetails', 
       {bubbles: true, composed: true, detail: {checkUser: true}}));
       alert('Login successfully');
     }
     this.$.loginForm.reset();
     this.set('route.path', '/courselist');
   }
 
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;
      padding: 10px;
    }
  </style>
  <div class="card">        
    <h1>Login</h1>
    <iron-ajax id="ajaxLogin"
             url="http://localhost:3000/users/rest/login"
             method:"post"
             handle-as="json"
             content-type="application/json"
             body=[[objUser]]                  
             on-response="loginCredential"></iron-ajax>
    <iron-form id=loginForm>
    <form>
    <paper-input always-float-label label="User Name" name="userName" value={{userName}}></paper-input>
    <paper-input type="password" always-float-label label="Password" name="password" value={{password}}></paper-input>
    <paper-button raised class="indigo" on-click="Login">Login</paper-button       
    </form>
    </iron-form>
  </div>
    `;
  }
}

window.customElements.define('my-login', MyLogin);
