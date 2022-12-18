#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding("utf8");

var lingeringLine = "";

function my_printf(format_string, param) {
  for (var i = 0; i < format_string.length; i++) {
    if (format_string.charAt(i) == "#" && format_string.charAt(i + 1) == "j") {
      if (!isNaN(param)) {
        let numInHex = Math.abs(param).toString(16);
        process.stdout.write(numInHex);
		i++;
      } else {
        process.stdout.write(param);
        i++;
      }

      //   param = param.split("");
      //   param.forEach((char, index) => {
      //     switch (char) {
      //       case "a":
      //         param[index] = "g";
      //         break;
      //       case "b":
      //         param[index] = "h";
      //         break;
      //       case "c":
      //         param[index] = "i";
      //         break;
      //       case "d":
      //         param[index] = "j";
      //         break;
      //       case "e":
      //         param[index] = "k";
      //         break;
      //       case "f":
      //         param[index] = "l";
      //         break;
      //     }
      //   });
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
