
// Parse a date in dd-MM-yyyy format
parseMyDate = (d) => {
  if (d=="") return new Date('NotADate');
  var a = d.split('-');
  if (a.length!=3) return new Date(d);
  var m = -1; // finding the month
  if (a[1]=='Jan') m=0;
  if (a[1]=='Feb') m=1;
  if (a[1]=='Mar') m=2;
  if (a[1]=='Apr') m=3;
  if (a[1]=='May') m=4;
  if (a[1]=='Jun') m=5;
  if (a[1]=='Jul') m=6;
  if (a[1]=='Aug') m=7;
  if (a[1]=='Sep') m=8;
  if (a[1]=='Oct') m=9;
  if (a[1]=='Nov') m=10;
  if (a[1]=='Dec') m=11;
  if (m<0) return new Date(d);
  return new Date(a[2],m,a[0],0,0,0,0);
}

// Creates the calendar for a given month
createCalendar = (div, month) => {
  var idOfTextbox = div.getAttribute('datepickertextbox'); // Get the textbox id which was saved in the div
  var textbox = document.getElementById(idOfTextbox); // Find the textbox now
  var CalendTable = document.createElement('table');
  var topRow = CalendTable.insertRow(-1);

  var td = topRow.insertCell(-1);
  var lastYearBn = document.createElement('input');
  lastYearBn.type='button'; 
  td.appendChild(lastYearBn);
  lastYearBn.value='<<';
  lastYearBn.onclick=chooseDate;
  lastYearBn.setAttribute('date',new Date(month.getFullYear(),month.getMonth()-12,1,0,0,0,0).toString());

  var td = topRow.insertCell(-1);
  var lastMonthBn = document.createElement('input');
  lastMonthBn.type='button'; 
  td.appendChild(lastMonthBn);
  lastMonthBn.value='<';
  lastMonthBn.onclick=chooseDate;
  lastMonthBn.setAttribute('date',new Date(month.getFullYear(),month.getMonth()-1,1,0,0,0,0).toString());

  //For appending the Month in the textField in between in the first row.
  var td = topRow.insertCell(-1);
  td.colSpan=3;
  var mon = document.createElement('input');
  mon.type='text';
  td.appendChild(mon);
  mon.value = getMonthYearString(month);
  mon.size=15;
  mon.disabled='disabled';
  mon.className='monthDsp';

  var td = topRow.insertCell(-1);
  var nextMonthBn = document.createElement('input');
  nextMonthBn.type='button';
  td.appendChild(nextMonthBn);
  nextMonthBn.value = '>';
  nextMonthBn.onclick=chooseDate;
  nextMonthBn.setAttribute('date',new Date(month.getFullYear(),month.getMonth()+1,1,0,0,0,0).toString());

  var td = topRow.insertCell(-1);
  var nextYearBn = document.createElement('input');
  nextYearBn.type='button';
  td.appendChild(nextYearBn);
  nextYearBn.value='>>';
  nextYearBn.onclick=chooseDate;
  nextYearBn.setAttribute('date',new Date(month.getFullYear(),month.getMonth()+12,1,0,0,0,0).toString());  

  var daysRow = CalendTable.insertRow(-1);
  daysRow.insertCell(-1).innerHTML="Mon";  
  daysRow.insertCell(-1).innerHTML="Tue";
  daysRow.insertCell(-1).innerHTML="Wed";
  daysRow.insertCell(-1).innerHTML="Thu";
  daysRow.insertCell(-1).innerHTML="Fri";
  daysRow.insertCell(-1).innerHTML="Sat";
  daysRow.insertCell(-1).innerHTML="Sun";
  daysRow.className='daysRow';  

  // create the calendar
  var selected = parseMyDate(textbox.value);
  var today = new Date();
  date = new Date(month.getFullYear(),month.getMonth(),1,0,0,0,0);
  var extras = (date.getDay() + 6) % 7; // Included Last month days
  date.setDate(date.getDate()-extras); // Skip back to the previous monday

  while (1) { // Loop for each week
    var tr = CalendTable.insertRow(-1);
    for (i=0;i<7;i++) { // Loop each day of this week

      //set the date input tag with all the attributes
      var td = tr.insertCell(-1);
      var inp = document.createElement('input');
      inp.type = 'button';
      td.appendChild(inp);
      inp.value = date.getDate();
      inp.onclick = chooseDate;
      inp.setAttribute('date',getDateString(date));

      if (date.getMonth() != month.getMonth()) {
        if (inp.className) inp.className += ' ';
        inp.className+='othermonth';
      }
      if (date.getDate()==today.getDate() && date.getMonth()==today.getMonth() && date.getFullYear()==today.getFullYear()) {
        if (inp.className) inp.className += ' ';
        inp.className+='today';
      }
      if (!isNaN(selected) && date.getDate()==selected.getDate() && date.getMonth()==selected.getMonth() && date.getFullYear()==selected.getFullYear()) {
        if (inp.className) inp.className += ' ';
        inp.className+='selected';
      }
      date.setDate(date.getDate()+1);
    }
    if (date.getMonth() != month.getMonth()) {
      break;
    }
  }
  
  if (div.hasChildNodes()) { 
    div.replaceChild(CalendTable, div.childNodes[0]);
  } else {
    div.appendChild(CalendTable);
  }
}

