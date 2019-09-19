// Validation
$('#form').on('submit',function(e){
    e.preventDefault();

    let email = $('#email').val(),
    sort = $('#sort').val(),
    state = $('#state').val(),
    order = $('#order').val();

    // validation
    if (/@dynatrace.com\s*$/.test(email)) {
      $('.invalid-feedback').css('display','none');
   } else {
     $('.invalid-feedback').css('display','block')
     return false;
   }
   
    $.ajax({
      url: "/",
      type: "POST",
      data: {
        email: email,
        sort: sort,
        state: state,
        order: order
      },
      cache: false,
      timeout: 60000,
      beforeSend: function() {
        $(".notice").hide();
        $('.list-group, .badge-pill').html('')
        $(".load-anime").show();
        $('.bread').show();
     },
      complete: function() {
        $(".load-anime").hide();
      },

      success: function(data) {
        console.log(JSON.stringify(data));
        console.log('process sucess');
        $('.badge-pill').text(data.chats.length + ' out of ' + data.total);
        htmlImplement(data.chats);
    },
      error: function(err) {
        $('.list-group').html(JSON.stringify(err))
        console.log('process error' + JSON.stringify(err));
      },
    });
  })


function htmlImplement(data) {
      for (i = 0; i < data.length; i++) { 
      $('.list-group ').append(`
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">${data[i].conversation_message.body}</h6>
                  <small class="text-muted">Created date: ${new Date(data[i].created_at*1000)}</small>
                  </br>
                  <small class="text-muted">Chat Status: ${data[i].state}</small>
                </div>
                <span class="text-muted">
                  <a id="link_click" target="_blank" href="https://app.intercom.io/a/apps/emeshyeu/inbox/inbox/2690932/conversations/${parseFloat(data[i].id)}">Conversation</a>
                  </span>
              </li>
`)
}
}