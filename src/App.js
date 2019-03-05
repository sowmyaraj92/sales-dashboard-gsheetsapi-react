
import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Maps from 'fusioncharts/fusioncharts.maps';

import World from 'fusionmaps/maps/es/fusioncharts.world';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import formatNum from './format-number';
import config from './config';

import './App.css';

ReactFC.fcRoot(FusionCharts, Charts, PowerCharts, Maps, World, FusionTheme); 


window.onload = function () {
  document.getElementById('btn-q5').style.display ="none";
  document.getElementById('btn-q6').style.display ="none";
  document.getElementById('btn-q7').style.display ="none";
  document.getElementById('btn-q8').style.display ="none";
  document.getElementById('btn-q9').style.display ="none";
  document.getElementById('btn-q10').style.display ="none";
  document.getElementById('btn-q11').style.display ="none";
  document.getElementById('btn-q12').style.display ="none";
} 
  

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=SalesDataSomi&majorDimension=ROWS&key=${config.apiKey}`;
const mapurl = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=MapPlot&majorDimension=ROWS&key=${config.apiKey}`;
const isMobile = window.innerWidth <= 992;

class App extends React.Component{
  //Constructor
  constructor(){ 
  super();
  // Initialise values 
  
    this.state = {
      items: [],
      mapItems: [],
      value : '2016',
      quarterValue :'All Quarters',    
      mapData : null,
      mslineData :null,
      stackData: null,
      stackDataMobile: null,
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
      }
  }
  
