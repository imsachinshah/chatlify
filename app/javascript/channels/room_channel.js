$(function() {
    // console.log('hello')
  $('[data-channel-subscribe="room"]').each(function(index, element) {
    var $element = $(element),
        room_id = $element.data('room-id'),
        username = $element.data('username')
        messageTemplate = $('[data-role="message-template"]');
        // console.log(username)

    $element.animate({ scrollTop: $element.prop("scrollHeight")}, 1000)        

    App.cable.subscriptions.create(
      {
        channel: "RoomChannel",
        room: room_id,
        user: username
      },
      {  
        received: function(data) {
          // console.log(data)
          var content = messageTemplate.children().clone(true, true);
          content.find('[data-role="user-avatar"]').attr('src', data.room_message.user_avatar_url);
          content.find('[data-role="message-text"]').text(data.room_message.message);
          content.find('[data-role="message-username"]').text(data.username);
          content.find('[data-role="message-date"]').text(data.room_message.updated_at);
          $element.append(content);
          $element.animate({ scrollTop: $element.prop("scrollHeight")}, 1000);
          $('.chat-input').val('');
        }
      }
    );
  });
});