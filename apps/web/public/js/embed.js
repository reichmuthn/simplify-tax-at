(function () {
  if (typeof window.iFrameResize === "undefined") {
    const iframeResizerScript = document.createElement("script");
    iframeResizerScript.onload = function () {
      window.resizeEmbeddedItems = resizeEmbeddedItems;
      resizeEmbeddedItems();
    };
    iframeResizerScript.src = "/js/iframeResizer.min.js";
    document.head.appendChild(iframeResizerScript);
  }
})();

function resizeEmbeddedItems() {
  const questions = document.querySelectorAll(".asm-question-embed");
  const faqs = document.querySelectorAll(".asm-faq-group-embed");

  questions.forEach(function (element) {
    const questionId = element.getAttribute("data-question-id");
    window.iFrameResize({}, "#asm-question-" + questionId);
  });
  faqs.forEach(function (element) {
    const questionId = element.getAttribute("data-faq-group-id");
    window.iFrameResize({}, "#asm-faq-group-" + questionId);
  });
}
