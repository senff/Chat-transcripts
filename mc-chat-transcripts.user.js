// ==UserScript==
// @name         Happychat Transcript Optimizer
// @namespace    https://github.com/senff/Chat-transcripts
// @version      1.42
// @description  Makes links clickable, stylizes chat bubbles, removes English-to-English i8n, styles user notes, collapses Woo SSRs on load, and displays Droplr & Snipboard screenshot images
// @author       Senff
// @require      https://code.jquery.com/jquery-1.12.4.js
// @match        https://mc.a8c.com/support-stats/happychat/*
// @updateURL    https://github.com/senff/Chat-transcripts/raw/master/mc-chat-transcripts.user.js
// @grant        none
// ==/UserScript==

var $ = window.jQuery;

function url2links() {
    $('#transcript .hapdash-chat-bubble div p').each(function () {
        var str = $(this).html();
        var regexlink = /(\b(https?|):\/\/(?!d.pr\/)(?!snipboard.io\/)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; // Default links
        // Replace plain text links by hyperlinks
        var replaced_text = str.replace(regexlink, "<a href='$1' target='_blank'>$1</a>");
        $(this).html(replaced_text);
    });
}

function droplrEmbed() {
    $('#transcript .hapdash-chat-bubble div p').each(function () {
        var str = $(this).html();
        var regexdroplr = /(\b(https?|):\/\/(\bd\.pr)[-A-Z0-9+&@#\/%=~._|]*)/ig; // Droplr links
        var replaced_droplr = str.replace(regexdroplr, "<a href='$1' target='_blank'><img src='$1+' style='margin: 20px 0 0 0; max-width:90%; background: #e0e0e0; border: solid 1px #000000;'></a><br>Full size: <a href='$1' target='_blank'>$1</a>");
        $(this).html(replaced_droplr);
    });
}

function snipBoardEmbed() {
    $('#transcript .hapdash-chat-bubble div p').each(function () {
        var str = $(this).html();
        var regexsnipboard = /(\b(https?|):\/\/(\bsnipboard\.io\/)[^ ][-A-Z0-9+&@#\/%=~._|]*)/ig; // Snipboard links
        var replaced_snipboard = str.replace(regexsnipboard, "<a href='$1' target='_blank'><img src='$1' style='margin: 20px 10px 0 0; max-width:90%; background: #e0e0e0; border: solid 1px #000000;'></a><br>Full size: <a href='$1' target='_blank'>$1</a>");
        $(this).html(replaced_snipboard);
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
        if(messageContents.startsWith("Website Status Report") || messageContents.startsWith("System Status Report") || messageContents.includes("### WordPress Environment ###")) {
           $(this).find('div:nth-of-type(1)').after('<div class="link-bubble"><p><a href="#" class="show-ssr-transcript" onClick="return false;">CLICK HERE TO SHOW SSR</a></p></div>');
           $(this).find('div:nth-of-type(1)').addClass('ssr-message').hide();
           }
    });
}

$(document).ready(function() {
   url2links();
   droplrEmbed();
   snipBoardEmbed();
   removeEnglishTranslation();
   highlightNotes();
   collapseSSR();
});

$('body').on('click','.show-ssr-transcript', function() {
    $('.link-bubble').remove();
    $('.ssr-message').slideDown();
});
