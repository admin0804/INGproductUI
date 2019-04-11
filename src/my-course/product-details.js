import {html , PolymerElement } from '@polymer/polymer/polymer-element.js';

class productDetails extends PolymerElement{
  connectedCallback(){
    super.connectedCallback();
     var routeval = JSON.stringify(this.routeData.productId);
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
    > </iron-ajax>
    
    <dom-repeat items={{data}}>
                <template>
                    <paper-card>
                        <div class="card-actions">
                            <div>Product Id: [[item.productId]] </div>
                            <div>prorduct groupId: [[item.productGroupId]]</div>
                            <dom-repeat items={{item.product}}> 
                            <div>Product Name: [[item.productName]]</div>
                            <div>Precentage: [[item.percentage]]</div>
                            <div>Intrest Rate: [[item.interestRate]]</div>
                            <div>Specail: [[item.special]]</div>
                            <div>deposit withdraw: [[item.depositAndWithdrawal]]</div>
                            <div>Minum Investment: [[item.minInvestment]]</div>
                            <div>Maxmum Investment: [[item.maxInvestment]]</div>
                            <div>Duration: [[item.duration]]</div>
                            </dom-repeat>
                        </div>
                    </paper-card>
                </template>
            </dom-repeat>
        `
    }

}

window.customElements.define('product-details',productDetails);