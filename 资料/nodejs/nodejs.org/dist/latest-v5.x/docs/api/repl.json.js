{
  "source": "https://nodejs.org/dist/latest-v5.x/docs/api/doc/api/repl.md",
  "modules": [
    {
      "textRaw": "REPL",
      "name": "repl",
      "stability": 2,
      "stabilityText": "Stable",
      "desc": "<p>A Read-Eval-Print-Loop (REPL) is available both as a standalone program and\neasily includable in other programs. The REPL provides a way to interactively\nrun JavaScript and see the results.  It can be used for debugging, testing, or\njust trying things out.\n\n</p>\n<p>By executing <code>node</code> without any arguments from the command-line you will be\ndropped into the REPL. It has simplistic emacs line-editing.\n\n</p>\n<pre><code>$ node\nType &#39;.help&#39; for options.\n&gt; a = [ 1, 2, 3];\n[ 1, 2, 3 ]\n&gt; a.forEach((v) =&gt; {\n...   console.log(v);\n...   });\n1\n2\n3</code></pre>\n<p>For advanced line-editors, start Node.js with the environmental variable\n<code>NODE_NO_READLINE=1</code>. This will start the main and debugger REPL in canonical\nterminal settings which will allow you to use with <code>rlwrap</code>.\n\n</p>\n<p>For example, you could add this to your bashrc file:\n\n</p>\n<pre><code>alias node=&quot;env NODE_NO_READLINE=1 rlwrap node&quot;</code></pre>\n",
      "modules": [
        {
          "textRaw": "Environment Variable Options",
          "name": "environment_variable_options",
          "desc": "<p>The built-in repl (invoked by running <code>node</code> or <code>node -i</code>) may be controlled\nvia the following environment variables:\n\n</p>\n<ul>\n<li><code>NODE_REPL_HISTORY</code> - When a valid path is given, persistent REPL history\nwill be saved to the specified file rather than <code>.node_repl_history</code> in the\nuser&#39;s home directory. Setting this value to <code>&quot;&quot;</code> will disable persistent\nREPL history. Whitespace will be trimmed from the value.</li>\n<li><code>NODE_REPL_HISTORY_SIZE</code> - Defaults to <code>1000</code>. Controls how many lines of\nhistory will be persisted if history is available. Must be a positive number.</li>\n<li><code>NODE_REPL_MODE</code> - May be any of <code>sloppy</code>, <code>strict</code>, or <code>magic</code>. Defaults\nto <code>magic</code>, which will automatically run &quot;strict mode only&quot; statements in\nstrict mode.</li>\n</ul>\n",
          "type": "module",
          "displayName": "Environment Variable Options"
        },
        {
          "textRaw": "Persistent History",
          "name": "persistent_history",
          "desc": "<p>By default, the REPL will persist history between <code>node</code> REPL sessions by saving\nto a <code>.node_repl_history</code> file in the user&#39;s home directory. This can be\ndisabled by setting the environment variable <code>NODE_REPL_HISTORY=&quot;&quot;</code>.\n\n</p>\n",
          "modules": [
            {
              "textRaw": "NODE_REPL_HISTORY_FILE",
              "name": "node_repl_history_file",
              "stability": 0,
              "stabilityText": "Deprecated: Use `NODE_REPL_HISTORY` instead.",
              "desc": "<p>Previously in Node.js/io.js v2.x, REPL history was controlled by using a\n<code>NODE_REPL_HISTORY_FILE</code> environment variable, and the history was saved in JSON\nformat. This variable has now been deprecated, and your REPL history will\nautomatically be converted to using plain text. The new file will be saved to\neither your home directory, or a directory defined by the <code>NODE_REPL_HISTORY</code>\nvariable, as documented <a href=\"#repl_environment_variable_options\">here</a>.\n\n</p>\n",
              "type": "module",
              "displayName": "NODE_REPL_HISTORY_FILE"
            }
          ],
          "type": "module",
          "displayName": "Persistent History"
        }
      ],
      "miscs": [
        {
          "textRaw": "REPL Features",
          "name": "REPL Features",
          "type": "misc",
          "desc": "<p>Inside the REPL, Control+D will exit.  Multi-line expressions can be input.\nTab completion is supported for both global and local variables.\n\n</p>\n<p>Core modules will be loaded on-demand into the environment. For example,\naccessing <code>fs</code> will <code>require()</code> the <code>fs</code> module as <code>global.fs</code>.\n\n</p>\n<p>The special variable <code>_</code> (underscore) contains the result of the last expression.\n\n</p>\n<pre><code>&gt; [ &#39;a&#39;, &#39;b&#39;, &#39;c&#39; ]\n[ &#39;a&#39;, &#39;b&#39;, &#39;c&#39; ]\n&gt; _.length\n3\n&gt; _ += 1\n4</code></pre>\n<p>The REPL provides access to any variables in the global scope. You can expose\na variable to the REPL explicitly by assigning it to the <code>context</code> object\nassociated with each <code>REPLServer</code>.  For example:\n\n</p>\n<pre><code class=\"js\">// repl_test.js\nconst repl = require(&#39;repl&#39;);\nvar msg = &#39;message&#39;;\n\nrepl.start(&#39;&gt; &#39;).context.m = msg;</code></pre>\n<p>Things in the <code>context</code> object appear as local within the REPL:\n\n</p>\n<pre><code>$ node repl_test.js\n&gt; m\n&#39;message&#39;</code></pre>\n<p>There are a few special REPL commands:\n\n</p>\n<ul>\n<li><code>.break</code> - While inputting a multi-line expression, sometimes you get lost\nor just don&#39;t care about completing it. <code>.break</code> will start over.</li>\n<li><code>.clear</code> - Resets the <code>context</code> object to an empty object and clears any\nmulti-line expression.</li>\n<li><code>.exit</code> - Close the I/O stream, which will cause the REPL to exit.</li>\n<li><code>.help</code> - Show this list of special commands.</li>\n<li><code>.save</code> - Save the current REPL session to a file<blockquote>\n<p>.save ./file/to/save.js</p>\n</blockquote>\n</li>\n<li><code>.load</code> - Load a file into the current REPL session.<blockquote>\n<p>.load ./file/to/load.js</p>\n</blockquote>\n</li>\n</ul>\n<p>The following key combinations in the REPL have these special effects:\n\n</p>\n<ul>\n<li><code>&lt;ctrl&gt;C</code> - Similar to the <code>.break</code> keyword.  Terminates the current\ncommand.  Press twice on a blank line to forcibly exit.</li>\n<li><code>&lt;ctrl&gt;D</code> - Similar to the <code>.exit</code> keyword.</li>\n<li><code>&lt;tab&gt;</code> - Show both global and local(scope) variables</li>\n</ul>\n",
          "miscs": [
            {
              "textRaw": "Customizing Object displays in the REPL",
              "name": "customizing_object_displays_in_the_repl",
              "desc": "<p>The REPL module internally uses\n[<code>util.inspect()</code>][], when printing values. However, <code>util.inspect</code> delegates the\n call to the object&#39;s <code>inspect()</code> function, if it has one. You can read more\n about this delegation [here][].\n\n</p>\n<p>For example, if you have defined an <code>inspect()</code> function on an object, like this:\n\n</p>\n<pre><code>&gt; var obj = {foo: &#39;this will not show up in the inspect() output&#39;};\nundefined\n&gt; obj.inspect = () =&gt; {\n...   return {bar: &#39;baz&#39;};\n... };\n[Function]</code></pre>\n<p>and try to print <code>obj</code> in REPL, it will invoke the custom <code>inspect()</code> function:\n\n</p>\n<pre><code>&gt; obj\n{bar: &#39;baz&#39;}</code></pre>\n",
              "type": "misc",
              "displayName": "Customizing Object displays in the REPL"
            }
          ]
        }
      ],
      "classes": [
        {
          "textRaw": "Class: REPLServer",
          "type": "class",
          "name": "REPLServer",
          "desc": "<p>This inherits from [Readline Interface][] with the following events:\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'exit'",
              "type": "event",
              "name": "exit",
              "desc": "<p><code>function () {}</code>\n\n</p>\n<p>Emitted when the user exits the REPL in any of the defined ways. Namely, typing\n<code>.exit</code> at the repl, pressing Ctrl+C twice to signal <code>SIGINT</code>, or pressing Ctrl+D\nto signal <code>&#39;end&#39;</code> on the <code>input</code> stream.\n\n</p>\n<p>Example of listening for <code>exit</code>:\n\n</p>\n<pre><code class=\"js\">replServer.on(&#39;exit&#39;, () =&gt; {\n  console.log(&#39;Got &quot;exit&quot; event from repl!&#39;);\n  process.exit();\n});</code></pre>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'reset'",
              "type": "event",
              "name": "reset",
              "desc": "<p><code>function (context) {}</code>\n\n</p>\n<p>Emitted when the REPL&#39;s context is reset. This happens when you type <code>.clear</code>.\nIf you start the repl with <code>{ useGlobal: true }</code> then this event will never\nbe emitted.\n\n</p>\n<p>Example of listening for <code>reset</code>:\n\n</p>\n<pre><code class=\"js\">// Extend the initial repl context.\nvar replServer = repl.start({ options ... });\nsomeExtension.extend(r.context);\n\n// When a new context is created extend it as well.\nreplServer.on(&#39;reset&#39;, (context) =&gt; {\n  console.log(&#39;repl has a new context&#39;);\n  someExtension.extend(context);\n});</code></pre>\n",
              "params": []
            }
          ],
          "methods": [
            {
              "textRaw": "replServer.defineCommand(keyword, cmd)",
              "type": "method",
              "name": "defineCommand",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`keyword` {String} ",
                      "name": "keyword",
                      "type": "String"
                    },
                    {
                      "textRaw": "`cmd` {Object|Function} ",
                      "name": "cmd",
                      "type": "Object|Function"
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "keyword"
                    },
                    {
                      "name": "cmd"
                    }
                  ]
                }
              ],
              "desc": "<p>Makes a command available in the REPL. The command is invoked by typing a <code>.</code>\nfollowed by the keyword. The <code>cmd</code> is an object with the following values:\n\n</p>\n<ul>\n<li><code>help</code> - help text to be displayed when <code>.help</code> is entered (Optional).</li>\n<li><code>action</code> - a function to execute, potentially taking in a string argument,\nwhen the command is invoked, bound to the REPLServer instance (Required).</li>\n</ul>\n<p>If a function is provided instead of an object for <code>cmd</code>, it is treated as the\n<code>action</code>.\n\n</p>\n<p>Example of defining a command:\n\n</p>\n<pre><code class=\"js\">// repl_test.js\nconst repl = require(&#39;repl&#39;);\n\nvar replServer = repl.start();\nreplServer.defineCommand(&#39;sayhello&#39;, {\n  help: &#39;Say hello&#39;,\n  action: function(name) {\n    this.write(`Hello, ${name}!\\n`);\n    this.displayPrompt();\n  }\n});</code></pre>\n<p>Example of invoking that command from the REPL:\n\n</p>\n<pre><code>&gt; .sayhello Node.js User\nHello, Node.js User!</code></pre>\n"
            },
            {
              "textRaw": "replServer.displayPrompt([preserveCursor])",
              "type": "method",
              "name": "displayPrompt",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`preserveCursor` {Boolean} ",
                      "name": "preserveCursor",
                      "type": "Boolean",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "preserveCursor",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Like [<code>readline.prompt</code>][] except also adding indents with ellipses when inside\nblocks. The <code>preserveCursor</code> argument is passed to [<code>readline.prompt</code>][]. This is\nused primarily with <code>defineCommand</code>. It&#39;s also used internally to render each\nprompt line.\n\n</p>\n"
            }
          ]
        }
      ],
      "methods": [
        {
          "textRaw": "repl.start([options])",
          "type": "method",
          "name": "start",
          "desc": "<p>Returns and starts a <code>REPLServer</code> instance, that inherits from\n[Readline Interface][]. Accepts an &quot;options&quot; Object that takes\nthe following values:\n\n</p>\n<ul>\n<li><p><code>prompt</code> - the prompt and <code>stream</code> for all I/O. Defaults to <code>&gt; </code>.</p>\n</li>\n<li><p><code>input</code> - the readable stream to listen to. Defaults to <code>process.stdin</code>.</p>\n</li>\n<li><p><code>output</code> - the writable stream to write readline data to. Defaults to\n<code>process.stdout</code>.</p>\n</li>\n<li><p><code>terminal</code> - pass <code>true</code> if the <code>stream</code> should be treated like a TTY, and\nhave ANSI/VT100 escape codes written to it. Defaults to checking <code>isTTY</code>\non the <code>output</code> stream upon instantiation.</p>\n</li>\n<li><p><code>eval</code> - function that will be used to eval each given line. Defaults to\nan async wrapper for <code>eval()</code>. See below for an example of a custom <code>eval</code>.</p>\n</li>\n<li><p><code>useColors</code> - a boolean which specifies whether or not the <code>writer</code> function\nshould output colors. If a different <code>writer</code> function is set then this does\nnothing. Defaults to the repl&#39;s <code>terminal</code> value.</p>\n</li>\n<li><p><code>useGlobal</code> - if set to <code>true</code>, then the repl will use the <code>global</code> object,\ninstead of running scripts in a separate context. Defaults to <code>false</code>.</p>\n</li>\n<li><p><code>ignoreUndefined</code> - if set to <code>true</code>, then the repl will not output the\nreturn value of command if it&#39;s <code>undefined</code>. Defaults to <code>false</code>.</p>\n</li>\n<li><p><code>writer</code> - the function to invoke for each command that gets evaluated which\nreturns the formatting (including coloring) to display. Defaults to\n<code>util.inspect</code>.</p>\n</li>\n<li><p><code>replMode</code> - controls whether the repl runs all commands in strict mode,\ndefault mode, or a hybrid mode (&quot;magic&quot; mode.) Acceptable values are:</p>\n<ul>\n<li><code>repl.REPL_MODE_SLOPPY</code> - run commands in sloppy mode.</li>\n<li><code>repl.REPL_MODE_STRICT</code> - run commands in strict mode. This is equivalent to\nprefacing every repl statement with <code>&#39;use strict&#39;</code>.</li>\n<li><code>repl.REPL_MODE_MAGIC</code> - attempt to run commands in default mode. If they\nfail to parse, re-try in strict mode.</li>\n</ul>\n</li>\n</ul>\n<p>You can use your own <code>eval</code> function if it has following signature:\n\n</p>\n<pre><code>function eval(cmd, context, filename, callback) {\n  callback(null, result);\n}</code></pre>\n<p>On tab completion, <code>eval</code> will be called with <code>.scope</code> as an input string. It\nis expected to return an array of scope names to be used for the auto-completion.\n\n</p>\n<p>Multiple REPLs may be started against the same running instance of Node.js.  Each\nwill share the same global object but will have unique I/O.\n\n</p>\n<p>Here is an example that starts a REPL on stdin, a Unix socket, and a TCP socket:\n\n</p>\n<pre><code class=\"js\">const net = require(&#39;net&#39;);\nconst repl = require(&#39;repl&#39;);\nvar connections = 0;\n\nrepl.start({\n  prompt: &#39;Node.js via stdin&gt; &#39;,\n  input: process.stdin,\n  output: process.stdout\n});\n\nnet.createServer((socket) =&gt; {\n  connections += 1;\n  repl.start({\n    prompt: &#39;Node.js via Unix socket&gt; &#39;,\n    input: socket,\n    output: socket\n  }).on(&#39;exit&#39;, () =&gt; {\n    socket.end();\n  })\n}).listen(&#39;/tmp/node-repl-sock&#39;);\n\nnet.createServer((socket) =&gt; {\n  connections += 1;\n  repl.start({\n    prompt: &#39;Node.js via TCP socket&gt; &#39;,\n    input: socket,\n    output: socket\n  }).on(&#39;exit&#39;, () =&gt; {\n    socket.end();\n  });\n}).listen(5001);</code></pre>\n<p>Running this program from the command line will start a REPL on stdin.  Other\nREPL clients may connect through the Unix socket or TCP socket. <code>telnet</code> is useful\nfor connecting to TCP sockets, and <code>socat</code> can be used to connect to both Unix and\nTCP sockets.\n\n</p>\n<p>By starting a REPL from a Unix socket-based server instead of stdin, you can\nconnect to a long-running Node.js process without restarting it.\n\n</p>\n<p>For an example of running a &quot;full-featured&quot; (<code>terminal</code>) REPL over\na <code>net.Server</code> and <code>net.Socket</code> instance, see: <a href=\"https://gist.github.com/2209310\">https://gist.github.com/2209310</a>\n\n</p>\n<p>For an example of running a REPL instance over <code>curl(1)</code>,\nsee: <a href=\"https://gist.github.com/2053342\">https://gist.github.com/2053342</a>\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "options",
                  "optional": true
                }
              ]
            }
          ]
        }
      ],
      "type": "module",
      "displayName": "REPL"
    }
  ]
}