  getData = (arg,arg2) => {
    console.log('Arg1',arg);
    console.log('Arg2',arg2);
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

//KPI 1 - Target achieved
    const targetElem = document.getElementById('kpi-target');
    targetElem.classList.remove('has-up-val');
    targetElem.classList.remove('has-down-val');
    
//KPI 2 - Opportunity converted to pipeline
    const opportunityElem = document.getElementById('opportunity-pipeline');
    opportunityElem.classList.remove('has-up-val');
    opportunityElem.classList.remove('has-down-val');

  //KPI 3 - Leads converted to opportunities  
    const leadElem = document.getElementById('leads-converted');
    leadElem.classList.remove('has-up-val');
    leadElem.classList.remove('has-down-val');

//KPI 4 - Pipeline converted
    const pipelineElem = document.getElementById('pipeline-converted');
    pipelineElem.classList.remove('has-up-val');
    pipelineElem.classList.remove('has-down-val');

   
//KPI 5 - Leads differential
    const leadDifferenceElem = document.getElementById('lead-difference');
    leadDifferenceElem.classList.remove('has-up-val');
    leadDifferenceElem.classList.remove('has-down-val');
    //Annual Data
    for (let i = 0; i < arrLen; i++) {
      let monthStr = (arr[i])['year']; 
          if (monthStr.includes(arg2)) {
            leadsVal += parseInt(arr[i].leads_month);
            prevleadsVal +=parseInt(arr[i].prev_leads_year);
           
            oppSourced += parseInt(arr[i].opp_Sourced_month);
            oppSourcedVal += parseInt(arr[i].value_OppSourced_month);

            oppClosed += parseInt(arr[i].opp_Closed_month);
            oppClosedVal += parseInt(arr[i].value_OppClosed_month);

            pipelineDeals +=parseInt(arr[i].deals_Pipeline_month);
            pipelineValue+=parseInt(arr[i].value_Pipeline_month);
    
            chartDataArr.push(arr[i]);
              if(targetRevenueFlag===false) {
                  targetRevenueVal=parseInt(arr[i].revenueTarget_Annual); 
                targetRevenueFlag = true;
              }
              
          }
    }

    //Quarterly Data 
    if(arg !== "All") { 
    chartDataArr = [];
    leadsVal = 0;
    prevleadsVal = 0;
    oppSourced = 0;
    oppSourcedVal =0;
    oppClosed =0;
    oppClosedVal =0;
    pipelineDeals =0;
    pipelineValue =0;
    targetRevenueFlag =false;

    for (let i = 0; i < arrLen; i++) {
      let quarterStr = (arr[i])['quarter']; 
  // console.log('quarter value check',quarterStr)
          if (quarterStr.includes(arg)) {
            leadsVal += parseInt(arr[i].leads_month);
            prevleadsVal +=parseInt(arr[i].prev_leads_quarter); 

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
    }
  }
   
    //Percent of pipeline converted
    const pipelineConvert = (oppClosedVal/oppSourcedVal)*100;
    const pipelinePercent = (pipelineConvert).toFixed(2);

    if(pipelineConvert < 100 ) {
      pipelineElem.innerHTML = Math.abs(pipelineConvert) + '%';
      pipelineElem.classList.add('has-down-val');
    
    } 
    else if(pipelineConvert >= 100 ) {
      pipelineElem.innerHTML = Math.abs(pipelineConvert) + '%';
      pipelineElem.classList.add('has-up-val');
    }

    document.getElementById("pipeline-converted").innerHTML = (pipelineConvert.toFixed(2))+'%';
   

    //Percent of leads converted to opportunities
    const oppConvert = (oppSourced/leadsVal)*100;
    const oppPercent =(oppConvert).toFixed(2);

    if(oppConvert < 100 ) {
      leadElem.innerHTML = Math.abs(oppConvert)+'%';
      leadElem.classList.add('has-down-val');
    } 
    else if(oppConvert >= 100 ) {
      leadElem.innerHTML = Math.abs(oppConvert)+'%';
      leadElem.classList.add('has-up-val');
    }
    document.getElementById("leads-converted").innerHTML = (oppConvert.toFixed(2))+'%';

    //Percent of targets achieved
    const target = (oppClosedVal/targetRevenueVal)*100;
    const targetPercent =(target).toFixed(2);

    if(target < 100 ) {
      targetElem.innerHTML = Math.abs(target) + '%';
      targetElem.classList.add('has-down-val');
     // targetElem.add('./redarrow.svg');
    } 
    else if(target >= 100 ) {
    targetElem.innerHTML = Math.abs(target) +'%';
    targetElem.classList.add('has-up-val');
    //targetElem.add('./path.svg');
    }

    document.getElementById("kpi-target").innerHTML = (target.toFixed(2))+'%';

   //Percent of opportunities in pipeline
    const oppPipelineConvert = (pipelineValue/oppSourcedVal)*100;
    const  oppPipelinePercent =(oppPipelineConvert).toFixed(2);

    
    if(oppPipelineConvert < 100 ) {
      opportunityElem.innerHTML = Math.abs(oppPipelineConvert);
      opportunityElem.classList.add('has-down-val');
      
    } 
    else if(oppPipelineConvert >= 100 ) {
      opportunityElem.innerHTML = Math.abs(oppPipelineConvert);
      opportunityElem.classList.add('has-up-val');
    }

    document.getElementById("opportunity-pipeline").innerHTML = (oppPipelineConvert.toFixed(2))+'%';
    //Lead increase percentage
      let Leads1;
      let Leads;
      let centLeads;
      if((prevleadsVal === 0))
      Leads = 100;
    
      else 
      {
        Leads1 =(leadsVal-prevleadsVal);
        Leads= Math.abs((Leads1/prevleadsVal)*100);
      }       
    
    if(prevleadsVal>leadsVal ) {
      leadDifferenceElem.innerHTML = Math.abs(Leads);
      leadDifferenceElem.classList.add('has-down-val');
    } 
    else if(prevleadsVal<leadsVal ) {
      leadDifferenceElem.innerHTML = Math.abs(Leads);
      leadDifferenceElem.classList.add('has-up-val');
    }
    document.getElementById("lead-difference").innerHTML = (Leads.toFixed(2))+'%';
    // Array length
    let chartDataArrLen = chartDataArr.length;
    
    //stack chart
    let stackChart_xAxis =[];
    let stackChart_yAxis =[];
    let stackChart_zAxis =[];

    for (let i=0; i<chartDataArrLen; i++) {

      stackChart_xAxis.push({label: chartDataArr[i].month}); 
      stackChart_yAxis.push({value: chartDataArr[i].value_OppClosed_month});
      stackChart_zAxis.push({value:chartDataArr[i].value_Pipeline_month});
    }

    const chartConfigs1 = {
      type: 'stackedcolumn2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "showValues": "1",
          "caption": "Pipeline/Closing",
          "captionFontColor": "#D3DFF2",
          "captionAlignment":"left",
          "subcaption": "On a monthly basis",
          "xAxisName": "Months",
          "xAxisNameFontColor":"#81809C",
          "yAxisName": "Price in USD",
          "yNumberPrefix": "$",
          "plotFillAlpha": "70",
          "showPlotBorder": "0",
          "showCanvasBorder": "0",
          "xAxisLabelMode": "AUTO",
          "showTrendlineLabels": "0",
          "valueFontSize": "10",
          "numDivlines": "2",
          "bgAlpha": "0",
          "labelFontColor":"#81809C",
          "valueFontColor":"#D3DFF2",
          "toolTipBgColor":"#ffff",
        },
        "categories": [
          {
            "category": stackChart_xAxis
          }
        ],
        "dataset": [
          { 
          "seriesname": "Pipeline",
          
            "data": stackChart_zAxis 
        },
            { 
              "seriesname": "Closed",
              "data": stackChart_yAxis
          }]
        }
      };


      const chartConfigs1Mobile = {
        type: 'stackedbar2d',
        width: '100%',
        height: '100%',
        dataFormat: 'json',
        dataSource: {
          "chart": {
            "theme": "fusion",
            "showValues": "1",
            "caption": "Pipeline/Closing",
            "captionFontColor": "#D3DFF2",
            "captionAlignment":"left",
            "subcaption": "On a monthly basis",
            "xAxisName": "Months",
            "xAxisNameFontColor":"#81809C",
            "yAxisName": "Price in USD",
            "yNumberPrefix": "$",
            "plotFillAlpha": "70",
            "showPlotBorder": "0",
            "showCanvasBorder": "0",
            "xAxisLabelMode": "AUTO",
            "showTrendlineLabels": "0",
            "valueFontSize": "10",
            "numDivlines": "2",
            "bgAlpha": "0",
            "labelFontColor":"#81809C",
            "valueFontColor":"#D3DFF2",
            "toolTipBgColor":"#ffff",
          },
          "categories": [
            {
              "category": stackChart_xAxis
            }
          ],
          "dataset": [
            { 
            "seriesname": "Pipeline",
            
              "data": stackChart_zAxis 
          },
              { 
                "seriesname": "Closed",
                "data": stackChart_yAxis
            }]
          }
        };

