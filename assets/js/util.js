(function($) {

	/**
	 * Genera una lista indentata di link da un nav. Pensata per l'uso con panel().
	 * @return {jQuery} jQuery object.
	 */
	$.fn.navList = function() {

		var	$this = $(this);
			$a = $this.find('a'),
			b = [];

		$a.each(function() {

			var	$this = $(this),
				indent = Math.max(0, $this.parents('li').length - 1),
				href = $this.attr('href'),
				target = $this.attr('target');

			b.push(
				'<a ' +
					'class="link depth-' + indent + '"' +
					( (typeof target !== 'undefined' && target != '') ? ' target="' + target + '"' : '') +
					( (typeof href !== 'undefined' && href != '') ? ' href="' + href + '"' : '') +
				'>' +
					'<span class="indent-' + indent + '"></span>' +
					$this.text() +
				'</a>'
			);

		});

		return b.join('');

	};

	/**
	 * Trasforma un elemento in pannello.
	 * @param {object} userConfig Configurazione utente.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.panel = function(userConfig) {

		// Nessun elemento? Usciamo.
			if (this.length == 0)
				return $this;

		// Elementi multipli?
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).panel(userConfig);

				return $this;

			}

		// Variabili.
			var	$this = $(this),
				$body = $('body'),
				$window = $(window),
				id = $this.attr('id'),
				config;

		// Configurazione.
			config = $.extend({

				// Ritardo.
					delay: 0,

				// Nascondi il pannello al click su un link.
					hideOnClick: false,

				// Nascondi il pannello alla pressione di Escape.
					hideOnEscape: false,

				// Nascondi il pannello allo swipe.
					hideOnSwipe: false,

				// Resetta la posizione di scroll alla chiusura.
					resetScroll: false,

				// Resetta i form alla chiusura.
					resetForms: false,

				// Lato del viewport dove appare il pannello.
					side: null,

				// Elemento target per la classe.
					target: $this,

				// Classe da togglare.
					visibleClass: 'visible'

			}, userConfig);

			// Espandi "target" se non è già un jQuery object.
				if (typeof config.target != 'jQuery')
					config.target = $(config.target);

		// Pannello.

			// Metodi.
				$this._hide = function(event) {

					// Già nascosto? Usciamo.
						if (!config.target.hasClass(config.visibleClass))
							return;

					// Se è stato passato un evento, annullalo.
						if (event) {

							event.preventDefault();
							event.stopPropagation();

						}

					// Nascondi.
						config.target.removeClass(config.visibleClass);

					// Operazioni post-hide.
						window.setTimeout(function() {

							// Resetta la posizione di scroll.
								if (config.resetScroll)
									$this.scrollTop(0);

							// Resetta i form.
								if (config.resetForms)
									$this.find('form').each(function() {
										this.reset();
									});

						}, config.delay);

				};

			// Fix vendor.
				$this
					.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
					.css('-webkit-overflow-scrolling', 'touch');

			// Nascondi al click.
				if (config.hideOnClick) {

					$this.find('a')
						.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

					$this
						.on('click', 'a', function(event) {

							var $a = $(this),
								href = $a.attr('href'),
								target = $a.attr('target');

							if (!href || href == '#' || href == '' || href == '#' + id)
								return;

							// Annulla l'evento originale.
								event.preventDefault();
								event.stopPropagation();

							// Nascondi il pannello.
								$this._hide();

							// Reindirizza all'href.
								window.setTimeout(function() {

									if (target == '_blank')
										window.open(href);
									else
										window.location.href = href;

								}, config.delay + 10);

						});

				}

			// Evento: gestione touch.
				$this.on('touchstart', function(event) {

					$this.touchPosX = event.originalEvent.touches[0].pageX;
					$this.touchPosY = event.originalEvent.touches[0].pageY;

				})

				$this.on('touchmove', function(event) {

					if ($this.touchPosX === null
					||	$this.touchPosY === null)
						return;

					var	diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
						diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
						th = $this.outerHeight(),
						ts = ($this.get(0).scrollHeight - $this.scrollTop());

					// Nascondi allo swipe?
						if (config.hideOnSwipe) {

							var result = false,
								boundary = 20,
								delta = 50;

							switch (config.side) {

								case 'left':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
									break;

								case 'right':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
									break;

								case 'top':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY > delta);
									break;

								case 'bottom':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY < (-1 * delta));
									break;

								default:
									break;

							}

							if (result) {

								$this.touchPosX = null;
								$this.touchPosY = null;
								$this._hide();

								return false;

							}

						}

					// Impedisce lo scroll verticale oltre i limiti.
						if (($this.scrollTop() < 0 && diffY < 0)
						|| (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {

							event.preventDefault();
							event.stopPropagation();

						}

				});

			// Evento: blocca il bubbling di certi eventi all'interno del pannello.
				$this.on('click touchend touchstart touchmove', function(event) {
					event.stopPropagation();
				});

			// Evento: nascondi il pannello se viene cliccato un link figlio che punta al suo ID.
				$this.on('click', 'a[href="#' + id + '"]', function(event) {

					event.preventDefault();
					event.stopPropagation();

					config.target.removeClass(config.visibleClass);

				});

		// Body.

			// Evento: nascondi il pannello al click/tap sul body.
				$body.on('click touchend', function(event) {
					$this._hide(event);
				});

			// Evento: toggle.
				$body.on('click', 'a[href="#' + id + '"]', function(event) {

					event.preventDefault();
					event.stopPropagation();

					config.target.toggleClass(config.visibleClass);

				});

		// Window.

			// Evento: nascondi con ESC.
				if (config.hideOnEscape)
					$window.on('keydown', function(event) {

						if (event.keyCode == 27)
							$this._hide(event);

					});

		return $this;

	};

	/**
	 * Applica il polyfill dell'attributo "placeholder" a uno o più form.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.placeholder = function() {

		// Il browser supporta i placeholder nativamente? Usciamo.
			if (typeof (document.createElement('input')).placeholder != 'undefined')
				return $(this);

		// Nessun elemento? Usciamo.
			if (this.length == 0)
				return $this;

		// Elementi multipli?
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).placeholder();

				return $this;

			}

		// Variabili.
			var $this = $(this);

		// Text, TextArea.
			$this.find('input[type=text],textarea')
				.each(function() {

					var i = $(this);

					if (i.val() == ''
					||  i.val() == i.attr('placeholder'))
						i
							.addClass('polyfill-placeholder')
							.val(i.attr('placeholder'));

				})
				.on('blur', function() {

					var i = $(this);

					if (i.attr('name').match(/-polyfill-field$/))
						return;

					if (i.val() == '')
						i
							.addClass('polyfill-placeholder')
							.val(i.attr('placeholder'));

				})
				.on('focus', function() {

					var i = $(this);

					if (i.attr('name').match(/-polyfill-field$/))
						return;

					if (i.val() == i.attr('placeholder'))
						i
							.removeClass('polyfill-placeholder')
							.val('');

				});

		// Campo password.
			$this.find('input[type=password]')
				.each(function() {

					var i = $(this);
					var x = $(
								$('<div>')
									.append(i.clone())
									.remove()
									.html()
									.replace(/type="password"/i, 'type="text"')
									.replace(/type=password/i, 'type=text')
					);

					if (i.attr('id') != '')
						x.attr('id', i.attr('id') + '-polyfill-field');

					if (i.attr('name') != '')
						x.attr('name', i.attr('name') + '-polyfill-field');

					x.addClass('polyfill-placeholder')
						.val(x.attr('placeholder')).insertAfter(i);

					if (i.val() == '')
						i.hide();
					else
						x.hide();

					i
						.on('blur', function(event) {

							event.preventDefault();

							var x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

							if (i.val() == '') {

								i.hide();
								x.show();

							}

						});

					x
						.on('focus', function(event) {

							event.preventDefault();

							var i = x.parent().find('input[name=' + x.attr('name').replace('-polyfill-field', '') + ']');

							x.hide();

							i
								.show()
								.focus();

						})
						.on('keypress', function(event) {

							event.preventDefault();
							x.val('');

						});

				});

		// Gestione eventi.
			$this
				.on('submit', function() {

					$this.find('input[type=text],input[type=password],textarea')
						.each(function(event) {

							var i = $(this);

							if (i.attr('name').match(/-polyfill-field$/))
								i.attr('name', '');

							if (i.val() == i.attr('placeholder')) {

								i.removeClass('polyfill-placeholder');
								i.val('');

							}

						});

				})
				.on('reset', function(event) {

					event.preventDefault();

					$this.find('select')
						.val($('option:first').val());

					$this.find('input,textarea')
						.each(function() {

							var i = $(this),
								x;

							i.removeClass('polyfill-placeholder');

							switch (this.type) {

								case 'submit':
								case 'reset':
									break;

								case 'password':
									i.val(i.attr('defaultValue'));

									x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

									if (i.val() == '') {
										i.hide();
										x.show();
									}
									else {
										i.show();
										x.hide();
									}

									break;

								case 'checkbox':
								case 'radio':
									i.attr('checked', i.attr('defaultValue'));
									break;

								case 'text':
								case 'textarea':
									i.val(i.attr('defaultValue'));

									if (i.val() == '') {
										i.addClass('polyfill-placeholder');
										i.val(i.attr('placeholder'));
									}

									break;

								default:
									i.val(i.attr('defaultValue'));
									break;

							}
						});

				});

		return $this;

	};

	/**
	 * Sposta gli elementi verso/da la prima posizione del rispettivo genitore.
	 * @param {jQuery} $elements Elementi (o selettore) da spostare.
	 * @param {bool} condition Se true, sposta gli elementi in cima. Altrimenti, li riporta nella posizione originale.
	 */
	$.prioritize = function($elements, condition) {

		var key = '__prioritize';

		// Espandi $elements se non è già un jQuery object.
			if (typeof $elements != 'jQuery')
				$elements = $($elements);

		// Itera sugli elementi.
			$elements.each(function() {

				var	$e = $(this), $p,
					$parent = $e.parent();

				// Nessun genitore? Usciamo.
					if ($parent.length == 0)
						return;

				// Non ancora spostato? Spostalo.
					if (!$e.data(key)) {

						// Condizione falsa? Usciamo.
							if (!condition)
								return;

						// Ottieni il segnaposto (riferimento per riportare l'elemento nella posizione originale).
							$p = $e.prev();

							// Nulla trovato? L'elemento è già in cima, usciamo.
								if ($p.length == 0)
									return;

						// Sposta l'elemento in cima al genitore.
							$e.prependTo($parent);

						// Segna l'elemento come spostato.
							$e.data(key, $p);

					}

				// Già spostato?
					else {

						// Condizione vera? Usciamo.
							if (condition)
								return;

						$p = $e.data(key);

						// Riporta l'elemento nella posizione originale (usando il segnaposto).
							$e.insertAfter($p);

						// Rimuovi il segno di spostamento.
							$e.removeData(key);

					}

			});

	};

})(jQuery);