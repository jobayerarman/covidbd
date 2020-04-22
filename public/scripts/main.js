window["moment-range"].extendMoment(moment);let chartColors={greenDark:"rgb(60, 162, 65, 0.7)",greenLight:"rgb(88, 197, 102, 0.7)",yellowLight:"rgb(255, 237, 38, 0.7)",yellowDark:"rgb(199, 161, 13, 0.7)",orangeLight:"rgb(255, 105, 29, 0.7)",redLight:"rgb(255, 61, 19, 0.7)",redDark:"rgb(192, 19, 28, 0.7)"},colorNames=Object.keys(chartColors),getRangeNumber=Y=>Y>999?Math.floor(Y/1e4*colorNames.length):Y>99?Math.floor(Y/1e3*colorNames.length):Math.floor(Y/100*colorNames.length),dateLabels=["১ মার্চ","৮ মার্চ","১৫ মার্চ","১৬ মার্চ","১৭ মার্চ","১৮ মার্চ","১৯ মার্চ","২০ মার্চ","২১ মার্চ","২২ মার্চ","২৩ মার্চ","২৪ মার্চ","২৫ মার্চ","২৬ মার্চ","২৭ মার্চ","২৮ মার্চ","২৯ মার্চ","৩০ মার্চ","৩১ মার্চ","১ এপ্রিল","২ এপ্রিল","৩ এপ্রিল","৪ এপ্রিল","৫ এপ্রিল","৬ এপ্রিল","৭ এপ্রিল","৮ এপ্রিল","৯ এপ্রিল","১০ এপ্রিল","১১ এপ্রিল","১২ এপ্রিল","১৩ এপ্রিল","১৪ এপ্রিল","১৫ এপ্রিল","১৬ এপ্রিল","১৭ এপ্রিল","১৮ এপ্রিল","১৯ এপ্রিল","২০ এপ্রিল","২১ এপ্রিল"],deathData={labels:dateLabels,datasets:[{label:"মোট মৃতের সংখ্যা",backgroundColor:"rgb(243, 58, 63)",borderColor:"rgb(243, 58, 63)",fill:!1,data:[0,0,0,0,0,1,1,1,2,2,3,4,5,5,5,5,5,5,5,6,6,6,8,9,12,17,20,21,27,30,34,39,46,50,60,75,84,91,101,110]}]},deathConfig={type:"line",data:deathData,options:{responsive:!0,maintainAspectRatio:!1,title:{display:!0,fontSize:20,text:"মোট মৃতের সংখ্যা"},legend:{position:"bottom"},tooltips:{mode:"index",intersect:!1}}},now=moment().format("YYYY-MM-DD"),range=moment().range("2020-03-08",now),dateArray=Array.from(range.by("days")),dates=dateArray.map(Y=>Y.format("YYYY-MM-DD")),caseNewArray=()=>{},caseTotalArray=()=>{},deathTotalArray=()=>{},casesConfig={type:"line",data:{labels:dates,datasets:[{label:"নতুন শনাক্ত",backgroundColor:"rgb(250, 196, 29)",borderColor:"rgb(250, 196, 29)",fill:!1,data:[{x:moment("01-03-2020","DD-MM-YYYY"),y:0},{x:moment("08-03-2020","DD-MM-YYYY"),y:3},{x:moment("15-03-2020","DD-MM-YYYY"),y:2},{x:moment("16-03-2020","DD-MM-YYYY"),y:3},{x:moment("17-03-2020","DD-MM-YYYY"),y:2},{x:moment("18-03-2020","DD-MM-YYYY"),y:4},{x:moment("19-03-2020","DD-MM-YYYY"),y:3},{x:moment("20-03-2020","DD-MM-YYYY"),y:3},{x:moment("21-03-2020","DD-MM-YYYY"),y:4},{x:moment("22-03-2020","DD-MM-YYYY"),y:3},{x:moment("23-03-2020","DD-MM-YYYY"),y:6},{x:moment("24-03-2020","DD-MM-YYYY"),y:6},{x:moment("26-03-2020","DD-MM-YYYY"),y:5},{x:moment("27-03-2020","DD-MM-YYYY"),y:4},{x:moment("30-03-2020","DD-MM-YYYY"),y:1},{x:moment("31-03-2020","DD-MM-YYYY"),y:2},{x:moment("01-04-2020","DD-MM-YYYY"),y:3},{x:moment("02-04-2020","DD-MM-YYYY"),y:2},{x:moment("03-04-2020","DD-MM-YYYY"),y:5},{x:moment("04-04-2020","DD-MM-YYYY"),y:9},{x:moment("05-04-2020","DD-MM-YYYY"),y:18},{x:moment("06-04-2020","DD-MM-YYYY"),y:35},{x:moment("07-04-2020","DD-MM-YYYY"),y:41},{x:moment("08-04-2020","DD-MM-YYYY"),y:54},{x:moment("09-04-2020","DD-MM-YYYY"),y:112},{x:moment("10-04-2020","DD-MM-YYYY"),y:94},{x:moment("11-04-2020","DD-MM-YYYY"),y:58},{x:moment("12-04-2020","DD-MM-YYYY"),y:139},{x:moment("13-04-2020","DD-MM-YYYY"),y:182},{x:moment("14-04-2020","DD-MM-YYYY"),y:209},{x:moment("15-04-2020","DD-MM-YYYY"),y:219},{x:moment("16-04-2020","DD-MM-YYYY"),y:341},{x:moment("17-04-2020","DD-MM-YYYY"),y:266},{x:moment("18-04-2020","DD-MM-YYYY"),y:306},{x:moment("19-04-2020","DD-MM-YYYY"),y:312},{x:moment("20-04-2020","DD-MM-YYYY"),y:492},{x:moment("21-04-2020","DD-MM-YYYY"),y:434}]},{label:"মোট শনাক্ত",backgroundColor:"rgb(241, 118, 0)",borderColor:"rgb(241, 118, 0)",fill:!1,data:[{x:moment("01-03-2020","DD-MM-YYYY"),y:0},{x:moment("08-03-2020","DD-MM-YYYY"),y:3},{x:moment("15-03-2020","DD-MM-YYYY"),y:5},{x:moment("16-03-2020","DD-MM-YYYY"),y:8},{x:moment("17-03-2020","DD-MM-YYYY"),y:10},{x:moment("18-03-2020","DD-MM-YYYY"),y:14},{x:moment("19-03-2020","DD-MM-YYYY"),y:17},{x:moment("20-03-2020","DD-MM-YYYY"),y:20},{x:moment("21-03-2020","DD-MM-YYYY"),y:24},{x:moment("22-03-2020","DD-MM-YYYY"),y:27},{x:moment("23-03-2020","DD-MM-YYYY"),y:33},{x:moment("24-03-2020","DD-MM-YYYY"),y:39},{x:moment("26-03-2020","DD-MM-YYYY"),y:44},{x:moment("27-03-2020","DD-MM-YYYY"),y:48},{x:moment("30-03-2020","DD-MM-YYYY"),y:49},{x:moment("31-03-2020","DD-MM-YYYY"),y:51},{x:moment("01-04-2020","DD-MM-YYYY"),y:54},{x:moment("02-04-2020","DD-MM-YYYY"),y:56},{x:moment("03-04-2020","DD-MM-YYYY"),y:61},{x:moment("04-04-2020","DD-MM-YYYY"),y:70},{x:moment("05-04-2020","DD-MM-YYYY"),y:88},{x:moment("06-04-2020","DD-MM-YYYY"),y:123},{x:moment("07-04-2020","DD-MM-YYYY"),y:164},{x:moment("08-04-2020","DD-MM-YYYY"),y:218},{x:moment("09-04-2020","DD-MM-YYYY"),y:330},{x:moment("10-04-2020","DD-MM-YYYY"),y:424},{x:moment("11-04-2020","DD-MM-YYYY"),y:482},{x:moment("12-04-2020","DD-MM-YYYY"),y:621},{x:moment("13-04-2020","DD-MM-YYYY"),y:803},{x:moment("14-04-2020","DD-MM-YYYY"),y:1012},{x:moment("15-04-2020","DD-MM-YYYY"),y:1231},{x:moment("16-04-2020","DD-MM-YYYY"),y:1572},{x:moment("17-04-2020","DD-MM-YYYY"),y:1838},{x:moment("18-04-2020","DD-MM-YYYY"),y:2144},{x:moment("19-04-2020","DD-MM-YYYY"),y:2456},{x:moment("20-04-2020","DD-MM-YYYY"),y:2948},{x:moment("21-04-2020","DD-MM-YYYY"),y:3382}]}]},options:{responsive:!0,maintainAspectRatio:!1,title:{display:!0,fontSize:20,text:"নতুন ও মোট শনাক্তের সংখ্যা"},legend:{position:"bottom"},tooltips:{mode:"index",intersect:!1},scales:{xAxes:[{type:"time",time:{unit:"day"},scaleLabel:{display:!0,labelString:"তারিখ"}}],yAxes:[{scaleLabel:{display:!0,labelString:"সংখ্যা"}}]}}};const divisionData=[],buildDivisionData=()=>{let Y=[];return divisionData.forEach((t,e)=>{let o=colorNames[getRangeNumber(t.data)],a=chartColors[o],m={label:t.label,backgroundColor:a,borderColor:a,borderWidth:1,data:[t.data]};Y.push(m),console.log(getRangeNumber(t.data))}),Y};let divisionDatasets=buildDivisionData(),divisionConfig={type:"bar",data:{labels:" ",datasets:divisionDatasets},options:{responsive:!0,maintainAspectRatio:!1,title:{display:!0,fontSize:20,text:"বিভাগীয় আক্রান্তের সংখ্যা"},legend:{position:"bottom"},tooltips:{mode:"point",intersect:!1},scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}};const districtLabels=[],districtData=[],buildDistrictData=()=>{let Y=[];return districtData.forEach((t,e)=>{let o=colorNames[getRangeNumber(t.data)],a=chartColors[o],m={label:t.label,backgroundColor:a,borderColor:a,borderWidth:1,data:[t.data]};Y.push(m),console.log(getRangeNumber(t.data))}),Y};let districtDatasets=buildDistrictData(),districtConfig={type:"bar",data:{labels:" ",datasets:districtDatasets},options:{responsive:!0,maintainAspectRatio:!1,title:{display:!0,fontSize:20,text:"জেলাভিত্তিক আক্রান্তের সংখ্যা"},legend:{display:!1,position:"bottom"},tooltips:{mode:"point",intersect:!0}}};window.onload=()=>{let Y=document.getElementById("coronaCasesByTime").getContext("2d");window.coronaCases=new Chart(Y,casesConfig);let t=document.getElementById("coronaDeathByTime").getContext("2d");window.coronaDeaths=new Chart(t,deathConfig)},$(document).ready((function(){let Y="20%",t="264px";/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(Y="42%",t="300px"),$(".datatable").DataTable({order:[[1,"desc"]],scrollY:t,scrollCollapse:!0,paging:!1,columnDefs:[{width:Y,targets:1}],bInfo:!1,oLanguage:{sSearch:"সার্চঃ"}})}));