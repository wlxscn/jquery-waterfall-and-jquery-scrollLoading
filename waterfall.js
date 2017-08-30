;(function() {
    var columnCount= 0,  // 列数目
        wrapperWidth= 0, // 容器宽度
        colGapWidth= 10, // 列之间的间距
        colMinWidth= 500, // 最小列宽
        columnWidth= 300, // 列的宽度

        columns= []; // 存放所有列的高度
    
    function getColumnCount() {
        return Math.floor((wrapperWidth + colGapWidth)/(columnWidth+colGapWidth));
    }
    
    // 如果使用最小宽度会存在填不满整个容器，所以需要计算实际列宽
    function getColumnWidth() {
        return (wrapperWidth-(columnCount-1)*colGapWidth)/columnCount;
    }

    function initColumns() {
        if(columns.length != 0) {
            return;
        }
        for(var i=0; i<columnCount; i++) {
            columns.push(0);
        }
    }

    function renderColumns($items) {
         $items.css({
            position: 'absolute',
            width: columnWidth
        })

        $items.each(itemEach);
    }

    function itemEach() {

        var $this= $(this);

        if($this.attr('sorted')) {
            return;
        }

        // 当前高度最小的列
        var colMinHeight = Math.min.apply(Math, columns);
        // 当前高度最小列在数组中的序号
        var colMinHeightIndex = columns.indexOf(colMinHeight);
        
        $(this).css({
            top: colMinHeight,
            left: colMinHeightIndex*(columnWidth+colGapWidth)
        });

        columns[colMinHeightIndex]= colMinHeight+colGapWidth+$this.outerHeight();

        $this.attr('sorted', true);

        $this= null;

    }

    function initScrollLoading(wrap) {
        wrap.on('scroll', function() {
            if(wrap.get(0).scrollHeight-wrap.get(0).scrollTop-wrap.height()<=10){
                 console.log('scrollloading');
            }
        })
    }

    function initWaterfall(wrap) {
        wrapperWidth= wrap.width();
        
        columnCount= getColumnCount();

        columnWidth= getColumnWidth();

        initColumns();

        initScrollLoading(wrap);

        renderColumns($('.item'));

    }

    $.fn.waterfall= function() {
        initWaterfall(this);
    }

})()

