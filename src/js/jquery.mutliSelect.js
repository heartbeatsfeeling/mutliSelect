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
		option.callback=option.callback;
		this.option = option;
		this.data=this.option.data;
		this.$element = $this;
		this._init();
	};
	MutliSelect.prototype = {
		select: function(id) {
			this._selectCore(id,true);
		},
		unSelect: function(id) {
			this._selectCore(id,false);
		},
		selectAll: function() {

		},
		unSelectAll: function() {

		},
		_init: function() {
			var html ="<div class='mutliSelect'>" +
					"	<div class='mutliSelect-left'>" +
					"		<div class='mutliSelect-left-search mutliSelect-search'>" +
					"			<input type='text' />" +
					"		</div>" +
					"		<div class='mutliSelect-left-item mutliSelect-item'>" +
					"			<ul></ul>" +
					"		</div>" +
					"	</div>" +
					"	<div class='mutliSelect-tool'>" +
					"		<div class='mutliSelect-tool-select'></div>" +
					"		<div class='mutliSelect-tool-unselect'></div>" +
					"		<div class='mutliSelect-tool-selectAll'></div>" +
					"		<div class='mutliSelect-tool-unSelectAll'></div>" +
					"	</div>" +
					"	<div class='mutliSelect-right'>" +
					"		<div class='mutliSelect-right-search mutliSelect-search'>" +
					"			<input type='text' />" +
					"		</div>" +
					"		<div class='mutliSelect-right-item mutliSelect-item'>" +
					"			<ul></ul>" +
					"		</div>" +
					"	</div>" +
					"</div>";
			this.$element.append(html);
			this._renderLeft();
			this._renderRight();
			this._renderTool();
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
		_selectCore:function(idArr,invert){
			var ids='';
			var arr=[];
			if(!idArr){
				return false;
			};
			if($.isArray(idArr)){
				ids=' '+idArr.join(' ')+' ';
			}else{
				ids=' '+idArr+' ';
			};
			if(this.option.sort){
				$.each(this.data,function(i,item){
					if(ids.indexOf(item.id)!==-1){
						item.selected=invert;
					}
				});
			}else{
				$.each(this.data,function(i,item){
					if(ids.indexOf(item.id)!==-1){
						item.selected=invert;
						item._mutliSelectMoveFlag=true;
						arr.push(item);
					}
				});
				this.data=$.map(this.data,function(item){
					if(!item._mutliSelectMoveFlag){
						return item;
					}
				}).concat(arr);
				$.each(this.data,function(i,item){
					delete item._mutliSelectMoveFlag
				});
			}
			this._renderLeft();
			this._renderRight();

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
			var $el=this.$element;
			$el.find('.mutliSelect-tool-select').html(this.option.selectHTML)
			$el.find('.mutliSelect-tool-unselect').html(this.option.unSelectHTML)
			$el.find('.mutliSelect-tool-selectAll').html(this.option.selectALLHTML)
			$el.find('.mutliSelect-tool-unSelectAll').html(this.option.unSelectAllHTML)
		},
		_bind:function(){
			var that=this;
			var $el=this.$element;
			this.$element.on('dblclick','.mutliSelect-item ul >li',function(){//dblclick item
				var $this=$(this);
				var id=$this.attr('data-mutliselect-id');
				var flag=$this.closest('.mutliSelect-item').hasClass('mutliSelect-left-item');
				that._selectCore(id,flag);
			}).on('click','.mutliSelect-tool-select',function(){//select

			}).on('click','.mutliSelect-tool-unselect',function(){//unSelect
				
			}).on('click','.mutliSelect-tool-selectAll',function(){//selectAll
				console.log(23222)
				$.each(that.data,function(i,item){
					item.selected=true;
				})
				that._renderLeft();
				that._renderRight();
			}).on('click','.mutliSelect-tool-unSelectAll',function(){//unSelectAll
				$.each(that.data,function(i,item){
					item.selected=false;
				})
				that._renderLeft();
				that._renderRight();
			})
		}
	};
	$.fn[pluginName] = function(option, params) {
		var defaultOption = {
			sortBy:false,
			data:[],
			selectHTML:"<span>select</span>",
			unSelectHTML:"<span>unSelect</span>",
			selectALLHTML:"<span>selectALL</span>",
			unSelectAllHTML:"<span>unSelectAll</span>",
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