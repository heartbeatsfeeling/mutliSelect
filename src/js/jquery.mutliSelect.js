(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(root.jQuery);
	}
}(window, function($) {
	var pluginName = 'mutliSelect';
	var MutliSelect = function($this,option) {
		this.option=option;
		this.$element=$this;
		this._init();
	};
	MutliSelect.prototype ={
		select: function(origin, target) {
			
		},	
		unSelect: function() {

		},
		selectAll: function() {

		},
		unSelectAll: function() {

		},
		_init:function(){
			this.$element.append("<div class='"+pluginName+"'></div>");
		},
		_renderLeft: function() {

		},
		_renderRight: function() {

		},
		_renderTool: function() {

		}
	};
	$.fn[pluginName] = function(option,params) {
		var defaultOption = {};
		this.each(function() {
			var $this=$(this);
			var select =$this.data(pluginName);
			if (typeof option === 'string'&&select[option]) {
				select[option](params);
			} else if (typeof option === 'object') {
				option = $.extend(true, defaultOption, option);
				$this.data(pluginName,new MutliSelect($this,option));
			};
		});
		return this;
	}
}));