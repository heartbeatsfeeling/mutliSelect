(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(root.jQuery);
	}
}(window, function($) {
	var pluginName='mutliSelect';
	$.fn[pluginName]=function(option){
		var defaultOption={};
		var that=this;
		var select=function(origin,target){

		};
		var unSelect=function(){

		};
		var selectAll=function(){

		};
		var unSelectAll=function(){

		};
		var renderLeft=function(){

		};
		var renderRight=function(){

		};
		var renderTool=function(){
			
		};
		option=$.extend(true,defaultOption,option);
	}
}));