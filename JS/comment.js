(function () {
	// 提前获取重复使用的dom
	var Dom = {
		commentPanel: document.getElementById('m-comment'),
		controlPanel: document.getElementById('m-comment-child'),		
		createPanel: document.getElementById('m-comment-new'),
		playBtn: document.getElementById('m-comment-play'),
		nav: document.getElementById('m-nav'),
		width: document.documentElement.clientWidth || document.body.clientWidth,
	}
	var State = {
		currentComment: 0,
		commentAmount: 1,
		tab: 1,
	}

	// 初始化：设置面板高度和定位
	var init = function () {
		var height = document.documentElement.clientHeight || document.body.clientHeight;
		var top = height * .17 - 70;
		var commentHeight = height * .66;
		if(Dom.width > 800){
			Dom.commentPanel.style.height = commentHeight + 'px';
			Dom.commentPanel.style.top = top + 'px';
			Dom.controlPanel.style.height = commentHeight + 'px';
			Dom.controlPanel.style.top = (top+70) + 'px';
		}

		if (Dom.width <= 500) {
			Dom.nav.onclick = function () {
				Dom.nav.getElementsByTagName('ul')[0].style.display = 'block';
				Dom.nav.style.background = 'none';
			}
		}

		window.onscroll = function () {
			if (Dom.width < 500) {
				Dom.nav.getElementsByTagName('ul')[0].style.display = 'none';
				Dom.nav.style.background = 'url(../pic/menu.png) 100% 100% / contain no-repeat';
			}
		}		

		readerModel();
	}

	// 新建留言按钮
	document.getElementById('m-comment-button').onclick = function () {
		Dom.createPanel.style.display = 'block';
		Dom.createPanel.animation('opacity',1,500,100);
	};
	// 关闭留言面板按钮
	document.getElementById('m-comment-new-close').onclick = function () {
		Dom.createPanel.animation('opacity',-1,500,100);
		setTimeout(function(){
			document.getElementById('m-comment-name').value = '';
			document.getElementById('m-comment-content').value = '';
			Dom.createPanel.style.display = 'none';
		},500);
	}
	// 留言面板回车键
	document.getElementById('m-comment-new-return').onclick = function () {
		// 读取输入框内容
		var name = document.getElementById('m-comment-name').value;
		var content = document.getElementById('m-comment-content').value;
		commentSave(name,content);

		Dom.createPanel.animation('opacity',-1,500,100);
		setTimeout(function(){
			document.getElementById('m-comment-name').value = '';
			document.getElementById('m-comment-content').value = '';
			Dom.createPanel.style.display = 'none';
		},500);
	}

	// 播放暂停按钮
	Dom.playBtn.onclick = function () {
		var currentContent = document.getElementById('m-comment-content-' + State.currentComment);
		if (State.tab == 1) {
			this.className = 'm-comment-play';
			State.tab = 0;
			setTimeout(function () {
				currentContent.style.display = 'block';
				currentContent.style.opacity = 1;
			},1500);
		} else {
			this.className = 'm-comment-pause';
			State.tab = 1;
			commentTab();
		}
	}

	// 切换按钮
	document.getElementById('m-comment-right').onclick = function () {
		var currentContent = document.getElementById('m-comment-content-' + State.currentComment);
		if (State.tab == 1) {
			State.tab = 0;
			Dom.playBtn.className = 'm-comment-play';
			setTimeout(function () {
				currentContent.style.display = 'block';
				currentContent.style.opacity = 1;
				if (State.tab == 0) {
					currentContent.style.display = 'none';
					currentContent.style.opacity = 0;
					if (State.currentComment == State.commentAmount - 1) {
						State.currentComment = 0;
					} else {
						State.currentComment++;
					}
					currentContent = document.getElementById('m-comment-content-' + State.currentComment);
					currentContent.style.display = 'block';
					currentContent.style.opacity = 1;
				}
			},1000);
		} else {
			currentContent.style.display = 'none';
			currentContent.style.opacity = 0;
			if (State.currentComment == State.commentAmount - 1) {
				State.currentComment = 0;
			} else {
				State.currentComment++;
			}
			currentContent = document.getElementById('m-comment-content-' + State.currentComment);
			currentContent.style.display = 'block';
			currentContent.style.opacity = 1;
		}
	}
	document.getElementById('m-comment-left').onclick = function () {
		var currentContent = document.getElementById('m-comment-content-' + State.currentComment);
		if (State.tab == 1) {
			State.tab = 0;
			Dom.playBtn.className = 'm-comment-play';
			setTimeout(function () {
				currentContent.style.display = 'block';
				currentContent.style.opacity = 1;
				if (State.tab == 0) {
					currentContent.style.display = 'none';
					currentContent.style.opacity = 0;
					if (State.currentComment == 0) {
						State.currentComment = State.commentAmount - 1;
					} else {
						State.currentComment--;
					}
					currentContent = document.getElementById('m-comment-content-' + State.currentComment);
					currentContent.style.display = 'block';
					currentContent.style.opacity = 1;
				}
			},1000);
		} else {
			currentContent.style.display = 'none';
			currentContent.style.opacity = 0;
			if (State.currentComment == 0) {
				State.currentComment = State.commentAmount - 1;
			} else {
				State.currentComment--;
			}
			currentContent = document.getElementById('m-comment-content-' + State.currentComment);
			currentContent.style.display = 'block';
			currentContent.style.opacity = 1;
		}
	}

	// 数据层
	// 读取留言
	var readerModel = function(){
		var request = new XMLHttpRequest();
		request.open('GET','../data/comment.json',true);
		request.send();
		request.onreadystatechange = function() {
     		if (request.readyState === 4 && request.status === 200) {
          		var content = JSON.parse(request.responseText);
          		commentLoader(content);
	     	}
		}
	}

	/*
		存储留言
		1.new XMLHttpRequest() 2.open('POST','...php',true) 3.setRequestHeader() 4.send内容
	*/
	var commentSave = function (name,comment) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST','../php/comment.php',true);
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send('name='+name+'&comment='+comment);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200){
				var content = JSON.parse(xhr.responseText);
				commentLoader(content);
			}
		}
	}

	// 总体载入留言
	var commentLoader = function (content) {
		State.commentAmount = content.amount;
		State.currentComment = 0;
		Dom.commentPanel.innerHTML = '';
		for (var i = 0; i <= content.amount - 1; i++) {
			var commentBlk = document.createElement('div');
			commentBlk.className = 'm-comment-content';
			commentBlk.id = 'm-comment-content-' + i;
			if (i != State.currentComment && Dom.width > 500) {
				commentBlk.style.display = 'none';
				commentBlk.style.opacity = 0;
			}
			Dom.commentPanel.appendChild(commentBlk);

			var commentMain = document.createElement('div');
			commentMain.className = 'm-comment-main';
			commentMain.innerHTML = '<span>' + content.name[i] + '：</span><br>' + content.content[i];	
			commentBlk.appendChild(commentMain);
		}
		if(Dom.width > 500){
			commentTab();
		}		
	}

	// 留言播放动画
	var commentTab = function () {	
		if (State.tab == 1) {
			var currentContent = document.getElementById('m-comment-content-' + State.currentComment);
			currentContent.animation('opacity',-1,1500,100);
			setTimeout(function () {
				currentContent.style.display = 'none';
				if (State.tab == 1) {
					if (State.currentComment == State.commentAmount - 1) {
						State.currentComment = 0;
					} else {
						State.currentComment++;
					}
					currentContent = document.getElementById('m-comment-content-' + State.currentComment);
					currentContent.style.display = 'block';
					currentContent.animation('opacity',1,1500,100,commentTab);
				}
			},1500);
		}
	}

	// 开始程序
	init();
})();