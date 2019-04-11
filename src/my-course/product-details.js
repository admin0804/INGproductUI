import {html , PolymerElement } from '@polymer/polymer/polymer-element.js';

class productDetails extends PolymerElement{
  connectedCallback(){
    super.connectedCallback();
     var routeval = JSON.stringify(this.routeData.subId);
     console.log(routeval);

     let ajaxCall = this.$.ajaxdetails;
     ajaxCall.url = config.baseUrl + "/api/v1/overview"; 
     this.requestType = 'gettingGroup';    
     ajaxCall.generateRequest(); 
  }  

    static get properties() {
        return {
            data: Array,
            totalbalance:{
              type: Number,
              value :0
          },

          routeData :{
            
          }
        }
    }


    _handleResponse(event) {
      this.data =   event.detail.response;       
      console.log("datas=",this.data);
    }
    
    static get template(){
        return html `
        <a href="[[rootPath]]#/productslist">back</a>

        <div> {{routeData}} </div>
      <app-route
            route="{{route}}"
            pattern="/:productGroupId/:productId"
            data="{{routeData}}">
      </app-route>
        <style>
        </style>
        <div> product Details</div>
    <iron-ajax 
        auto 
        id="ajaxdetails"
        handle-as="json"
       on-response="_handleResponse"        
        on-response="_handleResponse"
    > </iron-ajax>
    <div>
      [[]]
    </div>
        `
    }

}

window.customElements.define('product-details',productDetails);