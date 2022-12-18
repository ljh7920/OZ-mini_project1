history.scrollRestoration = "manual"
$(document).ready(function()
{

$('.dateCard').hide();
$('iframe').hide();
$('#info_btn').hide();
$(".header").hide();
$(".header").hide();
var countDownDate = new Date(2022,11,24,23,59,59).getTime();//기한:오늘 부터 ~12월 19일 24시까지 남은 시간

var x = setInterval(function() {

  
  var now = new Date().getTime();//getTime()으로 오늘날짜와 시간 받음 
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;//남은 기간 = 설정 날짜 - 오늘 날짜
    
  // 시간계산
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("DAY").innerHTML = days+"&nbsp";
  document.getElementById("HOUR").innerHTML = hours+"&nbsp"; 
  document.getElementById("MIN").innerHTML = minutes+"&nbsp"; 
  document.getElementById("SEC").innerHTML = seconds+"&nbsp";   
  
//   document.getElementById("demo").innerHTML=days+hours+minutes+seconds;
  

  // countdown == over, 모집 종료  
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "모집 종료";//=기간 만료
  }
}, 1000);

var scroll = function(){
    
    var $nav = null,
        $cnt = null,
        moveCnt = null,
        moveIndex = 0,
        moveCntTop = 0,
        winH = 0,
        time = false; // 새로 만든 변수

    $(document).ready(function(){
        init();
        initEvent();
    });
    
    var init = function(){
        $cnt = $(".content");
        $nav = $(".header a");
    };
    
    var initEvent = function(){
        $("html ,body").scrollTop(0);
        winResize();
        $(window).resize(function(){
            winResize();
        });
        $nav.on("click", function(){
            moveIndex = $(this).parent("li").index();
            moving(moveIndex);
            return false;
        });
        $cnt.on("mousewheel", function(e){
            if(time == false){ // time 변수가 펄스일때만 휠 이벤트 실행
              wheel(e);
            }
        });
    };
        
    var winResize = function(){
        winH = $(window).height();
        $cnt.children("div").height(winH);
        $("html ,body").scrollTop(moveIndex.scrollTop);
    }
    
    var wheel = function(e){
        if(e.originalEvent.wheelDelta < 0){
            if(moveIndex < 5){
                moveIndex += 1;
                moving(moveIndex);
            };
        }else{
            if(moveIndex > 0){
                moveIndex -= 1;
                moving(moveIndex);
            };
        };
    };
    
    var moving = function(index){
        time = true // 휠 이벤트가 실행 동시에 true로 변경
        if(index == 0)
        {
            $('#info_btn').hide();
            $(".header").hide();
        }
        else
        {
            $('#info_btn').show();
            $(".header").show();
        } 
        if(index==1)
        {
            $('.dateCard').delay(1500).fadeIn(3000);
        }
        else $('.dateCard').hide();

        if(index == 2)
        {
             $('iframe').slideDown(3000, "linear");
        }
        else  $('iframe').hide();
        moveCnt = $cnt.children("div").eq(index);
        moveCntTop = moveCnt.offset().top;
        $("html ,body").stop().animate({
            scrollTop: moveCntTop
        }, 1500, function(){
          time = false; // 휠 이벤트가 끝나면 false로 변경
        });
        $nav.parent("li").eq(index).addClass("on").siblings().removeClass("on");
    };
    
};

scroll();

// ------------------swiper ---------------------------
new Swiper('.prize-container', {

	slidesPerView : 3, // 동시에 보여줄 슬라이드 갯수
	spaceBetween : 10, // 슬라이드간 간격
	slidesPerGroup : 1, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음
    // autoHeight : true,  // 현재 활성 슬라이드높이 맞게 높이조정
    autoplay:
    {
        delay : 1000,
        disableOninteractiom:false,
    },
    centerdSliders:true,
	loopFillGroupWithBlank : true,

	loop : true, // 무한 반복
});
new Swiper('.swiper-container', {

	slidesPerView : 8, // 동시에 보여줄 슬라이드 갯수
	spaceBetween : 10, // 슬라이드간 간격
	slidesPerGroup : 2, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음
    // autoHeight : true,  // 현재 활성 슬라이드높이 맞게 높이조정
    autoplay:
    {
        delay : 2000,
        disableOninteractiom:false,
    },
    centerdSliders:true,
	loopFillGroupWithBlank : true,

	loop : true, // 무한 반복
});
// ------------------swiper ---------------------------


// ---------------------pop up 창----------------------
$("#popup").hide();

$("#info_btn").click(function()
{
    $("#popup").fadeIn(2000,"linear");
});

var value =[];

$(function(){
    $("#confirm").click(function(){
        var name = $("#name_value").val();
        var phone = $("#phone_value").val();
        if(!name)
        {
            alert("이름을 입력하세요");
            return;
        }
        if(!phone)
        {
            alert("전화번호를 입력하세요");
            return;
        }
        else if (phone.length <=10)
        {
            alert("전화번호를 확인하세요");
            return;
        }
        value.push($("#name_value").val());
        value.push($("#phone_value").val());
        console.log(value);
        modalClose(); //모달 닫기 함수 호출
        //컨펌 이벤트 처리
    });
    $("#modal-open").click(function(){        
        $("#popup").css('display','flex').hide().fadeIn();
        //팝업을 flex속성으로 바꿔준 후 hide()로 숨기고 다시 fadeIn()으로 효과
    });
    $("#close").click(function(){
        modalClose(); //모달 닫기 함수 호출
    });
    function modalClose(){
        $("#popup").fadeOut(); //페이드아웃 효과
    }
  });
});
