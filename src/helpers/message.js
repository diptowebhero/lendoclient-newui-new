import { message as antdMessage } from "antd";

antdMessage.config({
  maxCount: 1,
});
export default function message(type = "warning", text = "") {
  antdMessage[type](text);
}
