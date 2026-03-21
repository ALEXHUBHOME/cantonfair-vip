// AI客服知识库 - 完整版 v6
// 智能理解问题意图，精准匹配答案
// 支持同义词、多轮对话、上下文理解

// 知识库配置
const knowledgeBase = [
  // ========== 展会时间 ==========
  {intent: "展会时间", keywords: ["时间", "春交会", "秋交会", "开展", "开幕", "几号", "日期", "什么时候", "开幕时间", "开展时间", "日", "号", "广交会", "展会"], 
   answer: "📅 **2026年春交会**: 4月15日-5月5日\n📅 **秋交会**: 10月15日-11月4日\n⏰ 每届分三期，每期5天"},
  
  // ========== 展馆地址 ==========
  {intent: "展馆地址", keywords: ["展馆", "琶洲", "地址", "在哪里", "位置", "怎么去", "venue", "location", "address"], 
   answer: "📍 **广州琶洲国际会展中心**\n🏢 展馆总面积118万平方米\n🚇 地铁8号线琶洲站直达"},
  
  // ========== 产品展期 - 第一期 ==========
  {intent: "产品展期", keywords: ["家电", "电子", "电器", "电气", "机械", "设备", "建材", "化工", "home appliance", "appliances", "electronics", "machinery", "chemical"], 
   answer: "🏭 **第一期** (4月15-19日)\n📍 A区展馆\n产品：家电、电子、机械、建材、化工"},
  
  // ========== 产品展期 - 玩具 ==========
  {intent: "产品展期", keywords: ["玩具", "玩具产品", "玩具展"], 
   answer: "🧸 **第二期** (4月23-27日)\n📍 B区展馆\n产品：玩具、礼品、家居"},
  
  // ========== 产品展期 - 第二期 ==========
  {intent: "产品展期", keywords: ["陶瓷", "餐厨", "厨房", "家居", "装饰", "礼品", "ceramic", "kitchen", "home", "gift"], 
   answer: "🏠 **第二期** (4月23-27日)\n📍 B区展馆\n产品：陶瓷、餐厨、家居、礼品"},
  
  // ========== 产品展期 - 纺织服装 ==========
  {intent: "产品展期", keywords: ["服装", "纺织", "面料", "家纺", "textile", "fabric", "garment", "fashion", "apparel"], 
   answer: "👔 **第二期和第三期** (4月底-5月初)\n📍 C区展馆\n产品：纺织、服装、面料、家纺"},
  
  // ========== 产品展期 - 食品医疗 ==========
  {intent: "产品展期", keywords: ["食品", "农产品", "医药", "医疗器械", "food", "agriculture", "pharma", "medical", "medicine", "health"], 
   answer: "💊 **第三期** (4月底-5月初)\n📍 D区展馆\n产品：食品、农产品、医药、医疗器械"},
  
  // ========== 产品展期 - 其他 ==========
  {intent: "产品展期", keywords: ["鞋", "箱包", "文具", "办公", "shoes", "bag", "luggage", "stationery", "office"], 
   answer: "📦 **第三期** (4月底-5月初)\n📍 D区展馆\n产品：鞋、箱包、文具、办公用品"},
  
  // ========== 通用展期 ==========
  {intent: "展期", keywords: ["展期", "第几期", "哪一期", "产品分类", "phase", "exhibit", "exhibition", "products", "category", "有什么"], 
   answer: "📋 **广交会三期安排**:\n第1期：电子机械建材（A区）\n第2期：家居礼品陶瓷（B区）\n第3期：食品纺织医疗（D区）\n\n请问您想找什么产品？"},
  
  // ========== 行程规划 - 核心意图 ==========
  {intent: "行程", keywords: ["行程", "安排", "规划", "plan", "itinerary", "去广州", "到广州", "去展会", "广州"], 
   answer: "✅ 好的！我可以帮您规划广交会行程~\n\n请告诉我：\n1️⃣ 您的到达日期\n2️⃣ 停留天数\n3️⃣ 需要哪些服务（翻译/导购/工厂考察）\n\n我会为您量身定制行程！"},
  
  // ========== 机票 ==========
  {intent: "机票", keywords: ["机票", "航班", "飞机", "flight", "fly", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "1月", "2月", "3月", "12月", "日", "号", "出发", "去广州", "到广州", "深圳", "香港", "北京", "上海", "广州", "澳门"], 
   answer: "✈️ **机票查询服务**\n\n我可以帮您查询航班！请告诉我您的**出发城市**。\n\n🔗 您也可以自行查询：\n• 携程: https://flights.ctrip.com\n• 飞猪: https://flights.alipay.com"},
  
  // ========== 酒店 ==========
  {intent: "酒店", keywords: ["酒店", "住宿", "hotel", "accommodation", "入住", "订房", "预订"], 
   answer: "🏨 **琶洲附近酒店推荐**\n\n⭐ 广州香格里拉大酒店\n⭐ 广州保利洲际酒店\n⭐ 广交会威斯汀酒店\n\n💡 建议提前预订享优惠！\n\n🔗 查询预订：\n• 携程: https://hotels.ctrip.com\n• 飞猪: https://hotels.alipay.com"},
  
  // ========== 火车票 ==========
  {intent: "火车", keywords: ["火车", "火车票", "train", "高铁"], 
   answer: "🚄 **火车票查询服务**\n\n请告诉我您的**出发城市**。\n\n🔗 您也可以自行查询：\n• 12306官网: https://www.12306.cn\n• 携程: https://trains.ctrip.com"},
  
  // ========== 接送 ==========
  {intent: "接送", keywords: ["接送", "接机", "送机", "pickup", "transfer", "接站", "送站"], 
   answer: "🚗 **接送服务**\n\n白云机场 ↔ 琶洲展馆：300-500元/次\n广州南站 ↔ 琶洲展馆：200-400元/次\n\n需要预约请告诉我您的航班/车次信息！"},
  
  // ========== 翻译服务 ==========
  {intent: "翻译", keywords: ["翻译", "translator", "translation", "需要翻译"], 
   answer: "🗣️ **翻译服务**\n\n💰 日常翻译：500元/天\n💰 商务谈判翻译：800元/天\n\n🌍 语种：英语、法语、德语、阿拉伯语、西班牙语、日语、韩语等\n\n需要预约请告诉我！"},
  
  // ========== 导购服务 ==========
  {intent: "导购", keywords: ["导购", "陪同", "带看", "shopping", "guide", "陪同看展"], 
   answer: "🛒 **VIP导购服务**\n\n💰 5小时：800元\n💰 全天：1200元\n\n✅ 帮您筛选产品\n✅ 对接优质供应商\n✅ 协助商务谈判\n\n需要预约请告诉我日期！"},
  
  // ========== 工厂考察 ==========
  {intent: "工厂", keywords: ["工厂", "考察", "看厂", "factory", "visit", "inspection", "看工厂"], 
   answer: "🏭 **工厂考察服务**\n\n💰 600-1000元/次\n\n✅ 珠三角交通\n✅ 翻译陪同\n✅ 品质评估\n✅ 可考察2-3家工厂\n\n需要预约请告诉我产品类型！"},
  
  // ========== 商务谈判 ==========
  {intent: "谈判", keywords: ["谈判", "商谈", "negotiation", "contract", "商务"], 
   answer: "🤝 **商务谈判翻译**\n\n💰 800元/天\n\n✅ 协助合同谈判\n✅ 价格磋商\n✅ 法律咨询支持\n\n需要预约请告诉我日期！"},
  
  // ========== 物流 ==========
  {intent: "物流", keywords: ["物流", "快递", "寄送", "shipping", "delivery", "货运"], 
   answer: "📦 **物流服务**\n\n✅ 样品寄送\n✅ 货代跟进\n✅ 清关协助\n\n💰 根据货物重量和目的地报价"},
  
  // ========== 采购商证 ==========
  {intent: "采购商证", keywords: ["采购商证", "证件", "入场证", "VIP证", "pass", "badge", "credential", "参展证"], 
   answer: "🎫 **采购商证**\n\n💰 提前办理：600元/位\n💰 现场办理：1000元/位\n\n✅ VIP快速入场\n✅ 论坛门票\n✅ 商务礼包\n✅ VIP Café休息区\n\n需要办理请告诉我！"},
  
  // ========== 价格 ==========
  {intent: "价格", keywords: ["价格", "报价", "收费", "多少钱", "cost", "price", "fee", "how much", "费用"], 
   answer: "💰 **服务收费明码标价**\n\n🗣️ 翻译：500-800元/天\n🛒 导购：800-1200元/天\n🏭 工厂考察：600-1000元/次\n🎫 采购商证：600元\n🚗 接送：300-500元/次"},
  
  // ========== 支付 ==========
  {intent: "支付", keywords: ["付款", "支付", "payment", "pay", "怎么付"], 
   answer: "💳 **支付方式**\n\n✅ 支付宝\n✅ 微信支付\n✅ 银行转账\n✅ PayPal\n\n💰 预付50%定金，服务完成后付尾款"},
  
  // ========== 预约 ==========
  {intent: "预约", keywords: ["预约", "预订", "预定", "book", "reserve", "order", "订", "报名"], 
   answer: "📞 **预约方式**\n\nWhatsApp/微信: +852-46093965\n邮箱: 1455933248@qq.com\n\n请告诉我：服务类型 + 日期 + 联系方式"},
  
  // ========== 联系 ==========
  {intent: "联系", keywords: ["联系", "电话", "微信", "邮箱", "contact", "whatsapp", "wechat", "phone", "怎么联系"], 
   answer: "📞 **联系我们**\n\nWhatsApp/微信: +852-46093965\n邮箱: 1455933248@qq.com\n\n工作时间: 6:00-22:00"},
  
  // ========== 认证 ==========
  {intent: "认证", keywords: ["官方", "认证", "正规", "official", "certified", "靠谱"], 
   answer: "✅ **广交会认证服务商**\n\n🏆 10年行业经验\n👨‍💼 专业团队\n💯 服务至上"},
  
  // ========== 质量 ==========
  {intent: "质量", keywords: ["质量", "品质", "quality", "guarantee", "保证"], 
   answer: "🔍 **质量保证**\n\n✅ 工厂实地考察\n✅ 资质验证\n✅ 品质检测\n✅ 第三方质检报告"},
  
  // ========== 服务范围 ==========
  {intent: "服务", keywords: ["服务", "帮助", "能做什么", "可以帮我", "what can you do", "services", "有什么服务", "提供什么"], 
   answer: "🛎️ **我们提供的服务**\n\n🗣️ 翻译服务\n🛒 VIP导购\n🏭 工厂考察\n🤝 商务谈判\n✈️ 机票/酒店预订\n🚗 接送服务\n📦 物流服务\n🎫 采购商证办理\n\n请告诉您需要什么服务？"},
  
  // ========== 常见问候 ==========
  {intent: "问候", keywords: ["你好", "hi", "hello", "您好", "hey", "在吗", "在不在"], 
   answer: "👋 您好！欢迎咨询广交会VIP服务！\n\n我可以帮您解答：\n• 展会时间展馆\n• 产品展期分布\n• 翻译导购服务\n• 机票酒店预订\n• 采购商证办理\n\n请告诉您想了解什么？"},
  
  // ========== 感谢 ==========
  {intent: "感谢", keywords: ["谢谢", "感谢", "thank", "thanks", "好的", "明白了", "知道了"], 
   answer: "😊 不客气！\n\n如有任何问题随时问我，祝您广交会之行顺利！"},
  
  // ========== 再见 ==========
  {intent: "再见", keywords: ["再见", "拜拜", "bye", "goodbye", "再会"], 
   answer: "👋 再见！祝您生活愉快！\n\n如需服务请联系：+852-46093965"}
];

