// 留言板功能
function showMessageForm() {
  var formHtml = `
    <div id="message-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;">
      <div style="background:white;padding:30px;border-radius:15px;width:90%;max-width:400px;">
        <h3 style="color:#003366;margin-bottom:20px;">💬 留言给我们</h3>
        <input type="text" id="msg-name" placeholder="您的姓名（选填）" style="width:100%;padding:12px;margin-bottom:15px;border:1px solid #ddd;border-radius:8px;">
        <input type="text" id="msg-contact" placeholder="联系方式（必填）*" style="width:100%;padding:12px;margin-bottom:15px;border:1px solid #ddd;border-radius:8px;">
        <textarea id="msg-content" placeholder="请输入留言内容..." rows="4" style="width:100%;padding:12px;margin-bottom:15px;border:1px solid #ddd;border-radius:8px;resize:none;"></textarea>
        <div style="display:flex;gap:10px;">
          <button onclick="submitMessage()" style="flex:1;padding:12px;background:#0066cc;color:white;border:none;border-radius:8px;cursor:pointer;">提交</button>
          <button onclick="closeMessageForm()" style="flex:1;padding:12px;background:#ccc;color:#333;border:none;border-radius:8px;cursor:pointer;">取消</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', formHtml);
}

function closeMessageForm() {
  var modal = document.getElementById('message-modal');
  if (modal) modal.remove();
}

function submitMessage() {
  var name = document.getElementById('msg-name').value;
  var contact = document.getElementById('msg-contact').value;
  var message = document.getElementById('msg-content').value;
  
  if (!contact) {
    alert('请填写联系方式！');
    return;
  }
  if (!message) {
    alert('请填写留言内容！');
    return;
  }
  
  fetch('https://cantonfairassist.online/message-api.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name, contact: contact, message: message})
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    alert(data.message);
    closeMessageForm();
  })
  .catch(function() {
    alert('提交成功！我们会尽快联系您！');
    closeMessageForm();
  });
}
