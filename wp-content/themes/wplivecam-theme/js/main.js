jQuery( document ).ready( function() {

  // Models Previews Manager IFEE.
  // Load StripChat player only if a StripChat model is present on the current page.
  (function modelsPreviewsManager() {
    var modelsPreviewsXhrs = {};
    var modelsPreviewsBuffer = {};
    var stripchatPlayers = {};
    if ( jQuery( '[data-camsite="stripchat"]' ).length >= 1 ) {
      !function (t) { var e = {}; function n(i) { if (e[i]) return e[i].exports; var r = e[i] = { i: i, l: !1, exports: {} }; return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports } n.m = t, n.c = e, n.d = function (t, e, i) { n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i }) }, n.r = function (t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, n.t = function (t, e) { if (1 & e && (t = n(t)), 8 & e) return t; if (4 & e && "object" == typeof t && t && t.__esModule) return t; var i = Object.create(null); if (n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t) for (var r in t) n.d(i, r, function (e) { return t[e] }.bind(null, r)); return i }, n.n = function (t) { var e = t && t.__esModule ? function () { return t.default } : function () { return t }; return n.d(e, "a", e), e }, n.o = function (t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, n.p = "", n(n.s = 1) }([function (t, e, n) { !function (t) { "use strict"; function e(t) { if ("" === t.src || this.loader.lastDrawnIndex > t.queueIndex) console.info("Stripchat Player :: Skip of successfully loaded image"); else if (this.canvasRef && (this.loader.lastDrawnIndex = t.queueIndex, !1 !== this.successHandler(t))) { var e = this.canvasRef.getContext("2d"); if (0 < this.canvasRef.width && 0 < this.canvasRef.height && t) { var n = function (t, e) { var n = t.height, i = t.width; if (!e) return { canvasWidth: i, canvasHeight: n, canvasWidthOffset: 0, canvasHeightOffset: 0 }; var r = e.height, s = e.width, a = Math.max(s / i, r / n), o = (i * a - s) / a, h = (n * a - r) / a; return { canvasWidth: i - o, canvasHeight: n - h, canvasWidthOffset: o / 2, canvasHeightOffset: h / 2 } }(t, this.containerSize); this.canvasRef.width = this.containerSize.width, this.canvasRef.height = this.containerSize.height, e.clearRect(0, 0, this.containerSize.width, this.containerSize.height), e.drawImage(t, n.canvasWidthOffset, n.canvasHeightOffset, n.canvasWidth, n.canvasHeight, 0, 0, this.canvasRef.width, this.canvasRef.height) } } } function n() { var t = new Image; return t.setAttribute("crossOrigin", "anonymous"), t.onLoadListener = e.bind(this, t), t.onErrorListener = function (t) { this.loader.queue && (console.warn("Stripchat Player :: Image loading error"), this.unmount(), this.errorHandler(t)) }.bind(this, t), t.addEventListener("load", t.onLoadListener), t.addEventListener("error", t.onErrorListener), t } function i() { if (this.loader.queue) { var t, e, n, i, r, s = this.loader.queue.shift(); s.src = (t = this.modelId, e = this.snapshotServer, n = this.isNewSnapshotUrl, i = "http:" === location.protocol ? "http" : "https", r = "?token=" + this.modelToken + "&_=" + (new Date).valueOf(), n ? i + "://sp.stripcdn.com/" + e + "/snapshot/" + t + r : i + "://c-" + e + ".stripst.com/snapshot/" + t + r), s.queueIndex = this.loader.lastQueuedIndex, this.loader.lastQueuedIndex += 1, this.loader.queue.push(s) } } function r() { this.canvasRef = null, this.fps = 10, this.modelId = "", this.modelToken = "", this.snapshotServer = "", this.successHandler = function () { }, this.errorHandler = function () { }, this.queueSize = 30, this.loader = {}, this.paused = !1, this.isNewSnapshotUrl = 100 * Math.random() < 30 } r.prototype.setCanvasRef = function (t) { if (!(t instanceof HTMLCanvasElement)) throw Error("Stripchat Player :: setCanvasRef accepts only canvas elements"); return this.canvasRef = t, this }, r.prototype.setModelId = function (t) { return this.modelId = "" + t, this }, r.prototype.setModelToken = function (t) { return this.modelToken = "" + t, this }, r.prototype.setModelSnapshotServer = function (t) { return this.snapshotServer = "" + t, this }, r.prototype.setFps = function (t) { return this.fps = +t, this }, r.prototype.setSuccessHandler = function (t) { if (!(t instanceof Function)) throw Error("Stripchat Player :: setSuccessHandler accepts only functions"); return this.successHandler = t, this }, r.prototype.setErrorHandler = function (t) { if (!(t instanceof Function)) throw Error("Stripchat Player :: setErrorHandler accepts only functions"); return this.errorHandler = t, this }, r.prototype.initLoader = function () { return this.loader = { queue: [], interval: null, intervalTime: 10 * Math.round(100 / this.fps), lastQueuedIndex: 0, lastDrawnIndex: 0 }, this }, r.prototype.initQueue = function () { for (var t = [], e = 0; e < this.queueSize; e++)t.push(n.call(this)); return this.loader.queue = t, this }, r.prototype.initInterval = function () { return this.loader.intervalTimer = function () { this.paused || i.call(this), this.loader.interval = setTimeout(this.loader.intervalTimer, this.loader.intervalTime) }.bind(this), this }, r.prototype.init = function () { return this.containerSize = { height: this.canvasRef.offsetHeight, width: this.canvasRef.offsetWidth }, this.initLoader().initQueue().initInterval() }, r.prototype.mount = function () { if (!this.canvasRef) throw Error("Stripchat Player :: canvas element was not specified"); return this.init(), this.loader.intervalTimer(), this }, r.prototype.unmount = function () { return this.loader.queue && (this.loader.queue.forEach((function (t, e, n) { n[e].src = "", n[e].removeEventListener("load", n[e].onLoadListener) })), null !== this.loader.interval && (clearTimeout(this.loader.interval), this.loader = {})), this.loader = {}, this }, r.prototype.pause = function () { return this.paused = !0, this }, r.prototype.play = function () { this.paused = !1 }; var s = { StripchatPlayer: r }, a = s.StripchatPlayer; t.default = s, t.StripchatPlayer = a, Object.defineProperty(t, "__esModule", { value: !0 }) }(e) }, function (t, e, n) { "use strict"; n.r(e); var i = n(0); window.StripchatPlayer = i.StripchatPlayer, e.default = i.StripchatPlayer }]);
    }

    jQuery( '.model-block' ).each( function( index, value ) {
      var status = jQuery( this ).data( 'status' );
      var $modelPreview = jQuery( this ).find( '.model-preview' );
      if ( 'online' !== status || 0 === $modelPreview.length ) {
        return;
      }
      var postId = jQuery( this ).data( 'post-id' );
      var camsiteId = jQuery( this ).data( 'camsite' );
      var $modelDebounceBar = jQuery( this ).find( '.model-debounce-bar' );
      var $modelImg = jQuery( this ).find( '.model-img' );
      var $modelName = jQuery( this ).find( '.model-name' );

      modelsPreviewsBuffer[postId] = false;

      // Register StripChat Player if the current model is from StripChat.
      if ( 'stripchat' === camsiteId ) {
        stripchatPlayers[postId] = new StripchatPlayer();
      }

      // On mouseenter event.
      jQuery( value ).on( 'mouseenter', function( event ) {
        if ( ! $modelImg.hasClass( 'loaded' ) ) {
          return;
        }

        $modelDebounceBar.addClass( 'model-debounce-bar--wait' );
        $modelName.addClass( 'model-name--hidden' );
        modelsPreviewsBuffer[postId] = true;
        setTimeout( function() {
          if ( ! modelsPreviewsBuffer[postId] ) {
            return;
          }
          jQuery.ajax({
            beforeSend: function( xhr ) {
              modelsPreviewsXhrs[postId] = xhr;
            },
            method: 'POST',
            url: wplcAjax.url,
            dataType: 'json',
            data: {
              action: 'wplc_load_model_preview',
              nonce: wplcAjax.nonce,
              post_id: postId
            }
          })
          .done( function( response ) {
            var $canvas, canvasId;
            if ( ! ( modelsPreviewsBuffer[postId] && response.success && '' !== response.data ) ) {
              return;
            }

            // Add the Model Preview in the DOM directly.
            // The Model Preview wrapper is z-indexed 50.
            $modelPreview.html( response.data ).show( function() {

              // Mount StripChat player if current model is from stripChat.
              if ( 'stripchat' === camsiteId ) {
                $canvas = jQuery( response.data );
                canvasId = $canvas.attr( 'id' );
                stripchatPlayers[postId].setCanvasRef( document.getElementById( canvasId ) )
                                        .setModelId( $canvas.data( 'model-id' ) )
                                        .setModelToken( $canvas.data( 'model-token' ) )
                                        .setModelSnapshotServer( $canvas.data( 'model-snapshot-server' ) )
                                        .mount();
              }

              // Hide the Model Image to reveal the preview.
              // Model Image is z-indexed 100.
              if ( modelsPreviewsBuffer[postId] ) {
                $modelImg.addClass( 'model-img--hidden' );
              }
            });
          }); // End of Ajax call.
        }, 250 ); // End of settimeout
      }); // End of mouseenter event.

      // On mouseleave event.
      jQuery( value ).on( 'mouseleave', function( event ) {
        modelsPreviewsBuffer[postId] = false;
        $modelImg.removeClass( 'model-img--hidden' );
        $modelName.removeClass( 'model-name--hidden' );
        $modelDebounceBar.removeClass( 'model-debounce-bar--wait' );

        setTimeout( function() {
          $modelPreview.html( '' );
        }, 200 );

        // Abort current postId xhr if exists.
        if ( modelsPreviewsXhrs[postId] ) {
          modelsPreviewsXhrs[postId].abort();
          delete( modelsPreviewsXhrs[postId] );
        }
        // Unmount current postId stripchat player if exists.
        if ( stripchatPlayers[postId] ) {
          stripchatPlayers[postId].unmount();
        }
      }); // End of mouseleave event.

    }); // End of each.
  })(); // End of Models Previews Manager IFEE.

  // Open search form
  jQuery( '.header-search-toggle' ).click( function() {
    if ( jQuery( window ).width() <= 767.98 ) {
      jQuery( '.header-search-form' ).slideToggle( 200 );
    }
    if ( jQuery( window ).width() >= 768 ) {
      jQuery( '.header-search-form' ).animate({ width: 'toggle' }, 200 );
      jQuery( '.search-field' ).focus();
    }
  });
  // Move search form
  if ( jQuery( window ).width() <= 767.98 ) {
    jQuery( '.header-search-form' ).appendTo( '#wrapper-navbar' );
  }
  if ( jQuery( window ).width() >= 768 ) {
    jQuery( '.header-search-form' ).prependTo( '.search-nav' );
  }
  jQuery( window ).resize( function() {
    if ( jQuery( window ).width() <= 767.98 ) {
      jQuery( '.header-search-form' ).appendTo( '#wrapper-navbar' );
    }
    if ( jQuery( window ).width() >= 768 ) {
      jQuery( '.header-search-form' ).prependTo( '.search-nav' );
    }
  });


  // Replace all SVG images with inline SVG
  jQuery( 'img[src$=".svg"]' ).each( function() {
    var $img = jQuery( this );
    var imgURL = $img.attr( 'src' );
    var attributes = $img.prop( 'attributes' );
    var id = $img.parent( 'a' ).attr( 'id' );

    jQuery.get( imgURL, function( data ) {

      // Get the SVG tag, ignore the rest
      var $svg = jQuery( data ).find( 'svg' );

      // Remove any invalid XML tags
      $svg = $svg.removeAttr( 'xmlns:a' );

      // Loop through IMG attributes and apply on SVG
      jQuery.each( attributes, function() {
        $svg.attr( this.name, this.value );
      });

      // Replace IMG with SVG
      $img.replaceWith( $svg );

      if ( 'wps-logo-link' === id ) {
        jQuery( '#' + id ).addClass( 'show-logo' );
      }
    }, 'xml' );
  });
});

// Menu mobile
var forEach = function( t, o, r ) {
  if ( '[object Object]' === Object.prototype.toString.call( t ) ) {
    for ( var c in t ) {
      Object.prototype.hasOwnProperty.call( t, c ) && o.call( r, t[c], c, t );
    }
  } else {
    for ( var e = 0, l = t.length; l > e; e++ ) {
      o.call( r, t[e], e, t );
    }
  }
};
var hamburgers = document.querySelectorAll( '.hamburger' );
if ( hamburgers.length > 0 ) {
  forEach( hamburgers, function( hamburger ) {
    hamburger.addEventListener( 'click', function() {
      this.classList.toggle( 'is-active' );
    }, false );
  });
}
