/**
 * 绘制分时图平均成本线
 *
 * this:{
 *     container:画布的容器
 *     interactive:图表交互
 * }
 * this.options:{
 *     data:    行情数据
 *     type:    "TL"(分时图),"DK"(日K线图),"WK"(周K线图),"MK"(月K线图)
 *     canvas:  画布对象
 *     ctx:     画布上下文
 *     canvas_offset_top:   画布中坐标轴向下偏移量
 *     padding_left:    画布左侧边距
 *     k_v_away:    行情图表（分时图或K线图）和成交量图表的间距
 *     scale_count:     缩放默认值
 *     c_1_height:  行情图表（分时图或K线图）的高度
 *     rect_unit:   分时图或K线图单位绘制区域
 * }
 *
 */

// 拓展，合并，复制
var extend = require('tools/extend');
// 主题
var theme = require('theme/default');
// 工具
var common = require('common');
var Draw_Avg_Cost = (function () {
	function Draw_Avg_Cost(options){
		// 设置默认参数
        this.defaultoptions = theme.draw_line;
        this.options = {};
        extend(true,this.options,this.defaultoptions, options);
        // 绘图
        this.draw();
	}

	Draw_Avg_Cost.prototype.draw = function() {
		var ctx = this.options.context;
		var data = this.options.data;
		this.options.height = ctx.canvas.height * theme.defaulttheme.c_h_percent;
		// 绘制平均线
		this.draw_k(ctx,data);
	};
	// 绘制平均线
	Draw_Avg_Cost.prototype.draw_k = function(ctx,data) {
		var color = this.options.avg_cost_color;
		var data_arr = data.data;
		// var w = this.options.width - 30;
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = color;
		ctx.fillStyle = '';
		for(var i = 0;i<data_arr.length;i++) {
			var x = common.get_x.call(this,i+1);
			var y = common.get_y.call(this,data_arr[i].avg_cost);
			if(i == 0){
				ctx.moveTo(x,y);
			}
			else {
				ctx.lineTo(x,y);
			}
			
		}
		ctx.stroke();
		
	};

	return Draw_Avg_Cost
})()

module.exports = Draw_Avg_Cost;