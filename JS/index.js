(function () {
	var currentPageNum = 1;
	// 读取文章概览
	function readerModel(type) {
		var request = new XMLHttpRequest();
		if(type === 'article'){
			request.open('GET','./data/article.json',true);
			request.send();
			request.onreadystatechange = function() {
	     		if (request.readyState === 4 && request.status === 200) {
	          		var content = JSON.parse(request.responseText);
	          		readerUI(content);
		     	}
			}
		} else if(type === 'img'){
			request.open('GET','./data/imgUrl.json',true);
			request.send();
			request.onreadystatechange = function() {
	     		if (request.readyState === 4 && request.status === 200) {
	          		var content = JSON.parse(request.responseText);
	          		showBarPics(content);
		     	}
			}
		}
	}

	var pageSum;

	// 添加文章预览，列表
	var readerUI = function (content){
		pageSum = Math.ceil(content.amount/5);
		// 添加文章简介
		for (var j = 0; j <= pageSum-1; j++) {
			var amount = content.amount > 5*(j+1) ? 5 : content.amount - 5 * j;
			var text = document.createElement('div');
			text.className = 'm-text';
			text.id = 'm-text_' + (j+1);
			if (j !== 0) {
				text.style.display = 'none';

				// 添加页数
				var pageNumber = document.createElement('li');
				pageNumber.id = 'page-' + (j+1);
				pageNumber.innerHTML = '<a>' + (j + 1) + '</a>';
				document.getElementById('m-pageNumber-ul').insertBefore(pageNumber,document.getElementById('page-old'));
			}
			document.getElementsByTagName('body')[0].insertBefore(text,document.getElementById('m-pageNumber'));

			for (var i =  0; i <= amount - 1; i++) {
				var block = document.createElement('div');
				block.className = 'm-text-block m-text-block_' + (i+1);
				// block.style.visibility = 'hidden';
				document.getElementById('m-text_' + (j+1)).appendChild(block);

				// 添加日期
				var textDate = document.createElement('div');
				textDate.className = 'm-text-date';
				block.appendChild(textDate);

				var date_d = document.createElement('div');
				date_d.className = 'm-text-date-d';
				date_d.id = 'm-text-date-d';
				date_d.innerText = content.date_d[i];
				textDate.appendChild(date_d);

				var date_m = document.createElement('div');
				date_m.className = 'm-text-date-m';
				date_m.id = 'm-text-date-m';
				date_m.innerText = content.date_m[i] + ' ' + content.date_y[i];
				textDate.appendChild(date_m);

				// 添加文章预览
				var textBlk = document.createElement('div');
				textBlk.className = 'm-text-outline';
				block.appendChild(textBlk);

				var textTitle = document.createElement('div');
				textTitle.className = 'm-text-title';
				textTitle.id = 'm-text-title';
				textTitle.innerHTML = ' <a href=" ' + content.url[i] + ' "> ' + content.title[i] + '</a>';
				textBlk.appendChild(textTitle);

				var textContent = document.createElement('div');
				textContent.className = 'm-text-content';
				textContent.id = 'm-text-content';
				textContent.innerHTML = content.content[i];
				textBlk.appendChild(textContent);
			}
		}
	}

	// 事件监听器
	function eventHandler() {
		window.onscroll = function () {
			if (document.body.scrollTop >= 196 && document.body.scrollTop < 512) {
				var text_block_1 = document.getElementsByClassName('m-text-block_1');
				for (var i = text_block_1.length - 1; i >= 0; i--) {
					text_block_1[i].style.visibility = 'visible';
					text_block_1[i].animation('opacity',1,800,100);
				}
			} else if (document.body.scrollTop >= 512 && document.body.scrollTop < 828){
				var text_block_2 = document.getElementsByClassName('m-text-block_2');
				for (var i = text_block_2.length - 1; i >= 0; i--) {
					text_block_2[i].style.visibility = 'visible';
					text_block_2[i].animation('opacity',1,800,100);
				}
			} else if (document.body.scrollTop >= 828 && document.body.scrollTop < 1144){
				var text_block_3 = document.getElementsByClassName('m-text-block_3');
				for (var i = text_block_3.length - 1; i >= 0; i--) {
					text_block_3[i].style.visibility = 'visible';
					text_block_3[i].animation('opacity',1,800,100);
				}
			} else if (document.body.scrollTop >= 1144 && document.body.scrollTop < 1460){
				var text_block_4 = document.getElementsByClassName('m-text-block_4');
				for (var i = text_block_4.length - 1; i >= 0; i--) {
					text_block_4[i].style.visibility = 'visible';
					text_block_4[i].animation('opacity',1,800,100);
				}
			} else if (document.body.scrollTop >= 1460){
				var text_block_5 = document.getElementsByClassName('m-text-block_5');
				for (var i = text_block_5.length - 1; i >= 0; i--) {
					text_block_5[i].style.visibility = 'visible';
					text_block_5[i].animation('opacity',1,800,100);
				}
			}
		}


		// 翻页功能
		document.getElementById('page-old').onclick = function(){
			if (currentPageNum < pageSum) {
				var blockAll = document.getElementsByClassName('m-text-block');
				if (document.body.clientWidth > 414) {
					for (var i = blockAll.length - 1; i >= 0; i--) {
						blockAll[i].style.visibility = 'hidden';
						blockAll[i].style.opacity = 0;
					}
				}				
				document.body.scrollTop = 240;
				document.getElementById('m-text_'+currentPageNum).style.display = 'none';
				document.getElementById('m-text_'+(currentPageNum+1)).style.display = 'block';
				currentPageNum++;
			}
		}
		document.getElementById('page-new').onclick = function(){
			if (currentPageNum > 1) {
				var blockAll = document.getElementsByClassName('m-text-block');
				for (var i = blockAll.length - 1; i >= 0; i--) {
					blockAll[i].style.visibility = 'hidden';
					blockAll[i].style.opacity = 0;
				}
				document.body.scrollTop = 240;
				document.getElementById('m-text_'+currentPageNum).style.display = 'none';
				document.getElementById('m-text_'+(currentPageNum-1)).style.display = 'block';
				currentPageNum--;
			}
		}
		for (var i = pageSum - 1; i >= 0; i--) {			
			var pageChange = function(i){
				return function (){
					if (currentPageNum !== (i+1)) {
						var blockAll = document.getElementsByClassName('m-text-block');
						for (var j = blockAll.length - 1; j >= 0; j--) {
							blockAll[j].style.visibility = 'hidden';
							blockAll[j].style.opacity = 0;
						}
						document.body.scrollTop = 240;
						document.getElementById('m-text_'+currentPageNum).style.display = 'none';
						
						document.getElementById('m-text_'+(i+1)).style.display = 'block';
						currentPageNum=(i+1);
					}
				}
			}
			document.getElementById('page-'+(i+1)).onclick = pageChange(i);
		}
	}


	// 图片的读取和轮播
	var showBarPics = function (imgs) {
		var showBarPics = imgs.url;
		var picWidth = parseFloat(window.getComputedStyle(document.getElementById('m-showBar-tab')).getPropertyValue('width'));
		var picsLength = showBarPics.length * picWidth;
		for (var i = 0; i <= showBarPics.length - 1; i++) {
			var pic = document.createElement('img');
			pic.src = showBarPics[i];
			pic.style.left = '-' + picWidth*i + 'px';
			document.getElementById('m-showBar-tab-pic').appendChild(pic);
		}

		// 轮播动画
		var picFrame = document.getElementById('m-showBar-tab-pic');
		var maxDistance = picsLength - picWidth;
		var maxTimes = (picsLength/picWidth-1) * 500;
		var maxTime = (picsLength/picWidth-1) * 5000;
		var showBarAnimation = function () {
			picFrame.animation('move',maxDistance,maxTime,maxTimes,function () {
				picFrame.style.left = '0px';
				showBarAnimation();
			});
		};
		showBarAnimation();
	}





	// 心跳
	function heart() {
		var heart = document.getElementById('bottom-heart');
		
		var small = function(){
			heart.animation('scale',-0.2,500,200,big);
		}
		var big = function(){
			heart.animation('scale',0.25,1000,250,small);
		}
		big();
		return{
			small : small,
			big : big
		}
	}

	// 主程序
	function main(){
		// showBarPics();
		// textPreview();
		readerModel('img');
		readerModel('article');
		heart();
		eventHandler();
	}
	main();
})();