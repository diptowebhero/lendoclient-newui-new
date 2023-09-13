import React from "react";
import moment from "moment";

export default function time(time) {
  return moment(new Date(time)).format("DD MMMM YYYY");
}
export function shortTime(time) {
  return moment(new Date(time)).format("DD MMM YY");
}
export function timeWithHour(time) {
  return moment(new Date(time)).utc().format("DD MMMM YYYY h:mm:ss A");
}
export function getYear() {
  return moment().year();
}
