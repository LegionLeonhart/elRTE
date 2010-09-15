(function($) {
	
	/**
	 * @class elRTE command.
	 * Create/edit anchor
	 * @author Dmitry (dio) Levashov, dio@std42.ru
	 **/
	elRTE.prototype.commands.anchor = function() {
		this.title = 'Bookmark';
		
		/**
		 * Return selected anchor if exists
		 *
		 * @return DOMElement
		 **/
		this._find = function() {
			var sel = this.sel,
				dom = this.dom,
				n   = sel.node(), l, ch;

			if (dom.is(n, 'anchor')) {
				return n;
			}

			n = sel.get(true).reverse();
			l = n.length;
			while (l--) {
				if (dom.is(n[l], 'anchor')) {
					return n[l];
				} else if ((ch = dom.closest(n[l], 'anchor')).length) {
					return ch.pop();
				}
			}
		}
		
		/**
		 * Open dialog 
		 *
		 * @return void
		 **/
		this.dialog = function() {
			var self = this,
				rte  = this.rte,
				n    = this._find(),
				name  = $('<input type="text" size="22" />').val(n ? $(n).attr('name')||'' : ''),
				tb   = new rte.ui.table().append(rte.i18n('Bookmark name')).append(name),
				opts = { title : rte.i18n(this.title), buttons : {} };

			opts.buttons[rte.i18n('Apply')]  = function() { self._exec(name.val()); $(this).dialog('close'); };
			opts.buttons[rte.i18n('Cancel')] = function() { $(this).dialog('close'); };
			new rte.ui.dialog(opts).append(tb.get()).open();
		}

		/**
		 * Insert anchor or change anchor name or remove anchor.
		 *
		 * @param  String  anchor name
		 * @return void
		 **/
		this._exec = function(name) {
			var sel = this.sel,
				dom = this.dom, 
				attr = { name : name, title : name, 'class' : 'elrte-anchor' },
				n;
			
			this.rte.focus();
			
			if ((n = this._find())) {
				name ? $(n).attr(attr) : dom.remove(n);
			} else if (name) {
				sel.select(sel.collapse(true).insertNode(dom.create({ name: 'a', attr : attr})));
			}
			
			return true;
		}

		this._getState = function() {
			return this.dom.testSelection('anchor') ? this.STATE_ACTIVE : this.STATE_ENABLE;
		}

	}
	
})(jQuery);