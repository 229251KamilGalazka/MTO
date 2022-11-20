#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding("utf8");

var lingeringLine = "";

function my_printf(format_string, param) {
  for (var i = 0; i < format_string.length; i++) {
    if (
      format_string.charAt(i) === "#" &&
      !isNaN(format_string.charAt(i + 1)) &&
      format_string.charAt(i + 2) === "g"
    ) {
      if (!isNaN(param)) {
        const q = parseInt(format_string.charAt(i + 1));
        param = param.split("");

        for (let i = 0; i < param.length; i++) {
          if (param[i] === "0") param[i] = 9;
          else param[i]--;
        }

        param = param.join("");

        if (param.length < q) {
          let spaces = "";
          for (let i = 0; i < q - param.length; i++) {
            spaces += " ";
          }
          process.stdout.write(spaces + param);
        } else if (param.length > q)
          process.stdout.write(param.substring(0, q));
        else process.stdout.write(param);
      } else process.stdout.write(param);

      i += 2;
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