chooseDate = (e) => {
  var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) targ = targ.parentNode;

  var div = targ.parentNode.parentNode.parentNode.parentNode.parentNode;
  var idOfTextbox = div.getAttribute('datepickertextbox');
  var textbox = document.getElementById(idOfTextbox);
  if (targ.value=='<' || targ.value=='>' || targ.value=='<<' || targ.value=='>>') {
    createCalendar(div, new Date(targ.getAttribute('date')));
    return;
  }
  textbox.value = targ.getAttribute('date'); // Set the selected date
  div.parentNode.removeChild(div); // Remove the dropdown box now
}

getDateString = (dt) => {
  return dt.getDate() + '-' + 
    ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dt.getMonth()] + 
    '-' + dt.getFullYear();
}

getMonthYearString = (dt) => {
  return ['January','February','March','April','May','June','July',
    'August','September','October','November','December'][dt.getMonth()] +
    ' ' + dt.getFullYear();
}

showDatePicker = (idOfTextbox) => {
  var textbox = document.getElementById(idOfTextbox);
  
  // See if the date picker is already there, if so, remove it
  x = textbox.parentNode.getElementsByTagName('div');
  for (i=0;i<x.length;i++) {
    if (x[i].getAttribute('class')=='datepickerdropdown') {
      textbox.parentNode.removeChild(x[i]);
      return false;
    }
  }

  var date = parseMyDate(textbox.value);
  if (isNaN(date)) date = new Date();

  // Create the box
  var div = document.createElement('div');
  div.className='datepickerdropdown';
  div.setAttribute('datepickertextbox', idOfTextbox); 
  createCalendar(div, date);
  insertAfter(div, textbox);
  return false;
}

// Adds an item after an existing one
insertAfter = (newItem, existingItem) => {
  if (existingItem.nextSibling) {
    existingItem.parentNode.insertBefore(newItem, existingItem.nextSibling); 
  } else { 
    existingItem.parentNode.appendChild(newItem);
  }
}


onDOMReady = (fn,ctx) => {
  var ready,timer;
  var onStateChange=function(e){
    if(e&&e.type=="DOMContentLoaded"){
      fireDOMReady()
    } else if(e&&e.type=="load"){
      fireDOMReady()
    } else if(document.readyState){
      if((/loaded|complete/).test(document.readyState)){
        fireDOMReady()
      } else if(!!document.documentElement.doScroll){
        try{
          ready||document.documentElement.doScroll('left')
        } catch(e){
          return
        }
        fireDOMReady()
      }
    }
  };
  var fireDOMReady = () => {
    if(!ready) {
      ready=true;
      fn.call(ctx||window);
      if(document.removeEventListener)document.removeEventListener("DOMContentLoaded",onStateChange,false);
      document.onreadystatechange=null;
      window.onload=null;
      clearInterval(timer);
      timer=null
    }
  };
  if(document.addEventListener)document.addEventListener("DOMContentLoaded",onStateChange,false);
  document.onreadystatechange=onStateChange;
  timer=setInterval(onStateChange,5);
  window.onload=onStateChange
};

onDOMReady(() => {
  // Search for elements by class
  var allElements = document.getElementsByTagName("*");
  for (i=0; i<allElements.length; i++) {
    var className = allElements[i].className;
    if (className=='datepicker' || className.indexOf('datepicker ') != -1 || className.indexOf(' datepicker') != -1) {
      // If found, add a datepicker next to it  
      
      var a = document.createElement('a');
      a.href='#';
      a.className="datepickershow";
      a.setAttribute('onclick','return showDatePicker("' + allElements[i].id + '")');

      //calendar Icon.
      var img = document.createElement('img');
      img.src='./calendarIcon.svg';
      img.title='Show calendar';
      a.appendChild(img);
      insertAfter(a, allElements[i]);
    }
  }
});
