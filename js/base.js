/** 
 * Project:
 * @author Jason Denizac <jason@dz208.com>
 * @version 0.1 - 1/24/2010
 * @requires jQuery 1.4
 */

//dz base object
window.dz={
	DEBUG:true, /* turn off in prod */
	pg:{}, /* pages object */
	v:{}, /* 'global' vars */
	fn:{}, /* helper functions */
	log:function(){if(dz.DEBUG){try{console.log.apply(console,arguments);return true;}catch(e){return false;};}},
	has:function(v){return (typeof v !== 'undefined');}
}
dz.init = function($){
	//html.no-js => html.js for easy js detection in css
	(function(H,C){H[C]=H[C].replace(/\bno-js\b/,'js')})(document.documentElement,'className');
	
	//load tweet
	(function(){
		var username = 'idstudents',
		    count = 1,
		    dest = '#tweet',
		    handler = function(t){
			var s = t[0].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, 
					function(url) {
					return '<a href="'+url+'">'+url+'</a>';
				});
			s+='<br/><a class="meta" href="http://twitter.com/'+username+'/statuses/'+t[0].id+'">'+rel_time(t[0].created_at)+'</a>';
			$("#tweet").hide().append(s).fadeIn();
		    },
		    rel_time = function(time_value) {
			 var values = time_value.split(" ");
			 time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
			 var parsed_date = Date.parse(time_value);
			 var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
			 var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
			 delta = delta + (relative_to.getTimezoneOffset() * 60);

			 if (delta < 60) {
			 return 'less than a minute ago';
			 } else if(delta < 120) {
			 return 'about a minute ago';
			 } else if(delta < (60*60)) {
			 return (parseInt(delta / 60)).toString() + ' minutes ago';
			 } else if(delta < (120*60)) {
			 return 'about an hour ago';
			 } else if(delta < (24*60*60)) {
			 return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
			 } else if(delta < (48*60*60)) {
			 return '1 day ago';
			 } else {
			 return (parseInt(delta / 86400)).toString() + ' days ago';
			 }
		    };
	    
	    	$.ajax({
			url:'http://twitter.com/statuses/user_timeline/idstudents.json?&count=1',
			dataType:"jsonp",
			success: handler});
		
	})();
	


}

//dom ready handler
jQuery(function($){
	dz.init($);
	
	var pgid = $("body").attr("id").toLowerCase();
	if(pgid !== ''){
		if (dz.has(dz.pg[pgid])) dz.pg[pgid]($);
		else dz.log("no fn exists for page id ", pgid);
	}else dz.log("no page id is set");
});

/* page group functions
 * dz.pg.pagename, where pagename matches the id of the body tag
 * note, pagename should be lower case
 * function is automatically executed, with jQuery object passed as a parameter
 * use these to group page-specific code
 */
dz.pg.home=function($){

var homeslide = new dzRotate("#homeslide",4000,800);
dz.log("home");	
}
dz.pg.list=function($){
	
}
/* copy minified plugins below here */

function dzRotate(selector, Interval, Speed){
	// by Jason Denizac - http://denizac.org
	//
	//  rotates through the list (ordered or unordered) specified by "selector"
	// the "speed" value is anything that jQuery likes - see http://docs.jquery.com/Effects/fadeIn
	// "interval" is in milliseconds
	//

	//set defaults:
	this.interval = typeof(Interval) != 'undefined' ? Interval : 3000;
	this.speed = typeof(Speed) != 'undefined' ? Speed : "slow";

	var self = this;
	jQuery(selector+" li:first").show().siblings().hide();

	this.next = function next(src) {
		if(src==='click'){
			window.clearInterval(self.tick);
			self.tick = setInterval(self.next, self.interval);
		}
		jQuery(selector+" li:first").insertAfter(selector+" li:last");
		jQuery(selector+" li:first").fadeIn(self.speed);
		jQuery(selector+" li:not(:first)").hide();
	};

	this.prev = function prev(src){
		if(src==='click'){
			window.clearInterval(self.tick);
			self.tick = setInterval(self.prev, self.interval);
		}
		var offset = jQuery(selector + " li").length - 1;
		jQuery(selector+" li:last").insertBefore(selector+" li:first");
		jQuery(selector+" li:first").fadeIn(self.speed);
		jQuery(selector+" li:not(:first)").hide();
	};

	this.tick = setInterval(self.next,self.interval);
} // end function dzRotate

// EOF: ./js/base.js