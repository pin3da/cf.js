cf.js
=====

Command line application to help in codeforces contest.


### Install

  npm install -g cf.js


### Run

    Usage: cf [options]
  
    Options:
  
      -h, --help                 output usage information
      -V, --version              output the version number
      -c, --compiler <compiler>  cpp compiler, default g++
      -f, --flags <flags>        compiler flags such -O3, -Wall, etc



### On running 

- compile \<name\>[ext] : Compile a file in the current path, .cc is the default ext 

  Example:

      cf $ compile A          // This will compile A.cc
      cf $ compile A.cpp      // This will compile A.cpp


- run \<name\> [input_file] [time\_limit]

  Example:
  
      cf $ run A            // This will run A with no input
      cf $ run A a.in       // This will run A with a.in as input i.e. ./A < a.in
      cf $ run A a.in 5     // This will run A with a.in as input for 5 seconds
