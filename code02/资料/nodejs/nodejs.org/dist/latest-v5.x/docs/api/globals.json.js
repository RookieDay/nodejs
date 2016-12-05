{
  "source": "https://nodejs.org/dist/latest-v5.x/docs/api/doc/api/globals.md",
  "globals": [
    {
      "textRaw": "Class: Buffer",
      "type": "global",
      "name": "Buffer",
      "desc": "<ul>\n<li>{Function}</li>\n</ul>\n<p>Used to handle binary data. See the [buffer section][].\n\n</p>\n"
    },
    {
      "textRaw": "clearImmediate(immediateObject)",
      "type": "global",
      "name": "clearImmediate",
      "desc": "<p>[<code>clearImmediate</code>] is described in the [timers][] section.\n\n</p>\n"
    },
    {
      "textRaw": "clearInterval(intervalObject)",
      "type": "global",
      "name": "clearInterval",
      "desc": "<p>[<code>clearInterval</code>] is described in the [timers][] section.\n\n</p>\n"
    },
    {
      "textRaw": "clearTimeout(timeoutObject)",
      "type": "global",
      "name": "clearTimeout",
      "desc": "<p>[<code>clearTimeout</code>] is described in the [timers][] section.\n\n</p>\n"
    },
    {
      "textRaw": "console",
      "name": "console",
      "type": "global",
      "desc": "<ul>\n<li>{Object}</li>\n</ul>\n<p>Used to print to stdout and stderr. See the [<code>console</code>][] section.\n\n</p>\n"
    },
    {
      "textRaw": "global",
      "name": "global",
      "type": "global",
      "desc": "<ul>\n<li>{Object} The global namespace object.</li>\n</ul>\n<p>In browsers, the top-level scope is the global scope. That means that in\nbrowsers if you&#39;re in the global scope <code>var something</code> will define a global\nvariable. In Node.js this is different. The top-level scope is not the global\nscope; <code>var something</code> inside an Node.js module will be local to that module.\n\n</p>\n"
    },
    {
      "textRaw": "process",
      "name": "process",
      "type": "global",
      "desc": "<ul>\n<li>{Object}</li>\n</ul>\n<p>The process object. See the [<code>process</code> object][] section.\n\n</p>\n"
    },
    {
      "textRaw": "setImmediate(callback[, arg][, ...])",
      "type": "global",
      "name": "setImmediate",
      "desc": "<p>[<code>setImmediate</code>] is described in the [timers][] section.\n\n</p>\n"
    },
    {
      "textRaw": "setInterval(callback, delay[, arg][, ...])",
      "type": "global",
      "name": "setInterval",
      "desc": "<p>[<code>setInterval</code>] is described in the [timers][] section.\n\n</p>\n"
    },
    {
      "textRaw": "setTimeout(callback, delay[, arg][, ...])",
      "type": "global",
      "name": "setTimeout",
      "desc": "<p>[<code>setTimeout</code>] is described in the [timers][] section.\n\n</p>\n"
    }
  ],
  "vars": [
    {
      "textRaw": "\\_\\_dirname",
      "name": "\\_\\_dirname",
      "type": "var",
      "desc": "<ul>\n<li>{String}</li>\n</ul>\n<p>The name of the directory that the currently executing script resides in.\n\n</p>\n<p>Example: running <code>node example.js</code> from <code>/Users/mjr</code>\n\n</p>\n<pre><code class=\"js\">console.log(__dirname);\n// /Users/mjr</code></pre>\n<p><code>__dirname</code> isn&#39;t actually a global but rather local to each module.\n\n</p>\n<p>For instance, given two modules: <code>a</code> and <code>b</code>, where <code>b</code> is a dependency of\n<code>a</code> and there is a directory structure of:\n\n</p>\n<ul>\n<li><code>/Users/mjr/app/a.js</code></li>\n<li><code>/Users/mjr/app/node_modules/b/b.js</code></li>\n</ul>\n<p>References to <code>__dirname</code> within <code>b.js</code> will return\n<code>/Users/mjr/app/node_modules/b</code> while references to <code>__dirname</code> within <code>a.js</code>\nwill return <code>/Users/mj/app</code>.\n\n</p>\n"
    },
    {
      "textRaw": "\\_\\_filename",
      "name": "\\_\\_filename",
      "type": "var",
      "desc": "<ul>\n<li>{String}</li>\n</ul>\n<p>The filename of the code being executed.  This is the resolved absolute path\nof this code file.  For a main program this is not necessarily the same\nfilename used in the command line.  The value inside a module is the path\nto that module file.\n\n</p>\n<p>Example: running <code>node example.js</code> from <code>/Users/mjr</code>\n\n</p>\n<pre><code class=\"js\">console.log(__filename);\n// /Users/mjr/example.js</code></pre>\n<p><code>__filename</code> isn&#39;t actually a global but rather local to each module.\n\n</p>\n"
    },
    {
      "textRaw": "exports",
      "name": "exports",
      "type": "var",
      "desc": "<p>A reference to the <code>module.exports</code> that is shorter to type.\nSee [module system documentation][] for details on when to use <code>exports</code> and\nwhen to use <code>module.exports</code>.\n\n</p>\n<p><code>exports</code> isn&#39;t actually a global but rather local to each module.\n\n</p>\n<p>See the [module system documentation][] for more information.\n\n</p>\n"
    },
    {
      "textRaw": "module",
      "name": "module",
      "type": "var",
      "desc": "<ul>\n<li>{Object}</li>\n</ul>\n<p>A reference to the current module. In particular\n<code>module.exports</code> is used for defining what a module exports and makes\navailable through <code>require()</code>.\n\n</p>\n<p><code>module</code> isn&#39;t actually a global but rather local to each module.\n\n</p>\n<p>See the [module system documentation][] for more information.\n\n</p>\n"
    },
    {
      "textRaw": "require()",
      "type": "var",
      "name": "require",
      "desc": "<ul>\n<li>{Function}</li>\n</ul>\n<p>To require modules. See the [Modules][] section.  <code>require</code> isn&#39;t actually a\nglobal but rather local to each module.\n\n</p>\n",
      "properties": [
        {
          "textRaw": "`cache` {Object} ",
          "type": "Object",
          "name": "cache",
          "desc": "<p>Modules are cached in this object when they are required. By deleting a key\nvalue from this object, the next <code>require</code> will reload the module. Note that\nthis does not apply to [native addons][], for which reloading will result in an\nError.\n\n</p>\n"
        },
        {
          "textRaw": "`extensions` {Object} ",
          "type": "Object",
          "name": "extensions",
          "stability": 0,
          "stabilityText": "Deprecated",
          "desc": "<p>Instruct <code>require</code> on how to handle certain file extensions.\n\n</p>\n<p>Process files with the extension <code>.sjs</code> as <code>.js</code>:\n\n</p>\n<pre><code class=\"js\">require.extensions[&#39;.sjs&#39;] = require.extensions[&#39;.js&#39;];</code></pre>\n<p><strong>Deprecated</strong>  In the past, this list has been used to load\nnon-JavaScript modules into Node.js by compiling them on-demand.\nHowever, in practice, there are much better ways to do this, such as\nloading modules via some other Node.js program, or compiling them to\nJavaScript ahead of time.\n\n</p>\n<p>Since the Module system is locked, this feature will probably never go\naway.  However, it may have subtle bugs and complexities that are best\nleft untouched.\n\n</p>\n"
        }
      ],
      "methods": [
        {
          "textRaw": "require.resolve()",
          "type": "method",
          "name": "resolve",
          "desc": "<p>Use the internal <code>require()</code> machinery to look up the location of a module,\nbut rather than loading the module, just return the resolved filename.\n\n</p>\n",
          "signatures": [
            {
              "params": []
            }
          ]
        }
      ]
    }
  ],
  "miscs": [
    {
      "textRaw": "Global Objects",
      "name": "Global Objects",
      "type": "misc",
      "desc": "<p>These objects are available in all modules. Some of these objects aren&#39;t\nactually in the global scope but in the module scope - this will be noted.\n\n</p>\n",
      "globals": [
        {
          "textRaw": "Class: Buffer",
          "type": "global",
          "name": "Buffer",
          "desc": "<ul>\n<li>{Function}</li>\n</ul>\n<p>Used to handle binary data. See the [buffer section][].\n\n</p>\n"
        },
        {
          "textRaw": "clearImmediate(immediateObject)",
          "type": "global",
          "name": "clearImmediate",
          "desc": "<p>[<code>clearImmediate</code>] is described in the [timers][] section.\n\n</p>\n"
        },
        {
          "textRaw": "clearInterval(intervalObject)",
          "type": "global",
          "name": "clearInterval",
          "desc": "<p>[<code>clearInterval</code>] is described in the [timers][] section.\n\n</p>\n"
        },
        {
          "textRaw": "clearTimeout(timeoutObject)",
          "type": "global",
          "name": "clearTimeout",
          "desc": "<p>[<code>clearTimeout</code>] is described in the [timers][] section.\n\n</p>\n"
        },
        {
          "textRaw": "console",
          "name": "console",
          "type": "global",
          "desc": "<ul>\n<li>{Object}</li>\n</ul>\n<p>Used to print to stdout and stderr. See the [<code>console</code>][] section.\n\n</p>\n"
        },
        {
          "textRaw": "global",
          "name": "global",
          "type": "global",
          "desc": "<ul>\n<li>{Object} The global namespace object.</li>\n</ul>\n<p>In browsers, the top-level scope is the global scope. That means that in\nbrowsers if you&#39;re in the global scope <code>var something</code> will define a global\nvariable. In Node.js this is different. The top-level scope is not the global\nscope; <code>var something</code> inside an Node.js module will be local to that module.\n\n</p>\n"
        },
        {
          "textRaw": "process",
          "name": "process",
          "type": "global",
          "desc": "<ul>\n<li>{Object}</li>\n</ul>\n<p>The process object. See the [<code>process</code> object][] section.\n\n</p>\n"
        },
        {
          "textRaw": "setImmediate(callback[, arg][, ...])",
          "type": "global",
          "name": "setImmediate",
          "desc": "<p>[<code>setImmediate</code>] is described in the [timers][] section.\n\n</p>\n"
        },
        {
          "textRaw": "setInterval(callback, delay[, arg][, ...])",
          "type": "global",
          "name": "setInterval",
          "desc": "<p>[<code>setInterval</code>] is described in the [timers][] section.\n\n</p>\n"
        },
        {
          "textRaw": "setTimeout(callback, delay[, arg][, ...])",
          "type": "global",
          "name": "setTimeout",
          "desc": "<p>[<code>setTimeout</code>] is described in the [timers][] section.\n\n</p>\n"
        }
      ],
      "vars": [
        {
          "textRaw": "\\_\\_dirname",
          "name": "\\_\\_dirname",
          "type": "var",
          "desc": "<ul>\n<li>{String}</li>\n</ul>\n<p>The name of the directory that the currently executing script resides in.\n\n</p>\n<p>Example: running <code>node example.js</code> from <code>/Users/mjr</code>\n\n</p>\n<pre><code class=\"js\">console.log(__dirname);\n// /Users/mjr</code></pre>\n<p><code>__dirname</code> isn&#39;t actually a global but rather local to each module.\n\n</p>\n<p>For instance, given two modules: <code>a</code> and <code>b</code>, where <code>b</code> is a dependency of\n<code>a</code> and there is a directory structure of:\n\n</p>\n<ul>\n<li><code>/Users/mjr/app/a.js</code></li>\n<li><code>/Users/mjr/app/node_modules/b/b.js</code></li>\n</ul>\n<p>References to <code>__dirname</code> within <code>b.js</code> will return\n<code>/Users/mjr/app/node_modules/b</code> while references to <code>__dirname</code> within <code>a.js</code>\nwill return <code>/Users/mj/app</code>.\n\n</p>\n"
        },
        {
          "textRaw": "\\_\\_filename",
          "name": "\\_\\_filename",
          "type": "var",
          "desc": "<ul>\n<li>{String}</li>\n</ul>\n<p>The filename of the code being executed.  This is the resolved absolute path\nof this code file.  For a main program this is not necessarily the same\nfilename used in the command line.  The value inside a module is the path\nto that module file.\n\n</p>\n<p>Example: running <code>node example.js</code> from <code>/Users/mjr</code>\n\n</p>\n<pre><code class=\"js\">console.log(__filename);\n// /Users/mjr/example.js</code></pre>\n<p><code>__filename</code> isn&#39;t actually a global but rather local to each module.\n\n</p>\n"
        },
        {
          "textRaw": "exports",
          "name": "exports",
          "type": "var",
          "desc": "<p>A reference to the <code>module.exports</code> that is shorter to type.\nSee [module system documentation][] for details on when to use <code>exports</code> and\nwhen to use <code>module.exports</code>.\n\n</p>\n<p><code>exports</code> isn&#39;t actually a global but rather local to each module.\n\n</p>\n<p>See the [module system documentation][] for more information.\n\n</p>\n"
        },
        {
          "textRaw": "module",
          "name": "module",
          "type": "var",
          "desc": "<ul>\n<li>{Object}</li>\n</ul>\n<p>A reference to the current module. In particular\n<code>module.exports</code> is used for defining what a module exports and makes\navailable through <code>require()</code>.\n\n</p>\n<p><code>module</code> isn&#39;t actually a global but rather local to each module.\n\n</p>\n<p>See the [module system documentation][] for more information.\n\n</p>\n"
        },
        {
          "textRaw": "require()",
          "type": "var",
          "name": "require",
          "desc": "<ul>\n<li>{Function}</li>\n</ul>\n<p>To require modules. See the [Modules][] section.  <code>require</code> isn&#39;t actually a\nglobal but rather local to each module.\n\n</p>\n",
          "properties": [
            {
              "textRaw": "`cache` {Object} ",
              "type": "Object",
              "name": "cache",
              "desc": "<p>Modules are cached in this object when they are required. By deleting a key\nvalue from this object, the next <code>require</code> will reload the module. Note that\nthis does not apply to [native addons][], for which reloading will result in an\nError.\n\n</p>\n"
            },
            {
              "textRaw": "`extensions` {Object} ",
              "type": "Object",
              "name": "extensions",
              "stability": 0,
              "stabilityText": "Deprecated",
              "desc": "<p>Instruct <code>require</code> on how to handle certain file extensions.\n\n</p>\n<p>Process files with the extension <code>.sjs</code> as <code>.js</code>:\n\n</p>\n<pre><code class=\"js\">require.extensions[&#39;.sjs&#39;] = require.extensions[&#39;.js&#39;];</code></pre>\n<p><strong>Deprecated</strong>  In the past, this list has been used to load\nnon-JavaScript modules into Node.js by compiling them on-demand.\nHowever, in practice, there are much better ways to do this, such as\nloading modules via some other Node.js program, or compiling them to\nJavaScript ahead of time.\n\n</p>\n<p>Since the Module system is locked, this feature will probably never go\naway.  However, it may have subtle bugs and complexities that are best\nleft untouched.\n\n</p>\n"
            }
          ],
          "methods": [
            {
              "textRaw": "require.resolve()",
              "type": "method",
              "name": "resolve",
              "desc": "<p>Use the internal <code>require()</code> machinery to look up the location of a module,\nbut rather than loading the module, just return the resolved filename.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
