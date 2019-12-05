## WHAT DOES THIS CSS/JAVASCRIPT DO

- makes all URLs in transcripts clickable
- chat bubbles looks a bit more clear
- removes all English-to-English i8n and just shows the message once
- user notes left by HE stand out more
- collapses SSR on load for Woo chats


## REQUIREMENTS:

### Stylus 
- CHROME: https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne?hl=en
- FIREFOX: https://addons.mozilla.org/en-GB/firefox/addon/styl-us/

### Tampermonkey
- CHROME: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
- FIREFOX: https://addons.mozilla.org/en-GB/firefox/addon/tampermonkey/?src=search

With Stylus, you can add your own custom CSS code to any site, to modify the look/feel.
Tampermonkey does the same, but for Javascript, to modify functionality.


## INSTALLATION:

1. Install Stylus extension
2. Add a new style, with name "_HappyChat Transcripts_"
3. Paste the contents of **stylus.css** into the code field
4. Ensure that "Applies to" is set to "**URLS starting with**" / **https://mc.a8c.com/support-stats/happychat/transcript.php**
5. **SAVE**
6. Install Tampermonkey
7. Create a new script, with name "_HappyChat Transcripts_"
8. Paste the contents of **mc-chat-transcripts.user.js** into the code field
9. **SAVE**
