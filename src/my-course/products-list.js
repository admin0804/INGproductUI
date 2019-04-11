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
    

    connectedCallback(){
        super.connectedCallback();
    let ajaxCall = this.$.userAjax;
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
          }
        }
    }


    _handleResponse(event) {
      this.data =   event.detail.response;
      var length = this.data.length;
      console.log()       
      console.log("datas=",this.data);
    }

    _getProducts(){
        var ajaxstcok = this.$.userAjax;  
        //ajaxstcok.url = config.baseUrl + "/trades/buyStocks";
        ajaxstcok.method = "POST"
        
    }

    static get template(){
        return html `
        <style>
        </style>
        <div> product list</div>

        <iron-ajax 
        id="userAjax"            
        on-response="_handleResponse" 
       
        > </iron-ajax>

        <template is ="dom-repeat" items={{data}} >
      <vaadin-accordion-panel theme="filled">
      <div slot="summary">[[item.productGroupName]] ({{item.product.length}})</div>
       <template is="dom-repeat" items=[[item.product]]>
       <!--<div><a href="#/details/[[data.productId]]/[[data.productGroupId]]"[[item.productName]]</div> -->
       <div><a href="#/productdetails/[[product.productGroupId]]/[[item.productId]]">{{item.productName}}</a></div>
        </template>
      </vaadin-accordion-panel>  
    </template>

  
        `
    }

}

window.customElements.define('products-list',ProductsList);