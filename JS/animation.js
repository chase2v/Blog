Object.prototype.animation = function(action,distance,time,t,callback,direction) {
	if (arguments[4] && typeof arguments[4] == 'function') {
		callback = arguments[4];
	} else if(arguments[4]){
		direction = arguments[4];
		callback = null;
	};

	var obj = this;
	var speed = distance / t;
	var timeInterval = time / t;
	speed = Math.ceil(speed*1000)/1000;

	// 缩放
	var scale = function (direc) {
		var currentWidth = window.getComputedStyle(obj).getPropertyValue('width');
		var currentHeight = window.getComputedStyle(obj).getPropertyValue('height');
		var w = parseFloat(currentWidth);
		var h = parseFloat(currentHeight);
		var widthAim = w * (1 + distance);
		var heightAim = h * (1 + distance);

		var scaleAll = function(){			
			w = w * (1 + speed);
			h = h * (1 + speed);
			obj.style.width = parseInt(w) + 'px';
			obj.style.height = parseInt(h) + 'px';
			if((w <= widthAim && speed < 0) || (w >= widthAim && speed > 0)){
				obj.style.width = widthAim + 'px';
				obj.style.height = heightAim + 'px';
				callback && callback();
			} else {
				setTimeout(scaleAll,timeInterval);			
			}
		}
		var scaleX = function(){
			w = w * (1 + speed);
			obj.style.width = parseInt(w) + 'px';
			if((w <= widthAim && speed < 0) || (w >= widthAim && speed > 0)){
				obj.style.width = widthAim + 'px';
				callback && callback();
			} else {
				setTimeout(scaleX,timeInterval);
			}
		}
		var scaleY = function(){
			h = h * (1 + speed);
			obj.style.height = parseInt(h) + 'px';
			if((h <= heightAim && speed < 0) || (h >= heightAim && speed > 0)){
				obj.style.height = heightAim + 'px';
				callback && callback();
			} else {
				setTimeout(scaleY,timeInterval);			
			}
		}

		if (direc === 'x') {
			scaleX();
		} else if (direc === 'y') {
			scaleY();
		} else {
			scaleAll();
		}
	}	

	// 透明度
	var opacityAnimation = function () {
		var currentOpacity = window.getComputedStyle(obj).getPropertyValue('opacity');
		var c = parseFloat(currentOpacity);	
		var opacityAim = c + distance;
		if (opacityAim > 1) {
			opacityAim = 1;
		} else if (opacityAim < 0){
			opacityAim = 0;
		}
		function changeOpacity() {
			c = c + speed;
			obj.style.opacity = c;
			if((c <= opacityAim && speed < 0) || (c >= opacityAim && speed > 0)){
				obj.style.opacity = opacityAim;
				callback && callback();
			} else {
				setTimeout(changeOpacity,timeInterval);
			}
		}
		changeOpacity();
	}	

	// 位移		
	if (action == 'move') {
		var	moveAim = distance;
		var currentLeft = parseFloat(window.getComputedStyle(obj).getPropertyValue('left'));
		var currentTop = parseFloat(window.getComputedStyle(obj).getPropertyValue('top'));

		if (direction == 'horizontal') {
			var moveSpeed = (moveAim - currentTop) / t;
		} else {
			var moveSpeed = (moveAim - currentLeft) / t;
		}
		moveSpeed = Math.ceil(moveSpeed*1000)/1000;
	}
	function move() {
		if (direction == 'horizontal') {
			currentTop = currentTop + moveSpeed;
			obj.style.top = currentTop + 'px';
			if((currentTop <= moveAim && moveSpeed < 0) || (currentTop >= moveAim && moveSpeed > 0)){			
				obj.style.top = moveAim + 'px';
				callback && callback();
			} else {
				setTimeout(move,timeInterval);
			}
		} else {
			currentLeft = currentLeft + moveSpeed;
			obj.style.left = currentLeft + 'px';
			if((currentLeft <= moveAim && moveSpeed < 0) || (currentLeft >= moveAim && moveSpeed > 0)){			
				obj.style.left = moveAim + 'px';
				callback && callback();
			} else {
				setTimeout(move,timeInterval);
			}
		}
	}
		

	switch(action){
		case 'move':
		setTimeout(move,timeInterval);
		break;
		case 'opacity':
		setTimeout(opacityAnimation,timeInterval);
		break;
		case 'scaleX':
		setTimeout(scale('x'),timeInterval);
		break;
		case 'scaleY':
		setTimeout(scale('y'),timeInterval);
		break;
		case 'scale':
		setTimeout(scale,timeInterval);
		break;
		default:
	}		
}