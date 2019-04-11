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

  getUrl(param) {
    return config.baseUrl + param;  
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
                 handle-as="json"
                 content-type="application/json"
                 body=[[objUser]]                  
                 on-response="loginCredential"></iron-ajax>

        <iron-form id=loginForm>
        <form>
        <paper-input 
        auto-validate 
        label="User Name" 
        name="userName" 
        value={{userName}} 
        required></paper-input>
        
        <paper-input 
        type="password" 
        auto-validate 
        label="Password" 
        name="password" 
        value={{password}} 
        required></paper-input>
        <paper-button raised class="indigo" on-click="Login">Login</paper-button       
        </form>
        </iron-form>
      </div>
    `;
  }
  Login(){         
    if(this.$.loginForm.validate()){
      var ajaxLogin = this.$.ajaxLogin;
      //let objUser = {"userName":this.userName, "password": this.password};
      //console.log(objUser);
      ajaxLogin.url = config.baseUrl + "/trades/login";
      ajaxLogin.method = "POST" 
      ajaxLogin.body= {"userName":this.userName, "password": this.password};
      ajaxLogin.generateRequest();      
      }
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
}

window.customElements.define('my-login', MyLogin);
