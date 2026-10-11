/* Presentation copy adapted from the compact deck in commit 40ed0b5.
   The article DOM is read only; all edits happen on presentation clones. */
const talkPoints = [
['知道自己想要什么，也得到自己想要的东西。','只做想做的事，质疑「默认」。','自己去试、去感受、去调整。'],
['规训技术：让人成为合格的生产者与消费者。','自我技术：通过自己的实践，改变自己的存在方式。','书写，是照看自己的核心习惯。'],
['写给朋友：通过表达看见自己。','审察良知：回看做了什么、想做什么。','聆听：分辨真实与谎言。','直言：敢对自己说真话。'],
['谁在操作：外部权力 / 你自己。','成为谁：合格的人 / 自己想成为的人。','日常语言：「你应该」/「我发现、我选择、我试试」。'],
['创作 = 智慧 × 形式。','内在数据库，储存经历与素材。','用不同角度观察，再通过媒介表达。'],
['从底层数据到顶层创作。'],
['输入：书写与记录。','组织：把碎片连成知识库。','觉察：用不同切面回看自己。','创造：写作与数字分身。'],
['整套系统，落在真实的文件夹里。'],
['原始数据 → 标准化 → Wiki 与编年史。','觉察之后，进入写作、对话与数字分身。','新的洞察，再回到知识库。'],
['输入原材料 → 组织体系 → 觉察提炼 → 涌现创造。','对象也可以是社区、组织或一个领域。'],
['人：品味、直觉、引导，表达「我要什么」。','AI：整理、编辑、维护链接。','散点连成线，线变成线索和洞察。'],
['通用大模型，可以接入自己的方法体系。','赖声川的创作方法、人生设计、教练技术……','从阅读方法，变成与方法互动。'],
['输入一套创作方法，搭建创作辅助系统。'],
['先做出来，再快速迭代。','做三个版本实验，比讨论半天更容易验证。','试错成本低了，行动可以轻一点。'],
['重复性、工具性工作，交给 AI。','直觉、审美、玩耍、创造，留给自己。','关键问题：我到底为什么使用它？'],
['AI 提出建议，后果由你承担。','我们的过去影响现在，现在影响未来。','选择与风险，仍然属于自己。'],
['知识更容易获得，提出问题更重要。','AI 给你许多方案，哪个属于你？','如果你不清晰，不清晰也会被放大。'],
['笔记、聊天、社交平台、语音、长文章。','已有记录，就是原材料。','没有也没关系：从现在开始记录。'],
['3,912 个原始文件 → 标准化记录。','records：记录；yearly：按年份组织。','attachments：关联图片与附件。'],
['记下真实的自己，而非「应该的自己」。','粉饰过的输入，会得到粉饰过的反馈。','亲身感知与经验，是你的原材料。'],
['说清楚：这段为什么在这里？','没有上下文，记录就容易被误读。','内容或时间不确定，让 AI 跟你确认。'],
['让 LLM 构建并维护持久的 Wiki。','新资料进入时，完成综合与关联。','好的探索结果，留下来继续积累。'],
['三层：原始资料 / Wiki / 结构与工作流。','三个操作：摄入 / 查询 / 检查。','原始资料保持原样，整理层持续更新。'],
['检索：提问时，临时找资料、拼答案。','编译：资料进入时，整合到知识体系。','新资料与好问题，让已有页面继续生长。'],
['Obsidian 是 IDE，LLM 是程序员，Wiki 是代码库。','一边对话，一边浏览编辑结果。','index.md 管内容，log.md 记变化。'],
['flomo → inbox → Wiki。','短笔记批处理，长文章逐篇处理。','一份来源，可以更新多个相关页面。'],
['自我：我是谁？我想做什么？','关系：爱是什么？怎么沟通？','社会：怎么生活？为什么焦虑？','世界：人类正在走向哪里？'],
['习性、旧经验、标签，让人自动驾驶。','重新观察，质疑默认。','从自动驾驶，回到自己选择。'],
['数据已经在那里。','换一个观察角度，看见不同的自己。','与 AI 对话，反思自己的经历。'],
['顺嘴一句，顺手一张图。','采集足够轻，生活才不容易断档。'],
['原始数据 → 编年史 → 模式发现。','从发生了什么，走向反复出现了什么。'],
['自我价值、被看见、亲密关系、表达、分离、死亡。','主题反复出现，外包装却在变化。','记忆中的自己，与真实经历之间有距离。'],
['偏离还小的时候，就看见、询问、调整。','反馈越贴近行为，越容易修正。'],
['情绪星云 / 跨年分析 / 编年史。'],
['AI 不知道某个夜晚，对你意味着什么。','回看会激活记忆，也产生新的想法。','重要性，仍需自己感受与判断。'],
['同一段文字，不同模型会赋予不同权重。'],
['Agent 从长期记录中，提出待讨论的问题。','你回应、修正，确认自己的理解。','也可以接入适合自己的观察流派。'],
['过去经验 → 素材 → 文档或作品。','来源、AI 草稿、终稿、差异分析，分别保存。','同一套工作流，也适用于其他项目。'],
['备菜：搜集、整理素材。','炒制：自己表达、反复推敲。','装盘：排版、多平台发布。'],
['思维方式 / 文章结构 / 文风指南。','标准在工作流中介入，帮助准备素材与草稿。'],
['写终稿 → 比较版本 → 提炼规律。','重复出现的模式，再由自己确认。','确认后进入标准，供下次写作继承。'],
['重要的是找到你的味道。','犹豫、推敲、写完才知道想说什么——留给自己。','整理与排版，交给工具。'],
['一份终稿，多平台分发。','公众号：HTML 排版或草稿接口。','小红书：短文或图片。'],
['这场分享，也来自同一套写作工作流。'],
['人格层：我是谁，怎么说话。','知识检索层：我知道什么。','记忆层：我们聊过什么。'],
['意图分类 → 加载人格 → 分层检索。','生成回复 → 保存会话记忆。'],
['Chat：和数字分身聊天。','Wikipedia：浏览知识网络。','Lifelog：回看时间轴与情绪地图。'],
['多个入口，共享一个后端。','人格常驻，知识按需检索，记忆逐次积累。'],
['发生 → 解释 → 寻找反例 → 做实验。','现实反馈之后，修订原来的理解。','这是建议的下一步架构。'],
['把「自己」换成社区、组织或领域。','记录 → 知识库 → 模式发现 → 协作创造。'],
['分享与写作，又成为新的原材料。','输入、组织、觉察、创造，继续循环。','我是谁？我想要什么？']
];
const talkIds = ['slide-03','slide-04','slide-05','slide-06','slide-07','slide-08','slide-10','slide-02','slide-11','slide-13','slide-14','slide-15','slide-16','slide-17','slide-18','slide-19','slide-20','slide-21','slide-23','slide-24','slide-25','slide-26','slide-27','slide-28','slide-28-obsidian','slide-29','slide-31','slide-09','slide-33','slide-33b','slide-34','slide-35','slide-35b','slide-interactive','slide-37','slide-18-attention','slide-38','slide-39','slide-40','slide-40b','slide-40c','slide-42','slide-43','slide-43b','slide-44','slide-44b','slide-45b','slide-45c','slide-47','slide-48','slide-49'];
const copyById = Object.fromEntries(talkIds.map((id, i) => [id, talkPoints[i]]));
copyById['slide-50'] = ['搜集旧素材，回看自己的观点如何变化。','一个主题积累够了，再串成一篇文章。','把材料放进 inbox，让 Agent 协助整理。'];
copyById['slide-51'] = ['AI 可以整理灵感，也提供发散的启发。','感性的经验，发生在自己的生活里。','剩下的，仍然是生活与自己的手感。'];
copyById['slide-52'] = ['测试数字分身时，它会讲故事、说梦。','熟悉的数据，组合出自己没想到的新东西。'];
copyById['slide-53'] = ['从最感兴趣的一部分开始。','让 Agent 搭，你来投喂、反馈、修正。','有效的经验，记进规范，结构慢慢长出来。'];
copyById['slide-54'] = ['我蛮喜欢做人的。','所以大家都可以好好做人。'];

