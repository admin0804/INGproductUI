import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/iron-ajax/iron-ajax.js';

class NewCourse extends PolymerElement {
static get properties(){
  return {
    item:{
      type: Array,
      value: []
    },
    courseName: {
      type : String,
      value: ''
    },
    courseTitle:{
      type: String
    },
    link: {
      type: String
    },
    topic:{
      type: String
    }
  }
}

AddNewCourse(){ 
  if(this.$newCourseForm.validate()){
  var newCourseAjax = this.$.newCourseAjax;
  newCourseAjax.url= "http://localhost:3000/course/rest/addNewCourse"; 
  newCourseAjax.method = "POST"; 
  var obj= {courseName: this.courseName,
    courseTitle: this.courseTitle,
     link: this.link, 
     topic: this.formTopics(this.topic.split(','))}
  newCourseAjax.body=(obj) ;  

  //this.$.newCourseAjax.generateRequest();
}
}

formTopics(topic){
  return topic.map((val)=>{
    return {
      "topicName": val
    }
  })
}

handleResponse(event){
var status=event.detail.status;
console.log(status);
this.$.newCourseForm.reset();
}
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <iron-ajax
      auto
      id= "newCourseAjax"           
      handle-as="json"
      on-response="handleResponse"
      debounce-duration="300"
      content-type="application/json">
      </iron-ajax>

      <div class="card">        
        <h1>New Course</h1>
        <iron-form>
        <form id="newCourseForm">
        <paper-input always-float-label label="Course Name" name="courseName" value={{courseName}}></paper-input>
        <paper-input always-float-label label="Course Title" name="courseTitle" value={{courseTitle}}></paper-input>
        <paper-input always-float-label label="Link" name="link" value={{link}}></paper-input>
        <paper-input always-float-label label="Topic" name="topic" value={{topic}}></paper-input>      

        <paper-button raised class="indigo" on-click="AddNewCourse">Add New Course</paper-button>
        </form>
        </iron-form>
        
      </div>
    `;
  }
}

window.customElements.define('new-course', NewCourse);
