#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding("utf8");

var lingeringLine = "";

function my_printf(format_string, param) {
  for (var i = 0; i < format_string.length; i++) {
    if (
      format_string.charAt(i) === "#" &&
      format_string.charAt(i + 1) === "g"
    ) {
      if (parseInt(param) < 0) {
        param = param.split("-")[1];
        param = param.split("").reverse().join("");

        process.stdout.write("-");
        process.stdout.write(param);
      } else {
        param = param.split("").reverse().join("");

        process.stdout.write(param);
      }

      i++;
    } else {
      process.stdout.write(format_string.charAt(i));
    }
  }
  console.log("");
}

process.stdin.on("data", function (chunk) {
  lines = chunk.split("\n");

  lines[0] = lingeringLine + lines[0];
  lingeringLine = lines.pop();
  for (var i = 0; i < lines.length; i++) {
    my_printf(lines[i], lines[i + 1]);
    i++;
  }
});