    this.setState({stackData: chartConfigs1});   
    this.setState({stackDataMobile: chartConfigs1Mobile}); 

    // ********* map config start *************
      const mapRegions = ["NA", "SA","AS", "EU", "AF", "AU" ];
      const yearMapDataArr = this.state.mapItems.filter(function(elem) {
        return elem.Year === arg2;
      });

      // total sum of selected year
      let yearMapData = [];
      for(let i=0; i<mapRegions.length; i++) {
        let val = 0;
        for(let j=0; j<yearMapDataArr.length; j++) {
          if(mapRegions[i] === yearMapDataArr[j]['Region']) {
            val += parseInt(yearMapDataArr[j]['Value']);
          }
        }
        yearMapData.push({
          id: mapRegions[i],
          value: val
        });
      }
      let quarterMapData = [];
      for(let i=0; i<mapRegions.length; i++) {
        let val = 0;
        
        for(let j=0; j<yearMapDataArr.length; j++) {
          if(mapRegions[i] === yearMapDataArr[j]['Region'] && yearMapDataArr[j]['Quarter'] === arg ) {
            val += parseInt(yearMapDataArr[j]['Value']);
          }
        }
        quarterMapData.push({
          id: mapRegions[i],
          value: val
        });
      }
      
      let mapDataArr;
      if(arg === undefined || arg === "All") {
        mapDataArr = yearMapData
      } else {
        mapDataArr = quarterMapData
      }
    
      const chartConfigs2 = { 
      type : "world",
     width : '100%',
     height : '95%',
     dataFormat : "JSON",
     dataSource :{
      "chart": {
        "caption": "Sales Statistics",
        "captionFontColor": "#D3DFF2",
        "captionAlignment":"left",  
        "theme": "fusion",
        "entityfillhovercolor": "#E3F2FD",
        "labelFontColor":"#81809C",
        "bgAlpha": "0",
        "showLabels": "1",
        "color":"#00000"
      },

      "colorrange": {
        "minvalue": "10",
        "gradient": "0",
        "code": "#6957da",
        "color": [
          {
            "minvalue": "0",
            "maxvalue": "25",
            "code": "#f2f0fc",
            "label": "Low (0-25)",
          },
          {
            "minvalue": "26",
            "maxvalue": "50",
            "code": "#d9d5f5",
            "label": "Medium (26-100)",
          },
          {
            "minvalue": "51",
            "maxvalue": "75",
            "code": "#c0b9ef",
            "label": "High (51-75)",
        
          },
          {
            "minvalue": "76",
            "maxvalue": "100",
            "code": "#9b8fe6",
            "label": "Very High (76-100)"
          },
          {
            "minvalue": "101",
            "maxvalue": "300",
            "code": "#8374df",
            "label": "Highest (> 100)"
          }
      ]},
        "data": mapDataArr
  }};
  this.setState({mapData: chartConfigs2});

    // ********* map config end *************

    //Multi-series chart
    let msChart_yAxis = [];
    let msChart_xAxis = []; 
    let msChart_zAxis =[];

    function addLineBreak(arg) {
      return arg.split(' ').join('<br>');
    }
    
    for (let i=0; i<chartDataArrLen; i++) {

      msChart_xAxis.push({label: addLineBreak(chartDataArr[i].month)});
      msChart_yAxis.push({value: chartDataArr[i].value_OppClosed_month});
      msChart_zAxis.push({value: chartDataArr[i].value_Pipeline_month});

    }

