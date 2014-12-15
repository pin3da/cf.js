#! /usr/bin/env node

var program  = require('commander'),
    readline = require('readline'),
    colors   = require('colors'),
    exec     = require('sync-exec'),
    fs       = require('fs');

program
  .version('0.0.1')
  .option('-c, --compiler <compiler>', 'cpp compiler, default g++', 'g++')
  .option('-f, --flags <flags>', 'compiler flags such -O3, -Wall, etc', '-std=c++11 -O3')
  .parse(process.argv);


console.log(("Compiler: " + program.compiler).gray);
console.log(("Compiler options: " + program.flags).gray);

rl = readline.createInterface(process.stdin, process.stdout, function completer(line) {
  var completions = 'compile run quit'.split(' ')
  var hits = completions.filter(function(c) { return c.indexOf(line) == 0 })
  // show all completions if none found
  return [hits.length ? hits : completions, line]
});

rl.setPrompt('cf $ ');
rl.prompt();

rl.on('line', function(line) {
  line = line.trim();
  switch(line.split(' ')[0]) {
    case 'quit':
      process.exit(0);
    break;
    case 'compile':
      var command = line.split(' ');
      if (command.length < 2)
        console.log('write a problem name'.red);
      else {
        var problem = command[1].split('.')[0];
        var ext     = command[1].split('.')[1];
        if (!ext) ext = "cc";
        var comp_line = program.compiler + ' ' + program.flags + ' -o ' + problem + ' '  + problem + '.' + ext;
        var output = exec(comp_line);
        if (output.stderr) {
          if (output.status == 0) {
            console.log("Compiled with warnings: ".yellow);
            console.log(output.stderr.yellow);
          } else {
            console.log(output.stderr.red);
          }
        } else {
          console.log('successfully compiled'.green);
        }
      }
    break;
    case 'run':
      var command = line.split(' ');
      if (command.length < 2)
        console.log('write a problem name'.red);
      else {
        var problem = command[1];
        var input   = command[2];
        var exec_line = './' + problem + (input ? (' < ' + input) : '');
        if (input && !fs.existsSync(input)) {
          console.log('Input file does not exist'.red);
          break;
        }
        try {
          var timeout = command[3] || 2;
          var output = exec(exec_line, timeout * 1000);
          if (output.stderr) {
            console.log(output.stderr.red);
          } else {
            console.log(output.stdout.green);
          }
        } catch (e) {
          console.log('Time limit'.red);
        }
      }
    break;
    default:
      console.log('Not recongnized');
    break;
  }
  rl.prompt();
}).on('close', function() {
  console.log('Bye!');
  process.exit(0);
});
