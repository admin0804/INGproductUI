import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-accordion/vaadin-accordion.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-progress/paper-progress.js';

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class CourseList extends PolymerElement {

  static get properties() {
    return {
        data: Array,
        emailId:{
          type: String
        }
    }
}



_handleResponse(event) {    
    this.data = event.detail.response;
    console.log(event.detail.response);         
    // let ajaxCall = this.$.ajaxCourses;
    // ajaxCall.method = 'GET';
}

finalResponse(event){
  var status = event.detail.status;
  console.log(event.detail.response);
  if(status==='success'){
    alert('course enrolled')
  }

  let ajaxCall = this.$.ajaxCourses;
      ajaxCall.method = 'GET';
      ajaxCall.url = "http://localhost:3000/course/rest/getAllCourse";
      ajaxCall.generateRequest();
}

enrollCourse(event){
  var item = event.model.item;  
  var userName= sessionStorage.getItem("username") 
  if(userName == null){
    window.alert('Please login before enroll the course!');
    this.set('route.path', '/mylogin');
    return;
  }
  else{
    let ajaxCall = this.$.ajaxCourses;
    ajaxCall.method = 'POST';
    var objtoSend={courseId: item.courseId, courseName:item.courseName, emailId: userName};
    ajaxCall.body=objtoSend;
    ajaxCall.url = "http://localhost:3000/course/rest/enroleUser";
    ajaxCall.onResponse = 'finalResponse';
    this.set('route.path', '/myenrollment');
  }

//ajaxCall.generateRequest();
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
      <iron-ajax 
      auto 
      id="ajaxCourses"
     
      handle-as="json"
      content-type="application/json"    
      method="GET"
      body="objtoSend" 
      loading="{{isloading}}"    
      on-response="_handleResponse"
      debounce-duration="2000"> </iron-ajax>

        <h1>Overzicht Producten</h1>
        <template is="dom-if" if="{{isloading}}">
         <paper-progress id="progressBar" indeterminate></paper-progress>
        </template>
        <template is="dom-repeat" items={{data}}>    
        <vaadin-accordion>
            <vaadin-accordion-panel theme="filled" class="card">
                <div slot="summary">[[item.courseName]] 
                <paper-button raised class="indigo" on-click="enrollCourse">Enroll</paper-button></div>                               
                <template is="dom-repeat"  items={{item.title}}>
                  <span>[[item.courseTitle]]</span>  
                  <span>[[item.link]]</span>  
                </template>               
            </vaadin-accordion-panel>
            
        </vaadin-accordion>
    </template>    
  
       
      </div>
    `;
  }
 
}

window.customElements.define('course-list', CourseList);
