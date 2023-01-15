#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding("utf8");

var lingeringLine = "";

function my_printf(format_string, param) {
  for (var i = 0; i < format_string.length; i++) {
    if (
      format_string.charAt(i) == "#" &&
      format_string.charAt(i + 1) == "." &&
      !isNaN(format_string.charAt(i + 2)) &&
      format_string.charAt(i + 3) == "j"
    ) {
      const len = parseInt(format_string.charAt(i + 2));

      if (!isNaN(param)) {
        param = Math.abs(param).toString(16).split("");

        for (let k = 0; k < param.length; k++) {
          if (param[k] === "a") param[k] = "g";
          if (param[k] === "b") param[k] = "h";
          if (param[k] === "c") param[k] = "i";
          if (param[k] === "d") param[k] = "j";
          if (param[k] === "e") param[k] = "k";
          if (param[k] === "f") param[k] = "l";
          if (param[k] === "0") param[k] = "o";
        }
        param = param.join("");

        if (param.length > len) param = param.slice(0, len);
      }

      process.stdout.write(param);
      i += 3;
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
