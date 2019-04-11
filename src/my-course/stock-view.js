
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import './shared-styles.js';

class Stockview extends PolymerElement {
  ready(){
    super.ready();
    let userAjax = this.$.userAjax;    
    //userAjax.url = ""
    userAjax.url = config.baseUrl + "/trades/users";    
    this.requestType = 'gettingUsers';    
   userAjax.generateRequest();  
  }

  static get properties() {
    return {
      data: Array  ,
      actionType: {
        type: String,
        value: 'list'
      },
      requestType:{
        type: String
      },
      priceValue:{
        type: Number
      },
      totalPrice:{
        type: Number
      },
      
      entityClient: {
        type: Array,      
    },
    categorySelected:{
      type: String
    },
    stockname:{
      type:String
    },
    personData:{
      type:Object,
      value:{}
    },
    stocksName: {
      type: Array,    
  },

  dataFlag:{
    type: String
  },
  brokageFee:{
    type: Number
  },
  userId:{
    type: String
  },
  totalId: {
      type: Number
  },
  displayType:{
    type: String,
    value: "beforeSubmit"
  },
  selectedUser:{
    type: String,
    value: 2,
  },
  selectedStock:{
    type: String,
  }

    }
  }

_handleResponse(event, requestType) { 
  switch(this.requestType){
    case 'gettingUsers':
      console.log("working");
      this.users = event.detail.response;
      event.detail.response.then(function(){
        let userAjax2 = this.$.userAjax;    
        //userAjax.url = ""
        userAjax2.url = config.baseUrl + "/trades/stocks";    
        this.requestType = 'gettingStocks';    
        userAjax2.generateRequest();
      });
      break;
    case 'gettingStocks':
      this.stocks = event.detail.response;
      break;
    case 'getSelectedStock':
      break;
  } 
  this.personData = event.detail.response;
 // alert('Data Saved Success');
  let stockPrice = event.detail.response['Global Quote']['05. price'];  
  if(this.$.quantityValue.value < 500){
    this.$.brokageFee = .1 * stockPrice;
  }
  else{
    this.$.brokageFee = .15 * stockPrice;    
  }
  let brokageFee = this.$.brokageFee; 
  console.log(brokageFee);
  let totalPrice = (parseInt(stockPrice) + this.$.brokageFee) * this.$.quantityValue.value;
  this.$.totalId.value = parseFloat(totalPrice).toFixed(3);
  this.$.priceValue.value = parseFloat(stockPrice).toFixed(3);
  //this.$.brokageFee.value= brokageFee;
  
  this.brokageFee = brokageFee;
}



_loadQuote(){     
  
  this._generateAjaxCall("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ this.stockname +"&apikey=MMGWFDI4RI56JCZA",'GET',null);       
}

getUrl(param) {
  return config.baseUrl + param;

}
_getStockName(){
  return this.stockname;
}
handleError(event){
  console.log("error occured");
}

_buyStock() {    
  var ajaxstcok = this.$.ajaxstcok;  
  ajaxstcok.url = config.baseUrl + "/trades/buyStocks";
  ajaxstcok.method = "POST"
  let obj = {"userId": this.userId, 
  "stockName": this.stocksData,
  "totalPrice": this.totalPrice,
  "priceValue": this.$.priceValue.value,
"brokerageFee": this.brokageFee};
//console.log(obj);
  ajaxstcok.body = obj;
  //this._generateAjaxCall( ajaxstcok.url , "POST",obj);
  this.$.ajaxstcok.generateRequest(); 
  this.$.stockForm.reset();
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
      id="userAjax"            
      on-response="_handleResponse" 
      on-error="handleError"
      > </iron-ajax>

      

      <div class="card">
      <form>
      
      <iron-form id="stockForm">
      {{selectedUser}}
      <paper-dropdown-menu label="User Name" vertical-offset="60">
      <paper-listbox slot="dropdown-content" class="dropdown-content" attr-for-selected="name" selected="{{selectedUser}}">
        <template is="dom-repeat" items="[[users]]">
          <paper-item name="{{item.userId}}" >{{item.userName}}</paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>

    <paper-dropdown-menu label="Stocks Name" vertical-offset="60">
  <paper-listbox slot="dropdown-content" class="dropdown-content" selected="1">
    <paper-item>allosaurus</paper-item>
    <paper-item>brontosaurus</paper-item>
    <paper-item>carcharodontosaurus</paper-item>
    <paper-item>diplodocus</paper-item>
  </paper-listbox>
  </paper-dropdown-menu>

   
   <div>



   
   </div>
   <paper-input id="quantityValue" type="number" label="Quantity"></paper-input>
   <paper-input type="number" label="Price" name="totalPrice" value="{{totalPrice}}" id="priceValue"></paper-input>
   <paper-input type="number" label="brokage fee" id="brokageFee" name="brokageFee" value={{brokageFee}} ></paper-input>
   <paper-input type="number" label="Total" id="totalId"></paper-input>
   
   <paper-button name="Submit" autofocus id="getQueto" raised on-click="_loadQuote">get Quote</paper-button>

   <paper-button name="Submit" autofocus id="buyId" raised on-click="_buyStock">Buy</paper-button>

   <paper-button name="Submit" autofocus id="cacelId" raised on-click="_cancelStocks">Cancel</paper-button>

   
<div>
   
</div>
</iron-form
</form>
</div>
    `;
  }
}

window.customElements.define('stock-view', Stockview);
