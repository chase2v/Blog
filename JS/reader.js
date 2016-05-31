(function () {
	// 提前获取重复使用的dom节点
	var Dom = {
		body: document.body,
		content: document.getElementById('content'),
		header: document.getElementById('header'),
		footer: document.getElementById('footer'),
		font: document.getElementById('font-panel'),
		font_size: document.getElementById('font-panel-size'),
		theme: document.getElementById('theme-panel'),
		theme_class: document.getElementsByClassName('theme'),
		themes: ['','light','soft','dark','night']
	}
	// 状态指示
	var State = {
		footer: 0,
		theme: 0,
		font: 0,
		currentTheme: 0,
		font_size: 14
	}

	// 添加类
	Object.prototype.addClass = function (className) {
		var initClass = this.className;
		if (initClass.indexOf(className) == -1) {
			this.className = initClass + ' ' + className;
		}
	}
	// 删除类
	Object.prototype.removeClass = function (className) {
		var initClass = this.className;
		this.className = initClass.replace(className,'');
	}

	// 添加面板唤出隐藏事件
	var showPanel = function () {
		document.getElementById('tap-area').onclick = function () {
			if (!State.footer) {
				Dom.header.style.display = 'block';
				Dom.footer.style.display = 'block';
				State.footer = 1;
			} else {
				Dom.header.style.display = 'none';
				Dom.footer.style.display = 'none';
				Dom.font.style.display = 'none';
				Dom.theme.style.display = 'none';
				State.footer = 0;
				State.font = 0;
				State.theme = 0;
			}				
		}
		document.getElementById('font-button').onclick = function () {
			if (!State.font) {
				Dom.font.style.display = 'block';
				Dom.theme.style.display = 'none';
				State.font = 1;
				State.theme = 0;
			} else {
				Dom.font.style.display = 'none';
				State.font = 0;
			}		
		}
		document.getElementById('theme-button').onclick = function () {
			if (!State.theme) {
				Dom.theme.style.display = 'block';
				Dom.font.style.display = 'none';
				State.theme = 1;
				State.font = 0;
			} else {
				Dom.theme.style.display = 'none';
				State.theme = 0;
			}
		}
		window.onscroll = function () {
			// 滚动隐藏所有面板
			Dom.header.style.display = 'none';
			Dom.footer.style.display = 'none';
			Dom.font.style.display = 'none';
			Dom.theme.style.display = 'none';
			State.footer = 0;
			State.font = 0;
			State.theme = 0;
		}
	}

	// 更改背景
	var changeBG = function () {
		// 夜间模式
		document.getElementById('night-button').onclick = function () {
			if (State.currentTheme != 4) {
				Dom.body.addClass('night');
				Dom.theme_class[State.currentTheme].removeClass('theme-selected');
				Dom.theme_class[4].addClass('theme-selected');
				State.currentTheme = 4;
				localStorage.setItem('currentTheme',State.currentTheme); // 记录主题
			} else {
				Dom.body.removeClass('night');
				Dom.theme_class[State.currentTheme].removeClass('theme-selected');
				Dom.theme_class[0].addClass('theme-selected');
				State.currentTheme = 0;
				localStorage.setItem('currentTheme',State.currentTheme); // 记录主题
			}
		}
		// 面板切换背景
		for (var i = Dom.theme_class.length - 1; i >= 0; i--) {
			Dom.theme_class[i].onclick = (function (i) {
				return function () {
					if (State.currentTheme != i) {
						Dom.body.removeClass(Dom.themes[State.currentTheme]);
						Dom.body.addClass(Dom.themes[i]);
						Dom.theme_class[State.currentTheme].removeClass('theme-selected');
						Dom.theme_class[i].addClass('theme-selected');
						State.currentTheme = i;
						localStorage.setItem('currentTheme',State.currentTheme); // 记录主题
					} else {
						Dom.body.removeClass(Dom.themes[i]);
						Dom.theme_class[State.currentTheme].removeClass('theme-selected');
						Dom.theme_class[0].addClass('theme-selected');
						State.currentTheme = 0;
						localStorage.setItem('currentTheme',State.currentTheme); // 记录主题
					}
				}
			})(i);
		}
	}

	// 更改字号
	var changeFont = function () {
		document.getElementById('small-font').onclick = function () {
			if (State.font_size > 12) {
				Dom.content.style.fontSize = State.font_size - 1 + 'px';
				Dom.font_size.innerHTML = State.font_size - 1;
				State.font_size -= 1;
				localStorage.setItem('font_size',State.font_size); // 记录字号
			}
		}

		document.getElementById('big-font').onclick = function () {
			if (State.font_size < 18) {
				Dom.content.style.fontSize = State.font_size + 1 + 'px';
				Dom.font_size.innerHTML = State.font_size + 1;
				State.font_size += 1;
				localStorage.setItem('font_size',State.font_size); // 记录字号
			}
		}
	}
	

	// 数据层
	// 读取背景和字体缓存
	var getCache = function () {
		State.currentTheme = localStorage.getItem('currentTheme') || 0;
		Dom.body.addClass(Dom.themes[State.currentTheme]);
		State.font_size = parseInt(localStorage.getItem('font_size')) || 14;
		Dom.content.style.fontSize = State.font_size + 'px';
		Dom.font_size.innerHTML = State.font_size;
	}
	// 请求文章数据，没跨域
	var getData = function () {
		var xhr = new XMLHttpRequest();
		xhr.open('GET','../data/article.json');
		xhr.send();
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4 && xhr.status === 200){
				var content = JSON.parse(xhr.responseText);
				setData(content);
			}
		}
	}
	// 得到数据，渲染UI
	var setData = function (content) {
		Dom.content.getElementsByTagName('h1')[0].innerHTML = content.title[0];
		Dom.content.getElementsByTagName('p')[0].innerHTML = content.date_y[0] + ' ' + content.date_m[0] + ' ' + content.date_d[0];
		Dom.content.getElementsByTagName('div')[0].innerHTML = content.content[0];
	}

	var main = function () {
		getCache();
		getData();
		showPanel();
		changeBG();
		setTimeout(changeFont,10);
	}
	main();
})();