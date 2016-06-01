(function () {
	var Dom = {
		aboutBtn: document.getElementsByClassName('m-about-btn'),
		starB: document.getElementById('m-about-pannel-star'),
		aboutFrame: document.getElementById('m-about'),
		aboutPannel: document.getElementById('m-about-pannel'),
		aboutContent: document.getElementById('m-about-content'),
		width: document.body.clientWidth || document.documentElement.clientWidth,		
	}
	var State = {
		startFirst: 1,
	}
	
	// 初次打开
	var startFirst = function () {
		var star = document.getElementById('m-about-star');
		Dom.aboutFrame.style.display = 'block';
		Dom.aboutFrame.animation('opacity',1,500,100,function () {
			star.animation('scale',-0.99,500,100);
			star.animation('opacity',-1,750,100,function () {
				Dom.aboutFrame.style.background = 'rgba(255,255,255,0.25)';
				Dom.aboutPannel.style.display = 'block';
				Dom.aboutPannel.animation('opacity',1,500,100,function () {
					Dom.starB.style.display = 'block';
					Dom.starB.animation('opacity',1,500,100);
					State.startFirst = 0;
				});
			});
		});
	};
	// 再次打开
	var startAgain = function () {
		Dom.aboutFrame.style.display = 'block';
		Dom.aboutFrame.animation('opacity',1,500,100,function () {
				Dom.starB.style.display = 'block';
				Dom.starB.animation('opacity',1,500,100);
		});
	}

	function init() {
		for (var i = Dom.aboutBtn.length - 1; i >= 0; i--) {
			Dom.aboutBtn[i].onclick = function () {
				if (State.startFirst == 1) {
					startFirst();
				} else {
					startAgain();
				}
			};
		}

		// 红心事件
		Dom.starB.onmouseover = function () {
			Dom.starB.animation('scale',0.25,300,100);
		};
		Dom.starB.onmouseout =function () {
			Dom.starB.animation('scale',-0.2,300,100);
		}
		Dom.starB.onclick = function (event) {
			event = event || window.event;
			event.stopPropagation();
			Dom.aboutPannel.animation('opacity',-0.9,500,100);
			if (Dom.width > 500) {
				Dom.aboutPannel.animation('scaleX',-0.5,500,100,function () {
					Dom.aboutPannel.style.background = '#fff';
					Dom.aboutPannel.animation('opacity',0.9,500,100);
					Dom.aboutPannel.animation('scaleY',0.5,500,100,function () {
						Dom.starB.animation('opacity',-1,500,100,function () {
							Dom.starB.style.display = 'none';
							Dom.aboutContent.style.display = 'block';
							Dom.aboutContent.animation('opacity',1,500,100);
						});
					});	
				});
			} else {
				Dom.aboutPannel.animation('scaleX',-.3,500,100,function () {
					Dom.aboutPannel.style.background = '#fff';
					Dom.aboutPannel.animation('opacity',0.9,500,100);
					Dom.aboutPannel.animation('scaleY',0.5,500,100,function () {
						Dom.starB.animation('opacity',-1,500,100,function () {
							Dom.starB.style.display = 'none';
							Dom.aboutContent.style.display = 'block';
							Dom.aboutContent.animation('opacity',1,500,100);
						});
					});	
				});						
			}			
		}
		
		Dom.aboutFrame.onclick = function () {
			Dom.aboutFrame.animation('opacity',-1,500,100,function () {
				Dom.aboutFrame.style.display = 'none';
				Dom.aboutPannel.style.background = '#000';
				Dom.aboutContent.style.display = 'none';
				Dom.aboutContent.style.opacity = '0';
				if (Dom.width > 500) {
					Dom.aboutPannel.style.width = '600px';
					Dom.aboutPannel.style.height = '300px';
				} else {
					Dom.aboutPannel.style.width = '100%';
					Dom.aboutPannel.style.height = '300px';
				}
			})
		}

		document.getElementById('weibo').onclick = function (event) {
			event = event || window.event;
			event.stopPropagation();
		}
	}
	
	init();
})();