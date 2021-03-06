var searchText = "";

/**
 * A GridPanel class with live search support.
 * @author Nicolas Ferrero
 */
Ext.define('Ext.ux.LiveSearchGridPanel', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.toolbar.TextItem',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.ux.statusbar.StatusBar'
    ],
    
    /**
     * @private
     * search value initialization
     */
    searchValue: null,
    
    /**
     * @private
     * The row indexes where matching strings are found. (used by previous and next buttons)
     */
    indexes: [],
    
    /**
     * @private
     * The row index of the first search, it could change if next or previous buttons are used.
     */
    currentIndex: null,
    
    /**
     * @private
     * The generated regular expression used for searching.
     */
    searchRegExp: null,
    
    /**
     * @private
     * Case sensitive mode.
     */
    caseSensitive: false,
    
    /**
     * @private
     * Regular expression mode.
     */
    regExpMode: false,
    
    /**
     * @cfg {String} matchCls
     * The matched string css classe.
     */
    matchCls: 'x-livesearch-match',
    
    defaultStatusText: '',
    
    // Component initialization override: adds the top and bottom toolbars and setup headers renderer.
    initComponent: function() {
        var me = this;
        me.tbar = [
            {
                xtype: 'button',
                tooltip: 'Refresh',
                text: 'Refresh',
                style: { border: 'solid 1px #6D91C7' },
                // icon: 'resources/icons/refresh.png',
                listeners:{
                    click: function(){
                        var store =  Ext.getStore('Files');
                        store.proxy.url = serverLocation + 'GetFileData?projectId=' + selectedProjectId;
                        store.reload();
                        Ext.getCmp('gridFiles').getView().refresh(); 
                    }
                }
            },
            {
                xtype: 'tbfill'
            },
            searchText = new Ext.Toolbar.TextItem({text: ''}),
            '|',
            'Search',{
                 xtype: 'textfield',
                 name: 'searchField',
                 hideLabel: true,
                 width: 200,
                 listeners: {
                     change: {
                         fn: me.onTextFieldChange,
                         scope: this,
                         buffer: 100
                     },
                     blur: function(){
                        // me.statusBar.setStatus({
                        //      text: '',
                        //      iconCls: 'x-status-valid'
                        //  });
                        var currCount = Ext.getStore('Files').getCount();
                        var totalCount = Ext.getStore('Files').getTotalCount();
                        if(currCount==totalCount){
                            searchText.setText("Total Files: " + Ext.getStore('Files').getTotalCount());
                        }
                        else{
                            searchText.setText("Displaying " + currCount + " of " + totalCount +  " Files"); 
                        }
                     }
                 }
            }, 
            // {
            //     xtype: 'button',
            //     text: '&lt;',
            //     tooltip: 'Find Previous Row',
            //     handler: me.onPreviousClick,
            //     scope: me
            // },{
            //     xtype: 'button',
            //     text: '&gt;',
            //     tooltip: 'Find Next Row',
            //     handler: me.onNextClick,
            //     scope: me
            // },
            //  '-', {
            //     xtype: 'checkbox',
            //     hideLabel: true,
            //     margin: '0 0 0 4px',
            //     handler: me.regExpToggle,
            //     scope: me                
            // }, 'Regular expression', {
            //     xtype: 'checkbox',
            //     hideLabel: true,
            //     margin: '0 0 0 4px',
            //     handler: me.caseSensitiveToggle,
            //     scope: me
            // }, 'Case sensitive'
            ];

        // me.bbar = Ext.create('Ext.ux.StatusBar', {
        //     defaultText: me.defaultStatusText,
        //     name: 'searchStatusBar',
        //     id: 'file-status'
        // });
        
        me.callParent(arguments);
    },
    
    // afterRender override: it adds textfield and statusbar reference and start monitoring keydown events in textfield input 
    afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.textField = me.down('textfield[name=searchField]');
        // me.statusBar = me.down('statusbar[name=searchStatusBar]');
    },
    // detects html tag
    tagsRe: /<[^>]*>/gm,
    
    // DEL ASCII code
    tagsProtect: '\x0f',
    
    // detects regexp reserved word
    regExpProtect: /\\|\/|\+|\\|\.|\[|\]|\{|\}|\?|\$|\*|\^|\|/gm,
    
    /**
     * In normal mode it returns the value with protected regexp characters.
     * In regular expression mode it returns the raw value except if the regexp is invalid.
     * @return {String} The value to process or null if the textfield value is blank or invalid.
     * @private
     */
    getSearchValue: function() {
        var me = this,
            value = me.textField.getValue();
            
        if (value === '') {
            return null;
        }
        if (!me.regExpMode) {
            value = value.replace(me.regExpProtect, function(m) {
                return '\\' + m;
            });
        } else {
            try {
                new RegExp(value);
            } catch (error) {
                // me.statusBar.setStatus({
                //     text: error.message,
                //     iconCls: 'x-status-error'
                // });
                return null;
            }
            // this is stupid
            if (value === '^' || value === '$') {
                return null;
            }
        }

        return value;
    },
    
    /**
     * Finds all strings that matches the searched value in each grid cells.
     * @private
     */
     onTextFieldChange: function(field, newValue, oldValue, options) {
         var me = this,
             count = 0;  
        
         me.view.refresh();
        var currCount = Ext.getStore('Files').getCount();
        var totalCount = Ext.getStore('Files').getTotalCount();
            
         // reset the statusbar
         // me.statusBar.setStatus({
         //     text: me.defaultStatusText,
         //     iconCls: ''
         // });

         me.searchValue = me.getSearchValue();
         me.indexes = [];
         me.currentIndex = null;

         if (me.searchValue !== null) {
             me.searchRegExp = new RegExp(me.searchValue, 'g' + (me.caseSensitive ? '' : 'i'));
             
             
             me.store.each(function(record, idx) {
                 var td = Ext.fly(me.view.getNode(idx)).down('td'),
                     cell, matches, cellHTML;
                 while(td) {
                     cell = td.down('.x-grid-cell-inner');
                     matches = cell.dom.innerHTML.match(me.tagsRe);
                     cellHTML = cell.dom.innerHTML.replace(me.tagsRe, me.tagsProtect);
                     
                     // populate indexes array, set currentIndex, and replace wrap matched string in a span
                     cellHTML = cellHTML.replace(me.searchRegExp, function(m) {
                        count += 1;
                        if (Ext.Array.indexOf(me.indexes, idx) === -1) {
                            me.indexes.push(idx);
                        }
                        if (me.currentIndex === null) {
                            me.currentIndex = idx;
                        }
                        return '<span class="' + me.matchCls + '">' + m + '</span>';
                     });
                     // restore protected tags
                     Ext.each(matches, function(match) {
                        cellHTML = cellHTML.replace(me.tagsProtect, match); 
                     });
                     // update cell html
                     cell.dom.innerHTML = cellHTML;
                     td = td.next();
                 }
             }, me);

             // results found
             if (me.currentIndex !== null) {
                 // me.getSelectionModel().select(me.currentIndex);
                 // me.statusBar.setStatus({
                 //     text: count + ' matche(s) found.',
                 //     iconCls: 'x-status-valid'
                 // });
                
             }
         }

          var grid = Ext.getCmp('gridFiles');
            grid.store.clearFilter();

            if (newValue) {
                // if(me.caseSensitive){
                //     var matcher = new RegExp(newValue);
                // }
                // else{
                    var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
                // }
                grid.store.filter({
                    filterFn: function(record) {
                        return matcher.test(record.get('name')) ||
                            matcher.test(record.get('ext')) ||
                            matcher.test(record.get('time')) ||
                            matcher.test(record.get('version'));
                    }
                });
                currCount = Ext.getStore('Files').getCount();
                searchText.setText("Displaying " + currCount + " of " + totalCount + " Files");
            }


         // no results found
         if (me.currentIndex === null) {
             me.getSelectionModel().deselectAll();
             // me.statusBar.setStatus({
             //         text: 'No matche(s) found.',
             //         iconCls: 'x-status-valid'
             //     });
            currCount = Ext.getStore('Files').getCount();
            searchText.setText("Displaying " + currCount + " of " + totalCount +  " Files"); 
         }

         // force textfield focus
         me.textField.focus();
     },
    
     /**
     * Selects the previous row containing a match.
     * @private
     */   
    onPreviousClick: function() {
        var me = this,
            idx;
            
        if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
            me.currentIndex = me.indexes[idx - 1] || me.indexes[me.indexes.length - 1];
            me.getSelectionModel().select(me.currentIndex);
         }
    },
    
    /**
     * Selects the next row containing a match.
     * @private
     */    
    onNextClick: function() {
         var me = this,
             idx;
             
         if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
            me.currentIndex = me.indexes[idx + 1] || me.indexes[0];
            me.getSelectionModel().select(me.currentIndex);
         }
    },
    
    /**
     * Switch to case sensitive mode.
     * @private
     */    
    caseSensitiveToggle: function(checkbox, checked) {
        this.caseSensitive = checked;
        this.onTextFieldChange();
    },
    
    /**
     * Switch to regular expression mode
     * @private
     */
    regExpToggle: function(checkbox, checked) {
        this.regExpMode = checked;
        this.onTextFieldChange();
    }
});