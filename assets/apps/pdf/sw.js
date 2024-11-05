const cacheName = 'BrowserCache_v1';

const precachedAssets = [
        'pdf.sandbox.mjs.map',
        'viewer.mjs.map',
        'viewer.css',
        'pdf.worker.mjs',
        'pdf.sandbox.mjs',
        'debugger.mjs',
        'viewer.mjs',
        'init.js',
        'pdf.mjs.map',
        'pdf.worker.js',
        'pdf.mjs',
        'debugger.css',
        'pdf.js',
        'pdf.worker.mjs.map',
        'index.html',
        'locale/sl/viewer.ftl',
        'locale/szl/viewer.ftl',
        'locale/sk/viewer.ftl',
        'locale/ur/viewer.ftl',
        'locale/fy-NL/viewer.ftl',
        'locale/kab/viewer.ftl',
        'locale/uz/viewer.ftl',
        'locale/sc/viewer.ftl',
        'locale/pl/viewer.ftl',
        'locale/vi/viewer.ftl',
        'locale/sq/viewer.ftl',
        'locale/he/viewer.ftl',
        'locale/ms/viewer.ftl',
        'locale/km/viewer.ftl',
        'locale/nn-NO/viewer.ftl',
        'locale/be/viewer.ftl',
        'locale/es-ES/viewer.ftl',
        'locale/da/viewer.ftl',
        'locale/gn/viewer.ftl',
        'locale/mr/viewer.ftl',
        'locale/kk/viewer.ftl',
        'locale/trs/viewer.ftl',
        'locale/es-CL/viewer.ftl',
        'locale/ja/viewer.ftl',
        'locale/el/viewer.ftl',
        'locale/sco/viewer.ftl',
        'locale/lv/viewer.ftl',
        'locale/es-AR/viewer.ftl',
        'locale/oc/viewer.ftl',
        'locale/it/viewer.ftl',
        'locale/ca/viewer.ftl',
        'locale/is/viewer.ftl',
        'locale/cs/viewer.ftl',
        'locale/es-MX/viewer.ftl',
        'locale/scn/viewer.ftl',
        'locale/ia/viewer.ftl',
        'locale/te/viewer.ftl',
        'locale/fur/viewer.ftl',
        'locale/ga-IE/viewer.ftl',
        'locale/ach/viewer.ftl',
        'locale/ru/viewer.ftl',
        'locale/tl/viewer.ftl',
        'locale/en-GB/viewer.ftl',
        'locale/meh/viewer.ftl',
        'locale/locale.json',
        'locale/hye/viewer.ftl',
        'locale/hy-AM/viewer.ftl',
        'locale/gu-IN/viewer.ftl',
        'locale/xh/viewer.ftl',
        'locale/ro/viewer.ftl',
        'locale/hsb/viewer.ftl',
        'locale/cak/viewer.ftl',
        'locale/zh-CN/viewer.ftl',
        'locale/hi-IN/viewer.ftl',
        'locale/ckb/viewer.ftl',
        'locale/uk/viewer.ftl',
        'locale/sr/viewer.ftl',
        'locale/brx/viewer.ftl',
        'locale/en-CA/viewer.ftl',
        'locale/ltg/viewer.ftl',
        'locale/pt-PT/viewer.ftl',
        'locale/si/viewer.ftl',
        'locale/bo/viewer.ftl',
        'locale/mk/viewer.ftl',
        'locale/sat/viewer.ftl',
        'locale/an/viewer.ftl',
        'locale/lij/viewer.ftl',
        'locale/kn/viewer.ftl',
        'locale/bs/viewer.ftl',
        'locale/zh-TW/viewer.ftl',
        'locale/my/viewer.ftl',
        'locale/ar/viewer.ftl',
        'locale/nb-NO/viewer.ftl',
        'locale/gl/viewer.ftl',
        'locale/hr/viewer.ftl',
        'locale/pt-BR/viewer.ftl',
        'locale/hu/viewer.ftl',
        'locale/nl/viewer.ftl',
        'locale/bg/viewer.ftl',
        'locale/bn/viewer.ftl',
        'locale/ast/viewer.ftl',
        'locale/af/viewer.ftl',
        'locale/ka/viewer.ftl',
        'locale/de/viewer.ftl',
        'locale/az/viewer.ftl',
        'locale/gd/viewer.ftl',
        'locale/br/viewer.ftl',
        'locale/skr/viewer.ftl',
        'locale/ko/viewer.ftl',
        'locale/fi/viewer.ftl',
        'locale/son/viewer.ftl',
        'locale/eo/viewer.ftl',
        'locale/id/viewer.ftl',
        'locale/fr/viewer.ftl',
        'locale/sv-SE/viewer.ftl',
        'locale/et/viewer.ftl',
        'locale/fa/viewer.ftl',
        'locale/lt/viewer.ftl',
        'locale/ff/viewer.ftl',
        'locale/cy/viewer.ftl',
        'locale/en-US/viewer.ftl',
        'locale/eu/viewer.ftl',
        'locale/lo/viewer.ftl',
        'locale/ne-NP/viewer.ftl',
        'locale/rm/viewer.ftl',
        'locale/dsb/viewer.ftl',
        'locale/ta/viewer.ftl',
        'locale/th/viewer.ftl',
        'locale/tr/viewer.ftl',
        'locale/wo/viewer.ftl',
        'locale/pa-IN/viewer.ftl',
        'locale/tg/viewer.ftl',
        'images/altText_add.svg',
        'images/altText_disclaimer.svg',
        'images/altText_done.svg',
        'images/altText_spinner.svg',
        'images/altText_warning.svg',
        'images/annotation-check.svg',
        'images/annotation-comment.svg',
        'images/annotation-help.svg',
        'images/annotation-insert.svg',
        'images/annotation-key.svg',
        'images/annotation-newparagraph.svg',
        'images/annotation-noicon.svg',
        'images/annotation-note.svg',
        'images/annotation-paperclip.svg',
        'images/annotation-paragraph.svg',
        'images/annotation-pushpin.svg',
        'images/cursor-editorFreeHighlight.svg',
        'images/cursor-editorFreeText.svg',
        'images/cursor-editorInk.svg',
        'images/cursor-editorTextHighlight.svg',
        'images/editor-toolbar-delete.svg',
        'images/findbarButton-next.svg',
        'images/findbarButton-previous.svg',
        'images/gv-toolbarButton-download.svg',
        'images/loading-icon.gif',
        'images/loading.svg',
        'images/messageBar_closingButton.svg',
        'images/messageBar_warning.svg',
        'images/secondaryToolbarButton-documentProperties.svg',
        'images/secondaryToolbarButton-firstPage.svg',
        'images/secondaryToolbarButton-handTool.svg',
        'images/secondaryToolbarButton-lastPage.svg',
        'images/secondaryToolbarButton-rotateCcw.svg',
        'images/secondaryToolbarButton-rotateCw.svg',
        'images/secondaryToolbarButton-scrollHorizontal.svg',
        'images/secondaryToolbarButton-scrollPage.svg',
        'images/secondaryToolbarButton-scrollVertical.svg',
        'images/secondaryToolbarButton-scrollWrapped.svg',
        'images/secondaryToolbarButton-selectTool.svg',
        'images/secondaryToolbarButton-spreadEven.svg',
        'images/secondaryToolbarButton-spreadNone.svg',
        'images/secondaryToolbarButton-spreadOdd.svg',
        'images/toolbarButton-bookmark.svg',
        'images/toolbarButton-currentOutlineItem.svg',
        'images/toolbarButton-download.svg',
        'images/toolbarButton-editorFreeText.svg',
        'images/toolbarButton-editorHighlight.svg',
        'images/toolbarButton-editorInk.svg',
        'images/toolbarButton-editorStamp.svg',
        'images/toolbarButton-menuArrow.svg',
        'images/toolbarButton-openFile.svg',
        'images/toolbarButton-pageDown.svg',
        'images/toolbarButton-pageUp.svg',
        'images/toolbarButton-presentationMode.svg',
        'images/toolbarButton-print.svg',
        'images/toolbarButton-search.svg',
        'images/toolbarButton-secondaryToolbarToggle.svg',
        'images/toolbarButton-sidebarToggle.svg',
        'images/toolbarButton-viewAttachments.svg',
        'images/toolbarButton-viewLayers.svg',
        'images/toolbarButton-viewOutline.svg',
        'images/toolbarButton-viewThumbnail.svg',
        'images/toolbarButton-zoomIn.svg',
        'images/toolbarButton-zoomOut.svg',
        'images/treeitem-collapsed.svg',
        'images/treeitem-expanded.svg',
        'cmaps/78-EUC-H.bcmap',
        'cmaps/78-EUC-V.bcmap',
        'cmaps/78-H.bcmap',
        'cmaps/78-RKSJ-H.bcmap',
        'cmaps/78-RKSJ-V.bcmap',
        'cmaps/78-V.bcmap',
        'cmaps/78ms-RKSJ-H.bcmap',
        'cmaps/78ms-RKSJ-V.bcmap',
        'cmaps/83pv-RKSJ-H.bcmap',
        'cmaps/90ms-RKSJ-H.bcmap',
        'cmaps/90ms-RKSJ-V.bcmap',
        'cmaps/90msp-RKSJ-H.bcmap',
        'cmaps/90msp-RKSJ-V.bcmap',
        'cmaps/90pv-RKSJ-H.bcmap',
        'cmaps/90pv-RKSJ-V.bcmap',
        'cmaps/Add-H.bcmap',
        'cmaps/Add-RKSJ-H.bcmap',
        'cmaps/Add-RKSJ-V.bcmap',
        'cmaps/Add-V.bcmap',
        'cmaps/Adobe-CNS1-0.bcmap',
        'cmaps/Adobe-CNS1-1.bcmap',
        'cmaps/Adobe-CNS1-2.bcmap',
        'cmaps/Adobe-CNS1-3.bcmap',
        'cmaps/Adobe-CNS1-4.bcmap',
        'cmaps/Adobe-CNS1-5.bcmap',
        'cmaps/Adobe-CNS1-6.bcmap',
        'cmaps/Adobe-CNS1-UCS2.bcmap',
        'cmaps/Adobe-GB1-0.bcmap',
        'cmaps/Adobe-GB1-1.bcmap',
        'cmaps/Adobe-GB1-2.bcmap',
        'cmaps/Adobe-GB1-3.bcmap',
        'cmaps/Adobe-GB1-4.bcmap',
        'cmaps/Adobe-GB1-5.bcmap',
        'cmaps/Adobe-GB1-UCS2.bcmap',
        'cmaps/Adobe-Japan1-0.bcmap',
        'cmaps/Adobe-Japan1-1.bcmap',
        'cmaps/Adobe-Japan1-2.bcmap',
        'cmaps/Adobe-Japan1-3.bcmap',
        'cmaps/Adobe-Japan1-4.bcmap',
        'cmaps/Adobe-Japan1-5.bcmap',
        'cmaps/Adobe-Japan1-6.bcmap',
        'cmaps/Adobe-Japan1-UCS2.bcmap',
        'cmaps/Adobe-Korea1-0.bcmap',
        'cmaps/Adobe-Korea1-1.bcmap',
        'cmaps/Adobe-Korea1-2.bcmap',
        'cmaps/Adobe-Korea1-UCS2.bcmap',
        'cmaps/B5-H.bcmap',
        'cmaps/B5-V.bcmap',
        'cmaps/B5pc-H.bcmap',
        'cmaps/B5pc-V.bcmap',
        'cmaps/CNS-EUC-H.bcmap',
        'cmaps/CNS-EUC-V.bcmap',
        'cmaps/CNS1-H.bcmap',
        'cmaps/CNS1-V.bcmap',
        'cmaps/CNS2-H.bcmap',
        'cmaps/CNS2-V.bcmap',
        'cmaps/ETHK-B5-H.bcmap',
        'cmaps/ETHK-B5-V.bcmap',
        'cmaps/ETen-B5-H.bcmap',
        'cmaps/ETen-B5-V.bcmap',
        'cmaps/ETenms-B5-H.bcmap',
        'cmaps/ETenms-B5-V.bcmap',
        'cmaps/EUC-H.bcmap',
        'cmaps/EUC-V.bcmap',
        'cmaps/Ext-H.bcmap',
        'cmaps/Ext-RKSJ-H.bcmap',
        'cmaps/Ext-RKSJ-V.bcmap',
        'cmaps/Ext-V.bcmap',
        'cmaps/GB-EUC-H.bcmap',
        'cmaps/GB-EUC-V.bcmap',
        'cmaps/GB-H.bcmap',
        'cmaps/GB-V.bcmap',
        'cmaps/GBK-EUC-H.bcmap',
        'cmaps/GBK-EUC-V.bcmap',
        'cmaps/GBK2K-H.bcmap',
        'cmaps/GBK2K-V.bcmap',
        'cmaps/GBKp-EUC-H.bcmap',
        'cmaps/GBKp-EUC-V.bcmap',
        'cmaps/GBT-EUC-H.bcmap',
        'cmaps/GBT-EUC-V.bcmap',
        'cmaps/GBT-H.bcmap',
        'cmaps/GBT-V.bcmap',
        'cmaps/GBTpc-EUC-H.bcmap',
        'cmaps/GBTpc-EUC-V.bcmap',
        'cmaps/GBpc-EUC-H.bcmap',
        'cmaps/GBpc-EUC-V.bcmap',
        'cmaps/H.bcmap',
        'cmaps/HKdla-B5-H.bcmap',
        'cmaps/HKdla-B5-V.bcmap',
        'cmaps/HKdlb-B5-H.bcmap',
        'cmaps/HKdlb-B5-V.bcmap',
        'cmaps/HKgccs-B5-H.bcmap',
        'cmaps/HKgccs-B5-V.bcmap',
        'cmaps/HKm314-B5-H.bcmap',
        'cmaps/HKm314-B5-V.bcmap',
        'cmaps/HKm471-B5-H.bcmap',
        'cmaps/HKm471-B5-V.bcmap',
        'cmaps/HKscs-B5-H.bcmap',
        'cmaps/HKscs-B5-V.bcmap',
        'cmaps/Hankaku.bcmap',
        'cmaps/Hiragana.bcmap',
        'cmaps/KSC-EUC-H.bcmap',
        'cmaps/KSC-EUC-V.bcmap',
        'cmaps/KSC-H.bcmap',
        'cmaps/KSC-Johab-H.bcmap',
        'cmaps/KSC-Johab-V.bcmap',
        'cmaps/KSC-V.bcmap',
        'cmaps/KSCms-UHC-H.bcmap',
        'cmaps/KSCms-UHC-HW-H.bcmap',
        'cmaps/KSCms-UHC-HW-V.bcmap',
        'cmaps/KSCms-UHC-V.bcmap',
        'cmaps/KSCpc-EUC-H.bcmap',
        'cmaps/KSCpc-EUC-V.bcmap',
        'cmaps/Katakana.bcmap',
        'cmaps/NWP-H.bcmap',
        'cmaps/NWP-V.bcmap',
        'cmaps/RKSJ-H.bcmap',
        'cmaps/RKSJ-V.bcmap',
        'cmaps/Roman.bcmap',
        'cmaps/UniCNS-UCS2-H.bcmap',
        'cmaps/UniCNS-UCS2-V.bcmap',
        'cmaps/UniCNS-UTF16-H.bcmap',
        'cmaps/UniCNS-UTF16-V.bcmap',
        'cmaps/UniCNS-UTF32-H.bcmap',
        'cmaps/UniCNS-UTF32-V.bcmap',
        'cmaps/UniCNS-UTF8-H.bcmap',
        'cmaps/UniCNS-UTF8-V.bcmap',
        'cmaps/UniGB-UCS2-H.bcmap',
        'cmaps/UniGB-UCS2-V.bcmap',
        'cmaps/UniGB-UTF16-H.bcmap',
        'cmaps/UniGB-UTF16-V.bcmap',
        'cmaps/UniGB-UTF32-H.bcmap',
        'cmaps/UniGB-UTF32-V.bcmap',
        'cmaps/UniGB-UTF8-H.bcmap',
        'cmaps/UniGB-UTF8-V.bcmap',
        'cmaps/UniJIS-UCS2-H.bcmap',
        'cmaps/UniJIS-UCS2-HW-H.bcmap',
        'cmaps/UniJIS-UCS2-HW-V.bcmap',
        'cmaps/UniJIS-UCS2-V.bcmap',
        'cmaps/UniJIS-UTF16-H.bcmap',
        'cmaps/UniJIS-UTF16-V.bcmap',
        'cmaps/UniJIS-UTF32-H.bcmap',
        'cmaps/UniJIS-UTF32-V.bcmap',
        'cmaps/UniJIS-UTF8-H.bcmap',
        'cmaps/UniJIS-UTF8-V.bcmap',
        'cmaps/UniJIS2004-UTF16-H.bcmap',
        'cmaps/UniJIS2004-UTF16-V.bcmap',
        'cmaps/UniJIS2004-UTF32-H.bcmap',
        'cmaps/UniJIS2004-UTF32-V.bcmap',
        'cmaps/UniJIS2004-UTF8-H.bcmap',
        'cmaps/UniJIS2004-UTF8-V.bcmap',
        'cmaps/UniJISPro-UCS2-HW-V.bcmap',
        'cmaps/UniJISPro-UCS2-V.bcmap',
        'cmaps/UniJISPro-UTF8-V.bcmap',
        'cmaps/UniJISX0213-UTF32-H.bcmap',
        'cmaps/UniJISX0213-UTF32-V.bcmap',
        'cmaps/UniJISX02132004-UTF32-H.bcmap',
        'cmaps/UniJISX02132004-UTF32-V.bcmap',
        'cmaps/UniKS-UCS2-H.bcmap',
        'cmaps/UniKS-UCS2-V.bcmap',
        'cmaps/UniKS-UTF16-H.bcmap',
        'cmaps/UniKS-UTF16-V.bcmap',
        'cmaps/UniKS-UTF32-H.bcmap',
        'cmaps/UniKS-UTF32-V.bcmap',
        'cmaps/UniKS-UTF8-H.bcmap',
        'cmaps/UniKS-UTF8-V.bcmap',
        'cmaps/V.bcmap',
        'cmaps/WP-Symbol.bcmap',
        'standard_fonts/FoxitDingbats.pfb',
        'standard_fonts/FoxitFixed.pfb',
        'standard_fonts/FoxitFixedBold.pfb',
        'standard_fonts/FoxitFixedBoldItalic.pfb',
        'standard_fonts/FoxitFixedItalic.pfb',
        'standard_fonts/FoxitSerif.pfb',
        'standard_fonts/FoxitSerifBold.pfb',
        'standard_fonts/FoxitSerifBoldItalic.pfb',
        'standard_fonts/FoxitSerifItalic.pfb',
        'standard_fonts/FoxitSymbol.pfb',
        'standard_fonts/LICENSE_FOXIT',
        'standard_fonts/LICENSE_LIBERATION',
        'standard_fonts/LiberationSans-Bold.ttf',
        'standard_fonts/LiberationSans-BoldItalic.ttf',
        'standard_fonts/LiberationSans-Italic.ttf',
        'standard_fonts/LiberationSans-Regular.ttf'
];

self.addEventListener('install', event =>  {
      event.waitUntil(caches.open(cacheName).then((cache) => {
        return cache.addAll(precachedAssets);
      }));
    self.skipWaiting();
});
self.addEventListener('activate', event => {
    clients.claim();
});

self.onfetch = event => {
    const url = event.request.url

    let requestURL = new URL(url);
    if ((event.request.mode === 'navigate' || event.request.mode === 'no-cors') && !requestURL.pathname.startsWith('/api')) {
        event.respondWith(caches.open(cacheName).then((cache) => {
            return fetch(event.request.url).then((fetchedResponse) => {
                cache.put(event.request, fetchedResponse.clone());
                
                return fetchedResponse;
            }).catch(() => {
                return cache.match(event.request.url);
            });
        }));
    }    
}

