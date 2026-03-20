// AI客服知识库
const knowledgeBase = [
  // 展会时间
  {keywords: ["时间", "春交会", "秋交会", "什么时候", "开展", "开幕"], answer: "2026年春交会: 4月15日-5月5日。秋交会: 10月15日-11月4日。每届分三期，每期5天。"},
  // 展馆地址
  {keywords: ["展馆", "琶洲", "地址", "在哪里"], answer: "广州琶洲国际会展中心，展馆总面积118万平方米。地铁8号线琶洲站。"},
  
  // ========== 展期和产品分类 ==========
  {keywords: ["家电", "电子", "电器", "电气", "机械", "设备", "建材", "化工", "摩托车", "汽车配件"], answer: "这些产品在**第一期**（4月15-19日/10月15-19日），位于A区展馆。"},
  {keywords: ["陶瓷", "餐厨", "厨房", "家居", "装饰", "礼品", "工艺", "玩具", "宠物", "园林"], answer: "这些产品在**第二期**（4月23-27日/10月23-27日），位于B区展馆。"},
  {keywords: ["服装", "纺织", "面料", "家纺", "服饰"], answer: "纺织服装在**第二期和第三期**，位于C区展馆。"},
  {keywords: ["食品", "农产品", "医药", "医疗器械", "药品", "保健"], answer: "这些产品在**第三期**（4月底-5月初/10月底-11月初），位于D区展馆。"},
  {keywords: ["鞋", "箱包", "文具", "办公"], answer: "这些产品在**第三期**，位于D区展馆。"},
  {keywords: ["展期", "第几期", "哪一期", "产品分类", "什么时候"], answer: "广交会每届分三期：第一期（电子机械建材）、第二期（家居礼品陶瓷）、第三期（食品纺织医疗）。请问您想找什么产品？"},
  
  // ========== 服务项目 ==========
  {keywords: ["翻译"], answer: "翻译服务500-800元/天：日常翻译500元，商务谈判翻译800元。语种：英语、法语、德语、阿拉伯语、西班牙语、日语、韩语等。"},
  {keywords: ["导购", "陪同", "带看"], answer: "VIP导购服务：5小时800元，全天1200元。帮您筛选产品、对接供应商、协助谈判。"},
  {keywords: ["工厂", "考察", "看厂"], answer: "工厂考察600-1000元/次，包含珠三角交通、翻译陪同、品质评估。可考察2-3家工厂。"},
  {keywords: ["谈判", "商谈"], answer: "商务谈判翻译800元/天，协助合同谈判、价格磋商。"},
  {keywords: ["行程", "酒店", "机票", "火车票", "接送"], answer: "行程安排服务：免费帮您预订酒店、查询机票/火车票信息，提供行程规划建议。"},
  {keywords: ["物流", "快递", "寄送"], answer: "物流服务：样品寄送、货代跟进，一站式服务。"},
  {keywords: ["采购商证", "证件", "入场证", "VIP证"], answer: "采购商证：提前办理600元/位，现场1000元/位。含VIP快速入场、论坛门票、商务礼包、VIP Café休息区。"},
  {keywords: ["价格", "报价", "收费", "多少钱"], answer: "翻译500-800元/天，导购800-1200元/天，工厂考察600-1000元/次，采购商证600元。"},
  
  // ========== 支付和联系 ==========
  {keywords: ["付款", "支付", "怎么付"], answer: "支付方式：支付宝、微信、银行转账、PayPal。预付50%定金，服务完成后付尾款。"},
  {keywords: ["预约", "预订", "怎么联系"], answer: "预约方式：WhatsApp/微信: +852-46093965 / 邮箱: 1455933248@qq.com"},
  {keywords: ["联系", "电话", "微信", "邮箱"], answer: "联系我们：电话/WhatsApp: +852-46093965，邮箱: 1455933248@qq.com"},
  
  // ========== 质量和认证 ==========
  {keywords: ["官方", "认证", "正规"], answer: "广交会认证服务商，10年行业经验，专业团队。"},
  {keywords: ["质量", "品质", "怎么保证"], answer: "工厂实地考察、资质验证、品质检测，严格把控产品质量。"}
];

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

// 根据问题获取答案
function getAnswer(question) {
  var q = question.toLowerCase();
  for (var i = 0; i < knowledgeBase.length; i++) {
    var item = knowledgeBase[i];
    for (var j = 0; j < item.keywords.length; j++) {
      if (q.indexOf(item.keywords[j]) !== -1) {
        return item.answer;
      }
    }
  }
  return "感谢咨询！请告诉我们您的具体需求，如翻译、导购、工厂考察等。";
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
