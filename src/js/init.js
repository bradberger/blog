//window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
//    d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
//    _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
//    $.src='//v2.zopim.com/?1HDhLOgR5r3Md3ZxkHxq7b6bf4JA5Ifg';z.t=+new Date;$.
//        type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');

(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,"script","//www.google-analytics.com/analytics.js","ga");

ga("create", "UA-64346652-1", "auto");
ga("send", "pageview");

window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("//assets.zendesk.com/embeddable_framework/main.js","bitolaco.zendesk.com");

/*!
 loadCSS: load a CSS file asynchronously.
 [c]2014 @scottjehl, Filament Group, Inc.
 Licensed MIT
 */
function loadCSS( href, before, media ){
    "use strict";
    // Arguments explained:
    // `href` is the URL for your CSS file.
    // `before` optionally defines the element we'll use as a reference for injecting our <link>
    // By default, `before` uses the first <script> element in the page.
    // However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
    // If so, pass a different reference element to the `before` argument and it'll insert before that instead
    // note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
    var ss = window.document.createElement( "link" );
    var ref = before || window.document.getElementsByTagName( "script" )[ 0 ];
    var sheets = window.document.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    // temporarily, set media to something non-matching to ensure it'll fetch without blocking render
    ss.media = "only x";
    // inject link
    ref.parentNode.insertBefore( ss, ref );
    // This function sets the link's media back to `all` so that the stylesheet applies once it loads
    // It is designed to poll until document.styleSheets includes the new sheet.
    function toggleMedia(){
        var defined;
        for( var i = 0; i < sheets.length; i++ ){
            if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
                defined = true;
            }
        }
        if( defined ){
            ss.media = media || "all";
        }
        else {
            setTimeout( toggleMedia );
        }
    }
    toggleMedia();
    return ss;
}

loadCSS("/css/style.css");