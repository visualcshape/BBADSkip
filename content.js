/**
 * Created by Vodalok on 2017/2/24.
 */

(function(){
    var videoDiv = $('div.scontent').get(0);

    var videoDivObserver = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
            //console.log(mutation);
            var replaceRegex = /pre_ad=\d+/;
            var toReplaceStr = "pre_ad=0";

            for(var addedNodeIndex = 0; addedNodeIndex < mutation.addedNodes.length; addedNodeIndex++){
                var aNode =  mutation.addedNodes[addedNodeIndex];
                //HTML5
                if(aNode.localName == 'iframe' && aNode.className.toLowerCase().indexOf("bilibiliHtml5Player".toLowerCase()) > -1){

                    aNode.src = aNode.src.replace(replaceRegex, toReplaceStr);
                    break;
                }
                //SWF
                if(aNode.localName.toLowerCase() == "object" && aNode.className.toLowerCase() == "player"){
                    //Find AD Param
                    for(var childNodeIndex = 0; childNodeIndex < aNode.childNodes.length; childNodeIndex++){
                        if(aNode.childNodes[childNodeIndex].name.toLowerCase() == "flashvars"){
                            aNode.childNodes[childNodeIndex].value = aNode.childNodes[childNodeIndex].value.replace(replaceRegex, toReplaceStr);
                        }
                    }

                    //After timeout, re-render the node, make param take effective.
                    setTimeout(function(aNode){
                        var object = $(aNode);
                        object.remove();
                        videoDiv.append(object.get(0));
                    }, 3000, aNode);

                    //Remove observer to prevent infinite loop.
                    videoDivObserver.disconnect();
                    break;
                }
            }
        });
    });
    var videoDivCfg = {childList: true};
    videoDivObserver.observe(videoDiv, videoDivCfg);
}());