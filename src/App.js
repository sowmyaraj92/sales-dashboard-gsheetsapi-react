import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Maps from 'fusioncharts/fusioncharts.maps';
import World from 'fusionmaps/maps/es/fusioncharts.world';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import config from './config';
import './App.css';


ReactFC.fcRoot(FusionCharts, Charts, Maps, World, FusionTheme);

// function dataParser(data) {
//   // first tuple is header
//   const headers = data[0];
//   const idxMap = {};
//   const dataMap = {};
//   // initi empty array for each column
//   headers.forEach((header, idx) => {
//     idxMap[idx] = header;
//     dataMap[header] = [];
//   });
//   for (let i = 1; i < data.length; i += 1) {
//     const tuple = data[i];
//     tuple.forEach((val, i) => {
//       const header = idxMap[i];
//       dataMap[header].push(val);
//     });
//   }
//   /*
//     {
//       "Name": ['Top', 'jfjyf'],
//       "Month": ['octobr], 
//     }
//   */ 
//   return dataMap;
 
// }
class App extends React.Component{
 
  //Constructor
  constructor(){
  super();

    this.url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=SalesDataSomi&majorDimension=ROWS&key=${config.apiKey}`;

  // Initialise values 
    this.state = {
      items: [],
      mapData : null,
      mslineData :null,
      bubbleData: null,
      showMenu: false,
      targetRevenue: '-',
      leads :'-',

      opportunitySourced:'-',
      opportunitySourcedVal:'-',
      opportunityClosed:'-',
      opportunityClosedVal:'-',
     
      prevLeads:'-',
      month :'-',
      
      percentLeads:'-',
      pipelineConverted:'-',
      oppConverted:'-',
      targetAchieved:'-',
      dealsPipeline:'-',
      valuesPipeline:'-',
      oppPipelineConverted:'-',

      list1 : []


      }
  }
  getData = (arg) => {
    // google sheet data
    const arr = this.state.items;
    
    const arrLen = arr.length;
   
    let chartDataArr = [];
    let targetRevenueVal =0;
    let leadsVal = 0;
    let targetRevenueFlag =false;
    let oppSourced =0;
    let oppSourcedVal =0;
    let oppClosed= 0;
    let oppClosedVal =0;
    let pipelineDeals =0;
    let pipelineValue =0;
    let prevleadsVal=0;

    //Annual Data

    for (let i = 0; i < arrLen; i++) {
      let monthStr = (arr[i])['year']; 
          if (monthStr.includes(arg)) {
            leadsVal += parseInt(arr[i].leads_month);
           // targetRevenueVal+=parseInt(arr[i].revenueTarget);
            oppSourced += parseInt(arr[i].opp_Sourced_month);
            oppSourcedVal += parseInt(arr[i].value_OppSourced_month);

            oppClosed += parseInt(arr[i].opp_Closed_month);
            oppClosedVal += parseInt(arr[i].value_OppClosed_month);

            pipelineDeals +=parseInt(arr[i].deals_Pipeline_month);
            pipelineValue+=parseInt(arr[i].value_Pipeline_month);
    
            chartDataArr.push(arr[i]);

              if(targetRevenueFlag===false) {
                targetRevenueVal=parseInt(arr[i].revenueTarget); 
                targetRevenueFlag = true;
              }
              
          }
          else if(monthStr.includes((parseInt(arg)-1))) {
            prevleadsVal += parseInt(arr[i].leads_month); 
          }
    }

    //Quarterly Data
    for (let i = 0; i < arrLen; i++) {
      let quarterStr = (arr[i])['quarter']; 
          if (quarterStr.includes(arg)) {
            leadsVal += parseInt(arr[i].leads);
           // targetRevenueVal+=parseInt(arr[i].revenueTarget);
            oppSourced += parseInt(arr[i].opp_Sourced_month);
            oppSourcedVal += parseInt(arr[i].value_OppSourced_month);

            oppClosed += parseInt(arr[i].opp_Closed_month);
            oppClosedVal += parseInt(arr[i].value_OppClosed_month);

            pipelineDeals +=parseInt(arr[i].deals_Pipeline_month);
            pipelineValue+=parseInt(arr[i].value_Pipeline_month);
    
            chartDataArr.push(arr[i]);

              if(targetRevenueFlag===false) {
                  targetRevenueVal=parseInt(arr[i].revenueTarget);
                  targetRevenueFlag = true;
              }
          }
          else if(quarterStr.includes((parseInt(arg)-1))) {
            prevleadsVal += parseInt(arr[i].leads); 
          }
    }
      
    //Percent of pipeline converted
    const pipelineConvert = (oppClosedVal/oppSourcedVal)*100;
    const pipelinePercent = (pipelineConvert).toFixed(2);

  
    //Percent of leads converted to opportunities
    const oppConvert = (oppSourced/leadsVal)*100;
    const oppPercent =(oppConvert).toFixed(2);


    //Percent of targets achieved
    const target = (oppClosedVal/targetRevenueVal)*100;
    const targetPercent =(target).toFixed(2);

   //Percent of opportunities in pipeline
    const oppPipelineConvert = (pipelineValue/oppSourcedVal)*100;
    const  oppPipelinePercent =(oppPipelineConvert).toFixed(2);

    //Lead increase percentage
    const Leads = ((leadsVal-prevleadsVal)/prevleadsVal)*100;
    const centLeads = (Leads).toFixed(2);

    // Array length
    let chartDataArrLen = chartDataArr.length;
    
    //Bubble chart
    let bubbleChart_xAxis =[];
    let bubbleChart_yAxis =[];
    let bubbleChart_zAxis =[];

    for (let i=0; i<chartDataArrLen; i++) {

      bubbleChart_xAxis.push({label: chartDataArr[i].month}); 
      bubbleChart_yAxis.push({value: chartDataArr[i].value_OppClosed_month});
      bubbleChart_zAxis.push({value:chartDataArr[i].value_Pipeline_month});
    }

    const chartConfigs1 = {
      type: 'stackedcolumn2d',
       //containerBackgroundOpacity: "0",
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "showValues": "1",
          "caption": "Pipeline / Closing",
          "subcaption": "On a monthly basis",
          "xAxisName": "Months of a Quarter",
          "yAxisName": "Price in USD",
          "yNumberPrefix": "$",
          "plotFillAlpha": "70",
          // "plotFillHoverColor": "#6baa01",
          "showPlotBorder": "0",
          "showCanvasBorder": "0",
          "xAxisLabelMode": "AUTO",
          "showTrendlineLabels": "0",
          "valueFontSize": "10",
          "numDivlines": "2",
          "bgAlpha": "0",
         // "canvasBgAlpha": "0"
        },
        "categories": [
          {
            "category": bubbleChart_xAxis
          }
        ],
        "dataset": [
          { 
          "seriesname": "Pipeline",
          
            "data": bubbleChart_zAxis 
        },
            { 
              "seriesname": "Closed",
              "data": bubbleChart_yAxis
          }]
        }
      };

    this.setState({bubbleData: chartConfigs1});

    //World Map
    let mapChart_xAxis = []; 
    let mapChart_yAxis = []; 
    let mapChart_zAxis =[];

    for (let i=0; i<chartDataArrLen; i++) {

      mapChart_xAxis.push({label: chartDataArr[i].quarters_plot});
      mapChart_yAxis.push({value: chartDataArr[i].opp_Closed});
      mapChart_zAxis.push({label: chartDataArr[i].region});
    }

     //World Map
    const bubbleDataArr = [];   
    for (let k=0; k<mapChart_zAxis.length; k++) {
      bubbleDataArr.push({"label": mapChart_zAxis[k].label, "value": mapChart_yAxis[k].value});
    }
  console.log(bubbleDataArr);

  const chartConfigs2 = {
      type : "world",
      //containerBackgroundOpacity: "0",
       width : '100%',
       height : '150%',
       dataFormat : "JSON",
       dataSource :{
        "chart": {
          "caption": "Sales Statistics",
          //"yaxisname": "Growth",
          "numbersuffix": "%",
          "theme": "fusion",
          "palettecolors": "FB8C00",
          "bgAlpha": "0",
          //"canvasBgAlpha": "0"
        },
        "colorrange": {
          "minvalue": "0.5",
          "code": "#5D62B5",
          "gradient": "1",
          "color": [
          {
            "displayvalue": "100+ Opps Closed",
            "maxvalue": "120",
            "code": "#F3726F"
          },
          {
            "maxvalue": "99",
            "displayvalue": "80+ Opps Closed",
            "code": "#FFC555"
          },
          {
            "maxvalue": "79",
            "displayvalue": "70+ Opps Closed",
            "code": "#61B68E"
          }
        ]},
          "data": [
            { "id": "NA",
             "value": 685, 
             "showLabel": "1" },

            { "id": "SA",
             "value": 54, 
             "showLabel": "1" },

            { "id": "AS",
             "value": 192,
             "showLabel": "1" },

            { "id": "EU",
             "value": 60,
             "showLabel": "1" },

            { "id": "AF", 
            "value": 50,
             "showLabel": "1" },

            { "id": "AU",
             "value": 37,
              "showLabel": "1" }
        ]
      }

  };

  this.setState({mapData: chartConfigs2});

    //Multi-series chart

    let msChart_yAxis = [];
    let msChart_xAxis = []; 
    let msChart_zAxis =[];

    for (let i=0; i<chartDataArrLen; i++) {

      msChart_xAxis.push({label: chartDataArr[i].month});
      msChart_yAxis.push({value: chartDataArr[i].value_OppClosed_month});
      msChart_zAxis.push({value: chartDataArr[i].value_Pipeline_month});

    }

    const chartConfigs3 = {
      type: 'msline',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "caption": "Pipeline and Closed Trajectory",
          "subcaption": "(Plotting Pipeline vs Closed for a month)",
          "linethickness": "2",
        
          "xAxisName": "Month ",
          "yAxisName": "Deals won",
          "showvalues": "0",
          "labeldisplay": "ROTATE",
          "slantlabels": "1",
          "numberPrefix": "$",
          "divLineAlpha": "40",
          "anchoralpha": "0",
          "animation": "1",
          "legendborderalpha": "20",
          "drawCrossLine": "1",
          "crossLineColor": "#0d0d0d",
          "crossLineAlpha": "100",
          "tooltipGrayOutColor": "#80bfff",
          "theme": "fusion",
          "bgAlpha": "0",
        },   
        "categories": [
          {
            "category": msChart_xAxis,
              
          }
        ],
        "dataset": [
          {
            "seriesname": "Pipeline",
            "data": msChart_zAxis
          },
          {
            "seriesname": "Closed",
            "data": msChart_yAxis
          }],
          //data:dataArr,
          "trendlines": [
            {
                "line": [
                    {
                        "startvalue": "200",
                        "color": "#62B58F",
                        "valueOnRight": "1",
                        // "displayvalue": "Target Deal - $"
                    }]
            }]
      }   
    }

    this.setState({mslineData: chartConfigs3});

   
    //Pushing values to the KPI
    this.setState({targetRevenue: targetRevenueVal});
    this.setState({leads: leadsVal});

    this.setState({opportunitySourced: oppSourced});
    this.setState({opportunityClosed: oppClosed});

    this.setState({opportunitySourcedVal: oppSourcedVal});
    this.setState({opportunityClosedVal: oppClosedVal});

   this.setState({percentLeads:centLeads});
   this.setState({dealsPipeline:pipelineDeals});
   this.setState({valuesPipeline:pipelineValue});
   this.setState({oppPipelineConverted:oppPipelinePercent});  

   this.setState({pipelineConverted:pipelinePercent });
   this.setState({oppConverted:oppPercent });
   this.setState({targetAchieved:targetPercent});
   
  }

//Add a function for Year,Quarter and Month 

  updateDashboard = (event) => {

    if(event.target.id === 'btn-2018')
      this.getData('2018');
    else if(event.target.id === 'btn-2017') 
    this.getData('2017');
    else if(event.target.id === 'btn-2016') 
    this.getData('2016');
     }

     updateDashboardQuarter = (event) => {

      if(event.target.id === 'btn-q1') 
        this.getData('Quarter 1');
  
        else if(event.target.id === 'btn-q2')
        this.getData('Quarter 2');
  
        else if(event.target.id === 'btn-q3')
        this.getData('Quarter 3');    
        
        else if(event.target.id === 'btn-q4') 
        this.getData('Quarter 4');
  
        else if(event.target.id === 'btn-q5')
        this.getData('Quarter 5');
  
        else if(event.target.id === 'btn-q6')
        this.getData('Quarter 6');
  
        else if(event.target.id === 'btn-q7') 
        this.getData('Quarter 7');
  
        else if(event.target.id === 'btn-q8')
        this.getData('Quarter 8');
  
        else if(event.target.id === 'btn-q9')
        this.getData('Quarter 9');
  
        else if(event.target.id === 'btn-q10') 
        this.getData('Quarter 10');
    
        else if(event.target.id === 'btn-q11')
        this.getData('Quarter 11');
    
        else if(event.target.id === 'btn-q12')
        this.getData('Quarter 12');  
      }
       
  componentWillMount() {
    //console.log('componentWillMount');
    fetch(this.url).then(response => response.json()).then(data => {
      let batchRowValues = data.valueRanges[0].values;
 
      const rows = [];
      for (let i = 1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for (let j = 0; j < batchRowValues[i].length; j++) {
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        }
        rows.push(rowObject);
      }
      //event.target.id =btn-Oct
      this.setState({ items: rows }, () => this.getData('2018')); 
      
    });
    
  }
  render() {
    return (
      <div className="App">
      { /* Navigation Bar */}   
      <nav className ="navbar navbar-expand-sm text-sm-center text-md-left fixed-top">
            <a href="/" className="navbar-brand">Sales Dashboard</a>  
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">

                    <li className="nav-item dropdown">
                    <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Year
                      </div>

                      <div className="dropdown-menu" for="navbarDropdown" aria-labelledby="navbarDropdown">
                        <option id ="btn-2018" onClick ={this.updateDashboard}className="dropdown-item">2018</option>
                        <option id ="btn-2017" onClick ={this.updateDashboard} className="dropdown-item">2017</option>
                        <option id ="btn-2016"onClick ={this.updateDashboard} className="dropdown-item">2016</option>
                      </div>
                    </li> 


                     <li className="nav-item dropdown">
                     
                    <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select Quarter
                   </div>
                      <div className="dropdown-menu" for="navbarDropdown" aria-labelledby="navbarDropdown">
                      <option id ="btn-q1" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 1</option>
                        <option id ="btn-q2" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 2</option>
                        <option id ="btn-q3" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 3</option>
                        <option id ="btn-q4" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 4</option>
                        <option id ="btn-q5" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 5</option>
                        <option id ="btn-q6" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 6</option>
                        <option id ="btn-q7" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 7</option>
                        <option id ="btn-q8" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 8</option>
                        <option id ="btn-q9" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 9</option>
                        <option id ="btn-q10" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 10</option>
                        <option id ="btn-q11" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 11</option>
                        <option id ="btn-q12" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 12</option>
                     
                        </div>
                    </li>   
                  </ul>
                </div>  
        </nav> 
                     

        {/* 1st block */}
        <div className="container-fluid pl-md-5 pr-md-5">
            <div className="row">
              <div className="col-md-6 col-xl-4 order-xs-1 order-lg-1 order-xl-1">
                <div className="card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column">
                  
                         <div className=" mb-auto"> 
                            <p className="c-portlet-title">Revenue Target </p>
                            </div>

                          <div className="">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.targetRevenue}
                              </div>

                              <div className="c-portlet-changesInValue value__up">
                                <span className="">{this.state.targetAchieved}%</span>&nbsp;&nbsp;of target achieved
                              </div>  
                          </div> 
                   
                </div>
                <div className="card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column">
                <div className=" mb-auto"> 
                      <p className="c-portlet-title">Revenue</p></div>
                      <div className="">
                      <div className="c-portlet-value">
                      <span className="h1">$</span> {this.state.opportunityClosedVal}
                      </div>

                      <div className="c-portlet-changesInValue value__up">
                         <span className="">{this.state.pipelineConverted} %</span>&nbsp;&nbsp; of pipeline converted
                      </div>
                  </div>
                </div>
              </div>
                        {/*Bubble Chart*/ }
              <div className="col-md-6 col-xl-8 order-2 order-md-1 order-xl-1 ">
                <div className="card c-portlet c-portlet--height-fluid">
                <ReactFC {...this.state.bubbleData} containerBackgroundOpacity ="0"/>
                </div>
              </div>
                        {/*Map Chart*/ }
              <div className="col-md-6 col-xl-8 order-2 order-md-1 order-xl-1 ">
                  <div className="card c-portlet c-portlet--height-fluid">
                  <ReactFC {...this.state.mapData} containerBackgroundOpacity ="0"/>
                  </div>
              </div>
              <div className="col-md-6 col-xl-4 order-1 order-md-1 order-xl-1 ">
                  <div className="card c-portlet c-portlet--height-fluid d-flex align-items-start flex-column">
                      <div className="mb-auto">
                          <p className="c-portlet-title">Pipeline</p></div>
                        <div>
                          <div className="c-portlet-value">
                           <span className="h1">$</span> {this.state.opportunitySourcedVal}
                          </div>
                          <div className="c-portlet-changesInValue value__up">
                            <span className="">{this.state.oppPipelineConverted}%</span>&nbsp;&nbsp;of opportunities in pipeline
                          </div>
                          <div className="deals">
                          <div className="otherInfo d-flex row">
                             <div className="col"><span className="title">Deals :</span> <span className="value">{this.state.dealsPipeline}</span></div>
                            
                          </div>
                           
                          </div>
                      </div>
                  </div>
              </div>
                      {/*Multi-series chart*/}

              <div className="col-md-6 col-xl-8 order-2 order-md-1 order-xl-1 ">
                <div className="card c-portlet c-portlet--height-fluid">
                <ReactFC {...this.state.mslineData} containerBackgroundOpacity ="0" /> 
                </div>
              </div>
              <div className="col-md-6 col-xl-4 order-2 order-md-1 order-xl-1 ">
                <div className="card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column">
                  <div className="mb-auto">
                        <p className="c-portlet-title">Opportunities </p>
                        </div>
                        <div>
                        <div className="full-width">
                          <div className="otherInfo d-flex row">
                             <div className="col"><span className="title">Sourced :</span> <span className="value">{this.state.opportunitySourced} </span></div>
                            <div className="col">
                            <span className="title">Closed :</span> <span className="value">{this.state.opportunityClosed}</span>
                            </div>
                          </div>
                          <div className="c-portlet-changesInValue value__up"><span className="">{this.state.oppConverted}%</span>&nbsp;&nbsp;of leads converted to opportunities</div>
                        </div>
                    </div>
                </div>
                <div className="card c-portlet c-portlet--height-fluid-half c-portlet--height-fluid-half d-flex align-items-start flex-column">
                <div className="mb-auto">
                      <p className="c-portlet-title">Leads</p> </div>
                        <div>
                      <div className="c-portlet-value">
                      {this.state.leads}
                      </div>

                      <div className="c-portlet-changesInValue value__up">
                         <span className="">{this.state.percentLeads} %</span>&nbsp;&nbsp; of increase from last month
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        
      </div> /* App div ends here */   
  
    );
  }
}

export default App;
