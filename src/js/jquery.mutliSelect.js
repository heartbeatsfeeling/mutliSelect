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
		console.log(option)
		option.callback=option.callback
		this.option = option;
		this.data=this.option.data
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
					"		<div class=\"mutliSelect-left-search mutliSelect-search\">" +
					"			<input type=\"text\" />" +
					"		</div>" +
					"		<div class=\"mutliSelect-left-item mutliSelect-item\">" +
					"			<ul></ul>" +
					"		</div>" +
					"	</div>" +
					"	<div class='mutliSelect-right'>" +
					"		<div class=\"mutliSelect-right-search mutliSelect-search\">" +
					"			<input type=\"text\" />" +
					"		</div>" +
					"		<div class=\"mutliSelect-right-item mutliSelect-item\">" +
					"			<ul></ul>" +
					"		</div>" +
					"	</div>" +
					"</div>";
			this.$element.append(html);
			this._renderLeft();
			this._renderRight();
			this._bind();
		},
		_renderCore:function(item){
			var html="<li data-mutliSelect-id='"+item.id+"'>";
			var itemTemplate=this.option.callback.itemTemplate
			if(itemTemplate&&$.isFunction(itemTemplate)){
				html+=itemTemplate(item)
			}else{
				html="<span>"+item.text+"</span>"
			}
			return html+="</li>"
		},
		_renderItem:function($ele,invert){
			var data=$.grep(this.data,function(item){
				return item.selected
			},invert)
			var i=0;
			var length=data.length;
			var html="<ul>";
			for(i;i<length;i++){
				html+=this._renderCore(data[i]);
			};
			html+="</ul>"
			$ele.html(html);
		},
		_renderLeft: function() {
			var $ele=this.$element.find('.mutliSelect-left-item');
			var invert=true;
			this._renderItem($ele,invert);
		},
		_renderRight: function() {
			var $ele=this.$element.find('.mutliSelect-right-item');
			var invert=false;
			this._renderItem($ele,invert);
		},
		_renderTool: function() {

		},
		_bind:function(){
			var $d=$(document);
			var that=this;
			/*dblclick item*/
			$d.on('click','.mutliSelect-item ul >li',function(){
				var $this=$(this);
				var id=$this.attr('data-mutliselect-id');
				var flag=$this.closest('.mutliSelect-item').hasClass('mutliSelect-left-item');
				if(that.option.sortBy){
					$.each(that.data,function(i,item){
						if(item.id===id){
							item.selected=flag;
						}
					});
					that._renderLeft();
					that._renderRight();
				}else{

				}
			});
		}
	};
	$.fn[pluginName] = function(option, params) {
		var defaultOption = {
			sortBy:false,
			data:[],
			callback:{
				select:function(){},
				unSelect:function(){},
				selectAll:function(){},
				unSelectAll:function(){}
			}
		};
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