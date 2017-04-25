$('#btn_submit').click(function() {
  jQuery.get( '/twitter',
  {
  "keyword":encodeURIComponent($("#keyword").val())
},
  function(data){
    alert("data");
      console.log(data);
  }
);
  event.preventDefault();
});

$(function() {
    Dashboard.Helpers.elementExists('#daterangepicker-container', function() {


        $("#tags").tagsinput(['Samsung Galaxy S7','Apple iPhone 7']);

        $('input[name="daterange-date-and-time"]').daterangepicker();

        $('input[name="daterange-singe-date-picker"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        },
        function(start, end, label) {
            var years = moment().diff(start, 'years');
            alert("You are " + years + " years old.");
        });

        $('input[name="datefilter"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });

        $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });

        $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });

        (function() {
            var start = moment().subtract(29, 'days');
            var end = moment();

            function cb(start, end) {
                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }

            $('#reportrange').daterangepicker({
                startDate: start,
                endDate: end,
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                   'This Month': [moment().startOf('month'), moment().endOf('month')],
                   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, cb);

            cb(start, end);
        })();
    });
});
