var View = (function(){

    var container = $('.container')[0];
    var gridContainer = $('.grid-container')[0];
    var timeDom = $('.time')[0];

    var game = null;

    var View = function(){ };

    View.prototype = {

        init : function(g,data){
            game = g;
            this.initGrid(data.cell);
            this.updateTime(data.time);
            if (this.checkImgLoad()) {
                console.log("all img loaded");
                document.getElementById("loading").style.display = "none";
                
                return true;
            }
        },
        checkImgLoad: function() {
            let imgList = document.getElementsByTagName('img');//图片集合
            let imgCount = imgList.length;//图片总数
            let imgLoad = 0;//加载完成的图片数量
            console.log(imgCount);
            for (let i = 0; i < imgCount; i++) {
              imgList[i].onload = () => {
                imgLoad++;
                if (imgLoad === imgCount) {
                  console.log("all img loaded");
                  return true;
                }
              }
            }
            return false;
        },
        updateTime: function (time) {
            timeDom.innerHTML = time;
        },

        itemHTML : function(el){
            var empty = el.val === null;
            var img = config.imgByName(empty ? 0 : el.val);
            return (
                `<div class="grid-item ${empty ? 'hidden' : ''}" 
                    data-val="${el.val}"
                    data-index="${el.index}">
                 <div class="grid-item-content">
                    ${img}
                 </div>
                    ${config.itemDirectionHTML}
                </div>`
            );
        },

        initGrid : function(cell){
            var _this = this;
            var html = "";
            cell.forEach(function(arr){
                html += "<div class='grid-cell'>";
                arr.forEach(function(el){
                    html += _this.itemHTML(el);
                });
                html += '</div>';
            });
            gridContainer.innerHTML = html;
        },

        itemAction : function(item){
            item.classList.add('action');
        },
        itemCancelAction : function(item){
            item.classList.remove('action');
        },

        removeItem : function(index){
            var item = $(`.grid-item[data-index="${index}"]`)[0];
            item.classList.add('hidden');
        },

        getRelationship : function(prev,next,current){
            var dir = [];
            var max = [
                prev > current,
                next > current
            ];
            var arr = [prev,next];
            arr.forEach(function(el,index){
                if (game.identicalY(el,current)){
                    dir[index] = max[index] ? 'right' : 'left';
                }else if (game.identicalX(el,current)){
                    dir[index] = max[index] ? 'down' : 'up';
                }
            });
            return dir;
        },

        showLine : function(pos,callback){
            var _this = this;
            pos.forEach(function(el,index){
                if (index === 0) return;
                if (index === pos.length-1) return;
                var item = $(`.grid-item[data-index="${el}"] .grid-item-direction`)[0];
                var prev = pos[index-1];
                var next = pos[index+1];
                var dir = _this.getRelationship(prev,next,el);
                item.classList.add(dir[0],dir[1]);
            });
            setTimeout(function(){
                _this.clearLine();
                callback();
            },300);
        },

        clearLine : function(){
            var items = $('.grid-item-direction');
            items.forEach(function(el){
                el.classList.remove('up','down','left','right');
            });
        },

    };


    return View;

})();
