<script>
// AI客服功能
document.addEventListener('DOMContentLoaded', function() {
  window.toggleChat = function() {
    var widget = document.getElementById('ai-chat-widget');
    var btn = document.getElementById('chat-toggle-btn');
    if (!widget || !btn) return;
    if (widget.classList.contains('show')) {
      widget.classList.remove('show');
      btn.style.display = 'block';
    } else {
      widget.classList.add('show');
      btn.style.display = 'none';
    }
  };
  
  window.sendMessage = function() {
    var input = document.getElementById('chat-input');
    var message = input.value.trim();
    if (!message) return;
    
    var messagesDiv = document.getElementById('chat-messages');
    messagesDiv.innerHTML += '<div class="chat-message user">' + message + '</div>';
    
    setTimeout(function() {
      var answer = getAnswer(message);
      messagesDiv.innerHTML += '<div class="chat-message bot">' + answer.replace(/\n/g, '<br>') + '</div>';
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 500);
    
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };
  
  var input = document.getElementById('chat-input');
  if (input) {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        window.sendMessage();
      }
    });
  }
});
</script>
