// AI客服 - 简化版 v7
// 直接关键词匹配，优先级判断

const responses = {
  // 产品展期
  "玩具": "🧸 玩具产品在**第二期**（4月23-27日），位于B区展馆。",
  "玩具在": "🧸 玩具产品在**第二期**（4月23-27日），位于B区展馆。",
  "玩具展": "🧸 玩具产品在**第二期**（4月23-27日），位于B区展馆。",
  "玩具产品": "🧸 玩具产品在**第二期**（4月23-27日），位于B区展馆。",
  "想买玩具": "🧸 玩具产品在**第二期**（4月23-27日），位于B区展馆。",
  "买玩具": "🧸 玩具产品在**第二期**（4月23-27日），位于B区展馆。",
  "玩具在哪": "🧸 玩具产品在**第二期**（4月23-27日），位于B区展馆。",
  
  "电子": "📱 电子产品在**第一期**（4月15-19日），位于A区展馆。",
  "家电": "📺 家电产品在**第一期**（4月15-19日），位于A区展馆。",
  "机械": "⚙️ 机械产品在**第一期**（4月15-19日），位于A区展馆。",
  "建材": "🏗️ 建材产品在**第一期**（4月15-19日），位于A区展馆。",
  
  "陶瓷": "🏺 陶瓷产品在**第二期**（4月23-27日），位于B区展馆。",
  "家居": "🏠 家居产品在**第二期**（4月23-27日），位于B区展馆。",
  "礼品": "🎁 礼品产品在**第二期**（4月23-27日），位于B区展馆。",
  
  "服装": "👔 服装产品在**第二期和第三期**，位于C区展馆。",
  "纺织": "🧵 纺织产品在**第二期和第三期**，位于C区展馆。",
  
  "食品": "🍜 食品产品在**第三期**（4月底-5月初），位于D区展馆。",
  "医药": "💊 医药产品在**第三期**（4月底-5月初），位于D区展馆。",
  
  // 展馆
  "展馆": "📍 广州琶洲国际会展中心，地铁8号线琶洲站。",
  "琶洲": "📍 广州琶洲国际会展中心，地铁8号线琶洲站。",
  "地址": "📍 广州琶洲国际会展中心，地铁8号线琶洲站。",
  
  // 时间
  "春交会": "📅 2026年春交会: 4月15日-5月5日。",
  "秋交会": "📅 2026年秋交会: 10月15日-11月4日。",
  "展会时间": "📅 春交会4.15-5.5，秋交会10.15-11.4。",
  
  // 机票
  "机票": "✈️ 请告诉我您的出发城市和日期，帮您查询航班。",
  "航班": "✈️ 请告诉我您的出发城市和日期，帮您查询航班。",
  "去广州": "✈️ 请告诉我您的出发城市，帮您查机票。",
  
  // 酒店
  "酒店": "🏨 琶洲附近推荐：香格里拉、保利洲际、威斯汀。",
  "住宿": "🏨 琶洲附近推荐：香格里拉、保利洲际、威斯汀。",
  
  // 翻译
  "翻译": "🗣️ 翻译服务500-800元/天，需预约请加微信/WhatsApp: +852-46093965",
  
  // 导购
  "导购": "🛒 VIP导购800-1200元/天，5小时起。",
  "陪同": "🛒 VIP导购800-1200元/天，5小时起。",
  
  // 工厂
  "工厂": "🏭 工厂考察600-1000元/次，包含交通翻译。",
  "考察": "🏭 工厂考察600-1000元/次，包含交通翻译。",
  
  // 价格
  "价格": "💰 翻译500-800元/天，导购800-1200元/天，工厂考察600-1000元/次。",
  "收费": "💰 翻译500-800元/天，导购800-1200元/天，工厂考察600-1000元/次。",
  "多少钱": "💰 翻译500-800元/天，导购800-1200元/天，工厂考察600-1000元/次。",
  
  // 联系
  "联系": "📞 WhatsApp/微信: +852-46093965，邮箱: 1455933248@qq.com",
  "电话": "📞 WhatsApp/微信: +852-46093965",
  "微信": "📞 微信: blackhawkzh",
};

function getAnswer(question) {
  if (!question) return "您好！请告诉我您想咨询什么？";
  
  question = question.toLowerCase();
  
  // 按优先级匹配（越长的关键词越优先）
  var keys = Object.keys(responses).sort(function(a, b) {
    return b.length - a.length;
  });
  
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i].toLowerCase();
    if (question.indexOf(key) !== -1) {
      return responses[keys[i]];
    }
  }
  
  return "感谢咨询！请告诉我您需要什么服务？如翻译、导购、工厂考察等。";
}

// 聊天窗口显示/隐藏
function toggleChat() {
  var widget = document.getElementById('ai-chat-widget');
  var btn = document.getElementById('chat-toggle-btn');
  if (widget.classList.contains('show')) {
    widget.classList.remove('show');
    btn.style.display = 'block';
  } else {
    widget.classList.add('show');
    btn.style.display = 'none';
  }
}

// 发送消息
function sendMessage() {
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
}

// 回车发送
document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('chat-input');
  if (input) {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});
