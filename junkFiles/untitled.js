addToc: function(){
        var JSONStart = ' "root": { "expanded": true , "children": [ ';
        var JSONEnd = ']}'
        var ToCjsonHtml = JSONStart + this.jsonHtmlTree() + JSONEnd;
        console.log(ToCjsonHtml);
        var treeObj = JSON.parse(ToCjsonHtml);
        localStorage.setItem( "HTML Tree", treeObj );
    },

jsonHtmlTree: function(obj){
        var obj = obj || document.getElementById('content');
        console.log(obj);
        var str = '\n{ "text": "' + obj.tagName + '",';
        if (obj.hasChildNodes()) {
          var child = obj.firstChild;
          if (child.nodeType === 1){
            str += ' "expanded": true, "children": \n[';
          }
          else{
             str += ' "leaf": true },' ;
          }
          while (child) {
            if (child.nodeType === 1) {
              str += this.jsonHtmlTree(child);
            }
            previous = child;
            child = child.nextSibling;
          }
          if(previous.nodeType===1){
            str += ']},';
          }      
        }
        else{
          str += '"leaf": true },' 
        }
      return str;
    },

 addToc: function(){
        var JSONStart = "  root: {expanded: true,children: [ ";
        var JSONEnd = "]}"
        var ToCjsonHtml = JSONStart + this.jsonHtmlTree() + JSONEnd;
        console.log(ToCjsonHtml);
        var treeObj = JSON.parse(ToCjsonHtml);
        localStorage.setItem( "HTML Tree", treeObj );
    },

      jsonHtmlTree: function(obj){
        var obj = obj || document.getElementById('content');
        console.log(obj);
        var str = "\n{ text: '" + obj.tagName + "',";
        if (obj.hasChildNodes()) {
          var child = obj.firstChild;
          if (child.nodeType === 1){
            str += " expanded: true, children: \n[";
          }
          else{
             str += " leaf: true }," ;
          }
          while (child) {
            if (child.nodeType === 1) {
              str += this.jsonHtmlTree(child);
            }
            previous = child;
            child = child.nextSibling;
          }
          if(previous.nodeType===1){
            str += "]},";
          }      
        }
        else{
          str += "leaf: true }," 
        }
      return str;
    },