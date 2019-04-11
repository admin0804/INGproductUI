import {html , PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';

import '@vaadin/vaadin-accordion/vaadin-accordion.js';


import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column-group.js'
import '@vaadin/vaadin-grid/src/vaadin-grid-templatizer.js';
import '@vaadin/vaadin-grid/src/vaadin-grid-styles.js';


class ProductsList extends PolymerElement{
    constructor(){
        super();
        this.data = [
                  {
                    "product-group":"Payments",
                    "product-id": 1
                 },
                 {
                  "product-group":"Mortgage",
                  "product-id": 2
               },
               {
                "product-group":"Savings",
                "product-id": 3
              }
                ]
              
               
          console.log("datas=",this.data);
    }

    connectedCallback(){
        super.connectedCallback();
    let ajaxCall = this.$.userAjax;
     ajaxCall.url = config.baseUrl + "//stocks"; 
    }
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
      this.data =  data;// event.detail.response;       
      console.log("datas=",this.data);
    }

    static get template(){
        return html `
        <style>
        </style>
        <div> product list</div>

        <iron-ajax 
        id="userAjax"            
        on-response="_handleResponse" 
        on-error="handleError"
        > </iron-ajax>

    <vaadin-accordion >
    <template is ="dom-repeat" items={{data}} >   
    
      <vaadin-accordion-panel theme="filled">
      <div slot="summary"> prodcut Name: [[item.product-group]] 
      <span>Number products --{{data.length}} </span> </div>
     
       <template is="dom-repeat" items={{data}}>
           
        </template>
      </vaadin-accordion-panel> 
    
    </template>
    </vaadin-accordion>
        `
    }

}

window.customElements.define('products-list',ProductsList);