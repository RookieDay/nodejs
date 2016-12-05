{
  "source": "https://nodejs.org/dist/latest-v5.x/docs/api/doc/api/vm.md",
  "modules": [
    {
      "textRaw": "Executing JavaScript",
      "name": "vm",
      "stability": 2,
      "stabilityText": "Stable",
      "desc": "<p>You can access this module with:\n\n</p>\n<pre><code class=\"js\">const vm = require(&#39;vm&#39;);</code></pre>\n<p>JavaScript code can be compiled and run immediately or compiled, saved, and run\nlater.\n\n</p>\n",
      "classes": [
        {
          "textRaw": "Class: Script",
          "type": "class",
          "name": "Script",
          "desc": "<p>A class for holding precompiled scripts, and running them in specific sandboxes.\n\n</p>\n",
          "methods": [
            {
              "textRaw": "new vm.Script(code, options)",
              "type": "method",
              "name": "Script",
              "desc": "<p>Creating a new <code>Script</code> compiles <code>code</code> but does not run it. Instead, the\ncreated <code>vm.Script</code> object represents this compiled code. This script can be run\nlater many times using methods below. The returned script is not bound to any\nglobal object. It is bound before each run, just for that run.\n\n</p>\n<p>The options when creating a script are:\n\n</p>\n<ul>\n<li><code>filename</code>: allows you to control the filename that shows up in any stack\ntraces produced from this script.</li>\n<li><code>lineOffset</code>: allows you to add an offset to the line number that is\ndisplayed in stack traces</li>\n<li><code>columnOffset</code>: allows you to add an offset to the column number that is\ndisplayed in stack traces</li>\n<li><code>displayErrors</code>: whether or not to print any errors to stderr, with the\nline of code that caused them highlighted, before throwing an exception.\nApplies only to syntax errors compiling the code; errors while running the\ncode are controlled by the options to the script&#39;s methods.</li>\n<li><code>timeout</code>: a number of milliseconds to execute <code>code</code> before terminating\nexecution. If execution is terminated, an [<code>Error</code>][] will be thrown.</li>\n<li><code>cachedData</code>: an optional <code>Buffer</code> with V8&#39;s code cache data for the supplied\nsource. When supplied <code>cachedDataRejected</code> value will be set to either\n<code>true</code> or <code>false</code> depending on acceptance of the data by V8.</li>\n<li><code>produceCachedData</code>: if <code>true</code> and no <code>cachedData</code> is present - V8 tries to\nproduce code cache data for <code>code</code>. Upon success, a <code>Buffer</code> with V8&#39;s code\ncache data will be produced and stored in <code>cachedData</code> property of the\nreturned <code>vm.Script</code> instance. <code>cachedDataProduced</code> value will be set to\neither <code>true</code> or <code>false</code> depending on whether code cache data is produced\nsuccessfully.</li>\n</ul>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "code"
                    },
                    {
                      "name": "options"
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "script.runInContext(contextifiedSandbox[, options])",
              "type": "method",
              "name": "runInContext",
              "desc": "<p>Similar to [<code>vm.runInContext()</code>][] but a method of a precompiled <code>Script</code>\nobject. <code>script.runInContext()</code> runs <code>script</code>&#39;s compiled code in\n<code>contextifiedSandbox</code> and returns the result. Running code does not have access\nto local scope.\n\n</p>\n<p><code>script.runInContext()</code> takes the same options as\n[<code>script.runInThisContext()</code>][].\n\n</p>\n<p>Example: compile code that increments a global variable and sets one, then\nexecute the code multiple times. These globals are contained in the sandbox.\n\n</p>\n<pre><code class=\"js\">const util = require(&#39;util&#39;);\nconst vm = require(&#39;vm&#39;);\n\nvar sandbox = {\n  animal: &#39;cat&#39;,\n  count: 2\n};\n\nvar context = new vm.createContext(sandbox);\nvar script = new vm.Script(&#39;count += 1; name = &quot;kitty&quot;&#39;);\n\nfor (var i = 0; i &lt; 10; ++i) {\n  script.runInContext(context);\n}\n\nconsole.log(util.inspect(sandbox));\n\n// { animal: &#39;cat&#39;, count: 12, name: &#39;kitty&#39; }</code></pre>\n<p>Note that running untrusted code is a tricky business requiring great care.\n<code>script.runInContext()</code> is quite useful, but safely running untrusted code\nrequires a separate process.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "contextifiedSandbox"
                    },
                    {
                      "name": "options",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "script.runInNewContext([sandbox][, options])",
              "type": "method",
              "name": "runInNewContext",
              "desc": "<p>Similar to [<code>vm.runInNewContext()</code>][] but a method of a precompiled <code>Script</code>\nobject. <code>script.runInNewContext()</code> contextifies <code>sandbox</code> if passed or creates a\nnew contextified sandbox if it&#39;s omitted, and then runs <code>script</code>&#39;s compiled code\nwith the sandbox as the global object and returns the result. Running code does\nnot have access to local scope.\n\n</p>\n<p><code>script.runInNewContext()</code> takes the same options as\n[<code>script.runInThisContext()</code>][].\n\n</p>\n<p>Example: compile code that sets a global variable, then execute the code\nmultiple times in different contexts. These globals are set on and contained in\nthe sandboxes.\n\n</p>\n<pre><code class=\"js\">const util = require(&#39;util&#39;);\nconst vm = require(&#39;vm&#39;);\n\nconst sandboxes = [{}, {}, {}];\n\nconst script = new vm.Script(&#39;globalVar = &quot;set&quot;&#39;);\n\nsandboxes.forEach((sandbox) =&gt; {\n  script.runInNewContext(sandbox);\n});\n\nconsole.log(util.inspect(sandboxes));\n\n// [{ globalVar: &#39;set&#39; }, { globalVar: &#39;set&#39; }, { globalVar: &#39;set&#39; }]</code></pre>\n<p>Note that running untrusted code is a tricky business requiring great care.\n<code>script.runInNewContext()</code> is quite useful, but safely running untrusted code\nrequires a separate process.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "sandbox",
                      "optional": true
                    },
                    {
                      "name": "options",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "script.runInThisContext([options])",
              "type": "method",
              "name": "runInThisContext",
              "desc": "<p>Similar to [<code>vm.runInThisContext()</code>][] but a method of a precompiled <code>Script</code>\nobject. <code>script.runInThisContext()</code> runs <code>script</code>&#39;s compiled code and returns\nthe result. Running code does not have access to local scope, but does have\naccess to the current <code>global</code> object.\n\n</p>\n<p>Example of using <code>script.runInThisContext()</code> to compile code once and run it\nmultiple times:\n\n</p>\n<pre><code class=\"js\">const vm = require(&#39;vm&#39;);\n\nglobal.globalVar = 0;\n\nconst script = new vm.Script(&#39;globalVar += 1&#39;, { filename: &#39;myfile.vm&#39; });\n\nfor (var i = 0; i &lt; 1000; ++i) {\n  script.runInThisContext();\n}\n\nconsole.log(globalVar);\n\n// 1000</code></pre>\n<p>The options for running a script are:\n\n</p>\n<ul>\n<li><code>filename</code>: allows you to control the filename that shows up in any stack\ntraces produced.</li>\n<li><code>lineOffset</code>: allows you to add an offset to the line number that is\ndisplayed in stack traces</li>\n<li><code>columnOffset</code>: allows you to add an offset to the column number that is\ndisplayed in stack traces</li>\n<li><code>displayErrors</code>: whether or not to print any errors to stderr, with the\nline of code that caused them highlighted, before throwing an exception.\nApplies only to runtime errors executing the code; it is impossible to create\na <code>Script</code> instance with syntax errors, as the constructor will throw.</li>\n<li><code>timeout</code>: a number of milliseconds to execute the script before terminating\nexecution. If execution is terminated, an [<code>Error</code>][] will be thrown.</li>\n</ul>\n",
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
          ]
        }
      ],
      "methods": [
        {
          "textRaw": "vm.createContext([sandbox])",
          "type": "method",
          "name": "createContext",
          "desc": "<p>If given a <code>sandbox</code> object, will &quot;contextify&quot; that sandbox so that it can be\nused in calls to [<code>vm.runInContext()</code>][] or [<code>script.runInContext()</code>][]. Inside\nscripts run as such, <code>sandbox</code> will be the global object, retaining all its\nexisting properties but also having the built-in objects and functions any\nstandard [global object][] has. Outside of scripts run by the vm module,\n<code>sandbox</code> will be unchanged.\n\n</p>\n<p>If not given a sandbox object, returns a new, empty contextified sandbox object\nyou can use.\n\n</p>\n<p>This function is useful for creating a sandbox that can be used to run multiple\nscripts, e.g. if you were emulating a web browser it could be used to create a\nsingle sandbox representing a window&#39;s global object, then run all <code>&lt;script&gt;</code>\ntags together inside that sandbox.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "sandbox",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "vm.isContext(sandbox)",
          "type": "method",
          "name": "isContext",
          "desc": "<p>Returns whether or not a sandbox object has been contextified by calling\n[<code>vm.createContext()</code>][] on it.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "sandbox"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "vm.runInContext(code, contextifiedSandbox[, options])",
          "type": "method",
          "name": "runInContext",
          "desc": "<p><code>vm.runInContext()</code> compiles <code>code</code>, then runs it in <code>contextifiedSandbox</code> and\nreturns the result. Running code does not have access to local scope. The\n<code>contextifiedSandbox</code> object must have been previously contextified via\n[<code>vm.createContext()</code>][]; it will be used as the global object for <code>code</code>.\n\n</p>\n<p><code>vm.runInContext()</code> takes the same options as [<code>vm.runInThisContext()</code>][].\n\n</p>\n<p>Example: compile and execute different scripts in a single existing context.\n\n</p>\n<pre><code class=\"js\">const util = require(&#39;util&#39;);\nconst vm = require(&#39;vm&#39;);\n\nconst sandbox = { globalVar: 1 };\nvm.createContext(sandbox);\n\nfor (var i = 0; i &lt; 10; ++i) {\n    vm.runInContext(&#39;globalVar *= 2;&#39;, sandbox);\n}\nconsole.log(util.inspect(sandbox));\n\n// { globalVar: 1024 }</code></pre>\n<p>Note that running untrusted code is a tricky business requiring great care.\n<code>vm.runInContext()</code> is quite useful, but safely running untrusted code requires\na separate process.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "code"
                },
                {
                  "name": "contextifiedSandbox"
                },
                {
                  "name": "options",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "vm.runInDebugContext(code)",
          "type": "method",
          "name": "runInDebugContext",
          "desc": "<p><code>vm.runInDebugContext()</code> compiles and executes <code>code</code> inside the V8 debug\ncontext. The primary use case is to get access to the V8 debug object:\n\n</p>\n<pre><code class=\"js\">const Debug = vm.runInDebugContext(&#39;Debug&#39;);\nDebug.scripts().forEach((script) =&gt; { console.log(script.name); });</code></pre>\n<p>Note that the debug context and object are intrinsically tied to V8&#39;s debugger\nimplementation and may change (or even get removed) without prior warning.\n\n</p>\n<p>The debug object can also be exposed with the <code>--expose_debug_as=</code> switch.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "code"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "vm.runInNewContext(code[, sandbox][, options])",
          "type": "method",
          "name": "runInNewContext",
          "desc": "<p><code>vm.runInNewContext()</code> compiles <code>code</code>, contextifies <code>sandbox</code> if passed or\ncreates a new contextified sandbox if it&#39;s omitted, and then runs the code with\nthe sandbox as the global object and returns the result.\n\n</p>\n<p><code>vm.runInNewContext()</code> takes the same options as [<code>vm.runInThisContext()</code>][].\n\n</p>\n<p>Example: compile and execute code that increments a global variable and sets a\nnew one. These globals are contained in the sandbox.\n\n</p>\n<pre><code class=\"js\">const util = require(&#39;util&#39;);\nconst vm = require(&#39;vm&#39;);\n\nconst sandbox = {\n  animal: &#39;cat&#39;,\n  count: 2\n};\n\nvm.runInNewContext(&#39;count += 1; name = &quot;kitty&quot;&#39;, sandbox);\nconsole.log(util.inspect(sandbox));\n\n// { animal: &#39;cat&#39;, count: 3, name: &#39;kitty&#39; }</code></pre>\n<p>Note that running untrusted code is a tricky business requiring great care.\n<code>vm.runInNewContext()</code> is quite useful, but safely running untrusted code requires\na separate process.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "code"
                },
                {
                  "name": "sandbox",
                  "optional": true
                },
                {
                  "name": "options",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "vm.runInThisContext(code[, options])",
          "type": "method",
          "name": "runInThisContext",
          "desc": "<p><code>vm.runInThisContext()</code> compiles <code>code</code>, runs it and returns the result. Running\ncode does not have access to local scope, but does have access to the current\n<code>global</code> object.\n\n</p>\n<p>Example of using <code>vm.runInThisContext()</code> and [<code>eval()</code>][] to run the same code:\n\n</p>\n<pre><code class=\"js\">const vm = require(&#39;vm&#39;);\nvar localVar = &#39;initial value&#39;;\n\nconst vmResult = vm.runInThisContext(&#39;localVar = &quot;vm&quot;;&#39;);\nconsole.log(&#39;vmResult: &#39;, vmResult);\nconsole.log(&#39;localVar: &#39;, localVar);\n\nconst evalResult = eval(&#39;localVar = &quot;eval&quot;;&#39;);\nconsole.log(&#39;evalResult: &#39;, evalResult);\nconsole.log(&#39;localVar: &#39;, localVar);\n\n// vmResult: &#39;vm&#39;, localVar: &#39;initial value&#39;\n// evalResult: &#39;eval&#39;, localVar: &#39;eval&#39;</code></pre>\n<p><code>vm.runInThisContext()</code> does not have access to the local scope, so <code>localVar</code>\nis unchanged. [<code>eval()</code>][] does have access to the local scope, so <code>localVar</code> is\nchanged.\n\n</p>\n<p>In this way <code>vm.runInThisContext()</code> is much like an [indirect <code>eval()</code> call][],\ne.g. <code>(0,eval)(&#39;code&#39;)</code>. However, it also has the following additional options:\n\n</p>\n<ul>\n<li><code>filename</code>: allows you to control the filename that shows up in any stack\ntraces produced.</li>\n<li><code>lineOffset</code>: allows you to add an offset to the line number that is\ndisplayed in stack traces</li>\n<li><code>columnOffset</code>: allows you to add an offset to the column number that is\ndisplayed in stack traces</li>\n<li><code>displayErrors</code>: whether or not to print any errors to stderr, with the\nline of code that caused them highlighted, before throwing an exception.\nWill capture both syntax errors from compiling <code>code</code> and runtime errors\nthrown by executing the compiled code. Defaults to <code>true</code>.</li>\n<li><code>timeout</code>: a number of milliseconds to execute <code>code</code> before terminating\nexecution. If execution is terminated, an [<code>Error</code>][] will be thrown.</li>\n</ul>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "code"
                },
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
      "displayName": "vm"
    }
  ]
}
