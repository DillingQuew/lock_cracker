$(document).on('click', '#button',  function() {
   let name = 'John';
   let age = 35;
   
   $.ajax({
      url:  'php/action.php',
      type:  'POST',
      dataType:  'json',
      data: {
          name: name,
          age: age
      }, success: function(data){
         $('p.out').text(data.name + ' ' + data.age);
      }
   });
});