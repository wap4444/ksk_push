// Initialize your app
var myApp = new Framework7({
	modalTitle: 'Умный Дом',
	modalButtonCancel: 'Отмена',
	pushState: true,
	router:true,
		fastClicks: true,
		uniqueHistory: true,
modalPreloaderTitle: 'Загрузка...',
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
	
});

var mySwiperSlow = myApp.swiper('.swiper-slow', {
  pagination:'.swiper-slow .swiper-pagination',
  speed: 600
});       

if(!localStorage.test){
	myApp.alert('Приложение находится в разработке','Электронный КСК');
	localStorage.test='1';
};

function langCh(){
		
	myApp.modal({
    title:  'Тілді таңдаңыз / Выберите язык',
    buttons: [
      {
        text: 'Қазақ тілі',
        onClick: function() {
          myApp.alert('Қазақ нұсқа қосымшалар орналасқан ауыстыру. Кешіріңіз берілген қолайсыздықтар', 'Электронный КСК');
		  localStorage.lang='KZ';
		  $('.langChoice').text(localStorage.lang);
        }
      },
      {
        text: 'Русский язык',
        onClick: function() {
          myApp.alert('Русский язык выбран!', 'Электронный КСК');
		  		  localStorage.lang='RU';
				 $('.langChoice').text(localStorage.lang);
        }
      },
    ]
  });
  
};

if(localStorage.userId){
	$('.regaStart').hide();
}

if(!localStorage.lang){
	 langCh()
}
	$('.langChoice').text(localStorage.lang);
	
	$('.langChoice').on('click', function () {
	 langCh()
		});



// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

myApp.onPageInit('pol', function (page) {
$.ajax({type: 'POST',url: 'api/kskSpisok.php',
success: function(data){
kskObslDoma = JSON.parse(data);
 $.each(kskObslDoma, function(key1, data) {
	$('#sp_ksk').append('<li class="item-content">\
          <div class="item-media"><i class="icon icon-f7"></i></div>\
          <div class="item-inner">\
            <div class="item-title"><a href="pol_ksk.html?kskId='+kskObslDoma[key1].id+'" style="color:#000;">'+kskObslDoma[key1].name+'</div>\
          </div>\
        </li>');
	
});
},
error: function(XMLHttpRequest, textStatus, errorThrown){
}
});
});


myApp.onPageInit('pol_ksk', function (page) {
		var kskId = page.query.kskId;
$.ajax({type: 'POST',url: 'api/kskInfo.php',data:{kskId: kskId},
success: function(data){
kskObslDoma = JSON.parse(data);
$('#pol_ksk_name').html(kskObslDoma[0].name);
	$('#pol_ksk_info').append(kskObslDoma[0].name+'<hr>Председатель: '+kskObslDoma[0].pred+'<hr>Контакты: '+kskObslDoma[0].contOb);

},
error: function(XMLHttpRequest, textStatus, errorThrown){
}
});
});

myApp.onPageInit('rega', function (page) {
	$('#selectStreet').empty();
$.ajax({type: 'POST',url: 'api/regaSelectStreet.php',
success: function(data){
kskObslDoma = JSON.parse(data);
 $.each(kskObslDoma, function(key1, data) {
	 	$('#selectStreet').append('<li class="item-content">\
          <div class="item-media"><i class="icon icon-f7"></i></div>\
          <div class="item-inner">\
            <div class="item-title"><a class="selectStreet1" streetId="'+kskObslDoma[key1].id+'" style="color:#000;">'+kskObslDoma[key1].name+'</div>\
          </div>\
        </li>');
	 
 });
 
 
 
$('.selectStreet1').on('click', function () {
	streetId=$(this).attr('streetId');	streetName=$(this).text();
	localStorage.streetId=streetId;
	localStorage.streetName=streetName;
	$('.regaTitle').html(streetName);
	$('#selectStreet').empty();
	$.ajax({type: 'POST',url: 'api/regaSelectHome.php',data:{streetId:streetId},
success: function(data1){
	spisDoma = JSON.parse(data1);
	 $.each(spisDoma, function(key1, data) {
	 	$('#selectStreet').append('<li class="item-content">\
          <div class="item-media"><i class="icon icon-f7"></i></div>\
          <div class="item-inner">\
            <div class="item-title"><a class="selectHome1" homeId="'+spisDoma[key1].id+'" style="color:#000;">'+spisDoma[key1].nomerDoma+'</div>\
          </div>\
        </li>');
});
$('.selectHome1').on('click', function () {
		homeId=$(this).attr('homeId');	homeName=$(this).text();
			localStorage.homeName=homeName;
		localStorage.homeId=homeId;
			$('.regaTitle').append(', '+homeName);
			$('#selectStreet').empty();
			$('#regaText').slideDown(500);
});

}
});


});
},
error: function(XMLHttpRequest, textStatus, errorThrown){}
});

$('#regaGo').on('click', function () {
	regaName=$('#regaName').val();
	regaKv=$('#regaKv').val();
	regaPhone=$('#regaPhone').val();
	if(!regaName || !regaKv || !regaPhone){
		myApp.alert('Заполните все данные');
	}else{
$.ajax({type: 'POST',url: 'api/regaGo.php',data:{regaName: regaName,regaKv:regaKv,regaPhone:regaPhone,homeId:localStorage.homeId,streetId:localStorage.streetId},
success: function(data){
userInfo = JSON.parse(data);
localStorage.userName=userInfo[0].name;
localStorage.userId=userInfo[0].id;
localStorage.userKskId=userInfo[0].kskId;
	mainView.router.back();
	myApp.alert('Спасибо за регистрацию, '+localStorage.userName);
	$('.regaStart').hide();
	
},
error: function(XMLHttpRequest, textStatus, errorThrown){}
});
	}
});

});




