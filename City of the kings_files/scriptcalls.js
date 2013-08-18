
jQuery(function($){

//scroll smoothly
$(document).ready(function(){
$(".scroll").click(function(event){
//prevent the default action for the click event
event.preventDefault();		
//get the full url - like mysitecom/index.htm#home
var full_url = this.href;	
//split the url by # and get the anchor target name - home in mysitecom/index.htm#home
var parts = full_url.split("#");
var trgt = parts[1];	
//get the top offset of the target anchor
var target_offset = $("#"+trgt).offset();
var target_top = target_offset.top;	
//go to that anchor by setting the body scroll top to anchor top
$('html, body').animate({scrollTop:target_top}, 500);
});
});


//Scroll to another part of the page
$(document).ready(function(){
$('#ascensorBuilding').ascensor({
        AscensorName:'ascensor',
        ChildType:'section',
        AscensorFloorName:'Intro | Home',
        Time:1000,
        Easing:'easeInOutCubic',
        WindowsOn:1,
        Direction:'y',
        KeyNavigation: true,
        Queued:false,
        QueuedDirection:"x"
});
});

//Centering div horizontally
$(window).resize(function(){
$('.inner').css({
position:'absolute',
top: ($(window).height() - $('.inner').outerHeight())/2
});
});

$(window).resize();
if (document.documentElement.clientWidth < 1024) {
$('.inner').css({
position:'relative',
top:'0'
});
}

//Full body background
$(window).load(function() {
	$("#body-background").ezBgResize();
});


//Triggering panel for homepage
$(document).ready(function(){
$(".toggle-container").hide(); 
$("span.trigger").toggle(function(){
$(this).addClass("active");
}, function () {
$(this).removeClass("active");
});
$("span.trigger").click(function(){
$(this).next(".toggle-container").slideToggle("slow");
});
});

//Triggering panel for sidebar
$(document).ready(function(){
$(".trigger-sidebar").click(function(){
$(".sidebar-panel").toggle("fast");
$(this).toggleClass("active");
return false;
});
if (document.documentElement.clientWidth < 800) {
$(".sidebar-panel").toggle("fast");
$(this).toggleClass("active");
return true;
}

});

//Submenu
$(document).ready(function() {
$(".menu").lame(
{
speed: 'slow',
action: 'hover',
effect: 'fade',
close: true		
}
);		
});

//Countdown
$(function() {
var endDate = "January 7, 2014 15:03:25";
$('.countdown.simple').countdown({ date: endDate });
});

//Lightbox
$(function() {
$(".lb_mixed" ).rlightbox({counterDelimiter: " of "});
});
if (document.documentElement.clientWidth < 800) {
$("a.lb").removeAttr("href");
}

})