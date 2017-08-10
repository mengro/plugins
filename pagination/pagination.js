function PaginationBlack(ele,size,handle,count,tolPage){
	//dom元素
	this.ele = $(ele);
	var content = 	'<div class="pagination_prev">'
						+'<span class="live"><</span>'
					+'</div>'
					+'<div class="pagination_show">'
					    +'<span id="pagination_value"></span>'
					    +'<span>（页）共</span>'
					    +'<span id="pagination_total"></span>'
					    +'<span>条</span>'
					+'</div>'
					+'<div class="pagination_next">'
					   +'<span class="live">></span>'
					+'</div>'

	this.ele.html(content);
	this.prevEle = this.ele.find(".pagination_prev");
	this.showEle = this.ele.find(".pagination_show");
	this.nextEle = this.ele.find(".pagination_next");
	this.valueEle = this.ele.find("#pagination_value");
	this.totalEle = this.ele.find("#pagination_total");

	this.size = size ? size : 10;//默认

	//默认变量，通过update方法来更新
	this.count = count ? count : 0;//默认
	this.tolPage = tolPage ? tolPage : 1;

	//当前页，初始为1
	this.curPage = 1;

	//翻页回调
	this.handle = handle;

	//更新按钮状态
	this._updateBtn = function(){

		this.prevEle.find("span").attr("class","live");
		this.nextEle.find("span").attr("class","live");

		if(this.curPage === 1){
			this.prevEle.find("span").attr("class","disable");
		}
		if (this.tolPage === this.curPage) {
			this.nextEle.find("span").attr("class","disable");
		}

		this.valueEle.html(this.curPage + "\/" + this.tolPage);
		this.totalEle.html(this.count);
	}

	this.prevEle.on("click",function(e){
		if(this.prevEle.find("span").hasClass("disable")){
			return;
		}
		this.curPage --;
		this._updateBtn(this.count,this.tolPage);
		this.handle(this.curPage);
		return false;
	}.bind(this));

	this.nextEle.on("click",function(e){
		if(this.nextEle.find("span").hasClass("disable")){
			return;
		}
		this.curPage ++;
		this._updateBtn(this.count,this.tolPage);
		this.handle(this.curPage);
		return false;
	}.bind(this));

}

PaginationBlack.prototype.init = function(){
	this.tolPage = Math.floor( this.count / this.size) + 1;
	this._updateBtn(this.count,this.tolPage);
}

PaginationBlack.prototype.updateCurPage = function(n){
	this.curPage = n;
}

PaginationBlack.prototype.updateCount = function(count){
	this.count = count;
}
