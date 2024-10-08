(function(){
    var css = "#LawFinder{margin-left:-50px;margin-right:-50px}@media screen and (max-width:1200px){#LawFinder{margin-left:-30px;margin-right:-30px}}@media screen and (max-width:500px){#LawFinder{margin-left:-15px;margin-right:-15px}}";
    var lawFinderStyle = document.createElement("style");
    document.head.appendChild(lawFinderStyle);
    lawFinderStyle.appendChild(document.createTextNode(css));


    var LawFinder = document.getElementById("LawFinder");
    var dataType = LawFinder.dataset.type;
    var dataQuery = LawFinder.dataset.filter;
    var bgColor = LawFinder.dataset.bg ? LawFinder.dataset.bg : "";
    var primaryColor = LawFinder.dataset.primary ? LawFinder.dataset.primary : "";
    var colorFilter = "?bgColor=" + bgColor + "&primaryColor=" + primaryColor;

    if (dataType === "employerId")
    {
        var urlSuffix = dataType && dataQuery ? "/" + dataQuery + "/jobs" + colorFilter : "";
        LawFinder.innerHTML = "<iframe id=\"LawFinder-Jobs\" src=\"https://lawfinder.at/embed/employers" + urlSuffix + "\" style=\"min-width:100%!important;width:1px!important;border:0!important;outline:none!important;\"></iframe>";
    }
    else
    {
        var urlSuffix = dataType && dataQuery ? "/" + dataType + "/" + dataQuery : "";
        LawFinder.innerHTML = "<iframe id=\"LawFinder-Jobs\" src=\"https://lawfinder.at/embed/jobs" + urlSuffix + "\" style=\"min-width:100%!important;width:1px!important;border:0!important;outline:none!important;\"></iframe>";
    }

    var iframeResizerScript = document.createElement('script');
    iframeResizerScript.onload = function () {
        iFrameResize({ }, '#LawFinder-Jobs')
    }
    iframeResizerScript.src = 'https://lawfinder.at/js/iframeResizer.min.js';
    document.head.appendChild(iframeResizerScript);
})();