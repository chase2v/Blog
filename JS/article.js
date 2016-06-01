(function () {
	var Dom = {
		coverChild: document.getElementsByClassName('cover-child'),
		articleCoverTitle: document.getElementById('article-covertitle'),
		coverDown: document.getElementById('article-down'),
		top: document.getElementById('top'),
		article: document.getElementById('article'),
		nav: document.getElementById('m-nav'),
		width: document.documentElement.clientWidth || document.body.clientWidth,
	}
	var State = {
		isTop: 1,
	 	isFirst: 1,
	}

	var init = function () {
		var cover = document.getElementById('article-cover');
		var height = document.documentElement.clientHeight || document.body.clientHeight;
		cover.style.height = (height-80) + 'px';

		if (Dom.width < 500) {
			Dom.nav.onclick = function () {
				Dom.nav.getElementsByTagName('ul')[0].style.display = 'block';
				Dom.nav.style.background = 'none';
			}
		}

		readerModel(0);
	}	

	// 数据层，读取文章
	function readerModel(index){
		var request = new XMLHttpRequest();
		request.open('GET','../data/article.json',true);
		request.send();
		request.onreadystatechange = function() {
     		if (request.readyState === 4 && request.status === 200) {
          		var content = JSON.parse(request.responseText);
          		articleLoader(content,index);
	     	}
		}
	}

	// 载入文章
	var articleLoader = function(content,index){
	 	// 载入封面
	 	for (var i = 0; i <= Dom.coverChild.length - 1; i++) {
	 		Dom.coverChild[i].style.background = content.cover[index] + ' ' + 100*i + '% ' + 0 + '%' + '/200% 100% no-repeat';
	 		Dom.coverChild[i].className = 'cover-child cover-child-' + (i+1);
	 	}
	 	Dom.articleCoverTitle.innerText = content.title[index];
	 	Dom.articleCoverTitle.animation('opacity',1,1000,100);

	 	// 载入文章
	 	var articleContent = document.getElementById('article-main');
		var articleTitle = document.getElementById('article-title');
		var articleDate = document.getElementById('article-date');
	 	articleTitle.innerText = content.title[index];
	 	articleDate.innerText = content.date_m[index] + ' ' + content.date_d[index] + ' ' + content.date_y[index];
	 	articleContent.innerHTML = content.content[index];

	 	// down动画
	 	var downAnimation = function() {
 			Dom.coverDown.animation('opacity',1,1000,100,function () {
 				Dom.coverDown.animation('opacity',-1,1000,100,downAnimation);
 			})
 		}
 		downAnimation();
	}

	// 滚动事件
	window.onscroll = function () {

		if (Dom.width < 500) {
			Dom.nav.getElementsByTagName('ul')[0].style.display = 'none';
			Dom.nav.style.background = 'url(../pic/menu.png) 100% 100% / contain no-repeat';
		}

		// 顶栏动画
		var topDis = document.documentElement.scrollTop || document.body.scrollTop;
		if ( topDis >= 80 && State.isFirst == 0 && State.isTop == 1) {
			Dom.top.animation('move',-80,200,20,'horizontal');
			Dom.top.animation('opacity',-1,200,20,'horizontal');
			State.isTop = 0;
		} else if (topDis == 0 && State.isTop == 0 && State.isFirst == 0) {
			Dom.top.animation('move',0,200,20,'horizontal');
			Dom.top.animation('opacity',1,200,20,'horizontal');	
			State.isTop = 1;
		}


	 	// 初次滑动动画
		if (State.isFirst && Dom.width > 500) {
			window.scrollTo(0,0);
			if ((document.body.clientWidth || document.documentElement.clientWidth) > 414) {
		 		
				// 文章
				Dom.article.style.visibility = 'visible';
				Dom.article.animation('move',80,300,100,'horizontal');	
				Dom.article.animation('opacity',1,500,100);
			
				// 封面	
				Dom.articleCoverTitle.style.display = 'none';
		 		Dom.coverDown.style.display = 'none';
				Dom.coverChild[0].animation('move',-3000,1500,100);
				Dom.coverChild[1].animation('move',3000,1500,100);

				setTimeout(function () {
					State.isFirst = 0;
				},500);
			}else{
				State.isFirst = 0;
			}				 		
		} else {
			State.isFirst = 0;
		}
	};	

	// 开始程序
	init();
})();