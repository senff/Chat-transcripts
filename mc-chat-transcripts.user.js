// ==UserScript==
// @name         Happychat Transcript Optimizer
// @namespace    https://github.com/senff/Chat-transcripts
// @version      1.3
// @description  Makes links clickable, stylizes chat bubbles, removes English-to-English i8n, styles user notes and collapses Woo SSRs on load
// @author       Senff
// @require      https://code.jquery.com/jquery-1.12.4.js
// @match        https://mc.a8c.com/support-stats/happychat/*
// @updateURL    https://github.com/senff/Chat-transcripts/raw/master/mc-chat-transcripts.user.js
// @grant        none
// ==/UserScript==

var $ = window.jQuery;

function url2links() {
    $('#transcript .hapdash-chat-bubble div p').each(function(){
        var str = $(this).html();
        // var regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        var regex = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        // Replace plain text links by hyperlinks
        var replaced_text = str.replace(regex, "<a href='$1' target='_blank'>$1</a>");
        $(this).html(replaced_text);
    });
}

function removeEnglishTranslation() {
    $('.chat-message-annotation-separator').each(function(){
        var msgBefore = $(this).parent().find('p:nth-of-type(1)').html();
        var msgAfter = $(this).parent().find('p:nth-of-type(2)').html();
        if(msgBefore==msgAfter) {
            $(this).parent().find('p:nth-of-type(1)').remove();
            $(this).remove();
        }
    });
}

function highlightNotes() {
    // Highlight all notes written by HE
    $('.hapdash-chat .hapdash-chat-bubble.type-event.chat-MessageToVisitor').each(function(){
        var bubbleContents = $(this).find('p').html();
        if((bubbleContents != "chat transferred") && (bubbleContents != "customer left") && (!bubbleContents.startsWith("operator")) && (!bubbleContents.startsWith("Follow-up ticket"))) {
            $(this).addClass('HEnote');
        }
    });
}

function collapseSSR() {
    // Collapse the entire SSR
    $('.hapdash-chat .hapdash-chat-bubble.type-message.chat-MessageToOperator').each(function(){
        var messageContents = $(this).find('p:nth-of-type(1)').html();
        if(messageContents.startsWith("Website Status Report")) {
           $(this).find('div:nth-of-type(1)').after('<div class="link-bubble"><p><a href="#" class="show-ssr-transcript" onClick="return false;">CLICK HERE TO SHOW SSR</a></p></div>');
           $(this).find('div:nth-of-type(1)').addClass('ssr-message').hide();
           }
    });
}

$(document).ready(function() {
   url2links();
   removeEnglishTranslation();
   highlightNotes();
   collapseSSR();
});

$('body').on('click','.show-ssr-transcript', function() {
    $('.link-bubble').remove();
    $('.ssr-message').slideDown();
});
