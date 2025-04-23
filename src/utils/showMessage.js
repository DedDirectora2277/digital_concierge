import { Notify } from "quasar";

function showMessage(caption, msg, color = false) {
  Notify.create({
    message: msg,
    caption: caption,
    color: color ? color : "negative",
    icon: "report_problem",
    position: "top",
  });
}

export { showMessage };
