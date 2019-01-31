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

    this.url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=SalesDataMonthLevel&majorDimension=ROWS&key=${config.apiKey}`;

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
      oppPipelineConverted:'-'


      }
  }
  getYear =(arg) => {

  }
  getDataQuarter =(arg) => {
    
  }

  getData = (arg) => {
    // google sheet data
    const arr = this.state.items;
    
    const arrLen = arr.length;
   
    let chartDataArr = [];
    let targetRevenueVal =0;
    let leadsVal = 0;
    
    let oppSourced =0;
    let oppSourcedVal =0;
    let oppClosed= 0;
    let oppClosedVal =0;
    let pipelineDeals =0;
    let pipelineValue =0;
    let prevleadsVal=0;

    for (let i = 0; i < arrLen; i++) {
      let monthStr = (arr[i])['month']; 
      if (monthStr.includes(arg)) {
        leadsVal += parseInt(arr[i].leads);
        //leadsMonth += parseInt(arr[i].leads_month);

        targetRevenueVal+=parseInt(arr[i].revenueTarget);
        oppSourced += parseInt(arr[i].opp_Sourced);
        oppSourcedVal += parseInt(arr[i].value_OppSourced);
        oppClosed += parseInt(arr[i].opp_Closed);
        oppClosedVal += parseInt(arr[i].value_OppClosed);
        pipelineDeals +=parseInt(arr[i].deals_Pipeline);
        pipelineValue+=parseInt(arr[i].value_Pipeline);

        chartDataArr.push(arr[i]);
        console.log('the data array,',chartDataArr);
        // if(targetRevenueFlag===false) {
        //   targetRevenueVal=parseInt(arr[i].revenueTarget);
        //   targetRevenueFlag = true;
        // }
      }
      else if(monthStr.includes((parseInt(arg)-1))) {
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

      bubbleChart_xAxis.push({label: chartDataArr[i].week}); 
      bubbleChart_yAxis.push({value: chartDataArr[i].value_OppSourced});
      bubbleChart_zAxis.push({value:chartDataArr[i].opp_Sourced});
    }

    const chartConfigs1 = {
      type: 'bubble',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "showValues": "1",
          "caption": "Pipeline / Closing",
          "subcaption": "On a monthly basis",
          "xAxisName": "Weeks of a Month",
          "yAxisName": "Price in USD",
          "yNumberPrefix": "$",
          "plotFillAlpha": "70",
          "plotFillHoverColor": "#6baa01",
          "showPlotBorder": "0",
          "showCanvasBorder": "0",
          "xAxisLabelMode": "AUTO",
          "showTrendlineLabels": "0",
          "valueFontSize": "10",
          
          "numDivlines": "2",
          "plotTooltext": "$name",
          "palettecolors": "#5801a9"
        },
        "categories": [
          {
            "verticallinealpha": "20",
            "category": [
              {
                "label": "0",
                "x": "0",
                "showverticalline": "1"
              },
              {
                "label": "1",
                "x": "1",
                "showverticalline": "1"
              },
              {
                "label": "2",
                "x": "2",
                "showverticalline": "1"
              },
              {
                "label": "3",
                "x": "3",
                "showverticalline": "1"
              },
              {
                "label": "4",
                "x":  "4",
                "showverticalline": "1"
              }
            ]
          }
        ],
        "dataset": [
          { "color": "#00aee4",
          "seriesname": "Pipeline",
            "data": [   
             
              {
                
                "x": "1",
                "y": oppSourced,
                "z": 10,
                "showverticalline": "1",
                "name": "Week 1"
              },
              {
                
                "x": "2",
                "y": pipelineDeals,
                "z":20,
                "showverticalline": "1",
                 "name": "Week 2"
              },
            ]},
            { "color": "#00aee7",
              "seriesname": "Closed",
              "data": [

              {
                
                "x": "3",
                "y": oppClosed,
                "z":30,
                "showverticalline": "1",
                "name": "Week 3"
              },
              {
                
                "x": "4",
                "y": leadsVal,
                "z":40,
                "showverticalline": "1",
                "name": "Week 4"
              }
            ],
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
      mapChart_yAxis.push({value: chartDataArr[i].value_OppClosedVal});
      mapChart_zAxis.push({label: chartDataArr[i].region});
    }

  const chartConfigs2 = {
      type : "world",
       width : '100%',
       height : '150%',
       dataFormat : "JSON",
       dataSource :{
        "chart": {
          "caption": "Sales Statistics",
          "yaxisname": "Growth",
          "numbersuffix": "%",
          "theme": "fusion",
          "palettecolors": "FB8C00"
        },
        "colorrange": {
          "minvalue": "0.5",
          "code": "#5D62B5",
          "gradient": "0",
          "color": [
          {
            "displayvalue": "Q1-Q4",
            "maxvalue": "Q4",
            "code": "#F3726F"
          },
          {
            "maxvalue": "Q8",
            "displayvalue": "Q5-Q8",
            "code": "#FFC532"
          },
          {
            "maxvalue": "Q12",
            "displayvalue": "Q9-Q12",
            "code": "#61B68E"
          }
        ]},
        "data": [
          { "id": "NA", 
            "value":"Q1,Q2", 
            "showLabel": "1" },

          { "id": "SA", 
            "value":"Q2,Q3,Q1",
            "showLabel": "1" },

          { "id": "AS", 
            "value": " Q2,Q3,Q4",
            "showLabel": "1" },

          { "id": "EU", 
            "value": "Q3,Q4,Q5",
            "showLabel": "1" },

          { "id": "AF", 
            "value": "Q5,Q6,Q7", 
            "showLabel": "1" },

          { "id": "AU", 
            "value": "Q8,Q9,Q10,Q11,Q12", 
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
      msChart_yAxis.push({value: chartDataArr[i].value_OppClosed});
      msChart_yAxis.push({value: chartDataArr[i].value_Pipeline});

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
          "theme": "fusion"
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
                        "displayvalue": "Target Deal - 20000$"
                    }]
            }]
      }   
    }

    this.setState({mslineData: chartConfigs3});

    // //Bubble Chart
    // const pipelineDataArr = [];   
    // for (let k=0; k<pipeline_xAxis.length; k++) {
    //   pipelineDataArr.push({"label": pipeline_xAxis[k].label, "value": pipeline_yAxis[k].value});
    // }

    //  // Map
    //  const geoDataArr = [];   
    //  for (let j=0; j<mapChart_xAxis.length; j++) {
    //    geoDataArr.push({"label": mapChart_xAxis[j].label, "value": mapChart_zAxis[j].value});
    //  }

    // //Multi-series line chart
    // const dataArr = [];  
    // for (let i=0; i<salesChart_xAxis.length; i++) {
    //   dataArr.push({"label": salesChart_xAxis[i].label, "value": salesChart_yAxis[i].value});
    // }
   
   
    
    //Pushing values to the chart
    
   
   
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
  updateDashboardYear = (event) => {

    if(event.target.id === 'btn-2018') 
        this.getYear('2018');
    else if(event.target.id === 'btn-2017') 
        this.getYear('2017');
    else if(event.target.id === 'btn-2016') 
        this.getYear('2016');
  }

  updateDashboardQuarter = (event) => {

    if(event.target.id === 'btn-Q1') 
      this.getDataQuarter('Quarter 1');

      else if(event.target.id === 'btn-Q2')
      this.getDataQuarter('Quarter 2');

      else if(event.target.id === 'btn-Q3')
      this.getDataQuarter('Quarter 3');

      else if(event.target.id === 'btn-Q4') 
      this.getDataQuarter('Quarter 4');

      if(event.target.id === 'btn-Q5') 
      this.getDataQuarter('Quarter 5');

      else if(event.target.id === 'btn-Q6')
      this.getDataQuarter('Quarter 6');

      else if(event.target.id === 'btn-Q7')
      this.getDataQuarter('Quarter 7');

      else if(event.target.id === 'btn-Q8') 
      this.getDataQuarter('Quarter 8');

      if(event.target.id === 'btn-Q9') 
      this.getDataQuarter('Quarter 9');

      else if(event.target.id === 'btn-Q10')
      this.getDataQuarter('Quarter 10');

      else if(event.target.id === 'btn-Q11')
      this.getDataQuarter('Quarter 11');

      else if(event.target.id === 'btn-Q12') 
      this.getDataQuarter('Quarter 12');

  }


    updateDashboard = (event) => {
  
    if(event.target.id === 'btn-Jan') 
      this.getData('January');

      else if(event.target.id === 'btn-Feb')
      this.getData('February');

      else if(event.target.id === 'btn-Mar')
      this.getData('March');

      else if(event.target.id === 'btn-Apr') 
      this.getData('April');

      else if(event.target.id === 'btn-May')
      this.getData('May');

      else if(event.target.id === 'btn-Jun')
      this.getData('June');

      else if(event.target.id === 'btn-Jul') 
      this.getData('July');

      else if(event.target.id === 'btn-Aug')
      this.getData('August');

      else if(event.target.id === 'btn-Sep')
      this.getData('September');

      else if(event.target.id === 'btn-Oct') 
      this.getData('October');
  
      else if(event.target.id === 'btn-Nov')
      this.getData('November');
  
      else if(event.target.id === 'btn-Dec')
      this.getData('December');     
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
                        <p id ="btn-2018" onClick ={this.updateDashboardYear}className="dropdown-item" >2018</p>
                        <p id ="btn-2017" onClick ={this.updateDashboardYear} className="dropdown-item" >2017</p>
                        <p id ="btn-2016"onClick ={this.updateDashboardYear} className="dropdown-item" >2016</p>
                      </div>
                    </li> 
                    </ul>
                    </div>
                  

               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                      <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Month
                      </div>
                      <div className="dropdown-menu" for="navbarDropdown" aria-labelledby="navbarDropdown">
                        <p id ="btn-Jan" className="dropdown-item" onClick ={this.updateDashboard}   >January</p>
                        <p id ="btn-Feb" className="dropdown-item" onClick ={this.updateDashboard}>February</p>
                        <p id ="btn-Mar" className="dropdown-item" onClick ={this.updateDashboard}>March</p>
                        <p id ="btn-Apr" className="dropdown-item" onClick ={this.updateDashboard}>April</p>
                        <p id ="btn-May" className="dropdown-item" onClick ={this.updateDashboard}>May</p>
                        <p id ="btn-Jun" className="dropdown-item" onClick ={this.updateDashboard}>June</p>
                        <p id ="btn-Jul" className="dropdown-item" onClick ={this.updateDashboard}>July</p>
                        <p id ="btn-Aug" className="dropdown-item" onClick ={this.updateDashboard}>August</p>
                        <p id ="btn-Sep" className="dropdown-item" onClick ={this.updateDashboard}>September</p>
                        <p id ="btn-Oct" className="dropdown-item" onClick ={this.updateDashboard}>October</p>
                        <p id ="btn-Nov" className="dropdown-item" onClick ={this.updateDashboard}>November</p>
                        <p id ="btn-Dec" className="dropdown-item" onClick ={this.updateDashboard}>December</p>
                      </div>
                    </li> 
                    <li className="nav-item dropdown">
                    <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select Quarter
                      </div>
                      <div className="dropdown-menu" for="navbarDropdown" aria-labelledby="navbarDropdown">
                      <p id ="btn-q1" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 1</p>
                        <p id ="btn-q2" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 2</p>
                        <p id ="btn-q3" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 3</p>
                        <p id ="btn-q4" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 4</p>
                        <p id ="btn-q5" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 5</p>
                        <p id ="btn-q6" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 6</p>
                        <p id ="btn-q7" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 7</p>
                        <p id ="btn-q8" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 8</p>
                        <p id ="btn-q9" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 9</p>
                        <p id ="btn-q10" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 10</p>
                        <p id ="btn-q11" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 11</p>
                        <p id ="btn-q12" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 12</p>
                        </div>
                    </li>    
                  </ul>
                </div>
        </nav> 

        {/* 1st block */}
        <div className="container-fluid pl-md-5 pr-md-5">
            <div className="row">
              <div className="col-md-6 col-xl-4 order-xs-1 order-lg-1 order-xl-1">
                <div className="card c-portlet c-portlet--height-fluid-half">
                    <div className="body">
                      <p className="c-portlet-title">Revenue Target </p>

                      <div className="c-portlet-value">
                        ${this.state.targetRevenue}
                      </div>

                      <div className="c-portlet-changesInValue value__up">
                         <span className="">{this.state.targetAchieved}%</span>&nbsp;&nbsp;of target achieved
                      </div> 
                    </div>
                </div>
                <div className="card c-portlet c-portlet--height-fluid-half">
                <div className="body">
                      <p className="c-portlet-title">Revenue</p>

                      <div className="c-portlet-value">
                      ${this.state.opportunityClosedVal}
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
                <ReactFC {...this.state.bubbleData} />
                </div>
              </div>
                        {/*Map Chart*/ }
              <div className="col-md-6 col-xl-8 order-2 order-md-1 order-xl-1 ">
                  <div className="card c-portlet c-portlet--height-fluid">
                  <ReactFC {...this.state.mapData}/>
                  </div>
              </div>
              <div className="col-md-6 col-xl-4 order-1 order-md-1 order-xl-1 ">
                  <div className="card c-portlet c-portlet--height-fluid">
                      <div className="body">
                          <p className="c-portlet-title">Pipeline</p>

                          <div className="c-portlet-value">
                          ${this.state.opportunitySourcedVal}
                          </div>
                            <p>Deals : {this.state.dealsPipeline}</p>

                          <div className="c-portlet-changesInValue value__up">
                            <span className="">{this.state.oppPipelineConverted}%</span>&nbsp;&nbsp;of opportunities in pipeline
                          </div>
                      </div>
                  </div>
              </div>
                      {/*Multi-series chart*/}

              <div className="col-md-6 col-xl-8 order-2 order-md-1 order-xl-1 ">
                <div className="card c-portlet c-portlet--height-fluid">
                <ReactFC {...this.state.mslineData} /> 
                </div>
              </div>
              <div className="col-md-6 col-xl-4 order-2 order-md-1 order-xl-1 ">
                <div className="card c-portlet c-portlet--height-fluid-half">
                  <div className="body">
                        <p className="c-portlet-title">Opportunities </p>
                        <p>Sourced : {this.state.opportunitySourced}</p>
                        <p>Closed : {this.state.opportunityClosed}</p>
                        <div className="c-portlet-changesInValue value__up">
                          <span className="">{this.state.oppConverted}%</span>&nbsp;&nbsp;of leads converted to opportunities
                        </div>
                    </div>
                </div>
                <div className="card c-portlet c-portlet--height-fluid-half">
                <div className="body">
                      <p className="c-portlet-title">Leads</p>

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
