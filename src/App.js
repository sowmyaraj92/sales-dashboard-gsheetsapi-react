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

function formatNum(num) {
  let si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "g" },
    { value: 1e12, symbol: "t" },
    { value: 1e15, symbol: "p" },
    { value: 1e18, symbol: "e" }
  ];
  let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(2).replace(rx, "$1") + si[i].symbol;
} 
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
    // let value = 'Year'
    // let quartervalue ='Quarter'
  super();

    this.url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=SalesDataSomi&majorDimension=ROWS&key=${config.apiKey}`;

  // Initialise values 
    this.state = {
      items: [],
      value:'Year',
      quartervalue :'Quarter',
      selectedValue: null,
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
          if (monthStr.includes(arg)) {
            leadsVal += parseInt(arr[i].leads_month);
           
            oppSourced += parseInt(arr[i].opp_Sourced_month);
            oppSourcedVal += parseInt(arr[i].value_OppSourced_month);

            oppClosed += parseInt(arr[i].opp_Closed_month);
            oppClosedVal += parseInt(arr[i].value_OppClosed_month);

            pipelineDeals +=parseInt(arr[i].deals_Pipeline_month);
            pipelineValue+=parseInt(arr[i].value_Pipeline_month);
    
            chartDataArr.push(arr[i]);

              if(targetRevenueFlag===false) {
                  targetRevenueVal=parseInt(arr[i].revenueTarget_Annual); 
                 // console.log("value",targetRevenueVal);
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
            leadsVal += parseInt(arr[i].leads_month);
            oppSourced += parseInt(arr[i].opp_Sourced_month);
          
           console.log(oppSourced);
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
            prevleadsVal += parseInt(arr[i].leads_month); 
          }
    }
      
    //Percent of pipeline converted
    const pipelineConvert = (oppClosedVal/oppSourcedVal)*100;
    const pipelinePercent = (pipelineConvert).toFixed(2);

    if(pipelineConvert < 0 ) {
      pipelineElem.innerHTML = Math.abs(pipelineConvert) + '%';
      pipelineElem.classList.add('has-down-val');
     // pipelineElem.add('./redarrow.svg');
    } 
    else if(pipelineConvert >= 0 ) {
      pipelineElem.innerHTML = Math.abs(pipelineConvert) + '%';
      pipelineElem.classList.add('has-up-val');
      //pipelineElem.add('./path.svg');
    }

    document.getElementById("pipeline-converted").innerHTML = pipelineConvert.toFixed(2);
   

    //Percent of leads converted to opportunities
    const oppConvert = (oppSourced/leadsVal)*100;
    const oppPercent =(oppConvert).toFixed(2);

    if(oppConvert < 0 ) {
      leadElem.innerHTML = Math.abs(oppConvert) + '%';
      leadElem.classList.add('has-down-val');
      //leadElem.add('./redarrow.svg');
    } 
    else if(oppConvert >= 0 ) {
      leadElem.innerHTML = Math.abs(oppConvert) + '%';
      leadElem.classList.add('has-up-val');
      //leadElem.add('./path.svg');
    }
    document.getElementById("leads-converted").innerHTML = oppConvert.toFixed(2);

    //Percent of targets achieved
    const target = (oppClosedVal/targetRevenueVal)*100;
    const targetPercent =(target).toFixed(2);

    if(target < 0 ) {
      targetElem.innerHTML = Math.abs(target) + '%';
      targetElem.classList.add('has-down-val');
     // targetElem.add('./redarrow.svg');
    } 
    else if(target >= 0 ) {
    targetElem.innerHTML = Math.abs(target) + '%';
    targetElem.classList.add('has-up-val');
    //targetElem.add('./path.svg');
    }

    document.getElementById("kpi-target").innerHTML = target.toFixed(2);

   //Percent of opportunities in pipeline
    const oppPipelineConvert = (pipelineValue/oppSourcedVal)*100;
    const  oppPipelinePercent =(oppPipelineConvert).toFixed(2);

    
    if(oppPipelineConvert < 100 ) {
      opportunityElem.innerHTML = Math.abs(oppPipelineConvert);
      opportunityElem.classList.add('has-down-val');
     // opportunityElem.add('/redarrow.svg')
      
    } 
    else if(oppPipelineConvert >= 100 ) {
      opportunityElem.innerHTML = Math.abs(oppPipelineConvert);
      opportunityElem.classList.add('has-up-val');
      //opportunityElem.add('./path.svg');
    }

    document.getElementById("opportunity-pipeline").innerHTML = oppPipelineConvert.toFixed(2);
  
   
    //Lead increase percentage
    
    const Leads = ((leadsVal-prevleadsVal)/prevleadsVal)*100;
    const centLeads = (Leads).toFixed(2);

    if(Leads < 0 ) {
      leadDifferenceElem.innerHTML = Math.abs(Leads);
      leadDifferenceElem.classList.add('has-down-val');
      //leadDifferenceElem.img.add('./path.svg');
    } 
    else if(Leads >= 0 ) {
      leadDifferenceElem.innerHTML = Math.abs(Leads);
      leadDifferenceElem.classList.add('has-up-val');
      //leadDifferenceElem.img.add('./path.svg');
    }
    document.getElementById("lead-difference").innerHTML = Leads.toFixed(2);
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
    let mapChart_DealsAxis =[];
    let mapChart_QuarterAxis =[];


    for (let i=0; i<chartDataArrLen; i++) {

      mapChart_xAxis.push({id: chartDataArr[i].region_Quarter});
      mapChart_yAxis.push({value: chartDataArr[i].count_Deals});  
      mapChart_zAxis.push({id: chartDataArr[i].Region});
      mapChart_QuarterAxis.push({id: chartDataArr[i].Quarter});
      mapChart_DealsAxis.push({id: chartDataArr[i].count_Deals_Quarter});
 
 
    }
    console.log(mapChart_xAxis.label);
    console.log(mapChart_yAxis.value);
     //World Map
    const WorldDataArr = [];   
  
    for (let k=1; k<=6; k++) {
     // WorldDataArr.push({"id": mapChart_xAxis[k].label, "value": mapChart_yAxis[k].value});
     // QuarterDataArr.push({"id":mapChart_QuarterAxis[k].label,"value":mapChart_DealsAxis[k].value})
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
        
          "numbersuffix": "%",
          "theme": "fusion",
          "bgAlpha": "0",
        },
        "colorrange": {
          "minvalue": "0.5",
          "code": "#E81A59",
          "gradient": "1",
          "color": [
          {
            "displayvalue": "0-50",
            "maxvalue": "50",
            "code": "#6957DA"
          },
          {
            "maxvalue": "200",
            "displayvalue": "51-200",
            "code": "#48BD86"
          },
          {
            "maxvalue": "1000",
            "displayvalue": "200+",
            "code": "#E81A59"
          }
        ]},
          "data": [
            { "id": "NA",
             "value":WorldDataArr[0], 
             "showLabel": "1" },

            { "id": "SA",
             "value": WorldDataArr, 
             "showLabel": "1" },

            { "id": "AS",
             "value": WorldDataArr,
             "showLabel": "1" },

            { "id": "EU",
             "value": WorldDataArr,
             "showLabel": "1" },

            { "id": "AF", 
            "value": WorldDataArr,
             "showLabel": "1" },

            { "id": "AU",
             "value":WorldDataArr,
              "showLabel": "1" }
        ],
        
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
      height: '150%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "caption": "Pipeline and Closed Trajectory",
          "captionFontColor": "#D3DFF2",
          "captionAlignment":"left",
          "subcaption": "(Plotting Pipeline vs Closed for a month)",
          "linethickness": "2",
        
          "xAxisName": "Month ",
          "yAxisName": "Deals won",
          "showvalues": "0",
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
          // "trendlines": [
          //   {
          //       "line": [
          //           {
          //               "startvalue": "200",
          //               "color": "#62B58F",
          //               "valueOnRight": "1",
                        
          //           }]
          //   }]
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

   this.setState({pipelineConverted:pipelinePercent });
   this.setState({oppConverted:oppPercent });
   this.setState({targetAchieved:targetPercent});

   //this.setState({selectedValue: selectedValue});
   
  }
//Add a function for Year,Quarter and Month 

  updateDashboard = (event) => {
    this.value = event.target.innerText;
    if(event.target.id === 'btn-2018'){
      this.getData('2018');
      this.filterQuarters('2018');
    }
     
    else if(event.target.id === 'btn-2017') {
      this.getData('2017');
      this.filterQuarters('2017');
    
    }
    else if(event.target.id === 'btn-2016') {
      this.getData('2016');
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
      this.quartervalue = event.target.innerText;
      if(event.target.id === 'btn-q1') {
    
        this.getData('Quarter 1');
      }
        else if(event.target.id === 'btn-q2'){
        this.getData('Quarter 2');
      }
  
        else if(event.target.id === 'btn-q3'){
      
          this.getData('Quarter 3');   
        } 
        else if(event.target.id === 'btn-q4') {

         
          this.getData('Quarter 4');
        }
        
        else if(event.target.id === 'btn-q5'){

          // document.getElementById('btn-q5').value =event.target.text;
          this.getData('Quarter 5');
        }
        
        else if(event.target.id === 'btn-q6'){
          // document.getElementById('btn-q6').value = event.target.text;
          this.getData('Quarter 6');
        }
        
        else if(event.target.id === 'btn-q7') {
          // document.getElementById('btn-q7').value = event.target.text;
          this.getData('Quarter 7');
        }
      
        else if(event.target.id === 'btn-q8'){

          // document.getElementById('btn-q8').value = event.target.text;
          this.getData('Quarter 8');
  
        }
        
        else if(event.target.id === 'btn-q9'){
          // document.getElementById('btn-q9').value = event.target.text;
          this.getData('Quarter 9');
        }
      
        else if(event.target.id === 'btn-q10'){
          // document.getElementById('btn-q10').value =event.target.text;
          this.getData('Quarter 10');
        } 

        else if(event.target.id === 'btn-q11'){
        //  document.getElementById('btn-q11').value =event.target.text;
          this.getData('Quarter 11');
        }
        
        else if(event.target.id === 'btn-q12'){
          // document.getElementById('btn-q12').value =event.target.text;
          this.getData('Quarter 12');  
        } 
      }
       
  componentWillMount() {
   
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
      this.setState({ items: rows}, () => this.getData('2018')); 
      
    });
    
  }

//   Reset() {  
//     document.getElementById("my_select").selectedIndex = 1; 
// }  
  render() {

    //const {branding} = props;
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
                      <span className="name">Hey,Tim </span>  
                    </div>
                  </li>
                </ul>
        </nav> 
                
        {/* 1st block */}
        <div className="container">
            <div className="row mb-5">
              <div className="col">
                 <div className="content-title">Overview</div>
              </div>

              <div className="col text-right time-selector">
                  <ul className="list-inline">
                    <li className="list-inline-item">

                      <div className="dropdown active-item">
                        <button className="btn btn-secondary dropdown-toggle" 
                        type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.value}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item">Choose Year</div>
                          <div className="dropdown-item" id="btn-2018" onClick ={this.updateDashboard} selectedValue={2018}>2018</div>
                          <div className="dropdown-item" id="btn-2017" onClick ={this.updateDashboard} >2017</div>
                          <div className="dropdown-item" id="btn-2016"onClick ={this.updateDashboard} >2016</div>
                        </div>
                      </div>
                    </li>

                    {/* <input type="button" id="btnReset" value="Reset" onclick="Reset();" /> */}
            
                  <li className="list-inline-item">
                    <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" 
                    type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   {this.quartervalue}
                    </button>
                  <div className="dropdown-menu" for="navbarDropdown" aria-labelledby="navbarDropdown">
                    <div id ="btn-q1" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 1</div>
                      <div id ="btn-q2" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 2</div>
                      <div id ="btn-q3" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 3</div>
                      <div id ="btn-q4" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 4</div>
                      <div id ="btn-q5" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 5</div>
                      <div id ="btn-q6" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 6</div>
                      <div id ="btn-q7" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 7</div>
                      <div id ="btn-q8" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 8</div>
                      <div id ="btn-q9" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 9</div>
                      <div id ="btn-q10" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 10</div>
                      <div id ="btn-q11" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 11</div>
                      <div id ="btn-q12" className="dropdown-item" onClick ={this.updateDashboardQuarter}>Quarter 12</div>
                    
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
                      <img src={'/revenuetarget.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="20"/>
                      </span>
                        <p className="c-portlet-title">Revenue Target</p>  
                    </div>
                      <div className="d-flex align-items-center mb-7 kpi-block">
                        <span className="rectangle d-flex justify-content-center ">
                         <img src={'/Path.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="10"/>
                        </span>
                          <div id ="kpi-target" data-up="+" data-down="-"></div>
                            <span className ="h5 mb-0">&nbsp;&nbsp; of target achieved</span>
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
                          <img src={'/revenue.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                         </span>
                          <p className="c-portlet-title">Revenue </p>  
                  </div>
                
                        <div className="d-flex align-items-center mb-7 kpi-block">
                        <span className="rectangle d-flex justify-content-center ">
                         <img src={'/Path.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="10"/>
                        </span>
                        <div id ="pipeline-converted" data-up="+" data-down="-"></div>
                        <span className ="h5 mb-0">&nbsp;&nbsp; of pipeline converted</span>
                        </div>  

                          <div className="kpi-block">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.opportunityClosedVal}
                          </div>
                          <span className="h5 poa">so far</span>    
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
              <div className="col-md-12 col-xl-6 order-2 order-md-1 order-xl-1 ">
                  <div className="card c-portlet c-portlet--height-fluid">
                  <ReactFC {...this.state.mapData} containerBackgroundOpacity ="0"/>
                  </div>
              </div>



              <div className="col-md-6 col-xl-3 order-1 order-md-1 order-xl-1 ">
                  <div className="card c-portlet p-0 c-portlet--height-fluid d-flex align-items-start flex-column">
                  {/*Pipelines*/}

                  <div className="d-flex mb-5 pt-24 pl-24 pr-24"> 
                         <span className="oval d-flex justify-content-center ">
                          <img src={'/pipeline.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                         </span>
                          <p className="c-portlet-title">Pipeline</p>  
                  </div>
                
                        <div className="d-flex mb-auto flex-column align-items-top  kpi-block pl-24 pr-24">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                         <img src={'/Path.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="10"/>
                        </span>

                        <div>
                          <span id ="opportunity-pipeline" data-up="+" data-down="-"></span>
                          <span className ="h5 mb-0">&nbsp;&nbsp; of opportunities in pipeline</span>
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
                          < img src={'/arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>
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
                          <img src={'/opportunity.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                         </span>
                          <p className="c-portlet-title">Opportunities</p>  
                  </div>

                  <div className="d-flex mb-auto flex-column align-items-top  kpi-block pl-24 pr-24">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                         <img src={'/Path.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="10"/>
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
                          < img src={'/arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>
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
                          < img src={'/arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>
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
                <div className="card c-portlet c-portlet--height-fluid">
                <ReactFC {...this.state.mslineData} containerBackgroundOpacity ="0" /> 
                </div>
              </div>

                {/*Leads KPI*/}
              <div className="col-md-6 col-xl-3 order-2 order-md-1 order-xl-1 ">         
                <div className="card c-portlet c-portlet--height-fluid c-portlet--height-fluid-half d-flex align-items-start flex-column">
                <div className="d-flex mb-auto"> 
                      <span className="oval d-flex justify-content-center ">
                      <img src={'/horn.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="16"/>
                      </span>
                        <p className="c-portlet-title">Leads</p>  
                    </div>

                    <div className="d-flex mb-auto flex-column align-items-top kpi-block">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                         <img src={'/Path.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="10"/>
                        </span>

                        <div>
                          <span id ="lead-difference" data-up="+" data-down="-"></span>
                          <span className ="h5 mb-0">&nbsp;&nbsp; of increase from last month</span>
                        </div>
                      </div>

                        <div className="kpi-block">
                              <div className="c-portlet-value">
                              <span className="h1"></span> {this.state.leads}
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

export default App;
