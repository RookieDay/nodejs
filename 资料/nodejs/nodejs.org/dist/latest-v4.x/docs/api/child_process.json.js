{
  "source": "doc/api/child_process.markdown",
  "modules": [
    {
      "textRaw": "Child Process",
      "name": "child_process",
      "stability": 2,
      "stabilityText": "Stable",
      "desc": "<p>The <code>child_process</code> module provides the ability to spawn child processes in\na manner that is similar, but not identical, to [<code>popen(3)</code>][]. This capability\nis primarily provided by the <code>child_process.spawn()</code> function:\n\n</p>\n<pre><code class=\"js\">const spawn = require(&#39;child_process&#39;).spawn;\nconst ls = spawn(&#39;ls&#39;, [&#39;-lh&#39;, &#39;/usr&#39;]);\n\nls.stdout.on(&#39;data&#39;, (data) =&gt; {\n  console.log(`stdout: ${data}`);\n});\n\nls.stderr.on(&#39;data&#39;, (data) =&gt; {\n  console.log(`stderr: ${data}`);\n});\n\nls.on(&#39;close&#39;, (code) =&gt; {\n  console.log(`child process exited with code ${code}`);\n});</code></pre>\n<p>By default, pipes for <code>stdin</code>, <code>stdout</code> and <code>stderr</code> are established between\nthe parent Node.js process and the spawned child. It is possible to stream data\nthrough these pipes in a non-blocking way. <em>Note, however, that some programs\nuse line-buffered I/O internally. While that does not affect Node.js, it can\nmean that data sent to the child process may not be immediately consumed.</em>\n\n</p>\n<p>The <code>child_process.spawn()</code> method spawns the child process asynchronously,\nwithout blocking the Node.js event loop. The <code>child_process.spawnSync()</code>\nfunction provides equivalent functionality in a synchronous manner that blocks\nthe event loop until the spawned process either exits or is terminated.\n\n</p>\n<p>For convenience, the <code>child_process</code> module provides a handful of synchronous\nand asynchronous alternatives to [<code>child_process.spawn()</code>][] and\n[<code>child_process.spawnSync()</code>][].  <em>Note that each of these alternatives are\nimplemented on top of <code>child_process.spawn()</code> or <code>child_process.spawnSync()</code>.</em>\n\n</p>\n<ul>\n<li><code>child_process.exec()</code>: spawns a shell and runs a command within that shell,\npassing the <code>stdout</code> and <code>stderr</code> to a callback function when complete.</li>\n<li><code>child_process.execFile()</code>: similar to <code>child_process.exec()</code> except that\nit spawns the command directly without first spawning a shell.</li>\n<li><code>child_process.fork()</code>: spawns a new Node.js process and invokes a\nspecified module with an IPC communication channel established that allows\nsending messages between parent and child.</li>\n<li><code>child_process.execSync()</code>: a synchronous version of\n<code>child_process.exec()</code> that <em>will</em> block the Node.js event loop.</li>\n<li><code>child_process.execFileSync()</code>: a synchronous version of\n<code>child_process.execFile()</code> that <em>will</em> block the Node.js event loop.</li>\n</ul>\n<p>For certain use cases, such as automating shell scripts, the\n[synchronous counterparts][] may be more convenient. In many cases, however,\nthe synchronous methods can have significant impact on performance due to\nstalling the event loop while spawned processes complete.\n\n</p>\n",
      "modules": [
        {
          "textRaw": "Asynchronous Process Creation",
          "name": "asynchronous_process_creation",
          "desc": "<p>The <code>child_process.spawn()</code>, <code>child_process.fork()</code>, <code>child_process.exec()</code>,\nand <code>child_process.execFile()</code> methods all follow the idiomatic asynchronous\nprogramming pattern typical of other Node.js APIs.\n\n</p>\n<p>Each of the methods returns a [<code>ChildProcess</code>][] instance. These objects\nimplement the Node.js [<code>EventEmitter</code>][] API, allowing the parent process to\nregister listener functions that are called when certain events occur during\nthe life cycle of the child process.\n\n</p>\n<p>The <code>child_process.exec()</code> and <code>child_process.execFile()</code> methods additionally\nallow for an optional <code>callback</code> function to be specified that is invoked\nwhen the child process terminates.\n\n</p>\n",
          "modules": [
            {
              "textRaw": "Spawning `.bat` and `.cmd` files on Windows",
              "name": "spawning_`.bat`_and_`.cmd`_files_on_windows",
              "desc": "<p>The importance of the distinction between <code>child_process.exec()</code> and\n<code>child_process.execFile()</code> can vary based on platform. On Unix-type operating\nsystems (Unix, Linux, OSX) <code>child_process.execFile()</code> can be more efficient\nbecause it does not spawn a shell. On Windows, however, <code>.bat</code> and <code>.cmd</code>\nfiles are not executable on their own without a terminal and therefore cannot\nbe launched using <code>child_process.execFile()</code> (or even <code>child_process.spawn()</code>).\nWhen running on Windows, <code>.bat</code> and <code>.cmd</code> files can only be invoked using\neither <code>child_process.exec()</code> or by spawning <code>cmd.exe</code> and passing the <code>.bat</code>\nor <code>.cmd</code> file as an argument (which is what <code>child_process.exec()</code> does).\n\n</p>\n<pre><code class=\"js\">// On Windows Only ...\nconst spawn = require(&#39;child_process&#39;).spawn;\nconst bat = spawn(&#39;cmd.exe&#39;, [&#39;/c&#39;, &#39;my.bat&#39;]);\n\nbat.stdout.on(&#39;data&#39;, (data) =&gt; {\n  console.log(data);\n});\n\nbat.stderr.on(&#39;data&#39;, (data) =&gt; {\n  console.log(data);\n});\n\nbat.on(&#39;exit&#39;, (code) =&gt; {\n  console.log(`Child exited with code ${code}`);\n});\n\n// OR...\nconst exec = require(&#39;child_process&#39;).exec;\nexec(&#39;my.bat&#39;, (err, stdout, stderr) =&gt; {\n  if (err) {\n    console.error(err);\n    return;\n  }\n  console.log(stdout);\n});</code></pre>\n",
              "type": "module",
              "displayName": "Spawning `.bat` and `.cmd` files on Windows"
            }
          ],
          "methods": [
            {
              "textRaw": "child_process.exec(command[, options][, callback])",
              "type": "method",
              "name": "exec",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {ChildProcess} ",
                    "name": "return",
                    "type": "ChildProcess"
                  },
                  "params": [
                    {
                      "textRaw": "`command` {String} The command to run, with space-separated arguments ",
                      "name": "command",
                      "type": "String",
                      "desc": "The command to run, with space-separated arguments"
                    },
                    {
                      "textRaw": "`options` {Object} ",
                      "options": [
                        {
                          "textRaw": "`cwd` {String} Current working directory of the child process ",
                          "name": "cwd",
                          "type": "String",
                          "desc": "Current working directory of the child process"
                        },
                        {
                          "textRaw": "`env` {Object} Environment key-value pairs ",
                          "name": "env",
                          "type": "Object",
                          "desc": "Environment key-value pairs"
                        },
                        {
                          "textRaw": "`encoding` {String} (Default: 'utf8') ",
                          "name": "encoding",
                          "default": "utf8",
                          "type": "String"
                        },
                        {
                          "textRaw": "`shell` {String} Shell to execute the command with (Default: '/bin/sh' on UNIX, 'https://nodejs.org/dist/latest-v4.x/docs/api/cmd.exe' on Windows,  The shell should  understand the `-c` switch on UNIX or `/s /c` on Windows. On Windows,  command line parsing should be compatible with `cmd.exe`.) ",
                          "name": "shell",
                          "type": "String",
                          "desc": "Shell to execute the command with (Default: '/bin/sh' on UNIX, 'https://nodejs.org/dist/latest-v4.x/docs/api/cmd.exe' on Windows,  The shell should  understand the `-c` switch on UNIX or `/s /c` on Windows. On Windows,  command line parsing should be compatible with `cmd.exe`.)"
                        },
                        {
                          "textRaw": "`timeout` {Number} (Default: 0) ",
                          "name": "timeout",
                          "default": "0",
                          "type": "Number"
                        },
                        {
                          "textRaw": "`maxBuffer` {Number} largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed (Default: `200*1024`) ",
                          "name": "maxBuffer",
                          "default": "200*1024",
                          "type": "Number",
                          "desc": "largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed"
                        },
                        {
                          "textRaw": "`killSignal` {String} (Default: 'SIGTERM') ",
                          "name": "killSignal",
                          "default": "SIGTERM",
                          "type": "String"
                        },
                        {
                          "textRaw": "`uid` {Number} Sets the user identity of the process. (See setuid(2).) ",
                          "name": "uid",
                          "type": "Number",
                          "desc": "Sets the user identity of the process. (See setuid(2).)"
                        },
                        {
                          "textRaw": "`gid` {Number} Sets the group identity of the process. (See setgid(2).) ",
                          "name": "gid",
                          "type": "Number",
                          "desc": "Sets the group identity of the process. (See setgid(2).)"
                        }
                      ],
                      "name": "options",
                      "type": "Object",
                      "optional": true
                    },
                    {
                      "textRaw": "`callback` {Function} called with the output when process terminates ",
                      "options": [
                        {
                          "textRaw": "`error` {Error} ",
                          "name": "error",
                          "type": "Error"
                        },
                        {
                          "textRaw": "`stdout` {String|Buffer} ",
                          "name": "stdout",
                          "type": "String|Buffer"
                        },
                        {
                          "textRaw": "`stderr` {String|Buffer} ",
                          "name": "stderr",
                          "type": "String|Buffer"
                        }
                      ],
                      "name": "callback",
                      "type": "Function",
                      "desc": "called with the output when process terminates",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "command"
                    },
                    {
                      "name": "options",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Spawns a shell then executes the <code>command</code> within that shell, buffering any\ngenerated output.\n\n</p>\n<pre><code class=\"js\">const exec = require(&#39;child_process&#39;).exec;\nconst child = exec(&#39;cat *.js bad_file | wc -l&#39;,\n  (error, stdout, stderr) =&gt; {\n    console.log(`stdout: ${stdout}`);\n    console.log(`stderr: ${stderr}`);\n    if (error !== null) {\n      console.log(`exec error: ${error}`);\n    }\n});</code></pre>\n<p>If a <code>callback</code> function is provided, it is called with the arguments\n<code>(error, stdout, stderr)</code>. On success, <code>error</code> will be <code>null</code>.  On error,\n<code>error</code> will be an instance of [<code>Error</code>][]. The <code>error.code</code> property will be\nthe exit code of the child process while <code>error.signal</code> will be set to the\nsignal that terminated the process. Any exit code other than <code>0</code> is considered\nto be an error.\n\n</p>\n<p>The <code>stdout</code> and <code>stderr</code> arguments passed to the callback will contain the\nstdout and stderr output of the child process. By default, Node.js will decode\nthe output as UTF-8 and pass strings to the callback. The <code>encoding</code> option\ncan be used to specify the character encoding used to decode the stdout and\nstderr output. If <code>encoding</code> is <code>&#39;buffer&#39;</code>, <code>Buffer</code> objects will be passed to\nthe callback instead.\n\n</p>\n<p>The <code>options</code> argument may be passed as the second argument to customize how\nthe process is spawned. The default options are:\n\n</p>\n<pre><code class=\"js\">{\n  encoding: &#39;utf8&#39;,\n  timeout: 0,\n  maxBuffer: 200*1024,\n  killSignal: &#39;SIGTERM&#39;,\n  cwd: null,\n  env: null\n}</code></pre>\n<p>If <code>timeout</code> is greater than <code>0</code>, the parent will send the the signal\nidentified by the <code>killSignal</code> property (the default is <code>&#39;SIGTERM&#39;</code>) if the\nchild runs longer than <code>timeout</code> milliseconds.\n\n</p>\n<p>The <code>maxBuffer</code> option specifies the largest amount of data (in bytes) allowed\non stdout or stderr - if this value is exceeded then the child process is\nterminated.\n\n</p>\n<p><em>Note: Unlike the <code>exec()</code> POSIX system call, <code>child_process.exec()</code> does not\nreplace the existing process and uses a shell to execute the command.</em>\n\n</p>\n"
            },
            {
              "textRaw": "child_process.execFile(file[, args][, options][, callback])",
              "type": "method",
              "name": "execFile",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {ChildProcess} ",
                    "name": "return",
                    "type": "ChildProcess"
                  },
                  "params": [
                    {
                      "textRaw": "`file` {String} The name or path of the executable file to run ",
                      "name": "file",
                      "type": "String",
                      "desc": "The name or path of the executable file to run"
                    },
                    {
                      "textRaw": "`args` {Array} List of string arguments ",
                      "name": "args",
                      "type": "Array",
                      "desc": "List of string arguments",
                      "optional": true
                    },
                    {
                      "textRaw": "`options` {Object} ",
                      "options": [
                        {
                          "textRaw": "`cwd` {String} Current working directory of the child process ",
                          "name": "cwd",
                          "type": "String",
                          "desc": "Current working directory of the child process"
                        },
                        {
                          "textRaw": "`env` {Object} Environment key-value pairs ",
                          "name": "env",
                          "type": "Object",
                          "desc": "Environment key-value pairs"
                        },
                        {
                          "textRaw": "`encoding` {String} (Default: 'utf8') ",
                          "name": "encoding",
                          "default": "utf8",
                          "type": "String"
                        },
                        {
                          "textRaw": "`timeout` {Number} (Default: 0) ",
                          "name": "timeout",
                          "default": "0",
                          "type": "Number"
                        },
                        {
                          "textRaw": "`maxBuffer` {Number} largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed (Default: 200\\*1024) ",
                          "name": "maxBuffer",
                          "default": "200\\*1024",
                          "type": "Number",
                          "desc": "largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed"
                        },
                        {
                          "textRaw": "`killSignal` {String} (Default: 'SIGTERM') ",
                          "name": "killSignal",
                          "default": "SIGTERM",
                          "type": "String"
                        },
                        {
                          "textRaw": "`uid` {Number} Sets the user identity of the process. (See setuid(2).) ",
                          "name": "uid",
                          "type": "Number",
                          "desc": "Sets the user identity of the process. (See setuid(2).)"
                        },
                        {
                          "textRaw": "`gid` {Number} Sets the group identity of the process. (See setgid(2).) ",
                          "name": "gid",
                          "type": "Number",
                          "desc": "Sets the group identity of the process. (See setgid(2).)"
                        }
                      ],
                      "name": "options",
                      "type": "Object",
                      "optional": true
                    },
                    {
                      "textRaw": "`callback` {Function} called with the output when process terminates ",
                      "options": [
                        {
                          "textRaw": "`error` {Error} ",
                          "name": "error",
                          "type": "Error"
                        },
                        {
                          "textRaw": "`stdout` {String|Buffer} ",
                          "name": "stdout",
                          "type": "String|Buffer"
                        },
                        {
                          "textRaw": "`stderr` {String|Buffer} ",
                          "name": "stderr",
                          "type": "String|Buffer"
                        }
                      ],
                      "name": "callback",
                      "type": "Function",
                      "desc": "called with the output when process terminates",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "file"
                    },
                    {
                      "name": "args",
                      "optional": true
                    },
                    {
                      "name": "options",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>child_process.execFile()</code> function is similar to [<code>child_process.exec()</code>][]\nexcept that it does not spawn a shell. Rather, the specified executable <code>file</code>\nis spawned directly as a new process making it slightly more efficient than\n[<code>child_process.exec()</code>][].\n\n</p>\n<p>The same options as <code>child_process.exec()</code> are supported. Since a shell is not\nspawned, behaviors such as I/O redirection and file globbing are not supported.\n\n</p>\n<pre><code class=\"js\">const execFile = require(&#39;child_process&#39;).execFile;\nconst child = execFile(&#39;node&#39;, [&#39;--version&#39;], (error, stdout, stderr) =&gt; {\n  if (error) {\n    throw error;\n  }\n  console.log(stdout);\n});</code></pre>\n<p>The <code>stdout</code> and <code>stderr</code> arguments passed to the callback will contain the\nstdout and stderr output of the child process. By default, Node.js will decode\nthe output as UTF-8 and pass strings to the callback. The <code>encoding</code> option\ncan be used to specify the character encoding used to decode the stdout and\nstderr output. If <code>encoding</code> is <code>&#39;buffer&#39;</code>, <code>Buffer</code> objects will be passed to\nthe callback instead.\n\n</p>\n"
            },
            {
              "textRaw": "child_process.fork(modulePath[, args][, options])",
              "type": "method",
              "name": "fork",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {ChildProcess} ",
                    "name": "return",
                    "type": "ChildProcess"
                  },
                  "params": [
                    {
                      "textRaw": "`modulePath` {String} The module to run in the child ",
                      "name": "modulePath",
                      "type": "String",
                      "desc": "The module to run in the child"
                    },
                    {
                      "textRaw": "`args` {Array} List of string arguments ",
                      "name": "args",
                      "type": "Array",
                      "desc": "List of string arguments",
                      "optional": true
                    },
                    {
                      "textRaw": "`options` {Object} ",
                      "options": [
                        {
                          "textRaw": "`cwd` {String} Current working directory of the child process ",
                          "name": "cwd",
                          "type": "String",
                          "desc": "Current working directory of the child process"
                        },
                        {
                          "textRaw": "`env` {Object} Environment key-value pairs ",
                          "name": "env",
                          "type": "Object",
                          "desc": "Environment key-value pairs"
                        },
                        {
                          "textRaw": "`execPath` {String} Executable used to create the child process ",
                          "name": "execPath",
                          "type": "String",
                          "desc": "Executable used to create the child process"
                        },
                        {
                          "textRaw": "`execArgv` {Array} List of string arguments passed to the executable (Default: `process.execArgv`) ",
                          "name": "execArgv",
                          "default": "process.execArgv",
                          "type": "Array",
                          "desc": "List of string arguments passed to the executable"
                        },
                        {
                          "textRaw": "`silent` {Boolean} If true, stdin, stdout, and stderr of the child will be piped to the parent, otherwise they will be inherited from the parent, see the `'pipe'` and `'inherit'` options for [`child_process.spawn()`][]'s [`stdio`][] for more details (default is false) ",
                          "name": "silent",
                          "type": "Boolean",
                          "desc": "If true, stdin, stdout, and stderr of the child will be piped to the parent, otherwise they will be inherited from the parent, see the `'pipe'` and `'inherit'` options for [`child_process.spawn()`][]'s [`stdio`][] for more details (default is false)"
                        },
                        {
                          "textRaw": "`uid` {Number} Sets the user identity of the process. (See setuid(2).) ",
                          "name": "uid",
                          "type": "Number",
                          "desc": "Sets the user identity of the process. (See setuid(2).)"
                        },
                        {
                          "textRaw": "`gid` {Number} Sets the group identity of the process. (See setgid(2).) ",
                          "name": "gid",
                          "type": "Number",
                          "desc": "Sets the group identity of the process. (See setgid(2).)"
                        }
                      ],
                      "name": "options",
                      "type": "Object",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "modulePath"
                    },
                    {
                      "name": "args",
                      "optional": true
                    },
                    {
                      "name": "options",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>child_process.fork()</code> method is a special case of\n[<code>child_process.spawn()</code>][] used specifically to spawn new Node.js processes.\nLike <code>child_process.spawn()</code>, a <code>ChildProcess</code> object is returned. The returned\n<code>ChildProcess</code> will have an additional communication channel built-in that\nallows messages to be passed back and forth between the parent and child. See\n[<code>ChildProcess#send()</code>][] for details.\n\n</p>\n<p>It is important to keep in mind that spawned Node.js child processes are\nindependent of the parent with exception of the IPC communication channel\nthat is established between the two. Each process has it&#39;s own memory, with\ntheir own V8 instances. Because of the additional resource allocations\nrequired, spawning a large number of child Node.js processes is not\nrecommended.\n\n</p>\n<p>By default, <code>child_process.fork()</code> will spawn new Node.js instances using the\n<code>process.execPath</code> of the parent process. The <code>execPath</code> property in the\n<code>options</code> object allows for an alternative execution path to be used.\n\n</p>\n<p>Node.js processes launched with a custom <code>execPath</code> will communicate with the\nparent process using the file descriptor (fd) identified using the\nenvironment variable <code>NODE_CHANNEL_FD</code> on the child process. The input and\noutput on this fd is expected to be line delimited JSON objects.\n\n</p>\n<p><em>Note: Unlike the <code>fork()</code> POSIX system call, [<code>child_process.fork()</code>][] does\nnot clone the current process.</em>\n\n</p>\n"
            },
            {
              "textRaw": "child_process.spawn(command[, args][, options])",
              "type": "method",
              "name": "spawn",
              "signatures": [
                {
                  "return": {
                    "textRaw": "return: {ChildProcess} ",
                    "name": "return",
                    "type": "ChildProcess"
                  },
                  "params": [
                    {
                      "textRaw": "`command` {String} The command to run ",
                      "name": "command",
                      "type": "String",
                      "desc": "The command to run"
                    },
                    {
                      "textRaw": "`args` {Array} List of string arguments ",
                      "name": "args",
                      "type": "Array",
                      "desc": "List of string arguments",
                      "optional": true
                    },
                    {
                      "textRaw": "`options` {Object} ",
                      "options": [
                        {
                          "textRaw": "`cwd` {String} Current working directory of the child process ",
                          "name": "cwd",
                          "type": "String",
                          "desc": "Current working directory of the child process"
                        },
                        {
                          "textRaw": "`env` {Object} Environment key-value pairs ",
                          "name": "env",
                          "type": "Object",
                          "desc": "Environment key-value pairs"
                        },
                        {
                          "textRaw": "`stdio` {Array|String} Child's stdio configuration. (See [`options.stdio`][]) ",
                          "name": "stdio",
                          "type": "Array|String",
                          "desc": "Child's stdio configuration. (See [`options.stdio`][])"
                        },
                        {
                          "textRaw": "`detached` {Boolean} Prepare child to run independently of its parent process. Specific behavior depends on the platform, see [`options.detached`][]) ",
                          "name": "detached",
                          "type": "Boolean",
                          "desc": "Prepare child to run independently of its parent process. Specific behavior depends on the platform, see [`options.detached`][])"
                        },
                        {
                          "textRaw": "`uid` {Number} Sets the user identity of the process. (See setuid(2).) ",
                          "name": "uid",
                          "type": "Number",
                          "desc": "Sets the user identity of the process. (See setuid(2).)"
                        },
                        {
                          "textRaw": "`gid` {Number} Sets the group identity of the process. (See setgid(2).) ",
                          "name": "gid",
                          "type": "Number",
                          "desc": "Sets the group identity of the process. (See setgid(2).)"
                        }
                      ],
                      "name": "options",
                      "type": "Object",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "command"
                    },
                    {
                      "name": "args",
                      "optional": true
                    },
                    {
                      "name": "options",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>child_process.spawn()</code> method spawns a new process using the given\n<code>command</code>, with command line arguments in <code>args</code>. If omitted, <code>args</code> defaults\nto an empty array.\n\n</p>\n<p>A third argument may be used to specify additional options, with these defaults:\n\n</p>\n<pre><code class=\"js\">{\n  cwd: undefined,\n  env: process.env\n}</code></pre>\n<p>Use <code>cwd</code> to specify the working directory from which the process is spawned.\nIf not given, the default is to inherit the current working directory.\n\n</p>\n<p>Use <code>env</code> to specify environment variables that will be visible to the new\nprocess, the default is <code>process.env</code>.\n\n</p>\n<p>Example of running <code>ls -lh /usr</code>, capturing <code>stdout</code>, <code>stderr</code>, and the\nexit code:\n\n</p>\n<pre><code class=\"js\">const spawn = require(&#39;child_process&#39;).spawn;\nconst ls = spawn(&#39;ls&#39;, [&#39;-lh&#39;, &#39;/usr&#39;]);\n\nls.stdout.on(&#39;data&#39;, (data) =&gt; {\n  console.log(`stdout: ${data}`);\n});\n\nls.stderr.on(&#39;data&#39;, (data) =&gt; {\n  console.log(`stderr: ${data}`);\n});\n\nls.on(&#39;close&#39;, (code) =&gt; {\n  console.log(`child process exited with code ${code}`);\n});</code></pre>\n<p>Example: A very elaborate way to run &#39;ps ax | grep ssh&#39;\n\n</p>\n<pre><code class=\"js\">const spawn = require(&#39;child_process&#39;).spawn;\nconst ps = spawn(&#39;ps&#39;, [&#39;ax&#39;]);\nconst grep = spawn(&#39;grep&#39;, [&#39;ssh&#39;]);\n\nps.stdout.on(&#39;data&#39;, (data) =&gt; {\n  grep.stdin.write(data);\n});\n\nps.stderr.on(&#39;data&#39;, (data) =&gt; {\n  console.log(`ps stderr: ${data}`);\n});\n\nps.on(&#39;close&#39;, (code) =&gt; {\n  if (code !== 0) {\n    console.log(`ps process exited with code ${code}`);\n  }\n  grep.stdin.end();\n});\n\ngrep.stdout.on(&#39;data&#39;, (data) =&gt; {\n  console.log(`${data}`);\n});\n\ngrep.stderr.on(&#39;data&#39;, (data) =&gt; {\n  console.log(`grep stderr: ${data}`);\n});\n\ngrep.on(&#39;close&#39;, (code) =&gt; {\n  if (code !== 0) {\n    console.log(`grep process exited with code ${code}`);\n  }\n});</code></pre>\n<p>Example of checking for failed exec:\n\n</p>\n<pre><code class=\"js\">const spawn = require(&#39;child_process&#39;).spawn;\nconst child = spawn(&#39;bad_command&#39;);\n\nchild.on(&#39;error&#39;, (err) =&gt; {\n  console.log(&#39;Failed to start child process.&#39;);\n});</code></pre>\n",
              "properties": [
                {
                  "textRaw": "options.detached",
                  "name": "detached",
                  "desc": "<p>On Windows, setting <code>options.detached</code> to <code>true</code> makes it possible for the\nchild process to continue running after the parent exits. The child will have\nits own console window. <em>Once enabled for a child process, it cannot be\ndisabled</em>.\n\n</p>\n<p>On non-Windows platforms, if <code>options.detached</code> is set to <code>true</code>, the child\nprocess will be made the leader of a new process group and session. Note that\nchild processes may continue running after the parent exits regardless of\nwhether they are detached or not.  See <code>setsid(2)</code> for more information.\n\n</p>\n<p>By default, the parent will wait for the detached child to exit. To prevent\nthe parent from waiting for a given <code>child</code>, use the <code>child.unref()</code> method.\nDoing so will cause the parent&#39;s event loop to not include the child in its\nreference count, allowing the parent to exit independently of the child, unless\nthere is an established IPC channel between the child and parent.\n\n</p>\n<p>When using the <code>detached</code> option to start a long-running process, the process\nwill not stay running in the background after the parent exits unless it is\nprovided with a <code>stdio</code> configuration that is not connected to the parent.\nIf the parent&#39;s <code>stdio</code> is inherited, the child will remain attached to the\ncontrolling terminal.\n\n</p>\n<p>Example of a long-running process, by detaching and also ignoring its parent\n<code>stdio</code> file descriptors, in order to ignore the parent&#39;s termination:\n\n</p>\n<pre><code class=\"js\">const spawn = require(&#39;child_process&#39;).spawn;\n\nconst child = spawn(process.argv[0], [&#39;child_program.js&#39;], {\n  detached: true,\n  stdio: [&#39;ignore&#39;]\n});\n\nchild.unref();</code></pre>\n<p>Alternatively one can redirect the child process&#39; output into files:\n\n</p>\n<pre><code class=\"js\">const fs = require(&#39;fs&#39;);\nconst spawn = require(&#39;child_process&#39;).spawn;\nconst out = fs.openSync(&#39;./out.log&#39;, &#39;a&#39;);\nconst err = fs.openSync(&#39;./out.log&#39;, &#39;a&#39;);\n\nconst child = spawn(&#39;prg&#39;, [], {\n detached: true,\n stdio: [ &#39;ignore&#39;, out, err ]\n});\n\nchild.unref();</code></pre>\n"
                },
                {
                  "textRaw": "options.stdio",
                  "name": "stdio",
                  "desc": "<p>The <code>options.stdio</code> option is used to configure the pipes that are established\nbetween the parent and child process. By default, the child&#39;s stdin, stdout,\nand stderr are redirected to corresponding <code>child.stdin</code>, <code>child.stdout</code>, and\n<code>child.stderr</code> streams on the <code>ChildProcess</code> object. This is equivalent to\nsetting the <code>options.stdio</code> equal to <code>[&#39;pipe&#39;, &#39;pipe&#39;, &#39;pipe&#39;]</code>.\n\n</p>\n<p>For convenience, <code>options.stdio</code> may be one of the following strings:\n\n</p>\n<ul>\n<li><code>&#39;pipe&#39;</code> - equivalent to <code>[&#39;pipe&#39;, &#39;pipe&#39;, &#39;pipe&#39;]</code> (the default)</li>\n<li><code>&#39;ignore&#39;</code> - equivalent to <code>[&#39;ignore&#39;, &#39;ignore&#39;, &#39;ignore&#39;]</code></li>\n<li><code>&#39;inherit&#39;</code> - equivalent to <code>[process.stdin, process.stdout, process.stderr]</code>\n or <code>[0,1,2]</code></li>\n</ul>\n<p>Otherwise, the value of <code>option.stdio</code> is an array where each index corresponds\nto an fd in the child. The fds 0, 1, and 2 correspond to stdin, stdout,\nand stderr, respectively. Additional fds can be specified to create additional\npipes between the parent and child. The value is one of the following:\n\n</p>\n<ol>\n<li><code>&#39;pipe&#39;</code> - Create a pipe between the child process and the parent process.\nThe parent end of the pipe is exposed to the parent as a property on the\n<code>child_process</code> object as <code>ChildProcess.stdio[fd]</code>. Pipes created for\nfds 0 - 2 are also available as ChildProcess.stdin, ChildProcess.stdout\nand ChildProcess.stderr, respectively.</li>\n<li><code>&#39;ipc&#39;</code> - Create an IPC channel for passing messages/file descriptors\nbetween parent and child. A ChildProcess may have at most <em>one</em> IPC stdio\nfile descriptor. Setting this option enables the ChildProcess.send() method.\nIf the child writes JSON messages to this file descriptor, the\n<code>ChildProcess.on(&#39;message&#39;)</code> event handler will be triggered in the parent.\nIf the child is a Node.js process, the presence of an IPC channel will enable\n<code>process.send()</code>, <code>process.disconnect()</code>, <code>process.on(&#39;disconnect&#39;)</code>, and\n<code>process.on(&#39;message&#39;)</code> within the child.</li>\n<li><code>&#39;ignore&#39;</code> - Instructs Node.js to ignore the fd in the child. While Node.js\nwill always open fds 0 - 2 for the processes it spawns, setting the fd to\n<code>&#39;ignore&#39;</code> will cause Node.js to open <code>/dev/null</code> and attach it to the\nchild&#39;s fd.</li>\n<li><code>Stream</code> object - Share a readable or writable stream that refers to a tty,\nfile, socket, or a pipe with the child process. The stream&#39;s underlying\nfile descriptor is duplicated in the child process to the fd that\ncorresponds to the index in the <code>stdio</code> array. Note that the stream must\nhave an underlying descriptor (file streams do not until the <code>&#39;open&#39;</code>\nevent has occurred).</li>\n<li>Positive integer - The integer value is interpreted as a file descriptor\nthat is is currently open in the parent process. It is shared with the child\nprocess, similar to how <code>Stream</code> objects can be shared.</li>\n<li><code>null</code>, <code>undefined</code> - Use default value. For stdio fds 0, 1 and 2 (in other\nwords, stdin, stdout, and stderr) a pipe is created. For fd 3 and up, the\ndefault is <code>&#39;ignore&#39;</code>.</li>\n</ol>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const spawn = require(&#39;child_process&#39;).spawn;\n\n// Child will use parent&#39;s stdios\nspawn(&#39;prg&#39;, [], { stdio: &#39;inherit&#39; });\n\n// Spawn child sharing only stderr\nspawn(&#39;prg&#39;, [], { stdio: [&#39;pipe&#39;, &#39;pipe&#39;, process.stderr] });\n\n// Open an extra fd=4, to interact with programs presenting a\n// startd-style interface.\nspawn(&#39;prg&#39;, [], { stdio: [&#39;pipe&#39;, null, null, null, &#39;pipe&#39;] });</code></pre>\n<p><em>It is worth noting that when an IPC channel is established between the\nparent and child processes, and the child is a Node.js process, the child\nis launched with the IPC channel unreferenced (using <code>unref()</code>) until the\nchild registers an event handler for the <code>process.on(&#39;disconnected&#39;)</code> event.\nThis allows the child to exit normally without the process being held open\nby the open IPC channel.</em>\n\n</p>\n<p>See also: [<code>child_process.exec()</code>][] and [<code>child_process.fork()</code>][]\n\n</p>\n"
                }
              ]
            }
          ],
          "type": "module",
          "displayName": "Asynchronous Process Creation"
        },
        {
          "textRaw": "Synchronous Process Creation",
          "name": "synchronous_process_creation",
          "desc": "<p>The <code>child_process.spawnSync()</code>, <code>child_process.execSync()</code>, and\n<code>child_process.execFileSync()</code> methods are <strong>synchronous</strong> and <strong>WILL</strong> block\nthe Node.js event loop, pausing execution of any additional code until the\nspawned process exits.\n\n</p>\n<p>Blocking calls like these are mostly useful for simplifying general purpose\nscripting tasks and for simplifying the loading/processing of application\nconfiguration at startup.\n\n</p>\n",
          "methods": [
            {
              "textRaw": "child_process.execFileSync(file[, args][, options])",
              "type": "method",
              "name": "execFileSync",
              "signatures": [
                {
                  "return": {
                    "textRaw": "return: {Buffer|String} The stdout from the command ",
                    "name": "return",
                    "type": "Buffer|String",
                    "desc": "The stdout from the command"
                  },
                  "params": [
                    {
                      "textRaw": "`file` {String} The name or path of the executable file to run ",
                      "name": "file",
                      "type": "String",
                      "desc": "The name or path of the executable file to run"
                    },
                    {
                      "textRaw": "`args` {Array} List of string arguments ",
                      "name": "args",
                      "type": "Array",
                      "desc": "List of string arguments",
                      "optional": true
                    },
                    {
                      "textRaw": "`options` {Object} ",
                      "options": [
                        {
                          "textRaw": "`cwd` {String} Current working directory of the child process ",
                          "name": "cwd",
                          "type": "String",
                          "desc": "Current working directory of the child process"
                        },
                        {
                          "textRaw": "`input` {String|Buffer} The value which will be passed as stdin to the spawned process ",
                          "options": [
                            {
                              "textRaw": "supplying this value will override `stdio[0]` ",
                              "name": "supplying",
                              "desc": "this value will override `stdio[0]`"
                            }
                          ],
                          "name": "input",
                          "type": "String|Buffer",
                          "desc": "The value which will be passed as stdin to the spawned process"
                        },
                        {
                          "textRaw": "`stdio` {Array} Child's stdio configuration. (Default: 'pipe') ",
                          "options": [
                            {
                              "textRaw": "`stderr` by default will be output to the parent process' stderr unless `stdio` is specified ",
                              "name": "stderr",
                              "desc": "by default will be output to the parent process' stderr unless `stdio` is specified"
                            }
                          ],
                          "name": "stdio",
                          "default": "pipe",
                          "type": "Array",
                          "desc": "Child's stdio configuration."
                        },
                        {
                          "textRaw": "`env` {Object} Environment key-value pairs ",
                          "name": "env",
                          "type": "Object",
                          "desc": "Environment key-value pairs"
                        },
                        {
                          "textRaw": "`uid` {Number} Sets the user identity of the process. (See setuid(2).) ",
                          "name": "uid",
                          "type": "Number",
                          "desc": "Sets the user identity of the process. (See setuid(2).)"
                        },
                        {
                          "textRaw": "`gid` {Number} Sets the group identity of the process. (See setgid(2).) ",
                          "name": "gid",
                          "type": "Number",
                          "desc": "Sets the group identity of the process. (See setgid(2).)"
                        },
                        {
                          "textRaw": "`timeout` {Number} In milliseconds the maximum amount of time the process is allowed to run. (Default: undefined) ",
                          "name": "timeout",
                          "default": "undefined",
                          "type": "Number",
                          "desc": "In milliseconds the maximum amount of time the process is allowed to run."
                        },
                        {
                          "textRaw": "`killSignal` {String} The signal value to be used when the spawned process will be killed. (Default: 'SIGTERM') ",
                          "name": "killSignal",
                          "default": "SIGTERM",
                          "type": "String",
                          "desc": "The signal value to be used when the spawned process will be killed."
                        },
                        {
                          "textRaw": "`maxBuffer` {Number} largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed ",
                          "name": "maxBuffer",
                          "type": "Number",
                          "desc": "largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed"
                        },
                        {
                          "textRaw": "`encoding` {String} The encoding used for all stdio inputs and outputs. (Default: 'buffer') ",
                          "name": "encoding",
                          "default": "buffer",
                          "type": "String",
                          "desc": "The encoding used for all stdio inputs and outputs."
                        }
                      ],
                      "name": "options",
                      "type": "Object",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "file"
                    },
                    {
                      "name": "args",
                      "optional": true
                    },
                    {
                      "name": "options",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>child_process.execFileSync()</code> method is generally identical to\n<code>child_process.execFile()</code> with the exception that the method will not return\nuntil the child process has fully closed. When a timeout has been encountered\nand <code>killSignal</code> is sent, the method won&#39;t return until the process has\ncompletely exited. <em>Note that if the child process intercepts and handles\nthe <code>SIGTERM</code> signal and does not exit, the parent process will still wait\nuntil the child process has exited.</em>\n\n</p>\n<p>If the process times out, or has a non-zero exit code, this method <strong><em>will</em></strong>\nthrow.  The [<code>Error</code>][] object will contain the entire result from\n[<code>child_process.spawnSync()</code>][]\n\n</p>\n"
            },
            {
              "textRaw": "child_process.execSync(command[, options])",
              "type": "method",
              "name": "execSync",
              "signatures": [
                {
                  "return": {
                    "textRaw": "return: {Buffer|String} The stdout from the command ",
                    "name": "return",
                    "type": "Buffer|String",
                    "desc": "The stdout from the command"
                  },
                  "params": [
                    {
                      "textRaw": "`command` {String} The command to run ",
                      "name": "command",
                      "type": "String",
                      "desc": "The command to run"
                    },
                    {
                      "textRaw": "`options` {Object} ",
                      "options": [
                        {
                          "textRaw": "`cwd` {String} Current working directory of the child process ",
                          "name": "cwd",
                          "type": "String",
                          "desc": "Current working directory of the child process"
                        },
                        {
                          "textRaw": "`input` {String|Buffer} The value which will be passed as stdin to the spawned process ",
                          "options": [
                            {
                              "textRaw": "supplying this value will override `stdio[0]` ",
                              "name": "supplying",
                              "desc": "this value will override `stdio[0]`"
                            }
                          ],
                          "name": "input",
                          "type": "String|Buffer",
                          "desc": "The value which will be passed as stdin to the spawned process"
                        },
                        {
                          "textRaw": "`stdio` {Array} Child's stdio configuration. (Default: 'pipe') ",
                          "options": [
                            {
                              "textRaw": "`stderr` by default will be output to the parent process' stderr unless `stdio` is specified ",
                              "name": "stderr",
                              "desc": "by default will be output to the parent process' stderr unless `stdio` is specified"
                            }
                          ],
                          "name": "stdio",
                          "default": "pipe",
                          "type": "Array",
                          "desc": "Child's stdio configuration."
                        },
                        {
                          "textRaw": "`env` {Object} Environment key-value pairs ",
                          "name": "env",
                          "type": "Object",
                          "desc": "Environment key-value pairs"
                        },
                        {
                          "textRaw": "`shell` {String} Shell to execute the command with (Default: '/bin/sh' on UNIX, 'https://nodejs.org/dist/latest-v4.x/docs/api/cmd.exe' on Windows,  The shell should  understand the `-c` switch on UNIX or `/s /c` on Windows. On Windows,  command line parsing should be compatible with `cmd.exe`.) ",
                          "name": "shell",
                          "type": "String",
                          "desc": "Shell to execute the command with (Default: '/bin/sh' on UNIX, 'https://nodejs.org/dist/latest-v4.x/docs/api/cmd.exe' on Windows,  The shell should  understand the `-c` switch on UNIX or `/s /c` on Windows. On Windows,  command line parsing should be compatible with `cmd.exe`.)"
                        },
                        {
                          "textRaw": "`uid` {Number} Sets the user identity of the process. (See setuid(2).) ",
                          "name": "uid",
                          "type": "Number",
                          "desc": "Sets the user identity of the process. (See setuid(2).)"
                        },
                        {
                          "textRaw": "`gid` {Number} Sets the group identity of the process. (See setgid(2).) ",
                          "name": "gid",
                          "type": "Number",
                          "desc": "Sets the group identity of the process. (See setgid(2).)"
                        },
                        {
                          "textRaw": "`timeout` {Number} In milliseconds the maximum amount of time the process is allowed to run. (Default: undefined) ",
                          "name": "timeout",
                          "default": "undefined",
                          "type": "Number",
                          "desc": "In milliseconds the maximum amount of time the process is allowed to run."
                        },
                        {
                          "textRaw": "`killSignal` {String} The signal value to be used when the spawned process will be killed. (Default: 'SIGTERM') ",
                          "name": "killSignal",
                          "default": "SIGTERM",
                          "type": "String",
                          "desc": "The signal value to be used when the spawned process will be killed."
                        },
                        {
                          "textRaw": "`maxBuffer` {Number} largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed ",
                          "name": "maxBuffer",
                          "type": "Number",
                          "desc": "largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed"
                        },
                        {
                          "textRaw": "`encoding` {String} The encoding used for all stdio inputs and outputs. (Default: 'buffer') ",
                          "name": "encoding",
                          "default": "buffer",
                          "type": "String",
                          "desc": "The encoding used for all stdio inputs and outputs."
                        }
                      ],
                      "name": "options",
                      "type": "Object",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "command"
                    },
                    {
                      "name": "options",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>child_process.execSync()</code> method is generally identical to\n<code>child_process.exec()</code> with the exception that the method will not return until\nthe child process has fully closed. When a timeout has been encountered and\n<code>killSignal</code> is sent, the method won&#39;t return until the process has completely\nexited. <em>Note that if  the child process intercepts and handles the <code>SIGTERM</code>\nsignal and doesn&#39;t exit, the parent process will wait until the child\nprocess has exited.</em>\n\n</p>\n<p>If the process times out, or has a non-zero exit code, this method <strong><em>will</em></strong>\nthrow.  The [<code>Error</code>][] object will contain the entire result from\n[<code>child_process.spawnSync()</code>][]\n\n</p>\n"
            },
            {
              "textRaw": "child_process.spawnSync(command[, args][, options])",
              "type": "method",
              "name": "spawnSync",
              "signatures": [
                {
                  "return": {
                    "textRaw": "return: {Object} ",
                    "options": [
                      {
                        "textRaw": "`pid` {Number} Pid of the child process ",
                        "name": "pid",
                        "type": "Number",
                        "desc": "Pid of the child process"
                      },
                      {
                        "textRaw": "`output` {Array} Array of results from stdio output ",
                        "name": "output",
                        "type": "Array",
                        "desc": "Array of results from stdio output"
                      },
                      {
                        "textRaw": "`stdout` {Buffer|String} The contents of `output[1]` ",
                        "name": "stdout",
                        "type": "Buffer|String",
                        "desc": "The contents of `output[1]`"
                      },
                      {
                        "textRaw": "`stderr` {Buffer|String} The contents of `output[2]` ",
                        "name": "stderr",
                        "type": "Buffer|String",
                        "desc": "The contents of `output[2]`"
                      },
                      {
                        "textRaw": "`status` {Number} The exit code of the child process ",
                        "name": "status",
                        "type": "Number",
                        "desc": "The exit code of the child process"
                      },
                      {
                        "textRaw": "`signal` {String} The signal used to kill the child process ",
                        "name": "signal",
                        "type": "String",
                        "desc": "The signal used to kill the child process"
                      },
                      {
                        "textRaw": "`error` {Error} The error object if the child process failed or timed out ",
                        "name": "error",
                        "type": "Error",
                        "desc": "The error object if the child process failed or timed out"
                      }
                    ],
                    "name": "return",
                    "type": "Object"
                  },
                  "params": [
                    {
                      "textRaw": "`command` {String} The command to run ",
                      "name": "command",
                      "type": "String",
                      "desc": "The command to run"
                    },
                    {
                      "textRaw": "`args` {Array} List of string arguments ",
                      "name": "args",
                      "type": "Array",
                      "desc": "List of string arguments",
                      "optional": true
                    },
                    {
                      "textRaw": "`options` {Object} ",
                      "options": [
                        {
                          "textRaw": "`cwd` {String} Current working directory of the child process ",
                          "name": "cwd",
                          "type": "String",
                          "desc": "Current working directory of the child process"
                        },
                        {
                          "textRaw": "`input` {String|Buffer} The value which will be passed as stdin to the spawned process ",
                          "options": [
                            {
                              "textRaw": "supplying this value will override `stdio[0]` ",
                              "name": "supplying",
                              "desc": "this value will override `stdio[0]`"
                            }
                          ],
                          "name": "input",
                          "type": "String|Buffer",
                          "desc": "The value which will be passed as stdin to the spawned process"
                        },
                        {
                          "textRaw": "`stdio` {Array} Child's stdio configuration. ",
                          "name": "stdio",
                          "type": "Array",
                          "desc": "Child's stdio configuration."
                        },
                        {
                          "textRaw": "`env` {Object} Environment key-value pairs ",
                          "name": "env",
                          "type": "Object",
                          "desc": "Environment key-value pairs"
                        },
                        {
                          "textRaw": "`uid` {Number} Sets the user identity of the process. (See setuid(2).) ",
                          "name": "uid",
                          "type": "Number",
                          "desc": "Sets the user identity of the process. (See setuid(2).)"
                        },
                        {
                          "textRaw": "`gid` {Number} Sets the group identity of the process. (See setgid(2).) ",
                          "name": "gid",
                          "type": "Number",
                          "desc": "Sets the group identity of the process. (See setgid(2).)"
                        },
                        {
                          "textRaw": "`timeout` {Number} In milliseconds the maximum amount of time the process is allowed to run. (Default: undefined) ",
                          "name": "timeout",
                          "default": "undefined",
                          "type": "Number",
                          "desc": "In milliseconds the maximum amount of time the process is allowed to run."
                        },
                        {
                          "textRaw": "`killSignal` {String} The signal value to be used when the spawned process will be killed. (Default: 'SIGTERM') ",
                          "name": "killSignal",
                          "default": "SIGTERM",
                          "type": "String",
                          "desc": "The signal value to be used when the spawned process will be killed."
                        },
                        {
                          "textRaw": "`maxBuffer` {Number} largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed ",
                          "name": "maxBuffer",
                          "type": "Number",
                          "desc": "largest amount of data (in bytes) allowed on stdout or stderr - if exceeded child process is killed"
                        },
                        {
                          "textRaw": "`encoding` {String} The encoding used for all stdio inputs and outputs. (Default: 'buffer') ",
                          "name": "encoding",
                          "default": "buffer",
                          "type": "String",
                          "desc": "The encoding used for all stdio inputs and outputs."
                        }
                      ],
                      "name": "options",
                      "type": "Object",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "command"
                    },
                    {
                      "name": "args",
                      "optional": true
                    },
                    {
                      "name": "options",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>child_process.spawnSync()</code> method is generally identical to\n<code>child_process.spawn()</code> with the exception that the function will not return\nuntil the child process has fully closed. When a timeout has been encountered\nand <code>killSignal</code> is sent, the method won&#39;t return until the process has\ncompletely exited. Note that if the process intercepts and handles the\n<code>SIGTERM</code> signal and doesn&#39;t exit, the parent process will wait until the child\nprocess has exited.\n\n</p>\n"
            }
          ],
          "type": "module",
          "displayName": "Synchronous Process Creation"
        }
      ],
      "classes": [
        {
          "textRaw": "Class: ChildProcess",
          "type": "class",
          "name": "ChildProcess",
          "desc": "<p>Instances of the <code>ChildProcess</code> class are [<code>EventEmitters</code>][] that represent\nspawned child processes.\n\n</p>\n<p>Instances of <code>ChildProcess</code> are not intended to be created directly. Rather,\nuse the [<code>child_process.spawn()</code>][], [<code>child_process.exec()</code>][],\n[<code>child_process.execFile()</code>][], or [<code>child_process.fork()</code>][] methods to create\ninstances of <code>ChildProcess</code>.\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'close'",
              "type": "event",
              "name": "close",
              "params": [],
              "desc": "<p>The <code>&#39;close&#39;</code> event is emitted when the stdio streams of a child process have\nbeen closed. This is distinct from the <code>&#39;exit&#39;</code> event, since multiple\nprocesses might share the same stdio streams.\n\n</p>\n"
            },
            {
              "textRaw": "Event: 'disconnect'",
              "type": "event",
              "name": "disconnect",
              "desc": "<p>The <code>&#39;disconnect&#39;</code> event is emitted after calling the\n<code>ChildProcess.disconnect()</code> method in the parent or child process. After\ndisconnecting it is no longer possible to send or receive messages, and the\n<code>ChildProcess.connected</code> property is false.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event:  'error'",
              "type": "event",
              "name": "error",
              "params": [],
              "desc": "<p>The <code>&#39;error&#39;</code> event is emitted whenever:\n\n</p>\n<ol>\n<li>The process could not be spawned, or</li>\n<li>The process could not be killed, or</li>\n<li>Sending a message to the child process failed.</li>\n</ol>\n<p>Note that the <code>&#39;exit&#39;</code> event may or may not fire after an error has occurred.\nIf you are listening to both the <code>&#39;exit&#39;</code> and <code>&#39;error&#39;</code> events, it is important\nto guard against accidentally invoking handler functions multiple times.\n\n</p>\n<p>See also [<code>ChildProcess#kill()</code>][] and [<code>ChildProcess#send()</code>][].\n\n</p>\n"
            },
            {
              "textRaw": "Event:  'exit'",
              "type": "event",
              "name": "exit",
              "params": [],
              "desc": "<p>The <code>&#39;exit&#39;</code> event is emitted after the child process ends. If the process\nexited, <code>code</code> is the final exit code of the process, otherwise <code>null</code>. If the\nprocess terminated due to receipt of a signal, <code>signal</code> is the string name of\nthe signal, otherwise <code>null</code>. One of the two will always be non-null.\n\n</p>\n<p>Note that when the <code>&#39;exit&#39;</code> event is triggered, child process stdio streams\nmight still be open.\n\n</p>\n<p>Also, note that Node.js establishes signal handlers for <code>SIGINT</code> and\n<code>SIGTERM</code> and Node.js processes will not terminate immediately due to receipt\nof those signals. Rather, Node.js will perform a sequence of cleanup actions\nand then will re-raise the handled signal.\n\n</p>\n<p>See <code>waitpid(2)</code>.\n\n</p>\n"
            },
            {
              "textRaw": "Event: 'message'",
              "type": "event",
              "name": "message",
              "params": [],
              "desc": "<p>The <code>&#39;message&#39;</code> event is triggered when a child process uses <code>process.send()</code>\nto send messages.\n\n</p>\n"
            }
          ],
          "properties": [
            {
              "textRaw": "`connected` {Boolean} Set to false after `.disconnect` is called ",
              "type": "Boolean",
              "name": "connected",
              "desc": "<p>The <code>child.connected</code> property indicates whether it is still possible to send\nand receive messages from a child process. When <code>child.connected</code> is false, it\nis no longer possible to send or receive messages.\n\n</p>\n",
              "shortDesc": "Set to false after `.disconnect` is called"
            },
            {
              "textRaw": "`pid` {Number} Integer ",
              "type": "Number",
              "name": "pid",
              "desc": "<p>Returns the process identifier (PID) of the child process.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const spawn = require(&#39;child_process&#39;).spawn;\nconst grep = spawn(&#39;grep&#39;, [&#39;ssh&#39;]);\n\nconsole.log(`Spawned child pid: ${grep.pid}`);\ngrep.stdin.end();</code></pre>\n",
              "shortDesc": "Integer"
            },
            {
              "textRaw": "`stderr` {Stream} ",
              "type": "Stream",
              "name": "stderr",
              "desc": "<p>A <code>Readable Stream</code> that represents the child process&#39;s <code>stderr</code>.\n\n</p>\n<p>If the child was spawned with <code>stdio[2]</code> set to anything other than <code>&#39;pipe&#39;</code>,\nthen this will be <code>undefined</code>.\n\n</p>\n<p><code>child.stderr</code> is an alias for <code>child.stdio[2]</code>. Both properties will refer to\nthe same value.\n\n</p>\n"
            },
            {
              "textRaw": "`stdin` {Stream} ",
              "type": "Stream",
              "name": "stdin",
              "desc": "<p>A <code>Writable Stream</code> that represents the child process&#39;s <code>stdin</code>.\n\n</p>\n<p><em>Note that if a child process waits to read all of its input, the child will not\ncontinue until this stream has been closed via <code>end()</code>.</em>\n\n</p>\n<p>If the child was spawned with <code>stdio[0]</code> set to anything other than <code>&#39;pipe&#39;</code>,\nthen this will be <code>undefined</code>.\n\n</p>\n<p><code>child.stdin</code> is an alias for <code>child.stdio[0]</code>. Both properties will refer to\nthe same value.\n\n</p>\n"
            },
            {
              "textRaw": "`stdio` {Array} ",
              "type": "Array",
              "name": "stdio",
              "desc": "<p>A sparse array of pipes to the child process, corresponding with positions in\nthe [<code>stdio</code>][] option passed to [<code>child_process.spawn()</code>][] that have been set\nto the value <code>&#39;pipe&#39;</code>. Note that <code>child.stdio[0]</code>, <code>child.stdio[1]</code>, and\n<code>child.stdio[2]</code> are also available as <code>child.stdin</code>, <code>child.stdout</code>, and\n<code>child.stderr</code>, respectively.\n\n</p>\n<p>In the following example, only the child&#39;s fd <code>1</code> (stdout) is configured as a\npipe, so only the parent&#39;s <code>child.stdio[1]</code> is a stream, all other values in\nthe array are <code>null</code>.\n\n</p>\n<pre><code class=\"js\">const assert = require(&#39;assert&#39;);\nconst fs = require(&#39;fs&#39;);\nconst child_process = require(&#39;child_process&#39;);\n\nconst child = child_process.spawn(&#39;ls&#39;, {\n    stdio: [\n      0, // Use parents stdin for child\n      &#39;pipe&#39;, // Pipe child&#39;s stdout to parent\n      fs.openSync(&#39;err.out&#39;, &#39;w&#39;) // Direct child&#39;s stderr to a file\n    ]\n});\n\nassert.equal(child.stdio[0], null);\nassert.equal(child.stdio[0], child.stdin);\n\nassert(child.stdout);\nassert.equal(child.stdio[1], child.stdout);\n\nassert.equal(child.stdio[2], null);\nassert.equal(child.stdio[2], child.stderr);</code></pre>\n"
            },
            {
              "textRaw": "`stdout` {Stream} ",
              "type": "Stream",
              "name": "stdout",
              "desc": "<p>A <code>Readable Stream</code> that represents the child process&#39;s <code>stdout</code>.\n\n</p>\n<p>If the child was spawned with <code>stdio[1]</code> set to anything other than <code>&#39;pipe&#39;</code>,\nthen this will be <code>undefined</code>.\n\n</p>\n<p><code>child.stdout</code> is an alias for <code>child.stdio[1]</code>. Both properties will refer\nto the same value.\n\n</p>\n"
            }
          ],
          "methods": [
            {
              "textRaw": "child.disconnect()",
              "type": "method",
              "name": "disconnect",
              "desc": "<p>Closes the IPC channel between parent and child, allowing the child to exit\ngracefully once there are no other connections keeping it alive. After calling\nthis method the <code>child.connected</code> and <code>process.connected</code> properties in both\nthe parent and child (respectively) will be set to <code>false</code>, and it will be no\nlonger possible to pass messages between the processes.\n\n</p>\n<p>The <code>&#39;disconnect&#39;</code> event will be emitted when there are no messages in the\nprocess of being received. This will most often be triggered immediately after\ncalling <code>child.disconnect()</code>.\n\n</p>\n<p>Note that when the child process is a Node.js instance (e.g. spawned using\n[<code>child_process.fork()</code>]), the <code>process.disconnect()</code> method can be invoked\nwithin the child process to close the IPC channel as well.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "child.kill([signal])",
              "type": "method",
              "name": "kill",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`signal` {String} ",
                      "name": "signal",
                      "type": "String",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "signal",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>child.kill()</code> methods sends a signal to the child process. If no argument\nis given, the process will be sent the <code>&#39;SIGTERM&#39;</code> signal. See <code>signal(7)</code> for\na list of available signals.\n\n</p>\n<pre><code class=\"js\">const spawn = require(&#39;child_process&#39;).spawn;\nconst grep = spawn(&#39;grep&#39;, [&#39;ssh&#39;]);\n\ngrep.on(&#39;close&#39;, (code, signal) =&gt; {\n  console.log(\n    `child process terminated due to receipt of signal ${signal}`);\n});\n\n// Send SIGHUP to process\ngrep.kill(&#39;SIGHUP&#39;);</code></pre>\n<p>The <code>ChildProcess</code> object may emit an <code>&#39;error&#39;</code> event if the signal cannot be\ndelivered. Sending a signal to a child process that has already exited is not\nan error but may have unforeseen consequences. Specifically, if the process\nidentifier (PID) has been reassigned to another process, the signal will be\ndelivered to that process instead which can have unexpected results.\n\n</p>\n<p>Note that while the function is called <code>kill</code>, the signal delivered to the\nchild process may not actually terminate the process.\n\n</p>\n<p>See <code>kill(2)</code>\n\n</p>\n"
            },
            {
              "textRaw": "child.send(message[, sendHandle][, callback])",
              "type": "method",
              "name": "send",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Boolean} ",
                    "name": "return",
                    "type": "Boolean"
                  },
                  "params": [
                    {
                      "textRaw": "`message` {Object} ",
                      "name": "message",
                      "type": "Object"
                    },
                    {
                      "textRaw": "`sendHandle` {Handle} ",
                      "name": "sendHandle",
                      "type": "Handle",
                      "optional": true
                    },
                    {
                      "textRaw": "`callback` {Function} ",
                      "name": "callback",
                      "type": "Function",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "message"
                    },
                    {
                      "name": "sendHandle",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>When an IPC channel has been established between the parent and child (\ni.e. when using [<code>child_process.fork()</code>][]), the <code>child.send()</code> method can be\nused to send messages to the child process. When the child process is a Node.js\ninstance, these messages can be received via the <code>process.on(&#39;message&#39;)</code> event.\n\n</p>\n<p>For example, in the parent script:\n\n</p>\n<pre><code class=\"js\">const cp = require(&#39;child_process&#39;);\nconst n = cp.fork(`${__dirname}/sub.js`);\n\nn.on(&#39;message&#39;, (m) =&gt; {\n  console.log(&#39;PARENT got message:&#39;, m);\n});\n\nn.send({ hello: &#39;world&#39; });</code></pre>\n<p>And then the child script, <code>&#39;sub.js&#39;</code> might look like this:\n\n</p>\n<pre><code class=\"js\">process.on(&#39;message&#39;, (m) =&gt; {\n  console.log(&#39;CHILD got message:&#39;, m);\n});\n\nprocess.send({ foo: &#39;bar&#39; });</code></pre>\n<p>Child Node.js processes will have a <code>process.send()</code> method of their own that\nallows the child to send messages back to the parent.\n\n</p>\n<p>There is a special case when sending a <code>{cmd: &#39;NODE_foo&#39;}</code> message. All messages\ncontaining a <code>NODE_</code> prefix in its <code>cmd</code> property are considered to be reserved\nfor use within Node.js core and will not be emitted in the child&#39;s\n<code>process.on(&#39;message&#39;)</code> event. Rather, such messages are emitted using the\n<code>process.on(&#39;internalMessage&#39;)</code> event and are consumed internally by Node.js.\nApplications should avoid using such messages or listening for\n<code>&#39;internalMessage&#39;</code> events as it is subject to change without notice.\n\n</p>\n<p>The optional <code>sendHandle</code> argument that may be passed to <code>child.send()</code> is for\npassing a TCP server or socket object to the child process. The child will\nreceive the object as the second argument passed to the callback function\nregistered on the <code>process.on(&#39;message&#39;)</code> event.\n\n</p>\n<p>The optional <code>callback</code> is a function that is invoked after the message is\nsent but before the child may have received it.  The function is called with a\nsingle argument: <code>null</code> on success, or an [<code>Error</code>][] object on failure.\n\n</p>\n<p>If no <code>callback</code> function is provided and the message cannot be sent, an\n<code>&#39;error&#39;</code> event will be emitted by the <code>ChildProcess</code> object. This can happen,\nfor instance, when the child process has already exited.\n\n</p>\n<p><code>child.send()</code> will return <code>false</code> if the channel has closed or when the\nbacklog of unsent messages exceeds a threshold that makes it unwise to send\nmore. Otherwise, the method returns <code>true</code>. The <code>callback</code> function can be\nused to implement flow control.\n\n</p>\n<h4>Example: sending a server object</h4>\n<p>The <code>sendHandle</code> argument can be used, for instance, to pass the handle of\na TCP server object to the child process as illustrated in the example below:\n\n</p>\n<pre><code class=\"js\">const child = require(&#39;child_process&#39;).fork(&#39;child.js&#39;);\n\n// Open up the server object and send the handle.\nconst server = require(&#39;net&#39;).createServer();\nserver.on(&#39;connection&#39;, (socket) =&gt; {\n  socket.end(&#39;handled by parent&#39;);\n});\nserver.listen(1337, () =&gt; {\n  child.send(&#39;server&#39;, server);\n});</code></pre>\n<p>The child would then receive the server object as:\n\n</p>\n<pre><code class=\"js\">process.on(&#39;message&#39;, (m, server) =&gt; {\n  if (m === &#39;server&#39;) {\n    server.on(&#39;connection&#39;, (socket) =&gt; {\n      socket.end(&#39;handled by child&#39;);\n    });\n  }\n});</code></pre>\n<p>Once the server is now shared between the parent and child, some connections\ncan be handled by the parent and some by the child.\n\n</p>\n<p>While the example above uses a server created using the <code>net</code> module, <code>dgram</code>\nmodule servers use exactly the same workflow with the exceptions of listening on\na <code>&#39;message&#39;</code> event instead of <code>&#39;connection&#39;</code> and using <code>server.bind</code> instead of\n<code>server.listen</code>. This is, however, currently only supported on UNIX platforms.\n\n</p>\n<h4>Example: sending a socket object</h4>\n<p>Similarly, the <code>sendHandler</code> argument can be used to pass the handle of a\nsocket to the child process. The example below spawns two children that each\nhandle connections with &quot;normal&quot; or &quot;special&quot; priority:\n\n</p>\n<pre><code class=\"js\">const normal = require(&#39;child_process&#39;).fork(&#39;child.js&#39;, [&#39;normal&#39;]);\nconst special = require(&#39;child_process&#39;).fork(&#39;child.js&#39;, [&#39;special&#39;]);\n\n// Open up the server and send sockets to child\nconst server = require(&#39;net&#39;).createServer();\nserver.on(&#39;connection&#39;, (socket) =&gt; {\n\n  // If this is special priority\n  if (socket.remoteAddress === &#39;74.125.127.100&#39;) {\n    special.send(&#39;socket&#39;, socket);\n    return;\n  }\n  // This is normal priority\n  normal.send(&#39;socket&#39;, socket);\n});\nserver.listen(1337);</code></pre>\n<p>The <code>child.js</code> would receive the socket handle as the second argument passed\nto the event callback function:\n\n</p>\n<pre><code class=\"js\">process.on(&#39;message&#39;, (m, socket) =&gt; {\n  if (m === &#39;socket&#39;) {\n    socket.end(`Request handled with ${process.argv[2]} priority`);\n  }\n});</code></pre>\n<p>Once a socket has been passed to a child, the parent is no longer capable of\ntracking when the socket is destroyed. To indicate this, the <code>.connections</code>\nproperty becomes <code>null</code>. It is recommended not to use <code>.maxConnections</code> when\nthis occurs.\n\n</p>\n<p><em>Note: this function uses [<code>JSON.stringify()</code>][] internally to serialize the <code>message</code>.</em>\n\n</p>\n"
            }
          ]
        }
      ],
      "type": "module",
      "displayName": "Child Process"
    }
  ]
}
