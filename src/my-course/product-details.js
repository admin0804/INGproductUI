import {html , PolymerElement } from '@polymer/polymer/polymer-element.js';

class productDetails extends PolymerElement{
    
    static get properties() {
        return {
            data: Array,
            totalbalance:{
              type: Number,
              value :0
          }
        }
    }


    _handleResponse(event) {
      this.data = data;//event.detail.response;  
      
    }

    static get template(){
        return html `
        <app-route route="{{route}}" pattern="/:groupId/:subId" data="{{routeData}}"></app-route> 
        <style>
        </style>
        <div> product Details</div>
    <iron-ajax 
        auto 
        id="ajax"
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