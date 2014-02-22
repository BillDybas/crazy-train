function param(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loadEvents() {
  $.getJSON('https://sse.se.rit.edu/events.json', function(data){
    var source   = $("#event-template").html();
    var template = Handlebars.compile(source);
    var events = $('#events');
    for(var i = 0; i < data.length; i++){
      var obj = data[i];
      var html = template(obj);
      events.append(html);
    }
  });
}

function loadEvent(id) {
  $.getJSON('https://sse.se.rit.edu/events/'+ id + '.json', function(data){
    var source   = $("#event-template").html();
    var template = Handlebars.compile(source);
    $('#event').append(template(data));
  });
}

var DateFormats = {
   date: 'dddd M/DD',
   time: 'h:mm a'
};

Handlebars.registerHelper("formatDateRange", function(startTime, endTime) {
  var date = 'dddd M/DD';
  var time = 'h:mm a';
  var dateString = moment(startTime).format(date + ', ' + time);
  if(moment(startTime).format(date) !== moment(endTime).format(date)){
    dateString += ' - ' + moment(endTime).format(date + ', ' + time);
  } else {
    dateString += ' - ' + moment(endTime).format(time);
  }
  return dateString;
});

Handlebars.registerHelper("checkEmpty", function(string, alternate){
  if(string === ''){
    return alternate;
  }
  return string;
});

function filter(committee){
  if(committee === 0 ){
    $('.event-preview-wrapper').each(function(index, element){
      element.style.display = 'block';
    })
  } else {
    $('.event-preview-wrapper').each(function(index, element){
      if($(element).hasClass(committee)){
        element.style.display='block';
      }else{
        element.style.display='none';
      }
    });
  }
}