myApp.onPageInit('moe_ksk', function (page) {
	if(!localStorage.userKskId){
myApp.alert('Пройдите регистрацию', function () {mainView.router.back();});

	}else{
		$.ajax({type: 'POST',url: 'api/kskInfo.php',data:{kskId: localStorage.userKskId},
success: function(data){
kskObslDoma = JSON.parse(data);
$('#moe_ksk_name').html(kskObslDoma[0].name);
},
error: function(XMLHttpRequest, textStatus, errorThrown){}
});
	}
});

myApp.onPageInit('moe_ksk_in', function (page) {
$.ajax({type: 'POST',url: 'api/kskInfo.php',data:{kskId: localStorage.userKskId},
success: function(data){
kskObslDoma = JSON.parse(data);
$('#moe_ksk_name1').html(kskObslDoma[0].name);
$('#moe_ksk_contOb').html(kskObslDoma[0].contOb);
$('#moe_ksk_pred').html(kskObslDoma[0].pred);
$('#moe_ksk_countHome').html(kskObslDoma[0].countHome);

},
error: function(XMLHttpRequest, textStatus, errorThrown){}
});
});




myApp.onPageInit('kskOplataCard', function (page) {
$$('.form-to-data').on('click', function(){
myApp.alert('Оплата прошла успешно','Электронный КСК');
}); 
});

myApp.onPageInit('zay', function (page) {
	
		if(!localStorage.userKskId){
myApp.alert('Пройдите регистрацию', function () {mainView.router.back();});
	}else{
		
	function get_zay_sp(){
		
		 $('#moi_zay').empty();
$.ajax({type: 'POST',url: 'api/zay_sp.php',data:{userId:localStorage.userId},
success: function(data){
zay = JSON.parse(data);
 $.each(zay, function(key1, data) {
	if(zay[key1].status=='0'){statusName='Новое';}
	else if(zay[key1].status=='1'){statusName='Принятое';}
	else if(zay[key1].status=='2'){statusName='Выполнено';}
	else if(zay[key1].status=='3'){statusName='Удалено';}
	 
	 
	 $('#moi_zay').append('<div class="card" style="display: none;">\
  <div class="card-header">'+ zay[key1].tema+' ('+ zay[key1].vr+')</div>\
  <div class="card-content">\
    <div class="card-content-inner">'+ zay[key1].text+'</div>\
  </div>\
  <div class="card-footer">Статус: '+ statusName+'</div>\
 </div>');
	$('#moi_zay').find(".card:last").slideDown("slow");
 });	
}
});
}	
		get_zay_sp();
		
$$('.sendZay').on('click', function(){
tema=$$('#tema').val();textar=$$('#textar').val();

$.ajax(
    {
            type: 'POST',
            url: 'addZ.php',
			data: {tema:tema,textar:textar,homeId: localStorage.homeId,userId:localStorage.userId,	kskId:localStorage.userKskId	},
            success: function(dataInfo){
myApp.alert('Заявка отправлена! Номер заявки '+dataInfo,'Электронный КСК');
	get_zay_sp();
			},
            error: function(XMLHttpRequest, textStatus, errorThrown){
myApp.alert('Ошибка передачи данных','Электронный КСК');	
			}
    }
);

	

}); 
}
});


myApp.onPageInit('my_home', function (page) {
if(!localStorage.userKskId){
myApp.alert('Пройдите регистрацию', function () {mainView.router.back();});
}else{
	$('#my_home_title').html(localStorage.streetName+', '+localStorage.homeName)
	$.ajax({type: 'POST',url: 'api/my_home.php',data:{homeId: localStorage.homeId},
success: function(data){
kskObslDoma = JSON.parse(data);
if(kskObslDoma[0].problema=='1'){
	$('#my_home_title').after('<div class="content-block"> <div class="content-block-inner"  style="color:red;">Статус: Ведутся работы</div></div>');
}else{
	$('#my_home_title').after('<div class="content-block" ><div class="content-block-inner">Статус: OK</div></div>');
}

$('#my_home_info').empty().html('Год постройки: '+kskObslDoma[0].god+'<hr>\
Общая площадь дома: '+kskObslDoma[0].obsPl+'<hr>\
Количество квартир: '+kskObslDoma[0].kolvoKv+'<hr>\
Количество тепловых узлов: '+kskObslDoma[0].kolvoTeplUzl+'<hr>\
Количество водопогревателей: '+kskObslDoma[0].kolvoVodoPodgrev+'<hr>\
Материал стен: '+kskObslDoma[0].materialSten+'<hr>\
Нежилая площадь: '+kskObslDoma[0].plNeZhil+'<hr>\
Жилая площадь: '+kskObslDoma[0].plZhil+'<hr>\
Тип кровли: '+kskObslDoma[0].tipKrovli);
},
error: function(XMLHttpRequest, textStatus, errorThrown){}
});
}
});


var calendarDefault = myApp.calendar({
    input: '#calendar-default',
});     

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}