function init() {
    console.log('Page Load Success');
    $.get("math-result", function (data) {
        var p = $('#result');
        var result = '';
       data.forEach(function(line){
           result += line + '<br><br>';
       });
        p.html(result)
    });
}
$(document).ready(init);