
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax';

import '@polymer/paper-button/paper-button.js';

import '@vaadin/vaadin-accordion/vaadin-accordion.js';

import * as d3 from 'd3';


import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column-group.js'
import '@vaadin/vaadin-grid/src/vaadin-grid-templatizer.js';
import '@vaadin/vaadin-grid/src/vaadin-grid-styles.js';
import '@vaadin/vaadin-accordion/vaadin-accordion.js';
import './shared-styles.js';

class Stockanlysis extends PolymerElement {
  constructor(){
    super();   
}

  connectedCallback(){
    super.connectedCallback();
    let ajaxCall = this.$.ajaxcall;
     ajaxCall.url = config.baseUrl + "/trades/stocks"; 
}

initGraph (grapValu) {
  this.data =grapValu;
  let data=  this.data;
  var svg = d3.select(this.shadowRoot.querySelector('svg')),
  margin = 200,
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin;
  var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);          
  var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
  yScale = d3.scaleLinear().range ([height, 0]);

var g = svg.append("g")
         .attr("transform", "translate(" + 100 + "," + 100 + ")"); 

         
xScale.domain(data.map(function(d) { return d.stringName; }));
yScale.domain([0, d3.max(data, function(d) { return d.units; })]);
g.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(xScale));

  g.append("g")
   .call(d3.axisLeft(yScale).tickFormat(function(d){
       return + d;
   }).ticks(10))

   g.selectAll(".bar")
   .data(data)
   .enter().append("rect")
   .attr("class", "arc")

   .attr("class", "bar")
   .attr("x", function(d) { return xScale(d.stringName); })
   .attr("y", function(d) { return yScale(d.units); })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d) { return height - yScale(d.units); })
   .attr("fill", function(d, i) {
      return color(i);
  })
  .attr("d");
}
  static get properties() {
    return {
        data: Array,  
        displayType:{
          type: String,
          value:"list"
        },
        stockdata:Array,     
    }
}

  _handleResponse(event) {

    if(this.displayType ==="chartVal"){
      this.data = event.detail.response;       
      console.log("datas=",this.data);
      this.initGraph(this.data);
    }
    else{
      this.stockdata = event.detail.response;       
      console.log("datas=",this.stockdata);
    }

   
  }

  getUrl(param) {
    return config.baseUrl + param;  
  }

  _generateAjaxCall(url,method,data){  
    let ajaxstcok = this.$.ajaxcall;
    ajaxstcok.url = url;  
    if(method == 'POST'){
      ajaxstcok.contentType='application/json';
      ajaxstcok.body= JSON.stringify(data);
    }
    ajaxstcok.method = method;
    ajaxstcok.generateRequest();
  }

  _dailyStocks(e){
    this.displayType ="chartVal";
    this._generateAjaxCall("http://52.66.210.137:8085/IngTrade/trades/dailyStockAnalytics",'GET',null); 
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .links line {
          stroke: #999;
          stroke-opacity: 0.6;
        }
        
        .highlight {
            fill: orange;
        }
        .nodes circle {
          stroke: #fff;
          stroke-width: 1.5px;
        }
      </style>

      <div class="card">
      
      <iron-ajax 
        auto 
        id="ajaxcall"
        handle-as="json"       
        url="http://52.66.210.137:8085/IngTrade/trades/stocks"
        on-response="_handleResponse"
    > </iron-ajax>    

    <div> Stocks </div>
    <vaadin-accordion >
    <template is ="dom-repeat" items={{stockdata}}>
      <vaadin-accordion-panel theme="filled">
      <div slot="summary">[[item.stockName]]</div>
       <template>
       <div>[[item.description]]</div>
        </template>
      </vaadin-accordion-panel>  
    </template>
    </vaadin-accordion>

      </div>

      <div class="card">

      <div>
    <paper-button name="dailyStocksId" autofocus id="dailyStocksId" raised on-click="_dailyStocks">Daily Stocks Analytics</paper-button>
    </div>
      <svg id="svg1" width='600' height='500'></svg>
      </div>


    `;
  }
}

window.customElements.define('stock-anlysis', Stockanlysis);
