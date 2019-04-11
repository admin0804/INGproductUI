import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-accordion/vaadin-accordion.js';
import '@polymer/iron-collapse/iron-collapse.js';

class RecommendedCourse extends PolymerElement {

  static get properties() {
    return {
        data: Array,
        emailId:{
          type: String
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
      url="http://localhost:3000/course/rest/recomendedCourses"
      handle-as="json"
      content-type="application/json"    
      method="POST"
      body="objtoSend"     
      on-response="_handleResponse"> </iron-ajax>

      <template is="dom-repeat" items={{data}}>    
      <vaadin-accordion>
          <vaadin-accordion-panel theme="filled" class="card">
              <div slot="summary"> courseName:[[item.courseName]] </div>                               
              
                <div> Course ID: [[item.courseId]]</div>  
                <div>Email ID: [[item.EMAILID]]</div>  
                <div>Status: [[item.STATUS]]</div>
                           
          </vaadin-accordion-panel>
          
      </vaadin-accordion>
  </template>
        
      </div>
    `;
  }
}

window.customElements.define('recommended-course', RecommendedCourse);
