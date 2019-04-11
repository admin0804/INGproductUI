import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-accordion/vaadin-accordion.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-dialog';

import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';



class MyenRollment extends PolymerElement {

  static get properties() {
    return {
        data: Array,
        emailId:{
          type: String
        },
        COMMENTS:{
          type: String
        },
        STATUS :{
          String
        },
        EMAILID:{
          type: String
        },
        item:{
          type: Object
        }
    }
}

connectedCallback(){
  super.connectedCallback();
  var userName= sessionStorage.getItem("username");
  var objtoSend={emailId: userName};
  let ajaxCall = this.$.ajaxmyEnroll;
   ajaxCall.body=objtoSend;
   ajaxCall.generateRequest(); 
}

_handleResponse(event) {    
  this.data = event.detail.response;
  console.log(event.detail.response);         
  // let ajaxCall = this.$.ajaxCourses;
  // ajaxCall.method = 'GET';
}
_updatePopup(event){
  this.item = event.model.item; 
  
var data = {"EMAILID": this.item.EMAILID, "COMMENTS":this.item.COMMENTS, "STATUS": this.item.STATUS};
  
  console.log("opening dialog");
  this.$.courseUpdate.open();

}

UpdateCourse(){

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
        <h1>My Enrollment</h1>

        <iron-ajax 
      auto 
      id="ajaxmyEnroll"
      url="http://localhost:3000/course/rest/myEnrolledCourses"
      handle-as="json"
      content-type="application/json"    
      method="POST"
      body="objtoSend"     
      on-response="_handleResponse"> </iron-ajax>

      <template is="dom-repeat" items={{data}}>    
      <vaadin-accordion>
          <vaadin-accordion-panel theme="filled" class="card">
              <div slot="summary"> COURSE_NAME:[[item.COURSE_NAME]] 
              <paper-button raised class="indigo" on-click="_updatePopup">UPDATE</paper-button>
              </div>
                <div> Course ID: [[item.ID]]</div>  
                <div>Email ID: [[item.EMAILID]]</div>  
                <div>Status: [[item.STATUS]]</div>                           
          </vaadin-accordion-panel>          
      </vaadin-accordion>
  </template>

  
      </div>
<div>
  <paper-dialog id="courseUpdate" style="top:50px;width:38%">
  <h2>Update Status</h2>
  <paper-dialog-scrollable>
        <form id="updateForm">
        <paper-input always-float-label label="Comments" name="COMMENTS" value=[[item.COMMENTS]] ></paper-input>
        
      <paper-dropdown-menu label="Satus">
        <paper-listbox slot="dropdown-content" class="dropdown-content">
          <paper-item>[[item.STATUS]]</paper-item>
         
          </paper-listbox>
      </paper-dropdown-menu>

        <paper-input always-float-label label="EMAILID" name="EMAILID"  value=[[item.EMAILID]] ></paper-input>
        
        <paper-checkbox>{{item.TEACHOTHERS}}</paper-checkbox>
        <div class="buttons">
        <paper-button raised class="indigo" on-click="UpdateCourse">Update Course</paper-button>
        </div>
        </form>
  </paper-dialog-scrollable> 
</paper-dialog>
       </div> 
  
    `;
  }
}

window.customElements.define('my-enrollment', MyenRollment);
