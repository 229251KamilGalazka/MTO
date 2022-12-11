#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding("utf8");

var lingeringLine = "";

function my_printf(format_string, param) {
  for (var i = 0; i < format_string.length; i++) {
    if (
      format_string.charAt(i) == "#" &&
      format_string.charAt(i + 1) == "." &&
      (!isNaN(format_string.charAt(i + 2)) && format_string.charAt(i + 2) !== ' ') &&
      format_string.charAt(i + 3) == "g"
    ) {
      let char = param.split("");

      char.forEach((letter, index) => {
        if (!isNaN(letter)) {
          let number = parseInt(letter);

          number = (number * 9 + 1) % 10;

          char[index] = number
        }
      })
	  char = char.join('')
      process.stdout.write(char);
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
