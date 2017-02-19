function init() {
    console.log('Document Ready State.');
    $('#fileupload').fileupload({
        dataType: 'json',
        add: function (e, data) {
            data.context = $('<button/>').text('Upload')
                .appendTo(document.body)
                .click(function () {
                    data.submit();
                });
        },
        done: function (e, data) {
            if(data.result && data.result.length){
                $('#result').html(data.result.join('<br>'));
            }else{
                $('#result').html('Upload Done Something went wrong.');
            }
        }
    });
}
$(document).ready(init);