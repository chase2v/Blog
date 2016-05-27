var star = document.getElementById('m-about-star');
var aboutBtn = document.getElementsByClassName('m-about-btn');
var aboutFrame = document.getElementById('m-about');
var aboutPannel = document.getElementById('m-about-pannel');
var starB = document.getElementById('m-about-pannel-star');
var aboutContent = document.getElementById('m-about-content');
var weibo = document.getElementById('weibo');
var startover = 1;

var startFirst = function () {
	aboutFrame.style.display = 'block';
	aboutFrame.animation('opacity',1,500,100,function () {
		star.animation('scale',-0.99,500,100);
		star.animation('opacity',-1,750,100,function () {
			aboutFrame.style.background = 'rgba(255,255,255,0.25)';
			aboutPannel.style.display = 'block';
			aboutPannel.animation('opacity',1,500,100,function () {
				starB.style.display = 'block';
				starB.animation('opacity',1,500,100);
				startover = 0;
			});
		});
	});
};
var startAgain = function () {
	aboutFrame.style.display = 'block';
	aboutFrame.animation('opacity',1,500,100,function () {
			starB.style.display = 'block';
			starB.animation('opacity',1,500,100);
	});
}

var starOver = function () {
	starB.animation('scale',0.25,300,100);
};
var starOut =function () {
	starB.animation('scale',-0.2,300,100);
}
var starIn = function () {
	event.stopPropagation();
	aboutPannel.animation('opacity',-0.9,500,100);
	aboutPannel.animation('scaleX',-0.5,500,100,function () {
		aboutPannel.style.background = '#fff';
		aboutPannel.animation('opacity',0.9,500,100);
		aboutPannel.animation('scaleY',0.5,500,100,function () {
			starB.animation('opacity',-1,500,100,function () {
				starB.style.display = 'none';
				aboutContent.style.display = 'block';
				aboutContent.animation('opacity',1,500,100);
			});
		});	
	});
}

function eventHandler() {
	for (var i = aboutBtn.length - 1; i >= 0; i--) {
		aboutBtn[i].addEventListener('click',function () {
			if (startover == 1) {
				startFirst();
			} else {
				startAgain();
			}
		});
	}	
	starB.addEventListener('mouseover',starOver);
	starB.addEventListener('mouseout',starOut);
	starB.addEventListener('click',starIn);
	aboutFrame.addEventListener('click',function () {
		aboutFrame.animation('opacity',-1,500,100,function () {
			aboutFrame.style.display = 'none';
			aboutPannel.style.background = '#000';
			aboutPannel.style.width = '50%';
			aboutPannel.style.height = '50%';
			aboutContent.style.display = 'none';
			aboutContent.style.opacity = '0';
		})
	})
	weibo.addEventListener('click',function () {
		debugger
		event.stopPropagation();
	})
}

function main() {
	eventHandler();
}
main();