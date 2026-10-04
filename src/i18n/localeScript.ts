import { LOCALE_STORAGE_KEY, htmlLang, locales } from './config'

// 描画前に <head> で実行し、表示言語を html[lang] / html[data-locale] に反映する。
// 優先順位: ?lang= → 保存済みの選択 → ブラウザの言語 → 英語（日本語以外の環境の既定）
// ?lang= は保存したうえで URL から消す（残すと、切替ボタンで選び直した言語がリロードで戻されるため）
// 繁体字の環境（zh-TW / zh-HK / zh-Hant）は簡体字に寄せず、次の候補に回す
// 日本語以外のときは React が辞書を差し替えるまで body を隠し、日本語が一瞬見えるのを防ぐ
// 保険として DOMContentLoaded の 3 秒後に必ず表示する。DOMContentLoaded が発火しない（HTML の読み込みが途中で止まる）
// 場合に備え、スクリプト実行から 10 秒後にも表示する
export const localeScript = `(function(){try{
var L=${JSON.stringify(locales)},H=${JSON.stringify(htmlLang)},K=${JSON.stringify(LOCALE_STORAGE_KEY)},l=null;
var u=new URL(location.href),q=u.searchParams.get('lang');
if(L.indexOf(q)>=0){l=q;try{localStorage.setItem(K,q)}catch(e){}}
if(q!==null){u.searchParams.delete('lang');try{history.replaceState(history.state,'',u.pathname+u.search+u.hash)}catch(e){}}
if(!l){try{var s=localStorage.getItem(K);if(L.indexOf(s)>=0)l=s}catch(e){}}
if(!l){var n=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];
for(var i=0;i<n.length&&!l;i++){var t=String(n[i]).toLowerCase();if(/^zh-(tw|hk|mo|hant)/.test(t))continue;var c=t.split('-')[0];if(L.indexOf(c)>=0)l=c}}
if(!l)l='en';
var d=document.documentElement;d.lang=H[l];d.setAttribute('data-locale',l);
if(l!=='ja'){d.classList.add('i18n-pending');var r=function(){d.classList.remove('i18n-pending')};document.addEventListener('DOMContentLoaded',function(){setTimeout(r,3000)});setTimeout(r,10000)}
}catch(e){}})()`
