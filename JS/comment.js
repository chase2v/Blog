(function () {
	var commentPannel = document.getElementById('m-comment');
	var commentControl = document.getElementById('m-comment-child');
	var height = document.documentElement.clientHeight || document.body.clientHeight;
	var top = height * .17 - 70;
	var commentHeight = height * .66;
	commentPannel.style.height = commentHeight + 'px';
	commentPannel.style.top = top + 'px';
	commentControl.style.height = commentHeight + 'px';
	commentControl.style.top = (top+70) + 'px';

	var commentButton = document.getElementById('m-comment-button');
	var commentCreate = document.getElementById('m-comment-new');
	var commentClose = document.getElementById('m-comment-new-close');
	var commentReturn = document.getElementById('m-comment-new-return');
	var clickButton = function () {
		commentCreate.style.display = 'block';
		commentCreate.animation('opacity',1,500,100);
	};
	var clickClose = function () {
		commentCreate.animation('opacity',-1,500,100);
		setTimeout(function(){
			document.getElementById('m-comment-name').value = '';
			document.getElementById('m-comment-content').value = '';
			commentCreate.style.display = 'none';
		},500);
	}
	var clickReturn = function () {
		inputLoader();
		commentCreate.animation('opacity',-1,500,100);
		setTimeout(function(){
			document.getElementById('m-comment-name').value = '';
			document.getElementById('m-comment-content').value = '';
			commentCreate.style.display = 'none';
		},500);
	}


	// 切换按钮
	var commentLeft = document.getElementById('m-comment-left');
	var commentRight = document.getElementById('m-comment-right');
	var currentComment = 1;

	var clickRight = function () {
		currentContent = document.getElementById('m-comment-content-' + currentComment);
		if (currentComment < comment.amount) {
			currentContent.animation('opacity',-1,500,100);
			setTimeout(function () {
				currentContent.style.display = 'none';
			},500);		
			currentComment++;
		}
		tab = 0;
		playBtn.className = 'm-comment-play';
		setTimeout(function () {
			// currentContent.style.display = 'none';
			nextContent = document.getElementById('m-comment-content-' + currentComment);
			nextContent.style.display = 'block';
			nextContent.animation('opacity',1,500,100);				
		},1000);
	}
	var clickLeft = function () {
		currentContent = document.getElementById('m-comment-content-' + currentComment);
		if (currentComment > 1) {
			currentContent.animation('opacity',-1,500,100);
			setTimeout(function () {
				currentContent.style.display = 'none';
			},500);
			currentComment--;
		}		
		tab = 0;
		playBtn.className = 'm-comment-play';
		setTimeout(function () {						
			// currentContent.style.display = 'none';
			preContent = document.getElementById('m-comment-content-' + currentComment);
			preContent.style.display = 'block';
			preContent.animation('opacity',1,500,100);				
		},1000);

	}

	// 读取留言
	function readerModel(){
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
				debugger
				commentLoader(content);
			}
		}
	}

	// 留言数据
	var comment = {
		amount: 5,
		name: ['小明','小王','小李子','Anna','Jason',],
		content: [
			'过来踩一下！','过来踩一下！','过来踩一下！','过来踩一下！','过来踩一下！',
		],
	}
	var commentAmount;
	// 总体载入留言
	var commentLoader = function (content) {
		commentAmount = content.amount;
		//<div class="m-comment-content">
		// 	<div class="m-comment-main"><span>小明：</span><br>过来踩一下！！！</div>
		//</div>
		// tab = 0;
		// playBtn.className = 'm-comment-play';
		currentComment = content.amount;
		commentPannel.innerHTML = '';
		for (var i = 0; i <= content.amount - 1; i++) {
			var commentBlk = document.createElement('div');
			commentBlk.className = 'm-comment-content';
			commentBlk.id = 'm-comment-content-' + (i+1);
			if (i !== currentComment) {
				commentBlk.style.display = 'none';
				commentBlk.style.opacity = 0;
			}
			commentPannel.appendChild(commentBlk);

			var commentMain = document.createElement('div');
			commentMain.className = 'm-comment-main';
			commentMain.innerHTML = '<span>' + content.name[i] + '：</span><br>' + content.content[i];	
			commentBlk.appendChild(commentMain);
		}
	}
	


	// 留言轮播
	var tab = 2;
	var playBtn = document.getElementById('m-comment-play');
	var currentContent = document.getElementById('m-comment-content-' + currentComment);;
	var preContent;
	var commentTab = function () {	
		var play = function(){
			if (tab == 1) {
				currentContent = document.getElementById('m-comment-content-' + currentComment);			
				currentContent.animation('opacity',-1,2000,100);
				setTimeout(function () {
					currentContent.style.display = 'none';
					if (tab == 1) {
						if (currentComment == commentAmount) {
							currentComment = 0;
						}
						preContent = document.getElementById('m-comment-content-' + (currentComment+1));
						currentComment++;
						preContent.style.display = 'block';
						preContent.animation('opacity',1,2000,100,play);
					} else {
						// setTimeout(function(){
							currentContent.style.display = 'block';
							currentContent.animation('opacity',1,2000,100);
						// },1000);					
					}
				},2000);
			}
		}
		if (tab == 0) {
			playBtn.className = 'm-comment-pause';	
			tab = 1;				
			play();
		} else if(tab == 2){
			tab = 1;			
			setTimeout(function () {				
				play();
			},1500);
		}else if(tab == 1) {
			tab = 0;
			playBtn.className = 'm-comment-play';
						
		}
	}

	// 读取输入框内容
	function inputLoader() {
		var name = document.getElementById('m-comment-name').value;
		var content = document.getElementById('m-comment-content').value;
		commentSave(name,content);
	}
	
	// 主程序
	function main(){
		readerModel();
		playBtn.addEventListener('click',commentTab);
		commentRight.addEventListener('click', clickRight);
		commentLeft.addEventListener('click', clickLeft);

		commentButton.addEventListener('click', clickButton);
		commentClose.addEventListener('click', clickClose);
		commentReturn.addEventListener('click', clickReturn);

		commentTab();
	}
	main();
})();