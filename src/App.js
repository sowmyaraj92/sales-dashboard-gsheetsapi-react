
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
  

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=SalesDashboardFinal&majorDimension=ROWS&key=${config.apiKey}`;
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
    
    const kpiFetch =document.getElementById('added-meta-target');
    kpiFetch.classList.remove('targetRevenue');

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

    const leadsInfo =document.getElementById('added-lead--class');
    leadsInfo.classList.remove('lead-meta--info');

//KPI 4 - Pipeline converted
    const pipelineElem = document.getElementById('pipeline-converted');
    pipelineElem.classList.remove('has-up-val');
    pipelineElem.classList.remove('has-down-val');

   
//KPI 5 - Leads differential
    const leadDifferenceElem = document.getElementById('lead-difference');
    leadDifferenceElem.classList.remove('has-up-val');
    leadDifferenceElem.classList.remove('has-down-val');

    // const leadTime =document.getElementById('year-quarter');
    // leadTime.classList.remove('meta-data-quarter');
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

    if(pipelineConvert < 50 ) {
      pipelineElem.innerHTML = Math.abs(pipelineConvert) + '%';
      pipelineElem.classList.add('has-down-val');
    
    } 
    else if(pipelineConvert >= 50 ) {
      pipelineElem.innerHTML = Math.abs(pipelineConvert) + '%';
      pipelineElem.classList.add('has-up-val');
    }

    document.getElementById("pipeline-converted").innerHTML = (pipelineConvert.toFixed(2))+'%';
   

    //Percent of leads converted to opportunities
    const oppConvert = (oppSourced/leadsVal)*100;
    const oppPercent =(oppConvert).toFixed(2);

    if(oppConvert < 40 ) {
      leadElem.innerHTML = Math.abs(oppConvert)+'%';
      leadElem.classList.add('has-down-val');
    } 
    else if(oppConvert >= 40 ) {
      leadElem.innerHTML = Math.abs(oppConvert)+'%';
      leadElem.classList.add('has-up-val');
    }
    document.getElementById("leads-converted").innerHTML = (oppConvert.toFixed(2))+'%';

    //Percent of targets achieved
    let target = (oppClosedVal/targetRevenueVal)*100;
    const targetPercent =(target).toFixed(2);

    if(target < 100 ) {
      target = 100-target;
      targetElem.innerHTML = Math.abs(target) + '%';
      targetElem.classList.add('has-down-val');

    } 
    else if(target >= 100 ) {
    target = target -100;
    targetElem.innerHTML = Math.abs(target) +'%';
    targetElem.classList.add('has-up-val');
    //targetElem.add('./path.svg');
    }
    
    document.getElementById("kpi-target").innerHTML = (target.toFixed(2))+'%';

   //Percent of opportunities in pipeline
    const oppPipelineConvert = (pipelineValue/oppSourcedVal)*100;
    const  oppPipelinePercent =(oppPipelineConvert).toFixed(2);

    
    if(oppPipelineConvert < 55 ) {
      opportunityElem.innerHTML = Math.abs(oppPipelineConvert);
      opportunityElem.classList.add('has-down-val');
      
    } 
    else if(oppPipelineConvert >= 55 ) {
      opportunityElem.innerHTML = Math.abs(oppPipelineConvert);
      opportunityElem.classList.add('has-up-val');
    }

    document.getElementById("opportunity-pipeline").innerHTML = (oppPipelineConvert.toFixed(2))+'%';
    //Lead increase percentage
      let Leads1;
      let Leads;
      let centLeads;
      if((prevleadsVal === 0)){
        Leads = 100;
       leadsInfo.classList.add('lead-meta--info');
      
      }  
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
    let stackChart_wAxis =[];
  

    for (let i=0; i<chartDataArrLen; i++) {

      stackChart_xAxis.push({label: chartDataArr[i].month}); 
      stackChart_yAxis.push({value: chartDataArr[i].value_OppClosed_month});
      stackChart_zAxis.push({value:chartDataArr[i].value_Pipeline_month});
      stackChart_wAxis.push({value:chartDataArr[i].value_OppSourced_month});

    }

    const chartConfigs1 = {
      type: 'mscolumn2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "caption": "Sales Funnel Overview",
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
          "divLineAlpha": "10",
          "bgAlpha": "0",
          "labelFontColor":"#81809C",
          "valueFontColor":"#D3DFF2",
        
          "plottooltext":"$$dataValue $seriesname, $label"
          
        },
        "categories": [
          {
            "category": stackChart_xAxis
          }
        ],
        "dataset": [
          { 
            "seriesname": "Opportunities",
              "data": stackChart_wAxis 
          },
          { 
          "seriesname": "Pipeline",
            "data": stackChart_zAxis 
        },
            { 
              "seriesname": "Closed",
              "data": stackChart_yAxis
          }
        ]
        }
      };


      const chartConfigs1Mobile = {
        type: 'msbar2d',
        width: '100%',
        height: '100%',
        dataFormat: 'json',
        dataSource: {
          "chart": {
            "theme": "fusion",
            "caption": "Sales Funnel Overview",
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
            "divLineAlpha": "10",
            "bgAlpha": "0",
            "labelFontColor":"#81809C",
            "valueFontColor":"#D3DFF2",
            "plottooltext":"$$dataValue in $seriesname, $label",
           
          },
          "categories": [
            {
              "category": stackChart_xAxis
            }
          ],
          "dataset": [
            { 
              "seriesname": "Opportunities",
                "data": stackChart_wAxis 
            },
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
        "caption": "Geo Distribution of Opportunities Closed",
        "captionFontColor": "#D3DFF2",
       "alignCaptionWithCanvas":"0",
        "captionAlignment":"left",  
        "theme": "fusion",
        "entityfillhovercolor": "#E3F2FD",
        "labelFontColor":"#81809C",
        "bgAlpha": "0",
        "showPlotBorder": "1",
        "showBorder":"1",
        "borderColor":"#D9D9D9",
        "showLabels": "1",
        "legendCaption":"No. of Opportunities Closed",
        "legendCaptionFontSize":"13",
        "legendCaptionFontColor":"#81809C",
       "entityToolText": "$lname, $value opportunities closed"
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
            "label": "Low(0-25)",
          },
          {
            "minvalue": "26",
            "maxvalue": "50",
            "code": "#d9d5f5",
            "label": "Medium(26-100)",
          },
          {
            "minvalue": "51",
            "maxvalue": "75",
            "code": "#c0b9ef",
            "label": "High(51-75)",
        
          },
          {
            "minvalue": "76",
            "maxvalue": "100",
            "code": "#9b8fe6",
            "label": "Very High(76-100)"
          },
          {
            "minvalue": "101",
            "maxvalue": "300",
            "code": "#8374df",
            "label": "Highest(> 100)"
          }
      ]},
        "data": mapDataArr
  }};
  this.setState({mapData: chartConfigs2});

    // ********* map config end *************

    //Multi-series chart
  
    let msChart_xAxis = []; 
    let msChart_zAxis =[];
    let msChart_wAxis =[];
    let msChart_vAxis =[];

    function addLineBreak(arg) {
      return arg.split(' ').join('<br>');
    }
    
    for (let i=0; i<chartDataArrLen; i++) {

      msChart_xAxis.push({label: addLineBreak(chartDataArr[i].month)});
      msChart_zAxis.push({value: chartDataArr[i].opp_Sourced_month});
      msChart_wAxis.push({value:chartDataArr[i].deals_Pipeline_month});
      msChart_vAxis.push({value:chartDataArr[i].opp_Closed_month})
      
    }

    const chartConfigs3 = {
      type: 'msline',
      width: '100%',
      height: '150%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "caption": "Sales Opportunity Trajectory",
          "captionFontColor": "#D3DFF2",
          "captionAlignment":"left",
         "linethickness": "2",
          "xAxisName": "Months",
          "yAxisName": "No. of opportunities",
          "yAxisNameFontSize":"12",
          "yAxisNameFontColor":"#81809C",
          "divLineAlpha": "10",
          "numDivlines": "3",
          "animation": "1",
          "legendborderalpha": "20",
          "drawCrossLine": "1",
          "crossLineAlpha": "100",
          "tooltipGrayOutColor": "#909090",
          "bgAlpha": "0",
          "labelFontColor":"#81809C",
          "drawAnchors": "1",
          "anchorRadius": "3",
          "anchorSides": "2",
          "legendItemFontSize": "13",
          "plottooltext":"$value $seriesname, $label"
        },   
        "categories": [
          {
            "category": msChart_xAxis,
              
          }
        ],
        "dataset": [

          {
            "seriesname": "Opportunities Created",
            "anchorBgColor": "#5C62B5",
            "data": msChart_zAxis
          },
          {
            "seriesname": "Opportunities in Pipeline",
            "anchorBgColor": "#28C3BE",
            "data": msChart_wAxis
          },
          {
            "seriesname": "Opportunties Closed",
            "anchorBgColor": "#F2726F",
            "data": msChart_vAxis
          }],
      }   
    }

    this.setState({mslineData: chartConfigs3});
    
    //Pushing values to the KPI

    this.setState({targetRevenue: formatNum(targetRevenueVal)});
    this.setState({opportunitySourcedVal: formatNum(oppSourcedVal)});
    this.setState({opportunityClosedVal: formatNum(oppClosedVal)});
    this.setState({valuesPipeline:formatNum(pipelineValue)});
    this.setState({leads: leadsVal});

    this.setState({opportunitySourced: oppSourced});
    this.setState({opportunityClosed: oppClosed});

   this.setState({percentLeads:centLeads});
   this.setState({dealsPipeline:pipelineDeals});
  
   this.setState({oppPipelineConverted:oppPipelinePercent});  

   this.setState({pipelineConverted:pipelinePercent});
   this.setState({oppConverted:oppPercent });
   this.setState({targetAchieved:targetPercent});

   
  }
  
  updateDashboard = (event) => {

    if(((this.state.value === '2016')|| 
        (this.state.value === '2017') ||
          (this.state.value === '2018')) &&
      (this.state.quarterValue === 'All Quarters')){

          document.getElementById('year-quarter').innerHTML =
                        "<span> as compared to the last year</span>";
                        console.log('year check')
                       
                  }
    this.setState({value :event.target.innerText})
    if(event.target.id === 'btn-2018'){
      this.setState({ quarterValue :'All Quarters'});
      this.getData('All', '2018');
      this.filterQuarters('2018');
      document.getElementById('year-quarter').innerHTML = 
      "<span> as compared to the last year</span>";
    }
     
    else if(event.target.id === 'btn-2017') {
      this.setState({ quarterValue :'All Quarters'}); 
      this.getData('All', '2017');
      this.filterQuarters('2017');
      document.getElementById('year-quarter').innerHTML = 
      "<span> as compared to the last year</span>";
      
    }
    else if(event.target.id === 'btn-2016') {
      this.setState({ quarterValue :'All Quarters'});
      this.getData('All', '2016');
      this.filterQuarters('2016');
      document.getElementById('year-quarter').innerHTML = 
      "<span> as compared to the last year</span>";
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
     
        if((this.state.value === '2016')&& (event.target.id === 'totalQuarters'))
        {
          this.getData('All', '2016');
        document.getElementById('year-quarter').innerHTML = 
        "<span> as compared to the last year</span>";
        }
        else if((this.state.value === '2017')&&(event.target.id === 'totalQuarters'))
        {
          this.getData('All', '2017');
        document.getElementById('year-quarter').innerHTML = 
        "<span> as compared to the last year</span>";
        }
        else if((this.state.value === '2018')&&(event.target.id === 'totalQuarters'))
        {
          this.getData('All', '2018');
        document.getElementById('year-quarter').innerHTML = 
        "<span> as compared to the last year</span>";
        }

       else if(event.target.id === 'btn-q1')
          {
            this.getData('Quarter1', '2016');
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
          }
        
        else if(event.target.id === 'btn-q2')

        { 
           this.getData('Quarter2', '2016'); 
         document.getElementById('year-quarter').innerHTML = 
         "<span> as compared to the last quarter</span>";
        }
       
        else if(event.target.id === 'btn-q3')
        {
            this.getData('Quarter3', '2016'); 
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
        }
        
        else if(event.target.id === 'btn-q4') 
          {
            this.getData('Quarter4', '2016');
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
          }
         
        else if(event.target.id === 'btn-q5')
          {
            this.getData('Quarter5', '2017');
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
          }
        
        else if(event.target.id === 'btn-q6')
          {
            this.getData('Quarter6', '2017');
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
          }
        
        else if(event.target.id === 'btn-q7')
          {
            this.getData('Quarter7', '2017');
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
          }
        
        else if(event.target.id === 'btn-q8')
          {
            this.getData('Quarter8', '2017');
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
          }
       
         
        else if(event.target.id === 'btn-q9')
          {
            this.getData('Quarter9', '2018');
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
          }
        
        else if(event.target.id === 'btn-q10')
          {
            this.getData('QuarterTen', '2018');
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
          }
        
        else if(event.target.id === 'btn-q11')
          {
            this.getData('QuarterEleven', '2018');
          document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
          }
         
        else if(event.target.id === 'btn-q12')
         { 
           this.getData('QuarterTwelve', '2018');  
         document.getElementById('year-quarter').innerHTML = 
          "<span> as compared to the last quarter</span>";
         }
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
                 {/* <div className="content-title">Overview</div> */}
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
                  <div id ="totalQuarters" className="dropdown-item" onClick ={this.updateDashboardQuarter}>All Quarters</div>
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
                      

                          <div className="kpi-block mt-3">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.targetRevenue}
                          </div>

                          <div id="added-meta-target" className="targetRevenue">
                
                          <span className="h5 poa meta-value-text1">Target in <span className="defaultQtr_value">{this.state.quarterValue}</span>, {this.state.value}</span>    
                          {/* <span className="h5 poa meta-value-text2">Target in {this.state.value}</span>     */}
                          </div>
                          </div> 
                          <div className="d-flex align-items-center  kpi-block mt-4 mb-2">
                        <span className="rectangle d-flex justify-content-center ">
                        </span>
                          <div id ="kpi-target" data-up="&nbsp;more" data-down="&nbsp;less"></div>
                            <span className ="h5 mb-0">&nbsp; of target achieved</span>
                      </div> 

                  </div>


                <div className="card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column">
                 <div className="d-flex"> 
                         <span className="oval d-flex justify-content-center ">
                          <img src={'./revenue.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                         </span>
                          <p className="c-portlet-title">Revenue Achieved</p>  
                  </div>
                
                          <div className="kpi-block mt-3">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.opportunityClosedVal}
                          </div>
                          <span className="h5 poa">Revenue achieved from </span>
                          
                          <span className="meta-value">{this.state.opportunityClosed} </span>
                          <span className="h5 poa">opportunities closed so far</span>
                            
                          </div> 
                          <div className="d-flex align-items-center mt-4 mb-2 kpi-block">
                        <span className="rectangle d-flex justify-content-center ">
                          </span>
                        <div id ="pipeline-converted" ></div>
                        <span className ="h5 mb-0">&nbsp; of pipeline converted</span>
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
                          <p className="c-portlet-title">Pipeline Value</p>  
                  </div>

                          <div className="kpi-block pl-24 pr-24">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.valuesPipeline}
                          </div>
                          <span className="h5 poa">Revenue in pipeline</span>    
                          </div>

                        <div className="d-flex mt-5 mb-auto flex-column align-items-top  kpi-block pl-24 pr-24">
                        <div className="d-flex mt-4 mb-4 flex-column align-items-top  kpi-block otherInfo">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                      < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>

                        </span>

                        <div>
                        <div className="title col pr-0 pl-0"><span className="value"> {this.state.dealsPipeline} </span> deals in pipeline</div>

                    </div>
                        </div>

                      </div>
                      
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                        </span>

                        <div>
                          <span id ="opportunity-pipeline"></span>
                          <span className ="h5 mb-0">&nbsp; of opportunities in pipeline</span>
                        </div>

                      </div>
                        </div> 


                       
                        </div>   

                  <div className="deals d-flex full-width  otherInfo align-items-center">
                    <div className="mr-auto d-flex align-items-center">
                        
                  
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


                  <div className="kpi-block pl-24 pr-24">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.opportunitySourcedVal}
                          </div>
                          <span className="h5 poa">Value of opportunities</span>    
                          </div>

                  <div className="d-flex mb-auto mt-5 flex-column align-items-top  kpi-block pl-24 pr-24">
                  <div className="d-flex mt-4 mb-4 flex-column align-items-top  kpi-block otherInfo">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                      < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>

                        </span>

                        <div>
                        <div className="title col pr-0 pl-0"><span className="value"> {this.state.opportunitySourced}</span> opportunities sourced</div>

                          </div>
                        </div>

                      </div>

                      
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                        </span>

                        <div>
                          <span id ="leads-converted"></span>
                          <span className ="h5 mb-0">&nbsp;&nbsp; of leads converted to opportunities</span>
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

                    <div className="kpi-block">
                              <div className="c-portlet-value">
                              <span className="h1"></span>{this.state.leads}   
                          </div>
                          <span className="h5 poa">Leads sourced so far</span>    
                          </div>

                    <div className="d-flex mb-auto flex-column align-items-top kpi-block mt-4">
                      <div id ="added-lead--class" className="d-flex lead-meta--info">
                      <span className="rectangle d-flex justify-content-center">
                        </span>
                        <div id ="lead-display">
                          <span id ="lead-difference" data-up="&nbsp;more" data-down="&nbsp;less" ></span>
                          <span id="year-quarter" className ="h5 mb-0 lead-meta--text1">
                          </span>
                        
                          <span className="h5 mb-0 lead-meta--text2">This is the first quarter/year of the analysis...</span>
                        </div>
                      </div>
    
                        
                        </div>       
                    </div>   
                  </div>
                </div>
              </div>
              </div>

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
                 {/* <div className="content-title">Overview</div> */}
              </div>

              <div className="col text-right time-selector">
                  <ul className="list-inline">
                    <li className="list-inline-item">

                      <div className="dropdown active-item">
                        <button className="btn btn-secondary dropdown-toggle" 
                        type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.value}
                        </button>
                        <div className="dropdown-menu"  aria-labelledby="dropdownMenuButton">
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
                  <div id ="totalQuarters" className="dropdown-item" onClick ={this.updateDashboardQuarter}>All Quarters</div>
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
                      

                          <div className="kpi-block mt-3">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.targetRevenue}
                          </div>

                          <div id="added-meta-target" className="targetRevenue">
                
                          <span className="h5 poa meta-value-text1">Target in <span className="defaultQtr_value">{this.state.quarterValue}</span>, {this.state.value}</span>    
                          {/* <span className="h5 poa meta-value-text2">Target in {this.state.value}</span>     */}
                          </div>
                          </div> 
                          <div className="d-flex align-items-center  kpi-block mt-4 mb-2">
                        <span className="rectangle d-flex justify-content-center ">
                        </span>
                          <div id ="kpi-target" data-up="&nbsp;more" data-down="&nbsp;less"></div>
                            <span className ="h5 mb-0">&nbsp; of target achieved</span>
                      </div> 

                  </div>


                <div className="card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column">
                 <div className="d-flex"> 
                         <span className="oval d-flex justify-content-center ">
                          <img src={'./revenue.svg'} alt="fireSpot" className= "img-responsive rounded-circle" width="11"/>
                         </span>
                          <p className="c-portlet-title">Revenue Achieved</p>  
                  </div>
                
                          <div className="kpi-block mt-3">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.opportunityClosedVal}
                          </div>
                          <span className="h5 poa">Revenue achieved from </span>
                          
                          <span className="meta-value">{this.state.opportunityClosed} </span>
                          <span className="h5 poa">opportunities closed so far</span>
                            
                          </div> 
                          <div className="d-flex align-items-center mt-4 mb-2 kpi-block">
                        <span className="rectangle d-flex justify-content-center ">
                          </span>
                        <div id ="pipeline-converted" ></div>
                        <span className ="h5 mb-0">&nbsp; of pipeline converted</span>
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
                          <p className="c-portlet-title">Pipeline Value</p>  
                  </div>

                          <div className="kpi-block pl-24 pr-24">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.valuesPipeline}
                          </div>
                          <span className="h5 poa">Revenue in pipeline</span>    
                          </div>

                        <div className="d-flex mt-5 mb-auto flex-column align-items-top  kpi-block pl-24 pr-24">
                        <div className="d-flex mt-4 mb-4 flex-column align-items-top  kpi-block otherInfo">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                      < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>

                        </span>

                        <div>
                        <div className="title col pr-0 pl-0"><span className="value"> {this.state.dealsPipeline} </span> deals in pipeline</div>

                    </div>
                        </div>

                      </div>
                      
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                        </span>

                        <div>
                          <span id ="opportunity-pipeline"></span>
                          <span className ="h5 mb-0">&nbsp; of opportunities in pipeline</span>
                        </div>

                      </div>
                        </div> 


                       
                        </div>   

                  <div className="deals d-flex full-width  otherInfo align-items-center">
                    <div className="mr-auto d-flex align-items-center">
                        
                  
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


                  <div className="kpi-block pl-24 pr-24">
                              <div className="c-portlet-value">
                              <span className="h1">$</span> {this.state.opportunitySourcedVal}
                          </div>
                          <span className="h5 poa">Value of opportunities</span>    
                          </div>

                  <div className="d-flex mb-auto mt-5 flex-column align-items-top  kpi-block pl-24 pr-24">
                  <div className="d-flex mt-4 mb-4 flex-column align-items-top  kpi-block otherInfo">
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                      < img src={'./arrow.svg'} alt="fireSpot" className = "img-responsive rounded-circle float-left "/>

                        </span>

                        <div>
                        <div className="title col pr-0 pl-0"><span className="value"> {this.state.opportunitySourced}</span> opportunities sourced</div>

                          </div>
                        </div>

                      </div>

                      
                      <div className="d-flex">
                      <span className="rectangle d-flex justify-content-center ">
                        </span>

                        <div>
                          <span id ="leads-converted"></span>
                          <span className ="h5 mb-0">&nbsp;&nbsp; of leads converted to opportunities</span>
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

                    <div className="kpi-block">
                              <div className="c-portlet-value">
                              <span className="h1"></span>{this.state.leads}   
                          </div>
                          <span className="h5 poa">Leads sourced so far</span>    
                          </div>

                    <div className="d-flex mb-auto flex-column align-items-top kpi-block mt-4">
                      <div id ="added-lead--class" className="d-flex lead-meta--info">
                      <span className="rectangle d-flex justify-content-center">
                        </span>
                        <div id ="lead-display">
                          <span id ="lead-difference" data-up="&nbsp;more" data-down="&nbsp;less" ></span>
                          <span id="year-quarter" className ="h5 mb-0 lead-meta--text1">
                          </span>
                        
                          <span className="h5 mb-0 lead-meta--text2">This is the first quarter/year of the analysis...</span>
                        </div>
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


