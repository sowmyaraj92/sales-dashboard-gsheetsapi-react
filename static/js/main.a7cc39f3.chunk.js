(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,a){e.exports=a(29)},29:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),s=a(5),r=a.n(s),o=a(6),d=a(7),i=a(14),c=a(8),m=a(15),p=a(2),u=a.n(p),v=a(9),h=a.n(v),g=a(10),y=a.n(g),E=a(11),b=a(12),f=a.n(b),N=a(1),x=a.n(N),w=a(13),I=a.n(w);function q(e){var t,a=[{value:1,symbol:""},{value:1e3,symbol:"k"},{value:1e6,symbol:"m"},{value:1e9,symbol:"g"},{value:1e12,symbol:"t"},{value:1e15,symbol:"p"},{value:1e18,symbol:"e"}];for(t=a.length-1;t>0&&!(e>=a[t].value);t--);return(e/a[t].value).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/,"$1")+a[t].symbol}var B="AIzaSyCn_qxApnW1By0E3DZmIOJeXkT_RtYuYHo",D="1UNm50uQrVBW7NTi-sOLaEpc7sE5gGU1_mxw8B4PPY7g";a(4);x.a.fcRoot(u.a,h.a,f.a,y.a,E.a,I.a),window.onload=function(){document.getElementById("btn-q5").style.display="none",document.getElementById("btn-q6").style.display="none",document.getElementById("btn-q7").style.display="none",document.getElementById("btn-q8").style.display="none",document.getElementById("btn-q9").style.display="none",document.getElementById("btn-q10").style.display="none",document.getElementById("btn-q11").style.display="none",document.getElementById("btn-q12").style.display="none"};var k="https://sheets.googleapis.com/v4/spreadsheets/".concat(D,"/values:batchGet?ranges=SalesDataSomi&majorDimension=ROWS&key=").concat(B),S="https://sheets.googleapis.com/v4/spreadsheets/".concat(D,"/values:batchGet?ranges=MapPlot&majorDimension=ROWS&key=").concat(B),C=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(i.a)(this,Object(c.a)(t).call(this))).getData=function(t,a){console.log("Arg1",t),console.log("Arg2",a);var l=e.state.items,n=l.length,s=[],r=0,o=0,d=!1,i=0,c=0,m=0,p=0,u=0,v=0,h=0,g=document.getElementById("kpi-target");g.classList.remove("has-up-val"),g.classList.remove("has-down-val");var y=document.getElementById("opportunity-pipeline");y.classList.remove("has-up-val"),y.classList.remove("has-down-val");var E=document.getElementById("leads-converted");E.classList.remove("has-up-val"),E.classList.remove("has-down-val");var b=document.getElementById("pipeline-converted");b.classList.remove("has-up-val"),b.classList.remove("has-down-val");var f=document.getElementById("lead-difference");f.classList.remove("has-up-val"),f.classList.remove("has-down-val");for(var N=0;N<n;N++){l[N].year.includes(a)&&(o+=parseInt(l[N].leads_month),h+=parseInt(l[N].prev_leads_year),i+=parseInt(l[N].opp_Sourced_month),c+=parseInt(l[N].value_OppSourced_month),m+=parseInt(l[N].opp_Closed_month),p+=parseInt(l[N].value_OppClosed_month),u+=parseInt(l[N].deals_Pipeline_month),v+=parseInt(l[N].value_Pipeline_month),s.push(l[N]),!1===d&&(r=parseInt(l[N].revenueTarget_Annual),d=!0))}if("All"!==t){s=[],o=0,h=0,i=0,c=0,m=0,p=0,u=0,v=0,d=!1;for(var x=0;x<n;x++){l[x].quarter.includes(t)&&(o+=parseInt(l[x].leads_month),h+=parseInt(l[x].prev_leads_quarter),i+=parseInt(l[x].opp_Sourced_month),c+=parseInt(l[x].value_OppSourced_month),m+=parseInt(l[x].opp_Closed_month),p+=parseInt(l[x].value_OppClosed_month),u+=parseInt(l[x].deals_Pipeline_month),v+=parseInt(l[x].value_Pipeline_month),s.push(l[x]),!1===d&&(r=parseInt(l[x].revenueTarget),d=!0))}}var w=p/c*100,I=w.toFixed(2);w<100?(b.innerHTML=Math.abs(w)+"%",b.classList.add("has-down-val")):w>=100&&(b.innerHTML=Math.abs(w)+"%",b.classList.add("has-up-val")),document.getElementById("pipeline-converted").innerHTML=w.toFixed(2)+"%";var B=i/o*100,D=B.toFixed(2);B<100?(E.innerHTML=Math.abs(B)+"%",E.classList.add("has-down-val")):B>=100&&(E.innerHTML=Math.abs(B)+"%",E.classList.add("has-up-val")),document.getElementById("leads-converted").innerHTML=B.toFixed(2)+"%";var k=p/r*100,S=k.toFixed(2);k<100?(g.innerHTML=Math.abs(k)+"%",g.classList.add("has-down-val")):k>=100&&(g.innerHTML=Math.abs(k)+"%",g.classList.add("has-up-val")),document.getElementById("kpi-target").innerHTML=k.toFixed(2)+"%";var C,L,Q=v/c*100,_=Q.toFixed(2);Q<100?(y.innerHTML=Math.abs(Q),y.classList.add("has-down-val")):Q>=100&&(y.innerHTML=Math.abs(Q),y.classList.add("has-up-val")),document.getElementById("opportunity-pipeline").innerHTML=Q.toFixed(2)+"%",0===h?L=100:(C=o-h,L=Math.abs(C/h*100)),h>o?(f.innerHTML=Math.abs(L),f.classList.add("has-down-val")):h<o&&(f.innerHTML=Math.abs(L),f.classList.add("has-up-val")),document.getElementById("lead-difference").innerHTML=L.toFixed(2)+"%";for(var A=s.length,M=[],F=[],T=[],j=0;j<A;j++)M.push({label:s[j].month}),F.push({value:s[j].value_OppClosed_month}),T.push({value:s[j].value_Pipeline_month});var O={type:"stackedcolumn2d",width:"100%",height:"100%",dataFormat:"json",dataSource:{chart:{theme:"fusion",showValues:"1",caption:"Pipeline/Closing",captionFontColor:"#D3DFF2",captionAlignment:"left",subcaption:"On a monthly basis",xAxisName:"Months",xAxisNameFontColor:"#81809C",yAxisName:"Price in USD",yNumberPrefix:"$",plotFillAlpha:"70",showPlotBorder:"0",showCanvasBorder:"0",xAxisLabelMode:"AUTO",showTrendlineLabels:"0",valueFontSize:"10",numDivlines:"2",bgAlpha:"0",labelFontColor:"#81809C",valueFontColor:"#D3DFF2",toolTipBgColor:"#ffff"},categories:[{category:M}],dataset:[{seriesname:"Pipeline",data:T},{seriesname:"Closed",data:F}]}};e.setState({stackData:O});for(var P=["NA","SA","AS","EU","AF","AU"],H=e.state.mapItems.filter(function(e){return e.Year===a}),V=[],R=0;R<P.length;R++){for(var $=0,U=0;U<H.length;U++)P[R]===H[U].Region&&($+=parseInt(H[U].Value));V.push({id:P[R],value:$})}for(var W=[],G=0;G<P.length;G++){for(var J=0,Y=0;Y<H.length;Y++)P[G]===H[Y].Region&&H[Y].Quarter===t&&(J+=parseInt(H[Y].Value));W.push({id:P[G],value:J})}var z={type:"world",width:"100%",height:"95%",dataFormat:"JSON",dataSource:{chart:{caption:"Sales Statistics",captionFontColor:"#D3DFF2",captionAlignment:"left",theme:"fusion",entityfillhovercolor:"#E3F2FD",labelFontColor:"#81809C",bgAlpha:"0",showLabels:"1",color:"#00000"},colorrange:{minvalue:"10",gradient:"0",code:"#6957da",color:[{minvalue:"0",maxvalue:"25",code:"#f2f0fc",label:"Low (0-25)"},{minvalue:"26",maxvalue:"50",code:"#d9d5f5",label:"Medium (26-100)"},{minvalue:"51",maxvalue:"75",code:"#c0b9ef",label:"High (51-75)"},{minvalue:"76",maxvalue:"100",code:"#9b8fe6",label:"Very High (76-100)"},{minvalue:"101",maxvalue:"300",code:"#8374df",label:"Highest (> 100)"}]},data:void 0===t||"All"===t?V:W}};e.setState({mapData:z});var X=[],Z=[],K=[];function ee(e){return e.split(" ").join("<br>")}for(var te=0;te<A;te++)Z.push({label:ee(s[te].month)}),X.push({value:s[te].value_OppClosed_month}),K.push({value:s[te].value_Pipeline_month});var ae={type:"msline",width:"100%",height:"150%",dataFormat:"json",dataSource:{chart:{theme:"fusion",caption:"Pipeline and Closed Trajectory",captionFontColor:"#D3DFF2",captionAlignment:"left",subcaption:"(Plotting Pipeline vs Closed for a month)",linethickness:"2",xAxisName:"Month ",yAxisName:"Deals won",numberPrefix:"$",divLineAlpha:"40",animation:"1",legendborderalpha:"20",drawCrossLine:"1",crossLineAlpha:"100",tooltipGrayOutColor:"#80bfff",bgAlpha:"0",labelFontColor:"#81809C",drawAnchors:"1",anchorRadius:"3",anchorSides:"2",legendItemFontSize:"13"},categories:[{category:Z}],dataset:[{seriesname:"Pipeline",anchorBgColor:"#5D62B5",data:K},{seriesname:"Closed",anchorBgColor:"#29C3BE",data:X}]}};e.setState({mslineData:ae}),e.setState({targetRevenue:q(r)}),e.setState({opportunitySourcedVal:q(c)}),e.setState({opportunityClosedVal:q(p)}),e.setState({leads:o}),e.setState({opportunitySourced:i}),e.setState({opportunityClosed:m}),e.setState({percentLeads:void 0}),e.setState({dealsPipeline:u}),e.setState({valuesPipeline:v}),e.setState({oppPipelineConverted:_}),e.setState({pipelineConverted:I}),e.setState({oppConverted:D}),e.setState({targetAchieved:S})},e.updateDashboard=function(t){e.setState({value:t.target.innerText}),"btn-2018"===t.target.id?(e.setState({quarterValue:"All Quarters"}),e.getData("All","2018"),e.filterQuarters("2018")):"btn-2017"===t.target.id?(e.setState({quarterValue:"All Quarters"}),e.getData("All","2017"),e.filterQuarters("2017")):"btn-2016"===t.target.id&&(e.setState({quarterValue:"All Quarters"}),e.getData("All","2016"),e.filterQuarters("2016"))},e.filterQuarters=function(e){"2016"===e?(document.getElementById("btn-q1").style.display="block",document.getElementById("btn-q2").style.display="block",document.getElementById("btn-q3").style.display="block",document.getElementById("btn-q4").style.display="block",document.getElementById("btn-q5").style.display="none",document.getElementById("btn-q6").style.display="none",document.getElementById("btn-q7").style.display="none",document.getElementById("btn-q8").style.display="none",document.getElementById("btn-q9").style.display="none",document.getElementById("btn-q10").style.display="none",document.getElementById("btn-q11").style.display="none",document.getElementById("btn-q12").style.display="none"):"2017"===e?(document.getElementById("btn-q1").style.display="none",document.getElementById("btn-q2").style.display="none",document.getElementById("btn-q3").style.display="none",document.getElementById("btn-q4").style.display="none",document.getElementById("btn-q5").style.display="block",document.getElementById("btn-q6").style.display="block",document.getElementById("btn-q7").style.display="block",document.getElementById("btn-q8").style.display="block",document.getElementById("btn-q9").style.display="none",document.getElementById("btn-q10").style.display="none",document.getElementById("btn-q11").style.display="none",document.getElementById("btn-q12").style.display="none"):"2018"===e&&(document.getElementById("btn-q1").style.display="none",document.getElementById("btn-q2").style.display="none",document.getElementById("btn-q3").style.display="none",document.getElementById("btn-q4").style.display="none",document.getElementById("btn-q5").style.display="none",document.getElementById("btn-q6").style.display="none",document.getElementById("btn-q7").style.display="none",document.getElementById("btn-q8").style.display="none",document.getElementById("btn-q9").style.display="block",document.getElementById("btn-q10").style.display="block",document.getElementById("btn-q11").style.display="block",document.getElementById("btn-q12").style.display="block")},e.updateDashboardQuarter=function(t){e.setState({quarterValue:t.target.innerText}),"btn-q1"===t.target.id?e.getData("Quarter1","2016"):"btn-q2"===t.target.id?e.getData("Quarter2","2016"):"btn-q3"===t.target.id?e.getData("Quarter3","2016"):"btn-q4"===t.target.id?e.getData("Quarter4","2016"):"btn-q5"===t.target.id?e.getData("Quarter5","2017"):"btn-q6"===t.target.id?e.getData("Quarter6","2017"):"btn-q7"===t.target.id?e.getData("Quarter7","2017"):"btn-q8"===t.target.id?e.getData("Quarter8","2017"):"btn-q9"===t.target.id?e.getData("Quarter9","2018"):"btn-q10"===t.target.id?e.getData("QuarterTen","2018"):"btn-q11"===t.target.id?e.getData("QuarterEleven","2018"):"btn-q12"===t.target.id&&e.getData("QuarterTwelve","2018")},e.state={items:[],mapItems:[],value:"2016",quarterValue:"All Quarters",mapData:null,mslineData:null,stackData:null,showMenu:!1,targetRevenue:"-",leads:"-",opportunitySourced:"-",opportunitySourcedVal:"-",opportunityClosed:"-",opportunityClosedVal:"-",prevLeads:"-",month:"-",percentLeads:"-",pipelineConverted:"-",oppConverted:"-",targetAchieved:"-",dealsPipeline:"-",valuesPipeline:"-",oppPipelineConverted:"-"},e}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch(k).then(function(e){return e.json()}).then(function(t){for(var a=t.valueRanges[0].values,l=[],n=1;n<a.length;n++){for(var s={},r=0;r<a[n].length;r++)s[a[0][r]]=a[n][r];l.push(s)}e.setState({items:l},function(){return e.getData("All","2016")})}),fetch(S).then(function(e){return e.json()}).then(function(t){for(var a=t.valueRanges[0].values,l=[],n=1;n<a.length;n++){for(var s={},r=0;r<a[n].length;r++)s[a[0][r]]=a[n][r];l.push(s)}e.setState({mapItems:l})})}},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("nav",{className:"navbar navbar-expand-sm text-sm-center text-md-left fixed-top"},n.a.createElement("div",{className:"navbar-brand"},n.a.createElement("span",{className:"logo"},"S"),"Sales Dashboard"),n.a.createElement("ul",{className:"navbar-nav flex-row ml-sm-auto"},n.a.createElement("li",{className:"nav-item"},n.a.createElement("div",{className:"profile"},n.a.createElement("img",{alt:"",className:"mr-3 rounded-circle border",width:"42",src:"./Image-Tim.png"}),n.a.createElement("span",{className:"name d-none d-sm-inline-flex"},"Hey, Tim "))))),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row mb-5"},n.a.createElement("div",{className:"col"},n.a.createElement("div",{className:"content-title"},"Overview")),n.a.createElement("div",{className:"col text-right time-selector"},n.a.createElement("ul",{className:"list-inline"},n.a.createElement("li",{className:"list-inline-item"},n.a.createElement("div",{className:"dropdown active-item"},n.a.createElement("button",{className:"btn btn-secondary dropdown-toggle",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},this.state.value),n.a.createElement("div",{className:"dropdown-menu","aria-labelledby":"dropdownMenuButton"},n.a.createElement("div",{className:"dropdown-item",value:"2018",id:"btn-2018",onClick:this.updateDashboard},"2018"),n.a.createElement("div",{className:"dropdown-item",value:"2017",id:"btn-2017",onClick:this.updateDashboard},"2017"),n.a.createElement("div",{className:"dropdown-item",value:"2016",id:"btn-2016",onClick:this.updateDashboard},"2016")))),n.a.createElement("li",{className:"list-inline-item"},n.a.createElement("div",{className:"dropdown"},n.a.createElement("button",{className:"btn btn-secondary dropdown-toggle",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},this.state.quarterValue),n.a.createElement("div",{className:"dropdown-menu",for:"navbarDropdown","aria-labelledby":"navbarDropdown"},n.a.createElement("div",{className:"dropdown-item",disabled:!0},"--Select Quarter--"),n.a.createElement("div",{id:"btn-q1",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 1"),n.a.createElement("div",{id:"btn-q2",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 2"),n.a.createElement("div",{id:"btn-q3",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 3"),n.a.createElement("div",{id:"btn-q4",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 4"),n.a.createElement("div",{id:"btn-q5",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 1"),n.a.createElement("div",{id:"btn-q6",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 2"),n.a.createElement("div",{id:"btn-q7",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 3"),n.a.createElement("div",{id:"btn-q8",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 4"),n.a.createElement("div",{id:"btn-q9",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 1"),n.a.createElement("div",{id:"btn-q10",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 2"),n.a.createElement("div",{id:"btn-q11",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 3"),n.a.createElement("div",{id:"btn-q12",className:"dropdown-item",onClick:this.updateDashboardQuarter},"Quarter 4"))))))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-6 col-xl-4 order-xs-1 order-lg-1 order-xl-1"},n.a.createElement("div",{className:"card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column"},n.a.createElement("div",{className:"d-flex"},n.a.createElement("span",{className:"oval d-flex justify-content-center "},n.a.createElement("img",{src:"./revenuetarget.svg",alt:"fireSpot",className:"img-responsive rounded-circle",width:"20"})),n.a.createElement("p",{className:"c-portlet-title"},"Revenue Target")),n.a.createElement("div",{className:"d-flex align-items-center mb-7 kpi-block"},n.a.createElement("span",{className:"rectangle d-flex justify-content-center "}),n.a.createElement("div",{id:"kpi-target","data-up":"+","data-down":"-"}),n.a.createElement("span",{className:"h5 mb-0"},"\xa0 of target achieved")),n.a.createElement("div",{className:"kpi-block"},n.a.createElement("div",{className:"c-portlet-value"},n.a.createElement("span",{className:"h1"},"$")," ",this.state.targetRevenue),n.a.createElement("span",{className:"h5 poa"},"target this quarter"))),n.a.createElement("div",{className:"card c-portlet c-portlet--height-fluid-half d-flex align-items-start flex-column"},n.a.createElement("div",{className:"d-flex"},n.a.createElement("span",{className:"oval d-flex justify-content-center "},n.a.createElement("img",{src:"./revenue.svg",alt:"fireSpot",className:"img-responsive rounded-circle",width:"11"})),n.a.createElement("p",{className:"c-portlet-title"},"Revenue ")),n.a.createElement("div",{className:"d-flex align-items-center mb-7 kpi-block"},n.a.createElement("span",{className:"rectangle d-flex justify-content-center "}),n.a.createElement("div",{id:"pipeline-converted","data-up":"+","data-down":"-"}),n.a.createElement("span",{className:"h5 mb-0"},"\xa0 of pipeline converted")),n.a.createElement("div",{className:"kpi-block"},n.a.createElement("div",{className:"c-portlet-value"},n.a.createElement("span",{className:"h1"},"$")," ",this.state.opportunityClosedVal),n.a.createElement("span",{className:"h5 poa"},"so far")))),n.a.createElement("div",{className:"col-md-6 col-xl-8 order-2 order-md-1 order-xl-1 "},n.a.createElement("div",{className:"card c-portlet c-portlet--height-fluid"},n.a.createElement(x.a,Object.assign({},this.state.stackData,{containerBackgroundOpacity:"0"})))),n.a.createElement("div",{className:"col-md-12 col-xl-6 order-2 order-md-1 order-xl-1 "},n.a.createElement("div",{className:"card c-portlet c-portlet--height-fluid"},n.a.createElement(x.a,Object.assign({},this.state.mapData,{containerBackgroundOpacity:"0"})))),n.a.createElement("div",{className:"col-md-6 col-xl-3 order-1 order-md-1 order-xl-1 "},n.a.createElement("div",{className:"card c-portlet p-0 c-portlet--height-fluid d-flex align-items-start flex-column"},n.a.createElement("div",{className:"d-flex mb-5 pt-24 pl-24 pr-24"},n.a.createElement("span",{className:"oval d-flex justify-content-center "},n.a.createElement("img",{src:"./pipeline.svg",alt:"fireSpot",className:"img-responsive rounded-circle",width:"11"})),n.a.createElement("p",{className:"c-portlet-title"},"Pipeline")),n.a.createElement("div",{className:"d-flex mb-auto flex-column align-items-top  kpi-block pl-24 pr-24"},n.a.createElement("div",{className:"d-flex"},n.a.createElement("span",{className:"rectangle d-flex justify-content-center "}),n.a.createElement("div",null,n.a.createElement("span",{id:"opportunity-pipeline","data-up":"+","data-down":"-"}),n.a.createElement("span",{className:"h5 mb-0"},"\xa0 of opportunities in pipeline"))),n.a.createElement("div",{className:"kpi-block"},n.a.createElement("div",{className:"c-portlet-value"},n.a.createElement("span",{className:"h1"},"$")," ",this.state.opportunitySourcedVal),n.a.createElement("span",{className:"h5 poa"},"so far"))),n.a.createElement("div",{className:"deals d-flex full-width  otherInfo align-items-center"},n.a.createElement("div",{className:"mr-auto d-flex align-items-center"},n.a.createElement("div",{className:"oval justify-content-center d-flex"},n.a.createElement("img",{src:"./arrow.svg",alt:"fireSpot",className:"img-responsive rounded-circle float-left "})),n.a.createElement("span",{className:"title"},"DEALS:")),n.a.createElement("div",{className:"d-flex row"},n.a.createElement("div",{className:"col d-flex"},n.a.createElement("span",{className:"value"},"\xa0\xa0",this.state.dealsPipeline)))))),n.a.createElement("div",{className:"col-md-6 col-xl-3 order-1 order-md-1 order-xl-1 "},n.a.createElement("div",{className:"card c-portlet p-0 custom-portlet-height c-portlet--height-fluid d-flex align-items-start flex-column"},n.a.createElement("div",{className:"d-flex mb-5 pt-24 pl-24 pr-24"},n.a.createElement("span",{className:"oval d-flex justify-content-center "},n.a.createElement("img",{src:"./opportunity.svg",alt:"fireSpot",className:"img-responsive rounded-circle",width:"11"})),n.a.createElement("p",{className:"c-portlet-title"},"Opportunities")),n.a.createElement("div",{className:"d-flex mb-auto flex-column align-items-top  kpi-block pl-24 pr-24"},n.a.createElement("div",{className:"d-flex"},n.a.createElement("span",{className:"rectangle d-flex justify-content-center "}),n.a.createElement("div",null,n.a.createElement("span",{id:"leads-converted","data-up":"+","data-down":"-"}),n.a.createElement("span",{className:"h5 mb-0"},"\xa0\xa0 of leads converted to opportunities")))),n.a.createElement("div",{className:"deals d-flex full-width  otherInfo align-items-center flex-column"},n.a.createElement("div",{className:"full-width d-flex align-items-center mb-4"},n.a.createElement("div",{className:"d-flex align-items-center mr-auto "},n.a.createElement("div",{className:"oval justify-content-center d-flex"},n.a.createElement("img",{src:"./arrow.svg",alt:"fireSpot",className:"img-responsive rounded-circle float-left "})),n.a.createElement("span",{className:"title"},"SOURCED:")),n.a.createElement("div",{className:"d-flex row"},n.a.createElement("div",{className:"col d-flex"},n.a.createElement("span",{className:"value"},"\xa0\xa0",this.state.opportunitySourced)))),n.a.createElement("div",{className:"full-width d-flex align-items-center"},n.a.createElement("div",{className:"d-flex align-items-center mr-auto "},n.a.createElement("div",{className:"oval justify-content-center d-flex"},n.a.createElement("img",{src:"./arrow.svg",alt:"fireSpot",className:"img-responsive rounded-circle float-left "})),n.a.createElement("span",{className:"title"},"CLOSED:")),n.a.createElement("div",{className:"d-flex row"},n.a.createElement("div",{className:"col d-flex"},n.a.createElement("span",{className:"value"},"\xa0\xa0",this.state.opportunityClosed))))))),n.a.createElement("div",{className:"col-md-6 col-xl-9 order-2 order-md-1 order-xl-1 "},n.a.createElement("div",{className:"card c-portlet c-portlet--height-fluid"},n.a.createElement(x.a,Object.assign({},this.state.mslineData,{containerBackgroundOpacity:"0"})))),n.a.createElement("div",{className:"col-md-6 col-xl-3 order-2 order-md-1 order-xl-1 "},n.a.createElement("div",{className:"card c-portlet c-portlet--height-fluid c-portlet--height-fluid-half d-flex align-items-start flex-column"},n.a.createElement("div",{className:"d-flex mb-auto"},n.a.createElement("span",{className:"oval d-flex justify-content-center "},n.a.createElement("img",{src:"./horn.svg",alt:"fireSpot",className:"img-responsive rounded-circle",width:"16"})),n.a.createElement("p",{className:"c-portlet-title"},"Leads")),n.a.createElement("div",{className:"d-flex mb-auto flex-column align-items-top kpi-block"},n.a.createElement("div",{className:"d-flex"},n.a.createElement("span",{className:"rectangle d-flex justify-content-center "}),n.a.createElement("div",null,n.a.createElement("span",{id:"lead-difference","data-up":"+","data-down":"-"}),n.a.createElement("span",{className:"h5 mb-0"},"\xa0\xa0 of difference from last year/quarter"))),n.a.createElement("div",{className:"kpi-block"},n.a.createElement("div",{className:"c-portlet-value"},n.a.createElement("span",{className:"h1"}),this.state.leads),n.a.createElement("span",{className:"h5 poa"},"so far"))))))))}}]),t}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},4:function(e,t,a){}},[[16,2,1]]]);
//# sourceMappingURL=main.a7cc39f3.chunk.js.map