window.startPres = async function () {
  await window.inlineSvgReady;
  presSlides = [];
  document.querySelectorAll('.main-col section.act-section, .main-col article.slide-card').forEach(source => {
    const clone = source.cloneNode(true);
    if (source.tagName === 'SECTION') {
      clone.querySelectorAll('article.slide-card, .slide-art').forEach(node => node.remove());
      clone.querySelector('.act-desc')?.remove();
      const chapterTitles = {'act-1':'生活技术与自我技术','act-2':'输入 → 组织 → 觉察 → 创造','act-5':'搭建知识库','act-7':'人机协作的创作系统','act-8':'数字分身'};
      if (chapterTitles[source.id]) clone.querySelector('.act-title').textContent = chapterTitles[source.id];
      presSlides.push(clone);
      return;
    }
    if (!source.querySelector('.slide-title')) return;
    const key = source.id === 'slide-28' && source.querySelector('.slide-title').textContent.includes('Obsidian') ? 'slide-28-obsidian' : source.id;
    const points = source.id ? copyById[key] : ['浏览知识图谱，看见笔记之间的连接。'];
    if (!points) throw new Error('Missing presentation copy: ' + source.id);
    const body = clone.querySelector('.slide-body');
    const visuals = Array.from(clone.querySelectorAll('.slide-art')).filter(node => !node.parentElement.closest('.slide-art'));
    clone.querySelectorAll('iframe').forEach(frame => {
      if (frame.closest('.slide-art')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'embed-container';
      wrapper.appendChild(frame.cloneNode(true));
      visuals.push(wrapper);
    });
    clone.querySelectorAll('.slide-art, .embed-container, .embed-toggle').forEach(node => node.remove());
    if (body) {
      body.replaceChildren();
      const list = document.createElement('ul');
      points.forEach(point => { const item = document.createElement('li'); item.textContent = point; list.appendChild(item); });
      body.appendChild(list);
    }
    Array.from(clone.children).forEach(node => {
      if (!node.matches('.slide-num, .slide-title, .slide-body')) node.remove();
    });
    if (points.length > 1 || !visuals.length) presSlides.push(clone);
    visuals.forEach((visual, i) => {
      const page = document.createElement('article');
      page.className = 'slide-card pres-visual';
      const title = clone.querySelector('.slide-title').cloneNode(true);
      page.appendChild(title);
      if (visual.classList.contains('embed-container')) {
        visual.style.display = 'block';
        const frame = visual.querySelector('iframe');
        if (frame?.dataset.src) frame.src = frame.dataset.src;
      }
      page.appendChild(visual);
      presSlides.push(page);
    });
  });
  presIdx = 0;
  document.body.classList.add('presenting');
  renderPres();
};

const articleRenderPres = window.renderPres;
window.renderPres = function () {
  articleRenderPres();
  document.getElementById('presContent').parentElement.scrollTop = 0;
};
