$(document).ready(function(){
	
	var rocketSide = $("#rocket img").width(),
		pageCount = $(".page").length,
		Wwidth =  $(window).width(),
		Hnav = $("nav").height(),	
		mousewheelTime = 0,
		inscroll = false,
		animTime = 500;

	function resizeScreen(){
		Wwidth =  $(window).width();
		if (Wwidth >= 768) {
			$(".page").css("height", $(window).height() + "px");			
			$("#paralax").css("height", $(window).height()-1 + "px");
		}
		else{
			$(".page").removeAttr("style");
			$("#paralax").css("height", "auto");
		};
	};

	resizeScreen();

	$(window).resize(function(){
		resizeScreen();

		if(Wwidth > 768){
			$("nav").css("backgroundColor", "rgba(0,0, 0, 0.5)");
			$("nav").stop().stop().animate({
				width:"100vw", 
				height: Math.round(Hnav) + "px", 
				left:"0", 
				top:"0"}, animTime);
			$(".barBut i").attr("class", "fa fa-bars");
			$("#menu").css("display", "none");
			$("#menu").removeAttr("style");
			$("#paralaxMove").stop().stop().animate({top: 0}, animTime*2);
		};
		rocketSide = $("#rocket img").width();	
	});

	$(".skill").each(function(){
		$(this).append(document.createElement("img"));
		$(this).children("img").attr("src", "img/skills/" + $(this).index() + ".png");
	})


//Navbar start 
	$(".barBut").click(function(){
		if ($("#menu").css("display") == "none"){
			$("#menu").css("display", "block");
			$(".barBut i").attr("class", "fa fa-times");
			$("nav").css("backgroundColor", "rgba(3,4,52,0.8)");
			$("nav").stop().stop().animate({
				width:"80vw", 
				height: (60 + $("#menu").height() + "px"), 
				left:"10vw", 
				top:"10vh"}, animTime);
		}
		else{
			$(".barBut i").attr("class", "fa fa-bars");
			$("nav").css("backgroundColor", "rgba(0,0, 0, 0.5)");
			$("nav").stop().stop().animate({
				width:"100vw", 
				height: Math.round(Hnav) + "px", 
				left:"0", 
				top:"0"}, animTime);
			$("#menu").css("display", "none");
		};	
	});
//Navbar end

//aboutMe start
	$("#aboutMe h2").on("click", function(){
		var paragraph = $(this).next("p");
		paragraph.slideDown();
		paragraph.siblings("p").slideUp();
	});
//aboutMe end

//languages start
	$("#languages .title").on("click", function(){
		var paragraph = $("#languages .par p").eq($(this).index());	
		$(this).addClass("active");
		$(this).siblings(".title").removeClass("active");
		
		paragraph.siblings().stop().stop().animate({opacity: '0'}, animTime, function(){
			paragraph.addClass("active");
			paragraph.siblings().removeClass("active");		
			paragraph.animate({opacity: '1'}, animTime);
		});
	});
//languages end

//gallery start
	function gallery(){
		var photos = $("#gallery .photo"),
			photoTop, photoLeft;
		
		function resize(){
			photoTop = ($("#gallery").height() - photos.height())/2;
			photoLeft = ($("#gallery").width() - photos.width())/2;
			photos.css("top", photoTop);
			photos.css("left", photoLeft);		
		};
		resize();
		
		photos.on("click",function(){
			var photo = $(this);
			photo.stop().stop().animate({left: "70%", top:"-60%"}, animTime,function(){
				photo.css("zIndex", 1);
				photo.siblings().each(function(){
					$(this).css("zIndex", $(this).css("zIndex")+1);
				});
			})
			.animate({left: photoLeft, top: photoTop}, animTime);
		});

		$(window).resize(function(){
			resize();	
		});
	};

	gallery();
//gallery end

// space start	
	$("#space").on("mousemove", function(e){
		var rocket = $("#rocket");	
		var rocketTop = rocket.css("top").slice(0,-2),			
			rocketLeft = rocket.css("left").slice(0,-2),
			tgRocket, deg, defDeg,
			move = {
				Y: 0,
				X: 0
			},
			spin = {
				Y: 0,
				X: 0
			};
		
		move.Y = e.clientY - (rocketSide/2);
		move.X = e.clientX - (rocketSide/2);
		spin.Y = e.clientY - rocketTop - rocketSide/2;
		spin.X = e.clientX - rocketSide/2 -rocketLeft;
		tgRocket = spin.X/spin.Y;	

		if (move.Y >= 0 && move.X <= Wwidth) {
			rocket.animate({
				left: move.X,
				top: move.Y
			  }, 2);
			if (Math.abs(spin.X) + Math.abs(spin.Y) > 5){
				if (spin.Y < 0){
					defDeg = 90
				}
				else {
					defDeg = 270
				};
			};				
			deg = (360-Math.atan(tgRocket)*55-defDeg);		
			rocket.css("transform", "rotate(" + Math.round(deg) + "deg)");
		};	
	});
// space end

// modal window start
	$("body").append("<div id='modal'></div>");
	$("#modal").append("<button id='close'></button>");
	$("#close").append("<i class='fa fa-times' aria-hidden='true'></i>");
	$("#modal").append("<div class='inform'></div>");

	$(".skill").on("click", function(){
		var inform = $(this).children("p").html();
		$("#modal").css("display", "inline-block");
		$(".inform").stop().stop().animate({
			width:"80vw", 
			height:"80vh", 
			left:"10vw", 
			top:"10vh"}, animTime,function(){
				$("#modal .inform").html(inform);	
				$("#close").css("display", "inline-block");
		});
	});

	$("#close").on("click", function(){
		$("#modal .inform").html("");	
		$("#close").css("display", "none");
		$(".inform").animate({
			width:"0", 
			height:"0", 
			left:"50%", 
			top:"50%"}, animTime,function(){
				$("#modal").css("display", "none");
		});
	});
// modal window end

//aside menu start
	function asideCreate(){
		var asideDiv = {},
			asideI = {},
			paralaxMenuIconsStyles = [
				"fa-info", 
				"fa-picture-o", 
				"fa-cogs", 
				"fa-rocket"
			];
		
		$("body").append(document.createElement("aside"));
		asideI[asideI.length] = document.createElement("i");
		asideI[asideI.length].setAttribute("class", "fa fa-arrows-v");
		$("aside").append(asideI[asideI.length]);	

		for (var i = 0; i <= pageCount-1; i++){
			asideDiv[i] = document.createElement("div");
			asideDiv[i].setAttribute("data-page", String($(".page").eq(i).attr("id")));
			asideI[i] = document.createElement("i");
			asideI[i].setAttribute("class", "fa " + paralaxMenuIconsStyles[i]);
			asideDiv[i].append(asideI[i]);
			$("aside").append(asideDiv[i]);
		};
	};
	asideCreate();

	var paralaxMenuElements = $("aside div");
	
	$("aside").on("click", function(){
		if(Wwidth >= 768) {
			if (paralaxMenuElements.css("display") == "none"){
				paralaxMenuElements.css("display", "inline-block");
				
				for (var i=pageCount-1; i>= 0; i--){
					paralaxMenuElements.eq(pageCount-(i+1)).stop().stop().animate({
						opacity: 1,
						top: -1.2*(i+1)*$("aside").height()
					}, animTime);
				};
			}
			else{
				paralaxMenuElements.stop().stop().animate({
					opacity: 0,
					top: 0
				}, animTime, function(){
					paralaxMenuElements.css("display", "none");
				});
			};
		};
	});

	paralaxMenuElements.on("click", function(){
		if(Wwidth >= 768) {
			var pageId = $(this).attr("data-page"),
				pageY = ($("#"+pageId).index()-1)*$(window).height(),
				direction;
			$("#paralaxMove").animate({top:-pageY}, animTime*2);
		};

	});
//aside menu end

//paralax start
	$(window).on("mousewheel", function(e){
		if(Wwidth >= 768) {
			if (Math.floor(e.timeStamp/50) - mousewheelTime > 3){
					inscroll = false;
			};

			if (e.deltaY != "0" && e.deltaX == "-0"){
				mousewheelTime = Math.floor(e.timeStamp/50);
				var coordinateTop = Number($("#paralaxMove").css("top").slice(0,-2));

				if (!inscroll){
					inscroll = true
					var page = Math.floor($("#paralaxMove").css("top").slice(0, -2)/$(window).height()),
						pageHeight = page*$(window).height(),
						direction;

					if (e.deltaY > 0){
						direction = 1;
					}
					else{
						direction = -1;
					};

					if (pageHeight + direction*$(window).height() <= 0 && 
						pageHeight + direction*$(window).height() >= -(pageCount-1)*$(window).height()){
						$("#paralaxMove").animate({
							top:(pageHeight + direction*$(window).height())
							}, animTime*2);
					};
				};	
			};
		};
	});
//paralax end
});
