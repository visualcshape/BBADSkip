/**
 * Created by Vodalok on 2017/2/24.
 */

(function(){
    var videoDiv = $('div.scontent').get(0);

    var videoDivObserver = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
           for(var addedNodeIndex = 0; addedNodeIndex < mutation.addedNodes.length; addedNodeIndex++){
               var aNode =  mutation.addedNodes[addedNodeIndex];
               if(aNode.localName == 'iframe'){
                   var replaceRegex = /pre_ad=\d+/;
                   aNode.src = aNode.src.replace(replaceRegex, "pre_ad=0");
                   break;
               }
           }
        });
    });
    var videoDivCfg = {childList: true};
    videoDivObserver.observe(videoDiv, videoDivCfg);
}());