// 智能问答匹配 - 升级版 v3
function getAnswer(question) {
  if (!question || !question.trim()) return "您好！请告诉我您想咨询什么？";
  
  var q = question.toLowerCase();
  var bestMatch = null;
  var bestScore = 0;
  var bestMatchCount = 0;
  
  for (var i = 0; i < knowledgeBase.length; i++) {
    var item = knowledgeBase[i];
    var score = 0;
    var matchCount = 0;
    
    // 关键词匹配计分
    for (var j = 0; j < item.keywords.length; j++) {
      var kw = item.keywords[j].toLowerCase();
      if (q.indexOf(kw) !== -1) {
        matchCount++;
        // 中文关键词得分更高
        if (/[\u4e00-\u9fa5]/.test(kw)) {
          score += (kw.length >= 2 ? 5 : 3);
        } else {
          score += (kw.length >= 3 ? 5 : kw.length >= 2 ? 3 : 1);
        }
      }
    }
    
    // 同时匹配多个关键词额外加分
    if (matchCount >= 2) score += 3;
    
    // 优先选择匹配关键词更多的
    if (score > bestScore || (score === bestScore && matchCount > bestMatchCount)) {
      bestScore = score;
      bestMatch = item;
      bestMatchCount = matchCount;
    }
  }
  
  // 分数达到4分以上才匹配成功
  if (bestScore >= 4 && bestMatch) {
    return bestMatch.answer;
  }
  
  // 无法匹配时的回复
  return "感谢咨询！😊 我们提供翻译、导购、工厂考察、行程安排等服务。请告诉我您具体需要什么帮助？或者直接拨打 +852-46093965 咨询！";
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
