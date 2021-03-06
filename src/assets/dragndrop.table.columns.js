/*global $:false, jQuery:false*/
/*
Drag & Drop Table Columns v.3.1.5
for jQuery 3.x
by Oleksandr Nikitin (a.nikitin@i.ua)
https://github.com/alexshnur/drag-n-drop-table-columns
*/
(function($, window) {
  var dragSrcEl = null,
    dragSrcEnter = null,
    tables = {};

  function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
  }

  function isIE() {
    var nav = navigator.userAgent.toLowerCase();
    return nav.indexOf("msie") !== -1 ? parseInt(nav.split("msie")[1]) : false;
  }

  dragableColumns = (function() {
    function dragColumns(table, options) {
      var id = table[0].id;
      tables[id] = table;
      this.id = id;
      this.options = $.extend({}, this.options, options);
      if (this.options.drag) {
        if (isIE() === 9) {
          table.find("thead tr th").each(function() {
            if ($(this).find(".drag-ie").length === 0) {
              $(this).html(
                $("<a>")
                  .html($(this).html())
                  .attr({"href": "javascript:void()", "tabindex": "-1"})
                  .css({"text-decoration":"none"})
                  .addClass("drag-ie")
              );
            }
          });
        }
        this.cols = table.find("thead tr th");

        jQuery.event.addProp("dataTransfer");

        var _this = this;

        [].forEach.call(_this.cols, function(col) {
          col.setAttribute("draggable", true);

          if (col.firstElementChild != null) {
            col.firstElementChild.setAttribute("draggable", true);

            if (col.firstElementChild.firstElementChild != null) {
              col.firstElementChild.firstElementChild.setAttribute(
                "draggable",
                true
              );
            }
          }

          $(col).on("dragstart", function(e){
            _this.handleDragStart.call(this, e,_this);
          });

          $(col).on("dragenter", function(e){
            _this.handleDragEnter.call(this, e,_this);
          });

          $(col).on("dragover", function(e){
            _this.handleDragOver.call(this, e,_this);
          });

          $(col).on("dragleave", function(e){
            _this.handleDragLeave.call(this, e,_this);
          });

          $(col).on("drop", function(e){
            _this.handleDrop.call(this, e,_this);
          });

          $(col).on("dragend", function(e){
            _this.handleDragEnd.call(this, e,_this);
          });
        });
      }
    }

    dragColumns.prototype = {
      options: {
        drag: true,
        dragClass: "drag",
        overClass: "over",
        movedContainerSelector: ".dnd-moved",
        dropCallback: null,
        dragStartCallback: null,
        dragEndCallback: null,
        dragEnterCallback: null
      },
      refreshResize: function(table) {
        table.colResizable({
          resizeMode: "overflow",
          partialRefresh: true
        });
      },
      handleDragStart: function(e, _this) {
        var canDrag = true;

        if (typeof _this.options.dragStartCallback === "function") {
          canDrag = _this.options.dragStartCallback($(this).index());
        }

        if (canDrag === true) {
          $(this).addClass(_this.options.dragClass);
          dragSrcEl = this;
          e.dataTransfer.effectAllowed = "copy";
          e.dataTransfer.setData("text", this.id);
        } else if (e.preventDefault){
          e.preventDefault();
        }
      },
      handleDragOver: function(e, _this) {
        var canDrag = true;

        if (typeof _this.options.dragEnterCallback === "function") {
          canDrag = _this.options.dragEnterCallback($(this).index());
        }

        if (canDrag === false) return;

        if (e.preventDefault) {
          e.preventDefault();
        }

        e.dataTransfer.dropEffect = "copy";

        return;
      },
      handleDragEnter: function(e, _this) {
        dragSrcEnter = this;
        [].forEach.call(_this.cols, function(col) {
          $(col).removeClass(_this.options.overClass);
        });
        $(this).addClass(_this.options.overClass);

        return;
      },
      handleDragLeave: function(e, _this) {
        if (dragSrcEnter !== e) {
          //this.classList.remove(_this.options.overClass);
        }
      },
      handleDrop: function(e, _this) {
        if (e.stopPropagation) {
          e.stopPropagation();
        }

        if (dragSrcEl !== e) {
          var parentTable = dragSrcEl.parentElement.parentElement.parentElement;
          _this.moveColumns(
            tables[parentTable.id],
            $(dragSrcEl).index(),
            $(this).index(),
            _this
          );
        }
        return;
      },
      handleDragEnd: function(e, _this) {
        if (typeof _this.options.dragEndCallback === "function") {
          _this.options.dragEndCallback();
        }

        var colPositions = {
          array: [],
          object: {}
        };
        [].forEach.call(_this.cols, function(col) {
          var name = $(col).attr("data-name") || $(col).index();
          $(col).removeClass(_this.options.overClass);
          colPositions.object[name] = $(col).index();
          colPositions.array.push($(col).index());
        });
        if (typeof _this.options.onDragEnd === "function") {
          _this.options.onDragEnd(colPositions);
        }
        $(dragSrcEl).removeClass(_this.options.dragClass);
        
        return;
      },
      moveColumns: function(table, fromIndex, toIndex, _this) {
        var rows = table.find(_this.options.movedContainerSelector);
        for (var i = 0; i < rows.length; i++) {
          if (toIndex > fromIndex) {
            insertAfter(rows[i].children[fromIndex], rows[i].children[toIndex]);
          } else if (toIndex < table.find("thead tr th").length - 1) {
            rows[i].insertBefore(
              rows[i].children[fromIndex],
              rows[i].children[toIndex]
            );
          }
        }
        _this.refreshResize(table);

        if (typeof _this.options.dropCallback === "function") {
          _this.options.dropCallback(fromIndex, toIndex);
        }
      },
      destroy: function() {
        delete tables[this.id];
        this.cols = null;
        dragSrcEl = null;
        dragSrcEnter = null;
      }
    };

    return dragColumns;
  })();

  return $.fn.extend({
    dragableColumns: function() {
      var option = arguments[0];
      return new dragableColumns($(this), option);
    }
  });
})(window.jQuery, window);