    const chartConfigs3 = {
      type: 'msline',
      width: '100%',
      height: '150%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "caption": "Pipeline and Closed Trajectory",
          "captionFontColor": "#D3DFF2",
          "captionAlignment":"left",
          "subcaption": "(Plotting Pipeline vs Closed for a month)",
          "linethickness": "2",
          "xAxisName": "Month ",
          "yAxisName": "Deals won",
          "numberPrefix": "$",
          "divLineAlpha": "40",
          "animation": "1",
          "legendborderalpha": "20",
          "drawCrossLine": "1",
          "crossLineAlpha": "100",
          "tooltipGrayOutColor": "#80bfff",
          "bgAlpha": "0",
          "labelFontColor":"#81809C",
          "drawAnchors": "1",
          "anchorRadius": "3",
          "anchorSides": "2",
          "legendItemFontSize": "13"
        },   
        "categories": [
          {
            "category": msChart_xAxis,
              
          }
        ],
        "dataset": [
          {
            "seriesname": "Pipeline",
            "anchorBgColor": "#5D62B5",
            "data": msChart_zAxis
          },
          {
            "seriesname": "Closed",
            "anchorBgColor": "#29C3BE",
            "data": msChart_yAxis
          }],
      }   
    }

    this.setState({mslineData: chartConfigs3});
    
    //Pushing values to the KPI

    this.setState({targetRevenue: formatNum(targetRevenueVal)});
    this.setState({opportunitySourcedVal: formatNum(oppSourcedVal)});
    this.setState({opportunityClosedVal: formatNum(oppClosedVal)});
    this.setState({leads: leadsVal});

    this.setState({opportunitySourced: oppSourced});
    this.setState({opportunityClosed: oppClosed});

   this.setState({percentLeads:centLeads});
   this.setState({dealsPipeline:pipelineDeals});
   this.setState({valuesPipeline:pipelineValue});
   this.setState({oppPipelineConverted:oppPipelinePercent});  

   this.setState({pipelineConverted:pipelinePercent});
   this.setState({oppConverted:oppPercent });
   this.setState({targetAchieved:targetPercent});

   
  }

  updateDashboard = (event) => {
    this.setState({value :event.target.innerText})
    if(event.target.id === 'btn-2018'){
      this.setState({ quarterValue :'All Quarters'});
   
      this.getData('All', '2018');
      this.filterQuarters('2018');
    }
     
    else if(event.target.id === 'btn-2017') {
      this.setState({ quarterValue :'All Quarters'}); 
      this.getData('All', '2017');
      this.filterQuarters('2017');
    
    }
    else if(event.target.id === 'btn-2016') {
      this.setState({ quarterValue :'All Quarters'});
      this.getData('All', '2016');
      this.filterQuarters('2016');
      
    }  
     }

     filterQuarters =(value) =>{

       if(value ==='2016')
       {
        document.getElementById('btn-q1').style.display ="block";
        document.getElementById('btn-q2').style.display ="block";
        document.getElementById('btn-q3').style.display ="block";
        document.getElementById('btn-q4').style.display ="block";
        document.getElementById('btn-q5').style.display ="none";
        document.getElementById('btn-q6').style.display ="none";
        document.getElementById('btn-q7').style.display ="none";
        document.getElementById('btn-q8').style.display ="none";
        document.getElementById('btn-q9').style.display ="none";
        document.getElementById('btn-q10').style.display ="none";
        document.getElementById('btn-q11').style.display ="none";
        document.getElementById('btn-q12').style.display ="none";

       }
      else if(value ==='2017')
       {
        document.getElementById('btn-q1').style.display ="none";
        document.getElementById('btn-q2').style.display ="none";
        document.getElementById('btn-q3').style.display ="none";
        document.getElementById('btn-q4').style.display ="none";
        document.getElementById('btn-q5').style.display ="block";
        document.getElementById('btn-q6').style.display ="block";
        document.getElementById('btn-q7').style.display ="block";
        document.getElementById('btn-q8').style.display ="block";
        document.getElementById('btn-q9').style.display ="none";
        document.getElementById('btn-q10').style.display ="none";
        document.getElementById('btn-q11').style.display ="none";
        document.getElementById('btn-q12').style.display ="none";
       }
       else if(value ==='2018')
       {
        document.getElementById('btn-q1').style.display ="none";
        document.getElementById('btn-q2').style.display ="none";
        document.getElementById('btn-q3').style.display ="none";
        document.getElementById('btn-q4').style.display ="none";
        document.getElementById('btn-q5').style.display ="none";
        document.getElementById('btn-q6').style.display ="none";
        document.getElementById('btn-q7').style.display ="none";
        document.getElementById('btn-q8').style.display ="none";
        document.getElementById('btn-q9').style.display ="block";
        document.getElementById('btn-q10').style.display ="block";
        document.getElementById('btn-q11').style.display ="block";
        document.getElementById('btn-q12').style.display ="block";

       }  
     }
     
     updateDashboardQuarter = (event) => {
      this.setState({quarterValue:event.target.innerText})
        if(event.target.id === 'btn-q1')
          this.getData('Quarter1', '2016');
        
        else if(event.target.id === 'btn-q2')
          this.getData('Quarter2', '2016');
  
        else if(event.target.id === 'btn-q3')
          this.getData('Quarter3', '2016'); 
          
        else if(event.target.id === 'btn-q4') 
          this.getData('Quarter4', '2016');
    
        else if(event.target.id === 'btn-q5')
          this.getData('Quarter5', '2017');
        
        else if(event.target.id === 'btn-q6')
          this.getData('Quarter6', '2017');
        
        else if(event.target.id === 'btn-q7')
          this.getData('Quarter7', '2017');
        
        else if(event.target.id === 'btn-q8')
          this.getData('Quarter8', '2017');
         
        else if(event.target.id === 'btn-q9')
          this.getData('Quarter9', '2018');
        
        else if(event.target.id === 'btn-q10')
          this.getData('QuarterTen', '2018');
        
        else if(event.target.id === 'btn-q11')
          this.getData('QuarterEleven', '2018');
         
        else if(event.target.id === 'btn-q12')
          this.getData('QuarterTwelve', '2018');  
        
      }
       
  componentDidMount() {
   
    fetch(url).then(response => response.json()).then(data => {
      let batchRowValues = data.valueRanges[0].values;
      const rows = [];
      for (let i = 1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for (let j = 0; j < batchRowValues[i].length; j++) {
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        }
        rows.push(rowObject);
      }
      this.setState({ items: rows}, () => this.getData("All", '2016')); 
    }); 

    fetch(mapurl).then(response => response.json()).then(data => {
      let batchRowValues = data.valueRanges[0].values;
      const rows = [];
      for(let i=1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for(let j=0; j < batchRowValues[i].length; j++) {
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        }
        rows.push(rowObject);
      }
      this.setState({ mapItems: rows}); 
    });
  }

  render() {
    if(isMobile) {
return(
  <div className="App">
  { /* Navigation Bar */}   
  <nav className ="navbar navbar-expand-sm text-sm-center text-md-left fixed-top">
        <div className="navbar-brand">
        
        <span className="logo">S</span>
        Sales Dashboard Mobile</div>  
            <ul className="navbar-nav flex-row ml-sm-auto">
              <li className="nav-item">
                <div className="profile">
                  <img alt="" className="mr-3 rounded-circle border" width="42"
                  src="./Image-Tim.png" />
                  <span className="name d-none d-sm-inline-flex">Hey, Tim </span>  
                </div>
              </li>
            </ul>
    </nav> 
            
    {/* 1st block */}
    <div className="container">
        <div className="row mb-5">
          <div className="col-2">
             <div className="content-title">Overview</div>
          </div>

          <div className="col text-right time-selector">
              <ul className="list-inline">
                <li className="list-inline-item">

                  <div className="dropdown active-item">
                    <button className="btn btn-secondary dropdown-toggle" 
                    type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.value}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <div className="dropdown-item" value ="2018" id="btn-2018" onClick ={this.updateDashboard} >2018</div>
                      <div className="dropdown-item" value ="2017" id="btn-2017" onClick ={this.updateDashboard} >2017</div>
                      <div className="dropdown-item" value ="2016" id="btn-2016"onClick ={this.updateDashboard} >2016</div>
                    </div>
                  </div>
                </li>

        
              <li className="list-inline-item">
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" 
                type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               {this.state.quarterValue}
                </button>
              <div className="dropdown-menu" for="navbarDropdown" aria-labelledby="navbarDropdown">
              <div className="dropdown-item" disabled>--Select Quarter--</div>
                <div id ="btn-q1" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 1</div>
                  <div id ="btn-q2" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 2</div>
                  <div id ="btn-q3" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 3</div>
                  <div id ="btn-q4" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 4</div>
                  <div id ="btn-q5" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 1</div>
                  <div id ="btn-q6" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 2</div>
                  <div id ="btn-q7" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 3</div>
                  <div id ="btn-q8" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 4</div>
                  <div id ="btn-q9" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 1</div>
                  <div id ="btn-q10" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 2</div>
                  <div id ="btn-q11" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 3</div>
                  <div id ="btn-q12" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 4</div>
                
              </div>
            </div>
          </li>
        </ul>
      </div>
      </div>
        
        
          <div className="row">
            <div className="col-md-6 col-xl-4 order-xs-1 order-lg-1 order-xl-1">
              <div className="card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column">
                <div className="d-flex"> 
                  <span className="oval d-flex justify-content-center ">
                  <img src={'./revenuetarget.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="20"/>
                  </span>
                    <p className="c-portlet-title">Revenue Target</p>  
                </div>
                  <div className="d-flex align-items-center mb-7 kpi-block">
                    <span className="rectangle d-flex justify-content-center ">
                    </span>
                      <div id ="kpi-target" data-up="+" data-down="-"></div>
                        <span className ="h5 mb-0">&nbsp; of target achieved</span>
                  </div>  

                      <div className="kpi-block">
                          <div className="c-portlet-value">
                          <span className="h1">$</span> {this.state.targetRevenue}
                      </div>
                      <span className="h5 poa">target this quarter</span>    
                      </div> 
              </div>


            <div className="card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column">
             <div className="d-flex"> 
                     <span className="oval d-flex justify-content-center ">
                      <img src={'./revenue.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                     </span>
                      <p className="c-portlet-title">Revenue </p>  
              </div>
            
                    <div className="d-flex align-items-center mb-7 kpi-block">
                    <span className="rectangle d-flex justify-content-center ">
                      </span>
                    <div id ="pipeline-converted" data-up="+" data-down="-"></div>
                    <span className ="h5 mb-0">&nbsp; of pipeline converted</span>
                    </div>  

                      <div className="kpi-block">
                          <div className="c-portlet-value">
                          <span className="h1">$</span> {this.state.opportunityClosedVal}
                      </div>
                      <span className="h5 poa">so far</span>    
                      </div> 
                  </div>
              </div>
                    {/*stack Chart*/ }
          <div className="col-md-6 col-xl-8 order-2 order-md-1 order-xl-1 ">
            <div className="card c-portlet c-portlet--height-fluid full-height pipelineClosing-card">
            <ReactFC {...this.state.stackDataMobile} containerBackgroundOpacity ="0"/>
            </div>
          </div>
                    {/*Map Chart*/ }
          <div className="col-md-12 col-xl-6 order-2 order-md-1 order-xl-1 ">
              <div className="card c-portlet c-portlet--height-fluid full-height map-card">
              <ReactFC {...this.state.mapData} containerBackgroundOpacity ="0"/>
              </div>
          </div>

          <div className="col-md-6 col-xl-3 order-1 order-md-1 order-xl-1 ">
              <div className="card c-portlet p-0 c-portlet--height-fluid d-flex align-items-start flex-column">
              {/*Pipelines*/}

              <div className="d-flex mb-5 pt-24 pl-24 pr-24"> 
                     <span className="oval d-flex justify-content-center ">
                      <img src={'./pipeline.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                     </span>
                      <p className="c-portlet-title">Pipeline</p>  
              </div>
            
                    <div className="d-flex mb-auto flex-column align-items-top  kpi-block pl-24 pr-24">
                  <div className="d-flex">
                  <span className="rectangle d-flex justify-content-center ">
                    </span>

                    <div>
                      <span id ="opportunity-pipeline" data-up="+" data-down="-"></span>
                      <span className ="h5 mb-0">&nbsp; of opportunities in pipeline</span>
                    </div>
                  </div>

                    <div className="kpi-block">
                          <div className="c-portlet-value">
                          <span className="h1">$</span> {this.state.opportunitySourcedVal}
                      </div>
                      <span className="h5 poa">so far</span>    
                      </div>
                    </div>  

              <div className="deals d-flex full-width  otherInfo align-items-center">
                <div className="mr-auto d-flex align-items-center">
                    <div className="oval justify-content-center d-flex">
                      < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>
                    </div>
                    <span className="title">DEALS:</span> 
                </div>

                      <div className="d-flex row">
                         <div className="col d-flex">
                         
                         <span className="value">&nbsp;&nbsp;{this.state.dealsPipeline}</span>
                    </div>
                      </div> 
              
                      </div>
                  </div>
              </div>

              <div className="col-md-6 col-xl-3 order-1 order-md-1 order-xl-1 ">
              <div className="card c-portlet p-0 custom-portlet-height c-portlet--height-fluid d-flex align-items-start flex-column">
           
           {/*Opportunities*/}

           <div className="d-flex mb-5 pt-24 pl-24 pr-24"> 
                     <span className="oval d-flex justify-content-center ">
                      <img src={'./opportunity.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                     </span>
                      <p className="c-portlet-title">Opportunities</p>  
              </div>

              <div className="d-flex mb-auto flex-column align-items-top  kpi-block pl-24 pr-24">
                  <div className="d-flex">
                  <span className="rectangle d-flex justify-content-center ">
                    </span>

                    <div>
                      <span id ="leads-converted" data-up="+" data-down="-"></span>
                      <span className ="h5 mb-0">&nbsp;&nbsp; of leads converted to opportunities</span>
                    </div>
                  </div>
                    </div> 
                    <div className="deals d-flex full-width  otherInfo align-items-center flex-column">
                    <div className="full-width d-flex align-items-center mb-4">
                  
                    <div className="d-flex align-items-center mr-auto ">
                    <div className="oval justify-content-center d-flex">
                      < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>
                    </div>
                    <span className="title">SOURCED:</span> 
                </div>

                      <div className="d-flex row">
                         <div className="col d-flex">
                         
                         <span className="value">&nbsp;&nbsp;{this.state.opportunitySourced}</span>
                    </div>
                      </div> 

                    </div>
               

                      <div className="full-width d-flex align-items-center">
                  
                    <div className="d-flex align-items-center mr-auto ">
                    <div className="oval justify-content-center d-flex">
                      < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>
                    </div>
                    <span className="title">CLOSED:</span> 
                </div>

                      <div className="d-flex row">
                         <div className="col d-flex">
                         
                         <span className="value">&nbsp;&nbsp;{this.state.opportunityClosed}</span>
                    </div>
                      </div> 
                    </div>
                      </div>
                  </div>
                  </div>

            {/*Multi-series chart*/}
          <div className="col-md-6 col-xl-9 order-2 order-md-1 order-xl-1 ">
            <div className="card c-portlet c-portlet--height-fluid pipeline-card full-height">
            <ReactFC {...this.state.mslineData} containerBackgroundOpacity ="0" /> 
            </div>
          </div>

            {/*Leads KPI*/}
          <div className="col-md-6 col-xl-3 order-2 order-md-1 order-xl-1 ">         
            <div className="card c-portlet c-portlet--height-fluid c-portlet--height-fluid-half d-flex align-items-start flex-column">
            <div className="d-flex mb-auto"> 
                  <span className="oval d-flex justify-content-center ">
                  <img src={'./horn.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="16"/>
                  </span>
                    <p className="c-portlet-title">Leads</p>  
                </div>

                <div className="d-flex mb-auto flex-column align-items-top kpi-block">
                  <div className="d-flex">
                  <span className="rectangle d-flex justify-content-center ">
                    </span>
                    <div>
                      <span id ="lead-difference" data-up="+" data-down="-"></span>
                      <span className ="h5 mb-0">&nbsp;&nbsp; of difference from last year/quarter</span>
                    </div>
                  </div>

                    <div className="kpi-block">
                          <div className="c-portlet-value">
                          <span className="h1"></span>{this.state.leads}   
                      </div>
                      <span className="h5 poa">so far</span>    
                      </div>
                    </div>       
                </div>   
              </div>
            </div>
          </div>
  </div> /* App div ends here */   
  );
    } else {
    return (
      <div className="App">
      { /* Navigation Bar */}   
      <nav className ="navbar navbar-expand-sm text-sm-center text-md-left fixed-top">
            <div className="navbar-brand">
            
            <span className="logo">S</span>
            Sales Dashboard</div>  
                <ul className="navbar-nav flex-row ml-sm-auto">
                  <li className="nav-item">
                    <div className="profile">
                      <img alt="" className="mr-3 rounded-circle border" width="42"
                      src="./Image-Tim.png" />
                      <span className="name d-none d-sm-inline-flex">Hey, Tim </span>  
                    </div>
                  </li>
                </ul>
        </nav> 
                
        {/* 1st block */}
        <div className="container">
            <div className="row mb-5">
              <div className="col-2">
                 <div className="content-title">Overview</div>
              </div>

              <div className="col text-right time-selector">
                  <ul className="list-inline">
                    <li className="list-inline-item">

                      <div className="dropdown active-item">
                        <button className="btn btn-secondary dropdown-toggle" 
                        type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.value}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <div className="dropdown-item" value ="2018" id="btn-2018" onClick ={this.updateDashboard} >2018</div>
                          <div className="dropdown-item" value ="2017" id="btn-2017" onClick ={this.updateDashboard} >2017</div>
                          <div className="dropdown-item" value ="2016" id="btn-2016"onClick ={this.updateDashboard} >2016</div>
                        </div>
                      </div>
                    </li>

            
                  <li className="list-inline-item">
                    <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" 
                    type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   {this.state.quarterValue}
                    </button>
                  <div className="dropdown-menu" for="navbarDropdown" aria-labelledby="navbarDropdown">
                  <div className="dropdown-item" disabled>--Select Quarter--</div>
                    <div id ="btn-q1" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 1</div>
                      <div id ="btn-q2" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 2</div>
                      <div id ="btn-q3" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 3</div>
                      <div id ="btn-q4" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 4</div>
                      <div id ="btn-q5" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 1</div>
                      <div id ="btn-q6" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 2</div>
                      <div id ="btn-q7" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 3</div>
                      <div id ="btn-q8" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 4</div>
                      <div id ="btn-q9" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 1</div>
                      <div id ="btn-q10" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 2</div>
                      <div id ="btn-q11" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 3</div>
                      <div id ="btn-q12" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 4</div>
                    
                  </div>
                </div>
              </li>
            </ul>
          </div>
          </div>
            
            
              <div className="row">
                <div className="col-md-6 col-xl-4 order-xs-1 order-lg-1 order-xl-1">
                  <div className="card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column">
                    <div className="d-flex"> 
                      <span className="oval d-flex justify-content-center ">
                      <img src={'./revenuetarget.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="20"/>
                      </span>
                        <p className="c-portlet-title">Revenue Target</p>  
                    </div>
                      <div className="d-flex align-items-center mb-7 kpi-block">
                        <span className="rectangle d-flex justify-content-center ">
                        </span>
                          <div id ="kpi-target" data-up="+" data-down="-"></div>
                            <span className ="h5 mb-0">&nbsp; of target achieved</span>
                      </div>  

                          <div className="kpi-block">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.targetRevenue}
                          </div>
                          <span className="h5 poa">target this quarter</span>    
                          </div> 
                  </div>


                <div className="card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column">
                 <div className="d-flex"> 
                         <span className="oval d-flex justify-content-center ">
                          <img src={'./revenue.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                         </span>
                          <p className="c-portlet-title">Revenue </p>  
                  </div>
                
                        <div className="d-flex align-items-center mb-7 kpi-block">
                        <span className="rectangle d-flex justify-content-center ">
                          </span>
                        <div id ="pipeline-converted" data-up="+" data-down="-"></div>
                        <span className ="h5 mb-0">&nbsp; of pipeline converted</span>
                        </div>  

                          <div className="kpi-block">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.opportunityClosedVal}
                          </div>
                          <span className="h5 poa">so far</span>    
                          </div> 
                      </div>
                  </div>
                        {/*stack Chart*/ }
              <div className="col-md-6 col-xl-8 order-2 order-md-1 order-xl-1 ">
                <div className="card c-portlet c-portlet--height-fluid full-height pipelineClosing-card">
                <ReactFC {...this.state.stackData} containerBackgroundOpacity ="0"/>
                </div>
              </div>
                        {/*Map Chart*/ }
              <div className="col-md-12 col-xl-6 order-2 order-md-1 order-xl-1 ">
                  <div className="card c-portlet c-portlet--height-fluid full-height map-card">
                  <ReactFC {...this.state.mapData} containerBackgroundOpacity ="0"/>
                  </div>
              </div>

              <div className="col-md-6 col-xl-3 order-1 order-md-1 order-xl-1 ">
                  <div className="card c-portlet p-0 c-portlet--height-fluid d-flex align-items-start flex-column">
                  {/*Pipelines*/}

                  <div className="d-flex mb-5 pt-24 pl-24 pr-24"> 
                         <span className="oval d-flex justify-content-center ">
                          <img src={'./pipeline.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                         </span>
                          <p className="c-portlet-title">Pipeline</p>  
                  </div>
                
                        <div className="d-flex mb-auto flex-column align-items-top  kpi-block pl-24 pr-24">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                        </span>

                        <div>
                          <span id ="opportunity-pipeline" data-up="+" data-down="-"></span>
                          <span className ="h5 mb-0">&nbsp; of opportunities in pipeline</span>
                        </div>
                      </div>

                        <div className="kpi-block">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.opportunitySourcedVal}
                          </div>
                          <span className="h5 poa">so far</span>    
                          </div>
                        </div>  

                  <div className="deals d-flex full-width  otherInfo align-items-center">
                    <div className="mr-auto d-flex align-items-center">
                        <div className="oval justify-content-center d-flex">
                          < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>
                        </div>
                        <span className="title">DEALS:</span> 
                    </div>

                          <div className="d-flex row">
                             <div className="col d-flex">
                             
                             <span className="value">&nbsp;&nbsp;{this.state.dealsPipeline}</span>
                        </div>
                          </div> 
                  
                          </div>
                      </div>
                  </div>

                  <div className="col-md-6 col-xl-3 order-1 order-md-1 order-xl-1 ">
                  <div className="card c-portlet p-0 custom-portlet-height c-portlet--height-fluid d-flex align-items-start flex-column">
               
               {/*Opportunities*/}

               <div className="d-flex mb-5 pt-24 pl-24 pr-24"> 
                         <span className="oval d-flex justify-content-center ">
                          <img src={'./opportunity.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                         </span>
                          <p className="c-portlet-title">Opportunities</p>  
                  </div>

                  <div className="d-flex mb-auto flex-column align-items-top  kpi-block pl-24 pr-24">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                        </span>

                        <div>
                          <span id ="leads-converted" data-up="+" data-down="-"></span>
                          <span className ="h5 mb-0">&nbsp;&nbsp; of leads converted to opportunities</span>
                        </div>
                      </div>
                        </div> 
                        <div className="deals d-flex full-width  otherInfo align-items-center flex-column">
                        <div className="full-width d-flex align-items-center mb-4">
                      
                        <div className="d-flex align-items-center mr-auto ">
                        <div className="oval justify-content-center d-flex">
                          < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>
                        </div>
                        <span className="title">SOURCED:</span> 
                    </div>

                          <div className="d-flex row">
                             <div className="col d-flex">
                             
                             <span className="value">&nbsp;&nbsp;{this.state.opportunitySourced}</span>
                        </div>
                          </div> 

                        </div>
                   

                          <div className="full-width d-flex align-items-center">
                      
                        <div className="d-flex align-items-center mr-auto ">
                        <div className="oval justify-content-center d-flex">
                          < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>
                        </div>
                        <span className="title">CLOSED:</span> 
                    </div>

                          <div className="d-flex row">
                             <div className="col d-flex">
                             
                             <span className="value">&nbsp;&nbsp;{this.state.opportunityClosed}</span>
                        </div>
                          </div> 
                        </div>
                          </div>
                      </div>
                      </div>

                {/*Multi-series chart*/}
              <div className="col-md-6 col-xl-9 order-2 order-md-1 order-xl-1 ">
                <div className="card c-portlet c-portlet--height-fluid pipeline-card full-height">
                <ReactFC {...this.state.mslineData} containerBackgroundOpacity ="0" /> 
                </div>
              </div>

                {/*Leads KPI*/}
              <div className="col-md-6 col-xl-3 order-2 order-md-1 order-xl-1 ">         
                <div className="card c-portlet c-portlet--height-fluid c-portlet--height-fluid-half d-flex align-items-start flex-column">
                <div className="d-flex mb-auto"> 
                      <span className="oval d-flex justify-content-center ">
                      <img src={'./horn.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="16"/>
                      </span>
                        <p className="c-portlet-title">Leads</p>  
                    </div>

                    <div className="d-flex mb-auto flex-column align-items-top kpi-block">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                        </span>
                        <div>
                          <span id ="lead-difference" data-up="+" data-down="-"></span>
                          <span className ="h5 mb-0">&nbsp;&nbsp; of difference from last year/quarter</span>
                        </div>
                      </div>

                        <div className="kpi-block">
                              <div className="c-portlet-value">
                              <span className="h1"></span>{this.state.leads}   
                          </div>
                          <span className="h5 poa">so far</span>    
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
}

export default App;


