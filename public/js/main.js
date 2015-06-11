$(function() {

  $('.del').click(function(e) {
    var target = $(e.target);
    var id = target.context.id;
    var div = $('#item_' + id);

    $.ajax({
      type: 'DELETE',
      url: '/todos?id=' + id
    })
    .done(function(results) {
      if (results.success === 1) {
        div.remove();
      }
    });
  });

  $('#search').click(function(e) {
    var content = $('#inputSearch').val();
    if (!content) 
    {
      alert('Please input your what you want to search');
    }
    else
    {
      $.ajax({
        type: 'GET',
        url: '/todos?content=' + content
      })
      .done(function(results) {
        console.log(results);
        $('.content > div').hide();
        if (results.success === 1) {
          var resultArray = results.result;
          for (var i = 0; i < resultArray.length; i++) {
            var id = resultArray[i]._id;
            var div = $('#item_' + id);
            div.show();
          }
        }
      });
    }
  });

  var error = $('div.error').text();
  if ( error )
  {
    alert(error);
  }
  
});