#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding("utf8");

var lingeringLine = "";

function my_printf(format_string, param) {
  for (var i = 0; i < format_string.length; i++) {
    if (format_string.charAt(i) == "#" && format_string.charAt(i + 1) == "j") {
      if (!isNaN(param)) {
        let numInHex = Math.abs(param).toString(16);

        let temp = numInHex.split("");
        temp.forEach((char, index) => {
          switch (char) {
            case "a":
              temp[index] = "g";
              break;
            case "b":
              temp[index] = "h";
              break;
            case "c":
              temp[index] = "i";
              break;
            case "d":
              temp[index] = "j";
              break;
            case "e":
              temp[index] = "k";
              break;
            case "f":
              temp[index] = "l";
              break;
          }
        });

        process.stdout.write(temp);
        i++;
      } else {
        process.stdout.write(param);
        i++;
      }
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
