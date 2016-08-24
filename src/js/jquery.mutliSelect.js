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
	var MutliSelect = function($this, option) {
		option.callback=option.callback||{};
		this.option = option;
		this.$element = $this;
		this._init();
	};
	MutliSelect.prototype = {
		select: function(origin, target) {

		},
		unSelect: function() {

		},
		selectAll: function() {

		},
		unSelectAll: function() {

		},
		_init: function() {
			var html ="<div class='mutliSelect'>" +
					"	<div class='mutliSelect-left'>" +
					"		<div class=\"mutliSelect-left-search\">" +
					"			<input type=\"text\" />" +
					"		</div>" +
					"		<div class=\"mutliSelect-left-item\">" +
					"			<ul></ul>" +
					"		</div>" +
					"	</div>" +
					"	<div class='mutliSelect-right'>" +
					"		<div class=\"mutliSelect-right-search\">" +
					"			<input type=\"text\" />" +
					"		</div>" +
					"		<div class=\"mutliSelect-right-item\">" +
					"			<ul></ul>" +
					"		</div>" +
					"	</div>" +
					"</div>";
			this.$element.append(html);
			this._renderLeft();
			this._renderRight();
		},
		_renderItem:function(item){
			var html="<li data-mutliSelect-id='"+item.id+"'>";
			var itemTemplate=this.option.callback.itemTemplate
			if(itemTemplate&&$.isFunction(itemTemplate)){
				html+=itemTemplate(item)
			}else{
				html="<span>"+item.text+"</span>"
			}
			return html+="</li>"
		},
		_renderLeft: function() {
			var data=$.grep((this.option.data||[]),function(item){
				return item.selected
			},true)
			var i=0;
			var length=data.length;
			var html="";
			for(i;i<length;i++){
				html+=this._renderItem(data[i]);
			};
			this.$element.find('.mutliSelect-left-item').html(html);
		},
		_renderRight: function() {
			var data=$.grep((this.option.data||[]),function(item){
				return item.selected
			},false)
			var i=0;
			var length=data.length;
			var html="";
			for(i;i<length;i++){
				html+=this._renderItem(data[i]);
			};
			this.$element.find('.mutliSelect-right-item').html(html);
		},
		_renderTool: function() {

		}
	};
	$.fn[pluginName] = function(option, params) {
		var defaultOption = {};
		this.each(function() {
			var $this = $(this);
			var select = $this.data(pluginName);
			if (typeof option === 'string' && select[option]) {
				select[option](params);
			} else if (typeof option === 'object') {
				option = $.extend(true, defaultOption, option);
				$this.data(pluginName, new MutliSelect($this, option));
			};
		});
		return this;
	}
}));