export default function getDirectionFromHtml() {
    return document.getElementsByTagName("html")[0].getAttribute("dir");
}
