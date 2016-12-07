{
  "source": "https://nodejs.org/dist/latest-v5.x/docs/api/doc/api/process.md",
  "globals": [
    {
      "textRaw": "process",
      "name": "process",
      "type": "global",
      "desc": "<p>The <code>process</code> object is a global object and can be accessed from anywhere.\nIt is an instance of [<code>EventEmitter</code>][].\n\n</p>\n",
      "events": [
        {
          "textRaw": "Event: 'beforeExit'",
          "type": "event",
          "name": "beforeExit",
          "desc": "<p>This event is emitted when Node.js empties its event loop and has nothing else\nto schedule. Normally, Node.js exits when there is no work scheduled, but a\nlistener for <code>&#39;beforeExit&#39;</code> can make asynchronous calls, and cause Node.js to\ncontinue.\n\n</p>\n<p><code>&#39;beforeExit&#39;</code> is not emitted for conditions causing explicit termination, such\nas [<code>process.exit()</code>][] or uncaught exceptions, and should not be used as an\nalternative to the <code>&#39;exit&#39;</code> event unless the intention is to schedule more work.\n\n</p>\n",
          "params": []
        },
        {
          "textRaw": "Event: 'exit'",
          "type": "event",
          "name": "exit",
          "desc": "<p>Emitted when the process is about to exit. There is no way to prevent the\nexiting of the event loop at this point, and once all <code>&#39;exit&#39;</code> listeners have\nfinished running the process will exit. Therefore you <strong>must</strong> only perform\n<strong>synchronous</strong> operations in this handler. This is a good hook to perform\nchecks on the module&#39;s state (like for unit tests). The callback takes one\nargument, the code the process is exiting with.\n\n</p>\n<p>This event is only emitted when Node.js exits explicitly by process.exit() or\nimplicitly by the event loop draining.\n\n</p>\n<p>Example of listening for <code>&#39;exit&#39;</code>:\n\n</p>\n<pre><code class=\"js\">process.on(&#39;exit&#39;, (code) =&gt; {\n  // do *NOT* do this\n  setTimeout(() =&gt; {\n    console.log(&#39;This will not run&#39;);\n  }, 0);\n  console.log(&#39;About to exit with code:&#39;, code);\n});</code></pre>\n",
          "params": []
        },
        {
          "textRaw": "Event: 'message'",
          "type": "event",
          "name": "message",
          "params": [],
          "desc": "<p>Messages sent by [<code>ChildProcess.send()</code>][] are obtained using the <code>&#39;message&#39;</code>\nevent on the child&#39;s process object.\n\n</p>\n"
        },
        {
          "textRaw": "Event: 'rejectionHandled'",
          "type": "event",
          "name": "rejectionHandled",
          "desc": "<p>Emitted whenever a Promise was rejected and an error handler was attached to it\n(for example with <code>.catch()</code>) later than after an event loop turn. This event\nis emitted with the following arguments:\n\n</p>\n<ul>\n<li><code>p</code> the promise that was previously emitted in an <code>&#39;unhandledRejection&#39;</code>\nevent, but which has now gained a rejection handler.</li>\n</ul>\n<p>There is no notion of a top level for a promise chain at which rejections can\nalways be handled. Being inherently asynchronous in nature, a promise rejection\ncan be handled at a future point in time — possibly much later than the\nevent loop turn it takes for the <code>&#39;unhandledRejection&#39;</code> event to be emitted.\n\n</p>\n<p>Another way of stating this is that, unlike in synchronous code where there is\nan ever-growing list of unhandled exceptions, with promises there is a\ngrowing-and-shrinking list of unhandled rejections. In synchronous code, the\n<code>&#39;uncaughtException&#39;</code> event tells you when the list of unhandled exceptions\ngrows. And in asynchronous code, the <code>&#39;unhandledRejection&#39;</code> event tells you\nwhen the list of unhandled rejections grows, while the <code>&#39;rejectionHandled&#39;</code>\nevent tells you when the list of unhandled rejections shrinks.\n\n</p>\n<p>For example using the rejection detection hooks in order to keep a map of all\nthe rejected promise reasons at a given time:\n\n</p>\n<pre><code class=\"js\">const unhandledRejections = new Map();\nprocess.on(&#39;unhandledRejection&#39;, (reason, p) =&gt; {\n  unhandledRejections.set(p, reason);\n});\nprocess.on(&#39;rejectionHandled&#39;, (p) =&gt; {\n  unhandledRejections.delete(p);\n});</code></pre>\n<p>This map will grow and shrink over time, reflecting rejections that start\nunhandled and then become handled. You could record the errors in some error\nlog, either periodically (probably best for long-running programs, allowing\nyou to clear the map, which in the case of a very buggy program could grow\nindefinitely) or upon process exit (more convenient for scripts).\n\n</p>\n",
          "params": []
        },
        {
          "textRaw": "Event: 'uncaughtException'",
          "type": "event",
          "name": "uncaughtException",
          "desc": "<p>The <code>&#39;uncaughtException&#39;</code> event is emitted when an exception bubbles all the\nway back to the event loop. By default, Node.js handles such exceptions by\nprinting the stack trace to stderr and exiting. Adding a handler for the\n<code>&#39;uncaughtException&#39;</code> event overrides this default behavior.\n\n</p>\n<p>For example:\n\n</p>\n<pre><code class=\"js\">process.on(&#39;uncaughtException&#39;, (err) =&gt; {\n  console.log(`Caught exception: ${err}`);\n});\n\nsetTimeout(() =&gt; {\n  console.log(&#39;This will still run.&#39;);\n}, 500);\n\n// Intentionally cause an exception, but don&#39;t catch it.\nnonexistentFunc();\nconsole.log(&#39;This will not run.&#39;);</code></pre>\n",
          "modules": [
            {
              "textRaw": "Warning: Using `'uncaughtException'` correctly",
              "name": "warning:_using_`'uncaughtexception'`_correctly",
              "desc": "<p>Note that <code>&#39;uncaughtException&#39;</code> is a crude mechanism for exception handling\nintended to be used only as a last resort. The event <em>should not</em> be used as\nan equivalent to <code>On Error Resume Next</code>. Unhandled exceptions inherently mean\nthat an application is in an undefined state. Attempting to resume application\ncode without properly recovering from the exception can cause additional\nunforeseen and unpredictable issues.\n\n</p>\n<p>Exceptions thrown from within the event handler will not be caught. Instead the\nprocess will exit with a non zero exit code and the stack trace will be printed.\nThis is to avoid infinite recursion.\n\n</p>\n<p>Attempting to resume normally after an uncaught exception can be similar to\npulling out of the power cord when upgrading a computer -- nine out of ten\ntimes nothing happens - but the 10th time, the system becomes corrupted.\n\n</p>\n<p>The correct use of <code>&#39;uncaughtException&#39;</code> is to perform synchronous cleanup\nof allocated resources (e.g. file descriptors, handles, etc) before shutting\ndown the process. It is not safe to resume normal operation after\n<code>&#39;uncaughtException&#39;</code>.\n\n</p>\n",
              "type": "module",
              "displayName": "Warning: Using `'uncaughtException'` correctly"
            }
          ],
          "params": []
        },
        {
          "textRaw": "Event: 'unhandledRejection'",
          "type": "event",
          "name": "unhandledRejection",
          "desc": "<p>Emitted whenever a <code>Promise</code> is rejected and no error handler is attached to\nthe promise within a turn of the event loop. When programming with promises\nexceptions are encapsulated as rejected promises. Such promises can be caught\nand handled using [<code>promise.catch(...)</code>][] and rejections are propagated through\na promise chain. This event is useful for detecting and keeping track of\npromises that were rejected whose rejections were not handled yet. This event\nis emitted with the following arguments:\n\n</p>\n<ul>\n<li><code>reason</code> the object with which the promise was rejected (usually an\n[<code>Error</code>][] instance).</li>\n<li><code>p</code> the promise that was rejected.</li>\n</ul>\n<p>Here is an example that logs every unhandled rejection to the console\n\n</p>\n<pre><code class=\"js\">process.on(&#39;unhandledRejection&#39;, (reason, p) =&gt; {\n    console.log(&quot;Unhandled Rejection at: Promise &quot;, p, &quot; reason: &quot;, reason);\n    // application specific logging, throwing an error, or other logic here\n});</code></pre>\n<p>For example, here is a rejection that will trigger the <code>&#39;unhandledRejection&#39;</code>\nevent:\n\n</p>\n<pre><code class=\"js\">somePromise.then((res) =&gt; {\n  return reportToUser(JSON.pasre(res)); // note the typo (`pasre`)\n}); // no `.catch` or `.then`</code></pre>\n<p>Here is an example of a coding pattern that will also trigger\n<code>&#39;unhandledRejection&#39;</code>:\n\n</p>\n<pre><code class=\"js\">function SomeResource() {\n  // Initially set the loaded status to a rejected promise\n  this.loaded = Promise.reject(new Error(&#39;Resource not yet loaded!&#39;));\n}\n\nvar resource = new SomeResource();\n// no .catch or .then on resource.loaded for at least a turn</code></pre>\n<p>In cases like this, you may not want to track the rejection as a developer\nerror like you would for other <code>&#39;unhandledRejection&#39;</code> events. To address\nthis, you can either attach a dummy <code>.catch(() =&gt; { })</code> handler to\n<code>resource.loaded</code>, preventing the <code>&#39;unhandledRejection&#39;</code> event from being\nemitted, or you can use the [<code>&#39;rejectionHandled&#39;</code>][] event.\n\n</p>\n",
          "params": []
        },
        {
          "textRaw": "Signal Events",
          "name": "SIGINT, SIGHUP, etc.",
          "type": "event",
          "desc": "<p>Emitted when the processes receives a signal. See sigaction(2) for a list of\nstandard POSIX signal names such as <code>SIGINT</code>, <code>SIGHUP</code>, etc.\n\n</p>\n<p>Example of listening for <code>SIGINT</code>:\n\n</p>\n<pre><code class=\"js\">// Start reading from stdin so we don&#39;t exit.\nprocess.stdin.resume();\n\nprocess.on(&#39;SIGINT&#39;, () =&gt; {\n  console.log(&#39;Got SIGINT.  Press Control-D to exit.&#39;);\n});</code></pre>\n<p>An easy way to send the <code>SIGINT</code> signal is with <code>Control-C</code> in most terminal\nprograms.\n\n</p>\n<p>Note:\n\n</p>\n<ul>\n<li><code>SIGUSR1</code> is reserved by Node.js to start the debugger.  It&#39;s possible to\ninstall a listener but that won&#39;t stop the debugger from starting.</li>\n<li><code>SIGTERM</code> and <code>SIGINT</code> have default handlers on non-Windows platforms that\nresets the terminal mode before exiting with code <code>128 + signal number</code>. If\none of these signals has a listener installed, its default behavior will be\nremoved (Node.js will no longer exit).</li>\n<li><code>SIGPIPE</code> is ignored by default. It can have a listener installed.</li>\n<li><code>SIGHUP</code> is generated on Windows when the console window is closed, and on other\nplatforms under various similar conditions, see signal(7). It can have a\nlistener installed, however Node.js will be unconditionally terminated by\nWindows about 10 seconds later. On non-Windows platforms, the default\nbehavior of <code>SIGHUP</code> is to terminate Node.js, but once a listener has been\ninstalled its default behavior will be removed.</li>\n<li><code>SIGTERM</code> is not supported on Windows, it can be listened on.</li>\n<li><code>SIGINT</code> from the terminal is supported on all platforms, and can usually be\ngenerated with <code>CTRL+C</code> (though this may be configurable). It is not generated\nwhen terminal raw mode is enabled.</li>\n<li><code>SIGBREAK</code> is delivered on Windows when <code>CTRL+BREAK</code> is pressed, on\nnon-Windows\nplatforms it can be listened on, but there is no way to send or generate it.</li>\n<li><code>SIGWINCH</code> is delivered when the console has been resized. On Windows, this\nwill only happen on write to the console when the cursor is being moved, or\nwhen a readable tty is used in raw mode.</li>\n<li><code>SIGKILL</code> cannot have a listener installed, it will unconditionally terminate\nNode.js on all platforms.</li>\n<li><code>SIGSTOP</code> cannot have a listener installed.</li>\n</ul>\n<p>Note that Windows does not support sending Signals, but Node.js offers some\nemulation with <code>process.kill()</code>, and <code>child_process.kill()</code>. Sending signal <code>0</code>\ncan be used to test for the existence of a process. Sending <code>SIGINT</code>,\n<code>SIGTERM</code>, and <code>SIGKILL</code> cause the unconditional termination of the target\nprocess.\n\n</p>\n",
          "params": []
        }
      ],
      "modules": [
        {
          "textRaw": "Exit Codes",
          "name": "exit_codes",
          "desc": "<p>Node.js will normally exit with a <code>0</code> status code when no more async\noperations are pending.  The following status codes are used in other\ncases:\n\n</p>\n<ul>\n<li><code>1</code> <strong>Uncaught Fatal Exception</strong> - There was an uncaught exception,\nand it was not handled by a domain or an <code>&#39;uncaughtException&#39;</code> event\nhandler.</li>\n<li><code>2</code> - Unused (reserved by Bash for builtin misuse)</li>\n<li><code>3</code> <strong>Internal JavaScript Parse Error</strong> - The JavaScript source code\ninternal in Node.js&#39;s bootstrapping process caused a parse error.  This\nis extremely rare, and generally can only happen during development\nof Node.js itself.</li>\n<li><code>4</code> <strong>Internal JavaScript Evaluation Failure</strong> - The JavaScript\nsource code internal in Node.js&#39;s bootstrapping process failed to\nreturn a function value when evaluated.  This is extremely rare, and\ngenerally can only happen during development of Node.js itself.</li>\n<li><code>5</code> <strong>Fatal Error</strong> - There was a fatal unrecoverable error in V8.\nTypically a message will be printed to stderr with the prefix <code>FATAL\nERROR</code>.</li>\n<li><code>6</code> <strong>Non-function Internal Exception Handler</strong> - There was an\nuncaught exception, but the internal fatal exception handler\nfunction was somehow set to a non-function, and could not be called.</li>\n<li><code>7</code> <strong>Internal Exception Handler Run-Time Failure</strong> - There was an\nuncaught exception, and the internal fatal exception handler\nfunction itself threw an error while attempting to handle it.  This\ncan happen, for example, if a <code>process.on(&#39;uncaughtException&#39;)</code> or\n<code>domain.on(&#39;error&#39;)</code> handler throws an error.</li>\n<li><code>8</code> - Unused.  In previous versions of Node.js, exit code 8 sometimes\nindicated an uncaught exception.</li>\n<li><code>9</code> - <strong>Invalid Argument</strong> - Either an unknown option was specified,\nor an option requiring a value was provided without a value.</li>\n<li><code>10</code> <strong>Internal JavaScript Run-Time Failure</strong> - The JavaScript\nsource code internal in Node.js&#39;s bootstrapping process threw an error\nwhen the bootstrapping function was called.  This is extremely rare,\nand generally can only happen during development of Node.js itself.</li>\n<li><code>12</code> <strong>Invalid Debug Argument</strong> - The <code>--debug</code> and/or <code>--debug-brk</code>\noptions were set, but an invalid port number was chosen.</li>\n<li><code>&gt;128</code> <strong>Signal Exits</strong> - If Node.js receives a fatal signal such as\n<code>SIGKILL</code> or <code>SIGHUP</code>, then its exit code will be <code>128</code> plus the\nvalue of the signal code.  This is a standard Unix practice, since\nexit codes are defined to be 7-bit integers, and signal exits set\nthe high-order bit, and then contain the value of the signal code.</li>\n</ul>\n",
          "type": "module",
          "displayName": "Exit Codes"
        }
      ],
      "methods": [
        {
          "textRaw": "process.abort()",
          "type": "method",
          "name": "abort",
          "desc": "<p>This causes Node.js to emit an abort. This will cause Node.js to exit and\ngenerate a core file.\n\n</p>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.chdir(directory)",
          "type": "method",
          "name": "chdir",
          "desc": "<p>Changes the current working directory of the process or throws an exception if that fails.\n\n</p>\n<pre><code class=\"js\">console.log(`Starting directory: ${process.cwd()}`);\ntry {\n  process.chdir(&#39;/tmp&#39;);\n  console.log(`New directory: ${process.cwd()}`);\n}\ncatch (err) {\n  console.log(`chdir: ${err}`);\n}</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "directory"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.cwd()",
          "type": "method",
          "name": "cwd",
          "desc": "<p>Returns the current working directory of the process.\n\n</p>\n<pre><code class=\"js\">console.log(`Current directory: ${process.cwd()}`);</code></pre>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.disconnect()",
          "type": "method",
          "name": "disconnect",
          "desc": "<p>Close the IPC channel to the parent process, allowing this child to exit\ngracefully once there are no other connections keeping it alive.\n\n</p>\n<p>Identical to the parent process&#39;s [<code>ChildProcess.disconnect()</code>][].\n\n</p>\n<p>If Node.js was not spawned with an IPC channel, <code>process.disconnect()</code> will be\nundefined.\n\n</p>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.exit([code])",
          "type": "method",
          "name": "exit",
          "desc": "<p>Ends the process with the specified <code>code</code>.  If omitted, exit uses the\n&#39;success&#39; code <code>0</code>.\n\n</p>\n<p>To exit with a &#39;failure&#39; code:\n\n</p>\n<pre><code class=\"js\">process.exit(1);</code></pre>\n<p>The shell that executed Node.js should see the exit code as 1.\n\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "code",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.getegid()",
          "type": "method",
          "name": "getegid",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Gets the effective group identity of the process. (See getegid(2).)\nThis is the numerical group id, not the group name.\n\n</p>\n<pre><code class=\"js\">if (process.getegid) {\n  console.log(`Current gid: ${process.getegid()}`);\n}</code></pre>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.geteuid()",
          "type": "method",
          "name": "geteuid",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Gets the effective user identity of the process. (See geteuid(2).)\nThis is the numerical userid, not the username.\n\n</p>\n<pre><code class=\"js\">if (process.geteuid) {\n  console.log(`Current uid: ${process.geteuid()}`);\n}</code></pre>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.getgid()",
          "type": "method",
          "name": "getgid",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Gets the group identity of the process. (See getgid(2).)\nThis is the numerical group id, not the group name.\n\n</p>\n<pre><code class=\"js\">if (process.getgid) {\n  console.log(`Current gid: ${process.getgid()}`);\n}</code></pre>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.getgroups()",
          "type": "method",
          "name": "getgroups",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Returns an array with the supplementary group IDs. POSIX leaves it unspecified\nif the effective group ID is included but Node.js ensures it always is.\n\n</p>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.getuid()",
          "type": "method",
          "name": "getuid",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Gets the user identity of the process. (See getuid(2).)\nThis is the numerical userid, not the username.\n\n</p>\n<pre><code class=\"js\">if (process.getuid) {\n  console.log(`Current uid: ${process.getuid()}`);\n}</code></pre>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.hrtime()",
          "type": "method",
          "name": "hrtime",
          "desc": "<p>Returns the current high-resolution real time in a <code>[seconds, nanoseconds]</code>\ntuple Array. It is relative to an arbitrary time in the past. It is not\nrelated to the time of day and therefore not subject to clock drift. The\nprimary use is for measuring performance between intervals.\n\n</p>\n<p>You may pass in the result of a previous call to <code>process.hrtime()</code> to get\na diff reading, useful for benchmarks and measuring intervals:\n\n</p>\n<pre><code class=\"js\">var time = process.hrtime();\n// [ 1800216, 25 ]\n\nsetTimeout(() =&gt; {\n  var diff = process.hrtime(time);\n  // [ 1, 552 ]\n\n  console.log(&#39;benchmark took %d nanoseconds&#39;, diff[0] * 1e9 + diff[1]);\n  // benchmark took 1000000527 nanoseconds\n}, 1000);</code></pre>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.initgroups(user, extra_group)",
          "type": "method",
          "name": "initgroups",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Reads /etc/group and initializes the group access list, using all groups of\nwhich the user is a member. This is a privileged operation, meaning you need\nto be root or have the <code>CAP_SETGID</code> capability.\n\n</p>\n<p><code>user</code> is a user name or user ID. <code>extra_group</code> is a group name or group ID.\n\n</p>\n<p>Some care needs to be taken when dropping privileges. Example:\n\n</p>\n<pre><code class=\"js\">console.log(process.getgroups());         // [ 0 ]\nprocess.initgroups(&#39;bnoordhuis&#39;, 1000);   // switch user\nconsole.log(process.getgroups());         // [ 27, 30, 46, 1000, 0 ]\nprocess.setgid(1000);                     // drop root gid\nconsole.log(process.getgroups());         // [ 27, 30, 46, 1000 ]</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "user"
                },
                {
                  "name": "extra_group"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.kill(pid[, signal])",
          "type": "method",
          "name": "kill",
          "desc": "<p>Send a signal to a process. <code>pid</code> is the process id and <code>signal</code> is the\nstring describing the signal to send.  Signal names are strings like\n<code>SIGINT</code> or <code>SIGHUP</code>.  If omitted, the signal will be <code>SIGTERM</code>.\nSee [Signal Events][] and kill(2) for more information.\n\n</p>\n<p>Will throw an error if target does not exist, and as a special case, a signal\nof <code>0</code> can be used to test for the existence of a process. Windows platforms\nwill throw an error if the <code>pid</code> is used to kill a process group.\n\n</p>\n<p>Note that even though the name of this function is <code>process.kill</code>, it is really\njust a signal sender, like the <code>kill</code> system call.  The signal sent may do\nsomething other than kill the target process.\n\n</p>\n<p>Example of sending a signal to yourself:\n\n</p>\n<pre><code class=\"js\">process.on(&#39;SIGHUP&#39;, () =&gt; {\n  console.log(&#39;Got SIGHUP signal.&#39;);\n});\n\nsetTimeout(() =&gt; {\n  console.log(&#39;Exiting.&#39;);\n  process.exit(0);\n}, 100);\n\nprocess.kill(process.pid, &#39;SIGHUP&#39;);</code></pre>\n<p>Note: When SIGUSR1 is received by Node.js it starts the debugger, see\n[Signal Events][].\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "pid"
                },
                {
                  "name": "signal",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.memoryUsage()",
          "type": "method",
          "name": "memoryUsage",
          "desc": "<p>Returns an object describing the memory usage of the Node.js process\nmeasured in bytes.\n\n</p>\n<pre><code class=\"js\">const util = require(&#39;util&#39;);\n\nconsole.log(util.inspect(process.memoryUsage()));</code></pre>\n<p>This will generate:\n\n</p>\n<pre><code class=\"js\">{ rss: 4935680,\n  heapTotal: 1826816,\n  heapUsed: 650472 }</code></pre>\n<p><code>heapTotal</code> and <code>heapUsed</code> refer to V8&#39;s memory usage.\n\n\n</p>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        },
        {
          "textRaw": "process.nextTick(callback[, arg][, ...])",
          "type": "method",
          "name": "nextTick",
          "signatures": [
            {
              "params": [
                {
                  "textRaw": "`callback` {Function} ",
                  "name": "callback",
                  "type": "Function"
                },
                {
                  "name": "arg",
                  "optional": true
                },
                {
                  "name": "...",
                  "optional": true
                }
              ]
            },
            {
              "params": [
                {
                  "name": "callback"
                },
                {
                  "name": "arg",
                  "optional": true
                },
                {
                  "name": "...",
                  "optional": true
                }
              ]
            }
          ],
          "desc": "<p>Once the current event loop turn runs to completion, call the callback\nfunction.\n\n</p>\n<p>This is <em>not</em> a simple alias to [<code>setTimeout(fn, 0)</code>][], it&#39;s much more\nefficient.  It runs before any additional I/O events (including\ntimers) fire in subsequent ticks of the event loop.\n\n</p>\n<pre><code class=\"js\">console.log(&#39;start&#39;);\nprocess.nextTick(() =&gt; {\n  console.log(&#39;nextTick callback&#39;);\n});\nconsole.log(&#39;scheduled&#39;);\n// Output:\n// start\n// scheduled\n// nextTick callback</code></pre>\n<p>This is important in developing APIs where you want to give the user the\nchance to assign event handlers after an object has been constructed,\nbut before any I/O has occurred.\n\n</p>\n<pre><code class=\"js\">function MyThing(options) {\n  this.setupOptions(options);\n\n  process.nextTick(() =&gt; {\n    this.startDoingStuff();\n  });\n}\n\nvar thing = new MyThing();\nthing.getReadyForStuff();\n\n// thing.startDoingStuff() gets called now, not before.</code></pre>\n<p>It is very important for APIs to be either 100% synchronous or 100%\nasynchronous.  Consider this example:\n\n</p>\n<pre><code class=\"js\">// WARNING!  DO NOT USE!  BAD UNSAFE HAZARD!\nfunction maybeSync(arg, cb) {\n  if (arg) {\n    cb();\n    return;\n  }\n\n  fs.stat(&#39;file&#39;, cb);\n}</code></pre>\n<p>This API is hazardous.  If you do this:\n\n</p>\n<pre><code class=\"js\">maybeSync(true, () =&gt; {\n  foo();\n});\nbar();</code></pre>\n<p>then it&#39;s not clear whether <code>foo()</code> or <code>bar()</code> will be called first.\n\n</p>\n<p>This approach is much better:\n\n</p>\n<pre><code class=\"js\">function definitelyAsync(arg, cb) {\n  if (arg) {\n    process.nextTick(cb);\n    return;\n  }\n\n  fs.stat(&#39;file&#39;, cb);\n}</code></pre>\n<p>Note: the nextTick queue is completely drained on each pass of the\nevent loop <strong>before</strong> additional I/O is processed.  As a result,\nrecursively setting nextTick callbacks will block any I/O from\nhappening, just like a <code>while(true);</code> loop.\n\n</p>\n"
        },
        {
          "textRaw": "process.send(message[, sendHandle[, options]][, callback])",
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
                  "textRaw": "`sendHandle` {Handle object} ",
                  "name": "sendHandle",
                  "type": "Handle object",
                  "optional": true
                },
                {
                  "textRaw": "`options` {Object} ",
                  "name": "options",
                  "type": "Object",
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
          "desc": "<p>When Node.js is spawned with an IPC channel attached, it can send messages to its\nparent process using <code>process.send()</code>. Each will be received as a\n[<code>&#39;message&#39;</code>][] event on the parent&#39;s <code>ChildProcess</code> object.\n\n</p>\n<p><em>Note: this function uses [<code>JSON.stringify()</code>][] internally to serialize the <code>message</code>.</em>\n\n</p>\n<p>If Node.js was not spawned with an IPC channel, <code>process.send()</code> will be undefined.\n\n</p>\n"
        },
        {
          "textRaw": "process.setegid(id)",
          "type": "method",
          "name": "setegid",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Sets the effective group identity of the process. (See setegid(2).)\nThis accepts either a numerical ID or a groupname string. If a groupname\nis specified, this method blocks while resolving it to a numerical ID.\n\n</p>\n<pre><code class=\"js\">if (process.getegid &amp;&amp; process.setegid) {\n  console.log(`Current gid: ${process.getegid()}`);\n  try {\n    process.setegid(501);\n    console.log(`New gid: ${process.getegid()}`);\n  }\n  catch (err) {\n    console.log(`Failed to set gid: ${err}`);\n  }\n}</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "id"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.seteuid(id)",
          "type": "method",
          "name": "seteuid",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Sets the effective user identity of the process. (See seteuid(2).)\nThis accepts either a numerical ID or a username string.  If a username\nis specified, this method blocks while resolving it to a numerical ID.\n\n</p>\n<pre><code class=\"js\">if (process.geteuid &amp;&amp; process.seteuid) {\n  console.log(`Current uid: ${process.geteuid()}`);\n  try {\n    process.seteuid(501);\n    console.log(`New uid: ${process.geteuid()}`);\n  }\n  catch (err) {\n    console.log(`Failed to set uid: ${err}`);\n  }\n}</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "id"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.setgid(id)",
          "type": "method",
          "name": "setgid",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Sets the group identity of the process. (See setgid(2).)  This accepts either\na numerical ID or a groupname string. If a groupname is specified, this method\nblocks while resolving it to a numerical ID.\n\n</p>\n<pre><code class=\"js\">if (process.getgid &amp;&amp; process.setgid) {\n  console.log(`Current gid: ${process.getgid()}`);\n  try {\n    process.setgid(501);\n    console.log(`New gid: ${process.getgid()}`);\n  }\n  catch (err) {\n    console.log(`Failed to set gid: ${err}`);\n  }\n}</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "id"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.setgroups(groups)",
          "type": "method",
          "name": "setgroups",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Sets the supplementary group IDs. This is a privileged operation, meaning you\nneed to be root or have the <code>CAP_SETGID</code> capability.\n\n</p>\n<p>The list can contain group IDs, group names or both.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "groups"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.setuid(id)",
          "type": "method",
          "name": "setuid",
          "desc": "<p>Note: this function is only available on POSIX platforms (i.e. not Windows,\nAndroid)\n\n</p>\n<p>Sets the user identity of the process. (See setuid(2).)  This accepts either\na numerical ID or a username string.  If a username is specified, this method\nblocks while resolving it to a numerical ID.\n\n</p>\n<pre><code class=\"js\">if (process.getuid &amp;&amp; process.setuid) {\n  console.log(`Current uid: ${process.getuid()}`);\n  try {\n    process.setuid(501);\n    console.log(`New uid: ${process.getuid()}`);\n  }\n  catch (err) {\n    console.log(`Failed to set uid: ${err}`);\n  }\n}</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "id"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.umask([mask])",
          "type": "method",
          "name": "umask",
          "desc": "<p>Sets or reads the process&#39;s file mode creation mask. Child processes inherit\nthe mask from the parent process. Returns the old mask if <code>mask</code> argument is\ngiven, otherwise returns the current mask.\n\n</p>\n<pre><code class=\"js\">const newmask = 0o022;\nconst oldmask = process.umask(newmask);\nconsole.log(\n  `Changed umask from ${oldmask.toString(8)} to ${newmask.toString(8)}`\n);</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "mask",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "process.uptime()",
          "type": "method",
          "name": "uptime",
          "desc": "<p>Number of seconds Node.js has been running.\n\n</p>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        }
      ],
      "properties": [
        {
          "textRaw": "https://nodejs.org/dist/latest-v5.x/docs/api/process.arch",
          "name": "arch",
          "desc": "<p>What processor architecture you&#39;re running on: <code>&#39;arm&#39;</code>, <code>&#39;ia32&#39;</code>, or <code>&#39;x64&#39;</code>.\n\n</p>\n<pre><code class=\"js\">console.log(&#39;This processor architecture is &#39; + process.arch);</code></pre>\n"
        },
        {
          "textRaw": "https://nodejs.org/dist/latest-v5.x/docs/api/process.argv",
          "name": "argv",
          "desc": "<p>An array containing the command line arguments.  The first element will be\n&#39;node&#39;, the second element will be the name of the JavaScript file.  The\nnext elements will be any additional command line arguments.\n\n</p>\n<pre><code class=\"js\">// print process.argv\nprocess.argv.forEach((val, index, array) =&gt; {\n  console.log(`${index}: ${val}`);\n});</code></pre>\n<p>This will generate:\n\n</p>\n<pre><code>$ node process-2.js one two=three four\n0: node\n1: /Users/mjr/work/node/process-2.js\n2: one\n3: two=three\n4: four</code></pre>\n"
        },
        {
          "textRaw": "process.config",
          "name": "config",
          "desc": "<p>An Object containing the JavaScript representation of the configure options\nthat were used to compile the current Node.js executable. This is the same as\nthe <code>config.gypi</code> file that was produced when running the <code>./configure</code> script.\n\n</p>\n<p>An example of the possible output looks like:\n\n</p>\n<pre><code>{\n  target_defaults:\n   { cflags: [],\n     default_configuration: &#39;Release&#39;,\n     defines: [],\n     include_dirs: [],\n     libraries: [] },\n  variables:\n   {\n     host_arch: &#39;x64&#39;,\n     node_install_npm: &#39;true&#39;,\n     node_prefix: &#39;&#39;,\n     node_shared_cares: &#39;false&#39;,\n     node_shared_http_parser: &#39;false&#39;,\n     node_shared_libuv: &#39;false&#39;,\n     node_shared_zlib: &#39;false&#39;,\n     node_use_dtrace: &#39;false&#39;,\n     node_use_openssl: &#39;true&#39;,\n     node_shared_openssl: &#39;false&#39;,\n     strict_aliasing: &#39;true&#39;,\n     target_arch: &#39;x64&#39;,\n     v8_use_snapshot: &#39;true&#39;\n   }\n}</code></pre>\n"
        },
        {
          "textRaw": "`connected` {Boolean} Set to false after `process.disconnect()` is called ",
          "type": "Boolean",
          "name": "connected",
          "desc": "<p>If <code>process.connected</code> is false, it is no longer possible to send messages.\n\n</p>\n",
          "shortDesc": "Set to false after `process.disconnect()` is called"
        },
        {
          "textRaw": "https://nodejs.org/dist/latest-v5.x/docs/api/process.env",
          "name": "env",
          "desc": "<p>An object containing the user environment. See environ(7).\n\n</p>\n<p>An example of this object looks like:\n\n</p>\n<pre><code class=\"js\">{ TERM: &#39;xterm-256color&#39;,\n  SHELL: &#39;/usr/local/bin/bash&#39;,\n  USER: &#39;maciej&#39;,\n  PATH: &#39;~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin&#39;,\n  PWD: &#39;/Users/maciej&#39;,\n  EDITOR: &#39;vim&#39;,\n  SHLVL: &#39;1&#39;,\n  HOME: &#39;/Users/maciej&#39;,\n  LOGNAME: &#39;maciej&#39;,\n  _: &#39;/usr/local/bin/node&#39; }</code></pre>\n<p>You can write to this object, but changes won&#39;t be reflected outside of your\nprocess. That means that the following won&#39;t work:\n\n</p>\n<pre><code>$ node -e &#39;process.env.foo = &quot;bar&quot;&#39; &amp;&amp; echo $foo</code></pre>\n<p>But this will:\n\n</p>\n<pre><code class=\"js\">process.env.foo = &#39;bar&#39;;\nconsole.log(process.env.foo);</code></pre>\n<p>Assigning a property on <code>process.env</code> will implicitly convert the value\nto a string.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">process.env.test = null;\nconsole.log(process.env.test);\n// =&gt; &#39;null&#39;\nprocess.env.test = undefined;\nconsole.log(process.env.test);\n// =&gt; &#39;undefined&#39;</code></pre>\n<p>Use <code>delete</code> to delete a property from <code>process.env</code>.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">process.env.TEST = 1;\ndelete process.env.TEST;\nconsole.log(process.env.TEST);\n// =&gt; undefined</code></pre>\n"
        },
        {
          "textRaw": "process.execArgv",
          "name": "execArgv",
          "desc": "<p>This is the set of Node.js-specific command line options from the\nexecutable that started the process.  These options do not show up in\n<code>process.argv</code>, and do not include the Node.js executable, the name of\nthe script, or any options following the script name. These options\nare useful in order to spawn child processes with the same execution\nenvironment as the parent.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code>$ node --harmony script.js --version</code></pre>\n<p>results in process.execArgv:\n\n</p>\n<pre><code class=\"js\">[&#39;--harmony&#39;]</code></pre>\n<p>and process.argv:\n\n</p>\n<pre><code class=\"js\">[&#39;/usr/local/bin/node&#39;, &#39;script.js&#39;, &#39;--version&#39;]</code></pre>\n"
        },
        {
          "textRaw": "process.execPath",
          "name": "execPath",
          "desc": "<p>This is the absolute pathname of the executable that started the process.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code>/usr/local/bin/node</code></pre>\n"
        },
        {
          "textRaw": "process.exitCode",
          "name": "exitCode",
          "desc": "<p>A number which will be the process exit code, when the process either\nexits gracefully, or is exited via [<code>process.exit()</code>][] without specifying\na code.\n\n</p>\n<p>Specifying a code to <code>process.exit(code)</code> will override any previous\nsetting of <code>process.exitCode</code>.\n\n\n</p>\n"
        },
        {
          "textRaw": "process.mainModule",
          "name": "mainModule",
          "desc": "<p>Alternate way to retrieve [<code>require.main</code>][]. The difference is that if the main\nmodule changes at runtime, <code>require.main</code> might still refer to the original main\nmodule in modules that were required before the change occurred. Generally it&#39;s\nsafe to assume that the two refer to the same module.\n\n</p>\n<p>As with <code>require.main</code>, it will be <code>undefined</code> if there was no entry script.\n\n</p>\n"
        },
        {
          "textRaw": "https://nodejs.org/dist/latest-v5.x/docs/api/process.pid",
          "name": "pid",
          "desc": "<p>The PID of the process.\n\n</p>\n<pre><code class=\"js\">console.log(`This process is pid ${process.pid}`);</code></pre>\n"
        },
        {
          "textRaw": "process.platform",
          "name": "platform",
          "desc": "<p>What platform you&#39;re running on:\n<code>&#39;darwin&#39;</code>, <code>&#39;freebsd&#39;</code>, <code>&#39;linux&#39;</code>, <code>&#39;sunos&#39;</code> or <code>&#39;win32&#39;</code>\n\n</p>\n<pre><code class=\"js\">console.log(`This platform is ${process.platform}`);</code></pre>\n"
        },
        {
          "textRaw": "process.release",
          "name": "release",
          "desc": "<p>An Object containing metadata related to the current release, including URLs\nfor the source tarball and headers-only tarball.\n\n</p>\n<p><code>process.release</code> contains the following properties:\n\n</p>\n<ul>\n<li><code>name</code>: a string with a value that will always be <code>&#39;node&#39;</code> for Node.js. For\nlegacy io.js releases, this will be <code>&#39;io.js&#39;</code>.</li>\n<li><code>sourceUrl</code>: a complete URL pointing to a <em>.tar.gz</em> file containing the\nsource of the current release.</li>\n<li><code>headersUrl</code>: a complete URL pointing to a <em>.tar.gz</em> file containing only\nthe header files for the current release. This file is significantly smaller\nthan the full source file and can be used for compiling add-ons against\nNode.js.</li>\n<li><code>libUrl</code>: a complete URL pointing to an <em>node.lib</em> file matching the\narchitecture and version of the current release. This file is used for\ncompiling add-ons against Node.js. <em>This property is only present on Windows\nbuilds of Node.js and will be missing on all other platforms.</em></li>\n</ul>\n<p>e.g.\n\n</p>\n<pre><code class=\"js\">{ name: &#39;node&#39;,\n  sourceUrl: &#39;https://nodejs.org/download/release/v4.0.0/node-v4.0.0.tar.gz&#39;,\n  headersUrl: &#39;https://nodejs.org/download/release/v4.0.0/node-v4.0.0-headers.tar.gz&#39;,\n  libUrl: &#39;https://nodejs.org/download/release/v4.0.0/win-x64/node.lib&#39; }</code></pre>\n<p>In custom builds from non-release versions of the source tree, only the\n<code>name</code> property may be present. The additional properties should not be\nrelied upon to exist.\n\n</p>\n"
        },
        {
          "textRaw": "process.stderr",
          "name": "stderr",
          "desc": "<p>A writable stream to stderr (on fd <code>2</code>).\n\n</p>\n<p><code>process.stderr</code> and <code>process.stdout</code> are unlike other streams in Node.js in\nthat they cannot be closed (<code>end()</code> will throw), they never emit the <code>finish</code>\nevent and that writes can block when output is redirected to a file (although\ndisks are fast and operating systems normally employ write-back caching so it\nshould be a very rare occurrence indeed.)\n\n</p>\n"
        },
        {
          "textRaw": "process.stdin",
          "name": "stdin",
          "desc": "<p>A <code>Readable Stream</code> for stdin (on fd <code>0</code>).\n\n</p>\n<p>Example of opening standard input and listening for both events:\n\n</p>\n<pre><code class=\"js\">process.stdin.setEncoding(&#39;utf8&#39;);\n\nprocess.stdin.on(&#39;readable&#39;, () =&gt; {\n  var chunk = process.stdin.read();\n  if (chunk !== null) {\n    process.stdout.write(`data: ${chunk}`);\n  }\n});\n\nprocess.stdin.on(&#39;end&#39;, () =&gt; {\n  process.stdout.write(&#39;end&#39;);\n});</code></pre>\n<p>As a Stream, <code>process.stdin</code> can also be used in &quot;old&quot; mode that is compatible\nwith scripts written for node.js prior to v0.10.\nFor more information see [Stream compatibility][].\n\n</p>\n<p>In &quot;old&quot; Streams mode the stdin stream is paused by default, so one\nmust call <code>process.stdin.resume()</code> to read from it. Note also that calling\n<code>process.stdin.resume()</code> itself would switch stream to &quot;old&quot; mode.\n\n</p>\n<p>If you are starting a new project you should prefer a more recent &quot;new&quot; Streams\nmode over &quot;old&quot; one.\n\n</p>\n"
        },
        {
          "textRaw": "process.stdout",
          "name": "stdout",
          "desc": "<p>A <code>Writable Stream</code> to <code>stdout</code> (on fd <code>1</code>).\n\n</p>\n<p>For example, a <code>console.log</code> equivalent could look like this:\n\n</p>\n<pre><code class=\"js\">console.log = (msg) =&gt; {\n  process.stdout.write(`${msg}\\n`);\n};</code></pre>\n<p><code>process.stderr</code> and <code>process.stdout</code> are unlike other streams in Node.js in\nthat they cannot be closed (<code>end()</code> will throw), they never emit the <code>&#39;finish&#39;</code>\nevent and that writes can block when output is redirected to a file (although\ndisks are fast and operating systems normally employ write-back caching so it\nshould be a very rare occurrence indeed.)\n\n</p>\n<p>To check if Node.js is being run in a TTY context, read the <code>isTTY</code> property\non <code>process.stderr</code>, <code>process.stdout</code>, or <code>process.stdin</code>:\n\n</p>\n<pre><code>$ node -p &quot;Boolean(process.stdin.isTTY)&quot;\ntrue\n$ echo &quot;foo&quot; | node -p &quot;Boolean(process.stdin.isTTY)&quot;\nfalse\n\n$ node -p &quot;Boolean(process.stdout.isTTY)&quot;\ntrue\n$ node -p &quot;Boolean(process.stdout.isTTY)&quot; | cat\nfalse</code></pre>\n<p>See [the tty docs][] for more information.\n\n</p>\n"
        },
        {
          "textRaw": "process.title",
          "name": "title",
          "desc": "<p>Getter/setter to set what is displayed in <code>ps</code>.\n\n</p>\n<p>When used as a setter, the maximum length is platform-specific and probably\nshort.\n\n</p>\n<p>On Linux and OS X, it&#39;s limited to the size of the binary name plus the\nlength of the command line arguments because it overwrites the argv memory.\n\n</p>\n<p>v0.8 allowed for longer process title strings by also overwriting the environ\nmemory but that was potentially insecure/confusing in some (rather obscure)\ncases.\n\n</p>\n"
        },
        {
          "textRaw": "process.version",
          "name": "version",
          "desc": "<p>A compiled-in property that exposes <code>NODE_VERSION</code>.\n\n</p>\n<pre><code class=\"js\">console.log(`Version: ${process.version}`);</code></pre>\n"
        },
        {
          "textRaw": "process.versions",
          "name": "versions",
          "desc": "<p>A property exposing version strings of Node.js and its dependencies.\n\n</p>\n<pre><code class=\"js\">console.log(process.versions);</code></pre>\n<p>Will print something like:\n\n</p>\n<pre><code class=\"js\">{ http_parser: &#39;2.3.0&#39;,\n  node: &#39;1.1.1&#39;,\n  v8: &#39;4.1.0.14&#39;,\n  uv: &#39;1.3.0&#39;,\n  zlib: &#39;1.2.8&#39;,\n  ares: &#39;1.10.0-DEV&#39;,\n  modules: &#39;43&#39;,\n  icu: &#39;55.1&#39;,\n  openssl: &#39;1.0.1k&#39; }</code></pre>\n"
        }
      ]
    }
  ]
}
