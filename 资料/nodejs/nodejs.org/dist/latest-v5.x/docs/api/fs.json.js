{
  "source": "https://nodejs.org/dist/latest-v5.x/docs/api/doc/api/fs.md",
  "modules": [
    {
      "textRaw": "File System",
      "name": "fs",
      "stability": 2,
      "stabilityText": "Stable",
      "desc": "<p>File I/O is provided by simple wrappers around standard POSIX functions.  To\nuse this module do <code>require(&#39;fs&#39;)</code>. All the methods have asynchronous and\nsynchronous forms.\n\n</p>\n<p>The asynchronous form always takes a completion callback as its last argument.\nThe arguments passed to the completion callback depend on the method, but the\nfirst argument is always reserved for an exception. If the operation was\ncompleted successfully, then the first argument will be <code>null</code> or <code>undefined</code>.\n\n</p>\n<p>When using the synchronous form any exceptions are immediately thrown.\nYou can use try/catch to handle exceptions or allow them to bubble up.\n\n</p>\n<p>Here is an example of the asynchronous version:\n\n</p>\n<pre><code class=\"js\">const fs = require(&#39;fs&#39;);\n\nfs.unlink(&#39;/tmp/hello&#39;, (err) =&gt; {\n  if (err) throw err;\n  console.log(&#39;successfully deleted /tmp/hello&#39;);\n});</code></pre>\n<p>Here is the synchronous version:\n\n</p>\n<pre><code class=\"js\">const fs = require(&#39;fs&#39;);\n\nfs.unlinkSync(&#39;/tmp/hello&#39;);\nconsole.log(&#39;successfully deleted /tmp/hello&#39;);</code></pre>\n<p>With the asynchronous methods there is no guaranteed ordering. So the\nfollowing is prone to error:\n\n</p>\n<pre><code class=\"js\">fs.rename(&#39;/tmp/hello&#39;, &#39;/tmp/world&#39;, (err) =&gt; {\n  if (err) throw err;\n  console.log(&#39;renamed complete&#39;);\n});\nfs.stat(&#39;/tmp/world&#39;, (err, stats) =&gt; {\n  if (err) throw err;\n  console.log(`stats: ${JSON.stringify(stats)}`);\n});</code></pre>\n<p>It could be that <code>fs.stat</code> is executed before <code>fs.rename</code>.\nThe correct way to do this is to chain the callbacks.\n\n</p>\n<pre><code class=\"js\">fs.rename(&#39;/tmp/hello&#39;, &#39;/tmp/world&#39;, (err) =&gt; {\n  if (err) throw err;\n  fs.stat(&#39;/tmp/world&#39;, (err, stats) =&gt; {\n    if (err) throw err;\n    console.log(`stats: ${JSON.stringify(stats)}`);\n  });\n});</code></pre>\n<p>In busy processes, the programmer is <em>strongly encouraged</em> to use the\nasynchronous versions of these calls. The synchronous versions will block\nthe entire process until they complete--halting all connections.\n\n</p>\n<p>The relative path to a filename can be used. Remember, however, that this path\nwill be relative to <code>process.cwd()</code>.\n\n</p>\n<p>Most fs functions let you omit the callback argument. If you do, a default\ncallback is used that rethrows errors. To get a trace to the original call\nsite, set the <code>NODE_DEBUG</code> environment variable:\n\n</p>\n<pre><code>$ cat script.js\nfunction bad() {\n  require(&#39;fs&#39;).readFile(&#39;/&#39;);\n}\nbad();\n\n$ env NODE_DEBUG=fs node script.js\nfs.js:66\n        throw err;\n              ^\nError: EISDIR, read\n    at rethrow (fs.js:61:21)\n    at maybeCallback (fs.js:79:42)\n    at Object.fs.readFile (fs.js:153:18)\n    at bad (/path/to/script.js:2:17)\n    at Object.&lt;anonymous&gt; (/path/to/script.js:5:1)\n    &lt;etc.&gt;</code></pre>\n",
      "modules": [
        {
          "textRaw": "Buffer API",
          "name": "buffer_api",
          "desc": "<p><code>fs</code> functions support passing and receiving paths as both strings\nand Buffers. The latter is intended to make it possible to work with\nfilesystems that allow for non-UTF-8 filenames. For most typical\nuses, working with paths as Buffers will be unnecessary, as the string\nAPI converts to and from UTF-8 automatically.\n\n</p>\n<p><em>Note</em> that on certain file systems (such as NTFS and HFS+) filenames\nwill always be encoded as UTF-8. On such file systems, passing\nnon-UTF-8 encoded Buffers to <code>fs</code> functions will not work as expected.\n\n</p>\n",
          "type": "module",
          "displayName": "Buffer API"
        }
      ],
      "classes": [
        {
          "textRaw": "Class: fs.FSWatcher",
          "type": "class",
          "name": "fs.FSWatcher",
          "desc": "<p>Objects returned from <code>fs.watch()</code> are of this type.\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'change'",
              "type": "event",
              "name": "change",
              "params": [],
              "desc": "<p>Emitted when something changes in a watched directory or file.\nSee more details in [<code>fs.watch()</code>][].\n\n</p>\n"
            },
            {
              "textRaw": "Event: 'error'",
              "type": "event",
              "name": "error",
              "params": [],
              "desc": "<p>Emitted when an error occurs.\n\n</p>\n"
            }
          ],
          "methods": [
            {
              "textRaw": "watcher.close()",
              "type": "method",
              "name": "close",
              "desc": "<p>Stop watching for changes on the given <code>fs.FSWatcher</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            }
          ]
        },
        {
          "textRaw": "Class: fs.ReadStream",
          "type": "class",
          "name": "fs.ReadStream",
          "desc": "<p><code>ReadStream</code> is a [Readable Stream][].\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'open'",
              "type": "event",
              "name": "open",
              "params": [],
              "desc": "<p>Emitted when the ReadStream&#39;s file is opened.\n\n</p>\n"
            }
          ],
          "properties": [
            {
              "textRaw": "https://nodejs.org/dist/latest-v5.x/docs/api/readStream.path",
              "name": "path",
              "desc": "<p>The path to the file the stream is reading from.\n\n</p>\n"
            }
          ]
        },
        {
          "textRaw": "Class: fs.Stats",
          "type": "class",
          "name": "fs.Stats",
          "desc": "<p>Objects returned from [<code>fs.stat()</code>][], [<code>fs.lstat()</code>][] and [<code>fs.fstat()</code>][] and their\nsynchronous counterparts are of this type.\n\n</p>\n<ul>\n<li><code>stats.isFile()</code></li>\n<li><code>stats.isDirectory()</code></li>\n<li><code>stats.isBlockDevice()</code></li>\n<li><code>stats.isCharacterDevice()</code></li>\n<li><code>stats.isSymbolicLink()</code> (only valid with [<code>fs.lstat()</code>][])</li>\n<li><code>stats.isFIFO()</code></li>\n<li><code>stats.isSocket()</code></li>\n</ul>\n<p>For a regular file [<code>util.inspect(stats)</code>][] would return a string very\nsimilar to this:\n\n</p>\n<pre><code class=\"js\">{\n  dev: 2114,\n  ino: 48064969,\n  mode: 33188,\n  nlink: 1,\n  uid: 85,\n  gid: 100,\n  rdev: 0,\n  size: 527,\n  blksize: 4096,\n  blocks: 8,\n  atime: Mon, 10 Oct 2011 23:24:11 GMT,\n  mtime: Mon, 10 Oct 2011 23:24:11 GMT,\n  ctime: Mon, 10 Oct 2011 23:24:11 GMT,\n  birthtime: Mon, 10 Oct 2011 23:24:11 GMT\n}</code></pre>\n<p>Please note that <code>atime</code>, <code>mtime</code>, <code>birthtime</code>, and <code>ctime</code> are\ninstances of [<code>Date</code>][MDN-Date] object and to compare the values of\nthese objects you should use appropriate methods. For most general\nuses [<code>getTime()</code>][MDN-Date-getTime] will return the number of\nmilliseconds elapsed since <em>1 January 1970 00:00:00 UTC</em> and this\ninteger should be sufficient for any comparison, however there are\nadditional methods which can be used for displaying fuzzy information.\nMore details can be found in the [MDN JavaScript Reference][MDN-Date]\npage.\n\n</p>\n",
          "modules": [
            {
              "textRaw": "Stat Time Values",
              "name": "stat_time_values",
              "desc": "<p>The times in the stat object have the following semantics:\n\n</p>\n<ul>\n<li><code>atime</code> &quot;Access Time&quot; - Time when file data last accessed.  Changed\nby the <code>mknod(2)</code>, <code>utimes(2)</code>, and <code>read(2)</code> system calls.</li>\n<li><code>mtime</code> &quot;Modified Time&quot; - Time when file data last modified.\nChanged by the <code>mknod(2)</code>, <code>utimes(2)</code>, and <code>write(2)</code> system calls.</li>\n<li><code>ctime</code> &quot;Change Time&quot; - Time when file status was last changed\n(inode data modification).  Changed by the <code>chmod(2)</code>, <code>chown(2)</code>,\n<code>link(2)</code>, <code>mknod(2)</code>, <code>rename(2)</code>, <code>unlink(2)</code>, <code>utimes(2)</code>,\n<code>read(2)</code>, and <code>write(2)</code> system calls.</li>\n<li><code>birthtime</code> &quot;Birth Time&quot; -  Time of file creation. Set once when the\nfile is created.  On filesystems where birthtime is not available,\nthis field may instead hold either the <code>ctime</code> or\n<code>1970-01-01T00:00Z</code> (ie, unix epoch timestamp <code>0</code>). Note that this\nvalue may be greater than <code>atime</code> or <code>mtime</code> in this case. On Darwin\nand other FreeBSD variants, also set if the <code>atime</code> is explicitly\nset to an earlier value than the current <code>birthtime</code> using the\n<code>utimes(2)</code> system call.</li>\n</ul>\n<p>Prior to Node v0.12, the <code>ctime</code> held the <code>birthtime</code> on Windows\nsystems.  Note that as of v0.12, <code>ctime</code> is not &quot;creation time&quot;, and\non Unix systems, it never was.\n\n</p>\n",
              "type": "module",
              "displayName": "Stat Time Values"
            }
          ]
        },
        {
          "textRaw": "Class: fs.WriteStream",
          "type": "class",
          "name": "fs.WriteStream",
          "desc": "<p><code>WriteStream</code> is a [Writable Stream][].\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'open'",
              "type": "event",
              "name": "open",
              "params": [],
              "desc": "<p>Emitted when the WriteStream&#39;s file is opened.\n\n</p>\n"
            }
          ],
          "properties": [
            {
              "textRaw": "writeStream.bytesWritten",
              "name": "bytesWritten",
              "desc": "<p>The number of bytes written so far. Does not include data that is still queued\nfor writing.\n\n</p>\n"
            },
            {
              "textRaw": "https://nodejs.org/dist/latest-v5.x/docs/api/writeStream.path",
              "name": "path",
              "desc": "<p>The path to the file the stream is writing to.\n\n</p>\n"
            }
          ]
        }
      ],
      "methods": [
        {
          "textRaw": "fs.access(path[, mode], callback)",
          "type": "method",
          "name": "access",
          "desc": "<p>Tests a user&#39;s permissions for the file specified by <code>path</code>. <code>mode</code> is an\noptional integer that specifies the accessibility checks to be performed. The\nfollowing constants define the possible values of <code>mode</code>. It is possible to\ncreate a mask consisting of the bitwise OR of two or more values.\n\n</p>\n<ul>\n<li><code>fs.F_OK</code> - File is visible to the calling process. This is useful for\ndetermining if a file exists, but says nothing about <code>rwx</code> permissions.\nDefault if no <code>mode</code> is specified.</li>\n<li><code>fs.R_OK</code> - File can be read by the calling process.</li>\n<li><code>fs.W_OK</code> - File can be written by the calling process.</li>\n<li><code>fs.X_OK</code> - File can be executed by the calling process. This has no effect\non Windows (will behave like <code>fs.F_OK</code>).</li>\n</ul>\n<p>The final argument, <code>callback</code>, is a callback function that is invoked with\na possible error argument. If any of the accessibility checks fail, the error\nargument will be populated. The following example checks if the file\n<code>/etc/passwd</code> can be read and written by the current process.\n\n</p>\n<pre><code class=\"js\">fs.access(&#39;/etc/passwd&#39;, fs.R_OK | fs.W_OK, (err) =&gt; {\n  console.log(err ? &#39;no access!&#39; : &#39;can read/write&#39;);\n});</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "mode",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.accessSync(path[, mode])",
          "type": "method",
          "name": "accessSync",
          "desc": "<p>Synchronous version of [<code>fs.access()</code>][]. This throws if any accessibility checks\nfail, and does nothing otherwise.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "mode",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.appendFile(file, data[, options], callback)",
          "type": "method",
          "name": "appendFile",
          "signatures": [
            {
              "params": [
                {
                  "textRaw": "`file` {String|Number} filename or file descriptor ",
                  "name": "file",
                  "type": "String|Number",
                  "desc": "filename or file descriptor"
                },
                {
                  "textRaw": "`data` {String|Buffer} ",
                  "name": "data",
                  "type": "String|Buffer"
                },
                {
                  "textRaw": "`options` {Object|String} ",
                  "options": [
                    {
                      "textRaw": "`encoding` {String|Null} default = `'utf8'` ",
                      "name": "encoding",
                      "type": "String|Null",
                      "desc": "default = `'utf8'`"
                    },
                    {
                      "textRaw": "`mode` {Number} default = `0o666` ",
                      "name": "mode",
                      "type": "Number",
                      "desc": "default = `0o666`"
                    },
                    {
                      "textRaw": "`flag` {String} default = `'a'` ",
                      "name": "flag",
                      "type": "String",
                      "desc": "default = `'a'`"
                    }
                  ],
                  "name": "options",
                  "type": "Object|String",
                  "optional": true
                },
                {
                  "textRaw": "`callback` {Function} ",
                  "name": "callback",
                  "type": "Function"
                }
              ]
            },
            {
              "params": [
                {
                  "name": "file"
                },
                {
                  "name": "data"
                },
                {
                  "name": "options",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ],
          "desc": "<p>Asynchronously append data to a file, creating the file if it does not yet exist.\n<code>data</code> can be a string or a buffer.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">fs.appendFile(&#39;message.txt&#39;, &#39;data to append&#39;, (err) =&gt; {\n  if (err) throw err;\n  console.log(&#39;The &quot;data to append&quot; was appended to file!&#39;);\n});</code></pre>\n<p>If <code>options</code> is a string, then it specifies the encoding. Example:\n\n</p>\n<pre><code class=\"js\">fs.appendFile(&#39;message.txt&#39;, &#39;data to append&#39;, &#39;utf8&#39;, callback);</code></pre>\n<p>Any specified file descriptor has to have been opened for appending.\n\n</p>\n<p><em>Note: Specified file descriptors will not be closed automatically.</em>\n\n</p>\n"
        },
        {
          "textRaw": "fs.appendFileSync(file, data[, options])",
          "type": "method",
          "name": "appendFileSync",
          "desc": "<p>The synchronous version of [<code>fs.appendFile()</code>][]. Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "file"
                },
                {
                  "name": "data"
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
          "textRaw": "fs.chmod(path, mode, callback)",
          "type": "method",
          "name": "chmod",
          "desc": "<p>Asynchronous chmod(2). No arguments other than a possible exception are given\nto the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "mode"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.chmodSync(path, mode)",
          "type": "method",
          "name": "chmodSync",
          "desc": "<p>Synchronous chmod(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "mode"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.chown(path, uid, gid, callback)",
          "type": "method",
          "name": "chown",
          "desc": "<p>Asynchronous chown(2). No arguments other than a possible exception are given\nto the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "uid"
                },
                {
                  "name": "gid"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.chownSync(path, uid, gid)",
          "type": "method",
          "name": "chownSync",
          "desc": "<p>Synchronous chown(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "uid"
                },
                {
                  "name": "gid"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.close(fd, callback)",
          "type": "method",
          "name": "close",
          "desc": "<p>Asynchronous close(2).  No arguments other than a possible exception are given\nto the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.closeSync(fd)",
          "type": "method",
          "name": "closeSync",
          "desc": "<p>Synchronous close(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.createReadStream(path[, options])",
          "type": "method",
          "name": "createReadStream",
          "desc": "<p>Returns a new [<code>ReadStream</code>][] object. (See [Readable Stream][]).\n\n</p>\n<p>Be aware that, unlike the default value set for <code>highWaterMark</code> on a\nreadable stream (16 kb), the stream returned by this method has a\ndefault value of 64 kb for the same parameter.\n\n</p>\n<p><code>options</code> is an object or string with the following defaults:\n\n</p>\n<pre><code class=\"js\">{\n  flags: &#39;r&#39;,\n  encoding: null,\n  fd: null,\n  mode: 0o666,\n  autoClose: true\n}</code></pre>\n<p><code>options</code> can include <code>start</code> and <code>end</code> values to read a range of bytes from\nthe file instead of the entire file.  Both <code>start</code> and <code>end</code> are inclusive and\nstart at 0. The <code>encoding</code> can be any one of those accepted by [<code>Buffer</code>][].\n\n</p>\n<p>If <code>fd</code> is specified, <code>ReadStream</code> will ignore the <code>path</code> argument and will use\nthe specified file descriptor. This means that no <code>&#39;open&#39;</code> event will be emitted.\nNote that <code>fd</code> should be blocking; non-blocking <code>fd</code>s should be passed to\n[<code>net.Socket</code>][].\n\n</p>\n<p>If <code>autoClose</code> is false, then the file descriptor won&#39;t be closed, even if\nthere&#39;s an error.  It is your responsibility to close it and make sure\nthere&#39;s no file descriptor leak.  If <code>autoClose</code> is set to true (default\nbehavior), on <code>error</code> or <code>end</code> the file descriptor will be closed\nautomatically.\n\n</p>\n<p><code>mode</code> sets the file mode (permission and sticky bits), but only if the\nfile was created.\n\n</p>\n<p>An example to read the last 10 bytes of a file which is 100 bytes long:\n\n</p>\n<pre><code class=\"js\">fs.createReadStream(&#39;sample.txt&#39;, {start: 90, end: 99});</code></pre>\n<p>If <code>options</code> is a string, then it specifies the encoding.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
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
          "textRaw": "fs.createWriteStream(path[, options])",
          "type": "method",
          "name": "createWriteStream",
          "desc": "<p>Returns a new [<code>WriteStream</code>][] object. (See [Writable Stream][]).\n\n</p>\n<p><code>options</code> is an object or string with the following defaults:\n\n</p>\n<pre><code class=\"js\">{\n  flags: &#39;w&#39;,\n  defaultEncoding: &#39;utf8&#39;,\n  fd: null,\n  mode: 0o666,\n  autoClose: true\n}</code></pre>\n<p><code>options</code> may also include a <code>start</code> option to allow writing data at\nsome position past the beginning of the file.  Modifying a file rather\nthan replacing it may require a <code>flags</code> mode of <code>r+</code> rather than the\ndefault mode <code>w</code>. The <code>defaultEncoding</code> can be any one of those accepted by [<code>Buffer</code>][].\n\n</p>\n<p>If <code>autoClose</code> is set to true (default behavior) on <code>error</code> or <code>end</code>\nthe file descriptor will be closed automatically. If <code>autoClose</code> is false,\nthen the file descriptor won&#39;t be closed, even if there&#39;s an error.\nIt is your responsibility to close it and make sure\nthere&#39;s no file descriptor leak.\n\n</p>\n<p>Like [<code>ReadStream</code>][], if <code>fd</code> is specified, <code>WriteStream</code> will ignore the\n<code>path</code> argument and will use the specified file descriptor. This means that no\n<code>&#39;open&#39;</code> event will be emitted. Note that <code>fd</code> should be blocking; non-blocking\n<code>fd</code>s should be passed to [<code>net.Socket</code>][].\n\n</p>\n<p>If <code>options</code> is a string, then it specifies the encoding.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
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
          "textRaw": "fs.exists(path, callback)",
          "type": "method",
          "name": "exists",
          "stability": 0,
          "stabilityText": "Deprecated: Use [`fs.stat()`][] or [`fs.access()`][] instead.",
          "desc": "<p>Test whether or not the given path exists by checking with the file system.\nThen call the <code>callback</code> argument with either true or false.  Example:\n\n</p>\n<pre><code class=\"js\">fs.exists(&#39;/etc/passwd&#39;, (exists) =&gt; {\n  console.log(exists ? &#39;it\\&#39;s there&#39; : &#39;no passwd!&#39;);\n});</code></pre>\n<p><code>fs.exists()</code> should not be used to check if a file exists before calling\n<code>fs.open()</code>. Doing so introduces a race condition since other processes may\nchange the file&#39;s state between the two calls. Instead, user code should\ncall <code>fs.open()</code> directly and handle the error raised if the file is\nnon-existent.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.existsSync(path)",
          "type": "method",
          "name": "existsSync",
          "stability": 0,
          "stabilityText": "Deprecated: Use [`fs.statSync()`][] or [`fs.accessSync()`][] instead.",
          "desc": "<p>Synchronous version of [<code>fs.exists()</code>][].\nReturns <code>true</code> if the file exists, <code>false</code> otherwise.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fchmod(fd, mode, callback)",
          "type": "method",
          "name": "fchmod",
          "desc": "<p>Asynchronous fchmod(2). No arguments other than a possible exception\nare given to the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "mode"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fchmodSync(fd, mode)",
          "type": "method",
          "name": "fchmodSync",
          "desc": "<p>Synchronous fchmod(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "mode"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fchown(fd, uid, gid, callback)",
          "type": "method",
          "name": "fchown",
          "desc": "<p>Asynchronous fchown(2). No arguments other than a possible exception are given\nto the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "uid"
                },
                {
                  "name": "gid"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fchownSync(fd, uid, gid)",
          "type": "method",
          "name": "fchownSync",
          "desc": "<p>Synchronous fchown(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "uid"
                },
                {
                  "name": "gid"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fdatasync(fd, callback)",
          "type": "method",
          "name": "fdatasync",
          "desc": "<p>Asynchronous fdatasync(2). No arguments other than a possible exception are\ngiven to the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fdatasyncSync(fd)",
          "type": "method",
          "name": "fdatasyncSync",
          "desc": "<p>Synchronous fdatasync(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fstat(fd, callback)",
          "type": "method",
          "name": "fstat",
          "desc": "<p>Asynchronous fstat(2). The callback gets two arguments <code>(err, stats)</code> where\n<code>stats</code> is a <code>fs.Stats</code> object. <code>fstat()</code> is identical to [<code>stat()</code>][], except that\nthe file to be stat-ed is specified by the file descriptor <code>fd</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fstatSync(fd)",
          "type": "method",
          "name": "fstatSync",
          "desc": "<p>Synchronous fstat(2). Returns an instance of <code>fs.Stats</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fsync(fd, callback)",
          "type": "method",
          "name": "fsync",
          "desc": "<p>Asynchronous fsync(2). No arguments other than a possible exception are given\nto the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.fsyncSync(fd)",
          "type": "method",
          "name": "fsyncSync",
          "desc": "<p>Synchronous fsync(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.ftruncate(fd, len, callback)",
          "type": "method",
          "name": "ftruncate",
          "desc": "<p>Asynchronous ftruncate(2). No arguments other than a possible exception are\ngiven to the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "len"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.ftruncateSync(fd, len)",
          "type": "method",
          "name": "ftruncateSync",
          "desc": "<p>Synchronous ftruncate(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "len"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.futimes(fd, atime, mtime, callback)",
          "type": "method",
          "name": "futimes",
          "desc": "<p>Change the file timestamps of a file referenced by the supplied file\ndescriptor.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "atime"
                },
                {
                  "name": "mtime"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.futimesSync(fd, atime, mtime)",
          "type": "method",
          "name": "futimesSync",
          "desc": "<p>Synchronous version of [<code>fs.futimes()</code>][]. Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "atime"
                },
                {
                  "name": "mtime"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.lchmod(path, mode, callback)",
          "type": "method",
          "name": "lchmod",
          "desc": "<p>Asynchronous lchmod(2). No arguments other than a possible exception\nare given to the completion callback.\n\n</p>\n<p>Only available on Mac OS X.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "mode"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.lchmodSync(path, mode)",
          "type": "method",
          "name": "lchmodSync",
          "desc": "<p>Synchronous lchmod(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "mode"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.lchown(path, uid, gid, callback)",
          "type": "method",
          "name": "lchown",
          "desc": "<p>Asynchronous lchown(2). No arguments other than a possible exception are given\nto the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "uid"
                },
                {
                  "name": "gid"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.lchownSync(path, uid, gid)",
          "type": "method",
          "name": "lchownSync",
          "desc": "<p>Synchronous lchown(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "uid"
                },
                {
                  "name": "gid"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.link(srcpath, dstpath, callback)",
          "type": "method",
          "name": "link",
          "desc": "<p>Asynchronous link(2). No arguments other than a possible exception are given to\nthe completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "srcpath"
                },
                {
                  "name": "dstpath"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.linkSync(srcpath, dstpath)",
          "type": "method",
          "name": "linkSync",
          "desc": "<p>Synchronous link(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "srcpath"
                },
                {
                  "name": "dstpath"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.lstat(path, callback)",
          "type": "method",
          "name": "lstat",
          "desc": "<p>Asynchronous lstat(2). The callback gets two arguments <code>(err, stats)</code> where\n<code>stats</code> is a <code>fs.Stats</code> object. <code>lstat()</code> is identical to <code>stat()</code>, except that if\n<code>path</code> is a symbolic link, then the link itself is stat-ed, not the file that it\nrefers to.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.lstatSync(path)",
          "type": "method",
          "name": "lstatSync",
          "desc": "<p>Synchronous lstat(2). Returns an instance of <code>fs.Stats</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.mkdir(path[, mode], callback)",
          "type": "method",
          "name": "mkdir",
          "desc": "<p>Asynchronous mkdir(2). No arguments other than a possible exception are given\nto the completion callback. <code>mode</code> defaults to <code>0o777</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "mode",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.mkdirSync(path[, mode])",
          "type": "method",
          "name": "mkdirSync",
          "desc": "<p>Synchronous mkdir(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "mode",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.mkdtemp(prefix, callback)",
          "type": "method",
          "name": "mkdtemp",
          "desc": "<p>Creates a unique temporary directory.\n\n</p>\n<p>Generates six random characters to be appended behind a required\n<code>prefix</code> to create a unique temporary directory.\n\n</p>\n<p>The created folder path is passed as a string to the callback&#39;s second\nparameter.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">fs.mkdtemp(&#39;/tmp/foo-&#39;, (err, folder) =&gt; {\n  console.log(folder);\n    // Prints: /tmp/foo-itXde2\n});</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "prefix"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.mkdtempSync(template)",
          "type": "method",
          "name": "mkdtempSync",
          "desc": "<p>The synchronous version of [<code>fs.mkdtemp()</code>][]. Returns the created\nfolder path.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "template"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.open(path, flags[, mode], callback)",
          "type": "method",
          "name": "open",
          "desc": "<p>Asynchronous file open. See open(2). <code>flags</code> can be:\n\n</p>\n<ul>\n<li><p><code>&#39;r&#39;</code> - Open file for reading.\nAn exception occurs if the file does not exist.</p>\n</li>\n<li><p><code>&#39;r+&#39;</code> - Open file for reading and writing.\nAn exception occurs if the file does not exist.</p>\n</li>\n<li><p><code>&#39;rs&#39;</code> - Open file for reading in synchronous mode. Instructs the operating\nsystem to bypass the local file system cache.</p>\n<p>This is primarily useful for opening files on NFS mounts as it allows you to\nskip the potentially stale local cache. It has a very real impact on I/O\nperformance so don&#39;t use this flag unless you need it.</p>\n<p>Note that this doesn&#39;t turn <code>fs.open()</code> into a synchronous blocking call.\nIf that&#39;s what you want then you should be using <code>fs.openSync()</code></p>\n</li>\n<li><p><code>&#39;rs+&#39;</code> - Open file for reading and writing, telling the OS to open it\nsynchronously. See notes for <code>&#39;rs&#39;</code> about using this with caution.</p>\n</li>\n<li><p><code>&#39;w&#39;</code> - Open file for writing.\nThe file is created (if it does not exist) or truncated (if it exists).</p>\n</li>\n<li><p><code>&#39;wx&#39;</code> - Like <code>&#39;w&#39;</code> but fails if <code>path</code> exists.</p>\n</li>\n<li><p><code>&#39;w+&#39;</code> - Open file for reading and writing.\nThe file is created (if it does not exist) or truncated (if it exists).</p>\n</li>\n<li><p><code>&#39;wx+&#39;</code> - Like <code>&#39;w+&#39;</code> but fails if <code>path</code> exists.</p>\n</li>\n<li><p><code>&#39;a&#39;</code> - Open file for appending.\nThe file is created if it does not exist.</p>\n</li>\n<li><p><code>&#39;ax&#39;</code> - Like <code>&#39;a&#39;</code> but fails if <code>path</code> exists.</p>\n</li>\n<li><p><code>&#39;a+&#39;</code> - Open file for reading and appending.\nThe file is created if it does not exist.</p>\n</li>\n<li><p><code>&#39;ax+&#39;</code> - Like <code>&#39;a+&#39;</code> but fails if <code>path</code> exists.</p>\n</li>\n</ul>\n<p><code>mode</code> sets the file mode (permission and sticky bits), but only if the file was\ncreated. It defaults to <code>0666</code>, readable and writable.\n\n</p>\n<p>The callback gets two arguments <code>(err, fd)</code>.\n\n</p>\n<p>The exclusive flag <code>&#39;x&#39;</code> (<code>O_EXCL</code> flag in open(2)) ensures that <code>path</code> is newly\ncreated. On POSIX systems, <code>path</code> is considered to exist even if it is a symlink\nto a non-existent file. The exclusive flag may or may not work with network file\nsystems.\n\n</p>\n<p><code>flags</code> can also be a number as documented by open(2); commonly used constants\nare available from <code>require(&#39;constants&#39;)</code>.  On Windows, flags are translated to\ntheir equivalent ones where applicable, e.g. <code>O_WRONLY</code> to <code>FILE_GENERIC_WRITE</code>,\nor <code>O_EXCL|O_CREAT</code> to <code>CREATE_NEW</code>, as accepted by CreateFileW.\n\n</p>\n<p>On Linux, positional writes don&#39;t work when the file is opened in append mode.\nThe kernel ignores the position argument and always appends the data to\nthe end of the file.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "flags"
                },
                {
                  "name": "mode",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.openSync(path, flags[, mode])",
          "type": "method",
          "name": "openSync",
          "desc": "<p>Synchronous version of [<code>fs.open()</code>][]. Returns an integer representing the file\ndescriptor.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "flags"
                },
                {
                  "name": "mode",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.read(fd, buffer, offset, length, position, callback)",
          "type": "method",
          "name": "read",
          "desc": "<p>Read data from the file specified by <code>fd</code>.\n\n</p>\n<p><code>buffer</code> is the buffer that the data will be written to.\n\n</p>\n<p><code>offset</code> is the offset in the buffer to start writing at.\n\n</p>\n<p><code>length</code> is an integer specifying the number of bytes to read.\n\n</p>\n<p><code>position</code> is an integer specifying where to begin reading from in the file.\nIf <code>position</code> is <code>null</code>, data will be read from the current file position.\n\n</p>\n<p>The callback is given the three arguments, <code>(err, bytesRead, buffer)</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "buffer"
                },
                {
                  "name": "offset"
                },
                {
                  "name": "length"
                },
                {
                  "name": "position"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.readdir(path, callback)",
          "type": "method",
          "name": "readdir",
          "desc": "<p>Asynchronous readdir(3).  Reads the contents of a directory.\nThe callback gets two arguments <code>(err, files)</code> where <code>files</code> is an array of\nthe names of the files in the directory excluding <code>&#39;.&#39;</code> and <code>&#39;..&#39;</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.readdirSync(path)",
          "type": "method",
          "name": "readdirSync",
          "desc": "<p>Synchronous readdir(3). Returns an array of filenames excluding <code>&#39;.&#39;</code> and\n<code>&#39;..&#39;</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.readFile(file[, options], callback)",
          "type": "method",
          "name": "readFile",
          "signatures": [
            {
              "params": [
                {
                  "textRaw": "`file` {String | Integer} filename or file descriptor ",
                  "name": "file",
                  "type": "String | Integer",
                  "desc": "filename or file descriptor"
                },
                {
                  "textRaw": "`options` {Object | String} ",
                  "options": [
                    {
                      "textRaw": "`encoding` {String | Null} default = `null` ",
                      "name": "encoding",
                      "type": "String | Null",
                      "desc": "default = `null`"
                    },
                    {
                      "textRaw": "`flag` {String} default = `'r'` ",
                      "name": "flag",
                      "type": "String",
                      "desc": "default = `'r'`"
                    }
                  ],
                  "name": "options",
                  "type": "Object | String",
                  "optional": true
                },
                {
                  "textRaw": "`callback` {Function} ",
                  "name": "callback",
                  "type": "Function"
                }
              ]
            },
            {
              "params": [
                {
                  "name": "file"
                },
                {
                  "name": "options",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ],
          "desc": "<p>Asynchronously reads the entire contents of a file. Example:\n\n</p>\n<pre><code class=\"js\">fs.readFile(&#39;/etc/passwd&#39;, (err, data) =&gt; {\n  if (err) throw err;\n  console.log(data);\n});</code></pre>\n<p>The callback is passed two arguments <code>(err, data)</code>, where <code>data</code> is the\ncontents of the file.\n\n</p>\n<p>If no encoding is specified, then the raw buffer is returned.\n\n</p>\n<p>If <code>options</code> is a string, then it specifies the encoding. Example:\n\n</p>\n<pre><code class=\"js\">fs.readFile(&#39;/etc/passwd&#39;, &#39;utf8&#39;, callback);</code></pre>\n<p>Any specified file descriptor has to support reading.\n\n</p>\n<p><em>Note: Specified file descriptors will not be closed automatically.</em>\n\n</p>\n"
        },
        {
          "textRaw": "fs.readFileSync(file[, options])",
          "type": "method",
          "name": "readFileSync",
          "desc": "<p>Synchronous version of [<code>fs.readFile</code>][]. Returns the contents of the <code>file</code>.\n\n</p>\n<p>If the <code>encoding</code> option is specified then this function returns a\nstring. Otherwise it returns a buffer.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "file"
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
          "textRaw": "fs.readlink(path, callback)",
          "type": "method",
          "name": "readlink",
          "desc": "<p>Asynchronous readlink(2). The callback gets two arguments <code>(err,\nlinkString)</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.readlinkSync(path)",
          "type": "method",
          "name": "readlinkSync",
          "desc": "<p>Synchronous readlink(2). Returns the symbolic link&#39;s string value.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.realpath(path[, cache], callback)",
          "type": "method",
          "name": "realpath",
          "desc": "<p>Asynchronous realpath(2). The <code>callback</code> gets two arguments <code>(err,\nresolvedPath)</code>. May use <code>process.cwd</code> to resolve relative paths. <code>cache</code> is an\nobject literal of mapped paths that can be used to force a specific path\nresolution or avoid additional <code>fs.stat</code> calls for known real paths.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">var cache = {&#39;/etc&#39;:&#39;/private/etc&#39;};\nfs.realpath(&#39;/etc/passwd&#39;, cache, (err, resolvedPath) =&gt; {\n  if (err) throw err;\n  console.log(resolvedPath);\n});</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "cache",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.readSync(fd, buffer, offset, length, position)",
          "type": "method",
          "name": "readSync",
          "desc": "<p>Synchronous version of [<code>fs.read()</code>][]. Returns the number of <code>bytesRead</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "buffer"
                },
                {
                  "name": "offset"
                },
                {
                  "name": "length"
                },
                {
                  "name": "position"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.realpathSync(path[, cache])",
          "type": "method",
          "name": "realpathSync",
          "desc": "<p>Synchronous realpath(2). Returns the resolved path. <code>cache</code> is an\nobject literal of mapped paths that can be used to force a specific path\nresolution or avoid additional <code>fs.stat</code> calls for known real paths.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "cache",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.rename(oldPath, newPath, callback)",
          "type": "method",
          "name": "rename",
          "desc": "<p>Asynchronous rename(2). No arguments other than a possible exception are given\nto the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "oldPath"
                },
                {
                  "name": "newPath"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.renameSync(oldPath, newPath)",
          "type": "method",
          "name": "renameSync",
          "desc": "<p>Synchronous rename(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "oldPath"
                },
                {
                  "name": "newPath"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.rmdir(path, callback)",
          "type": "method",
          "name": "rmdir",
          "desc": "<p>Asynchronous rmdir(2). No arguments other than a possible exception are given\nto the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.rmdirSync(path)",
          "type": "method",
          "name": "rmdirSync",
          "desc": "<p>Synchronous rmdir(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.stat(path, callback)",
          "type": "method",
          "name": "stat",
          "desc": "<p>Asynchronous stat(2). The callback gets two arguments <code>(err, stats)</code> where\n<code>stats</code> is a [<code>fs.Stats</code>][] object.  See the [<code>fs.Stats</code>][] section for more\ninformation.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.statSync(path)",
          "type": "method",
          "name": "statSync",
          "desc": "<p>Synchronous stat(2). Returns an instance of [<code>fs.Stats</code>][].\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.symlink(target, path[, type], callback)",
          "type": "method",
          "name": "symlink",
          "desc": "<p>Asynchronous symlink(2). No arguments other than a possible exception are given\nto the completion callback.\nThe <code>type</code> argument can be set to <code>&#39;dir&#39;</code>, <code>&#39;file&#39;</code>, or <code>&#39;junction&#39;</code> (default\nis <code>&#39;file&#39;</code>) and is only available on Windows (ignored on other platforms).\nNote that Windows junction points require the destination path to be absolute.  When using\n<code>&#39;junction&#39;</code>, the <code>target</code> argument will automatically be normalized to absolute path.\n\n</p>\n<p>Here is an example below:\n\n</p>\n<pre><code class=\"js\">fs.symlink(&#39;./foo&#39;, &#39;./new-port&#39;);</code></pre>\n<p>It creates a symbolic link named &quot;new-port&quot; that points to &quot;foo&quot;.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "target"
                },
                {
                  "name": "path"
                },
                {
                  "name": "type",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.symlinkSync(target, path[, type])",
          "type": "method",
          "name": "symlinkSync",
          "desc": "<p>Synchronous symlink(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "target"
                },
                {
                  "name": "path"
                },
                {
                  "name": "type",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.truncate(path, len, callback)",
          "type": "method",
          "name": "truncate",
          "desc": "<p>Asynchronous truncate(2). No arguments other than a possible exception are\ngiven to the completion callback. A file descriptor can also be passed as the\nfirst argument. In this case, <code>fs.ftruncate()</code> is called.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "len"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.truncateSync(path, len)",
          "type": "method",
          "name": "truncateSync",
          "desc": "<p>Synchronous truncate(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "len"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.unlink(path, callback)",
          "type": "method",
          "name": "unlink",
          "desc": "<p>Asynchronous unlink(2). No arguments other than a possible exception are given\nto the completion callback.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.unlinkSync(path)",
          "type": "method",
          "name": "unlinkSync",
          "desc": "<p>Synchronous unlink(2). Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.unwatchFile(filename[, listener])",
          "type": "method",
          "name": "unwatchFile",
          "desc": "<p>Stop watching for changes on <code>filename</code>. If <code>listener</code> is specified, only that\nparticular listener is removed. Otherwise, <em>all</em> listeners are removed and you\nhave effectively stopped watching <code>filename</code>.\n\n</p>\n<p>Calling <code>fs.unwatchFile()</code> with a filename that is not being watched is a\nno-op, not an error.\n\n</p>\n<p><em>Note: [<code>fs.watch()</code>][] is more efficient than <code>fs.watchFile()</code> and <code>fs.unwatchFile()</code>.\n<code>fs.watch()</code> should be used instead of <code>fs.watchFile()</code> and <code>fs.unwatchFile()</code>\nwhen possible.</em>\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "filename"
                },
                {
                  "name": "listener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.utimes(path, atime, mtime, callback)",
          "type": "method",
          "name": "utimes",
          "desc": "<p>Change file timestamps of the file referenced by the supplied path.\n\n</p>\n<p>Note: the arguments <code>atime</code> and <code>mtime</code> of the following related functions does\nfollow the below rules:\n\n</p>\n<ul>\n<li>If the value is a numberable string like <code>&#39;123456789&#39;</code>, the value would get\nconverted to corresponding number.</li>\n<li>If the value is <code>NaN</code> or <code>Infinity</code>, the value would get converted to\n<code>Date.now()</code>.</li>\n</ul>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "atime"
                },
                {
                  "name": "mtime"
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.utimesSync(path, atime, mtime)",
          "type": "method",
          "name": "utimesSync",
          "desc": "<p>Synchronous version of [<code>fs.utimes()</code>][]. Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "atime"
                },
                {
                  "name": "mtime"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.watch(filename[, options][, listener])",
          "type": "method",
          "name": "watch",
          "desc": "<p>Watch for changes on <code>filename</code>, where <code>filename</code> is either a file or a\ndirectory.  The returned object is a [<code>fs.FSWatcher</code>][].\n\n</p>\n<p>The second argument is optional. The <code>options</code> if provided should be an object.\nThe supported boolean members are <code>persistent</code> and <code>recursive</code>. <code>persistent</code>\nindicates whether the process should continue to run as long as files are being\nwatched. <code>recursive</code> indicates whether all subdirectories should be watched, or\nonly the current directory. This applies when a directory is specified, and only\non supported platforms (See [Caveats][]).\n\n</p>\n<p>The default is <code>{ persistent: true, recursive: false }</code>.\n\n</p>\n<p>The listener callback gets two arguments <code>(event, filename)</code>.  <code>event</code> is either\n<code>&#39;rename&#39;</code> or <code>&#39;change&#39;</code>, and <code>filename</code> is the name of the file which triggered\nthe event.\n\n</p>\n",
          "miscs": [
            {
              "textRaw": "Caveats",
              "name": "Caveats",
              "type": "misc",
              "desc": "<p>The <code>fs.watch</code> API is not 100% consistent across platforms, and is\nunavailable in some situations.\n\n</p>\n<p>The recursive option is only supported on OS X and Windows.\n\n</p>\n",
              "miscs": [
                {
                  "textRaw": "Availability",
                  "name": "Availability",
                  "type": "misc",
                  "desc": "<p>This feature depends on the underlying operating system providing a way\nto be notified of filesystem changes.\n\n</p>\n<ul>\n<li>On Linux systems, this uses <code>inotify</code>.</li>\n<li>On BSD systems, this uses <code>kqueue</code>.</li>\n<li>On OS X, this uses <code>kqueue</code> for files and &#39;FSEvents&#39; for directories.</li>\n<li>On SunOS systems (including Solaris and SmartOS), this uses <code>event ports</code>.</li>\n<li>On Windows systems, this feature depends on <code>ReadDirectoryChangesW</code>.</li>\n</ul>\n<p>If the underlying functionality is not available for some reason, then\n<code>fs.watch</code> will not be able to function.  For example, watching files or\ndirectories on network file systems (NFS, SMB, etc.) often doesn&#39;t work\nreliably or at all.\n\n</p>\n<p>You can still use <code>fs.watchFile</code>, which uses stat polling, but it is slower and\nless reliable.\n\n</p>\n"
                },
                {
                  "textRaw": "Inodes",
                  "name": "Inodes",
                  "type": "misc",
                  "desc": "<p>On Linux and OS X systems, <code>fs.watch()</code> resolves the path to an [inode][] and\nwatches the inode. If the watched path is deleted and recreated, it is assigned\na new inode. The watch will emit an event for the delete but will continue\nwatching the <em>original</em> inode. Events for the new inode will not be emitted.\nThis is expected behavior.\n\n</p>\n"
                },
                {
                  "textRaw": "Filename Argument",
                  "name": "Filename Argument",
                  "type": "misc",
                  "desc": "<p>Providing <code>filename</code> argument in the callback is only supported on Linux and\nWindows.  Even on supported platforms, <code>filename</code> is not always guaranteed to\nbe provided. Therefore, don&#39;t assume that <code>filename</code> argument is always\nprovided in the callback, and have some fallback logic if it is null.\n\n</p>\n<pre><code class=\"js\">fs.watch(&#39;somedir&#39;, (event, filename) =&gt; {\n  console.log(`event is: ${event}`);\n  if (filename) {\n    console.log(`filename provided: ${filename}`);\n  } else {\n    console.log(&#39;filename not provided&#39;);\n  }\n});</code></pre>\n"
                }
              ]
            }
          ],
          "signatures": [
            {
              "params": [
                {
                  "name": "filename"
                },
                {
                  "name": "options",
                  "optional": true
                },
                {
                  "name": "listener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.watchFile(filename[, options], listener)",
          "type": "method",
          "name": "watchFile",
          "desc": "<p>Watch for changes on <code>filename</code>. The callback <code>listener</code> will be called each\ntime the file is accessed.\n\n</p>\n<p>The <code>options</code> argument may be omitted. If provided, it should be an object. The\n<code>options</code> object may contain a boolean named <code>persistent</code> that indicates\nwhether the process should continue to run as long as files are being watched.\nThe <code>options</code> object may specify an <code>interval</code> property indicating how often the\ntarget should be polled in milliseconds. The default is\n<code>{ persistent: true, interval: 5007 }</code>.\n\n</p>\n<p>The <code>listener</code> gets two arguments the current stat object and the previous\nstat object:\n\n</p>\n<pre><code class=\"js\">fs.watchFile(&#39;message.text&#39;, (curr, prev) =&gt; {\n  console.log(`the current mtime is: ${curr.mtime}`);\n  console.log(`the previous mtime was: ${prev.mtime}`);\n});</code></pre>\n<p>These stat objects are instances of <code>fs.Stat</code>.\n\n</p>\n<p>If you want to be notified when the file was modified, not just accessed,\nyou need to compare <code>curr.mtime</code> and <code>prev.mtime</code>.\n\n</p>\n<p><em>Note: when an <code>fs.watchFile</code> operation results in an <code>ENOENT</code> error, it will\n invoke the listener once, with all the fields zeroed (or, for dates, the Unix\n Epoch). In Windows, <code>blksize</code> and <code>blocks</code> fields will be <code>undefined</code>, instead\n of zero. If the file is created later on, the listener will be called again,\n with the latest stat objects. This is a change in functionality since v0.10.</em>\n\n</p>\n<p><em>Note: [<code>fs.watch()</code>][] is more efficient than <code>fs.watchFile</code> and <code>fs.unwatchFile</code>.\n<code>fs.watch</code> should be used instead of <code>fs.watchFile</code> and <code>fs.unwatchFile</code>\nwhen possible.</em>\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "filename"
                },
                {
                  "name": "options",
                  "optional": true
                },
                {
                  "name": "listener"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.write(fd, buffer, offset, length[, position], callback)",
          "type": "method",
          "name": "write",
          "desc": "<p>Write <code>buffer</code> to the file specified by <code>fd</code>.\n\n</p>\n<p><code>offset</code> and <code>length</code> determine the part of the buffer to be written.\n\n</p>\n<p><code>position</code> refers to the offset from the beginning of the file where this data\nshould be written. If <code>typeof position !== &#39;number&#39;</code>, the data will be written\nat the current position. See pwrite(2).\n\n</p>\n<p>The callback will be given three arguments <code>(err, written, buffer)</code> where\n<code>written</code> specifies how many <em>bytes</em> were written from <code>buffer</code>.\n\n</p>\n<p>Note that it is unsafe to use <code>fs.write</code> multiple times on the same file\nwithout waiting for the callback. For this scenario,\n<code>fs.createWriteStream</code> is strongly recommended.\n\n</p>\n<p>On Linux, positional writes don&#39;t work when the file is opened in append mode.\nThe kernel ignores the position argument and always appends the data to\nthe end of the file.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "buffer"
                },
                {
                  "name": "offset"
                },
                {
                  "name": "length"
                },
                {
                  "name": "position",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.write(fd, data[, position[, encoding]], callback)",
          "type": "method",
          "name": "write",
          "desc": "<p>Write <code>data</code> to the file specified by <code>fd</code>.  If <code>data</code> is not a Buffer instance\nthen the value will be coerced to a string.\n\n</p>\n<p><code>position</code> refers to the offset from the beginning of the file where this data\nshould be written. If <code>typeof position !== &#39;number&#39;</code> the data will be written at\nthe current position. See pwrite(2).\n\n</p>\n<p><code>encoding</code> is the expected string encoding.\n\n</p>\n<p>The callback will receive the arguments <code>(err, written, string)</code> where <code>written</code>\nspecifies how many <em>bytes</em> the passed string required to be written. Note that\nbytes written is not the same as string characters. See [<code>Buffer.byteLength</code>][].\n\n</p>\n<p>Unlike when writing <code>buffer</code>, the entire string must be written. No substring\nmay be specified. This is because the byte offset of the resulting data may not\nbe the same as the string offset.\n\n</p>\n<p>Note that it is unsafe to use <code>fs.write</code> multiple times on the same file\nwithout waiting for the callback. For this scenario,\n<code>fs.createWriteStream</code> is strongly recommended.\n\n</p>\n<p>On Linux, positional writes don&#39;t work when the file is opened in append mode.\nThe kernel ignores the position argument and always appends the data to\nthe end of the file.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "data"
                },
                {
                  "name": "position",
                  "optional": true
                },
                {
                  "name": "encoding",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.writeFile(file, data[, options], callback)",
          "type": "method",
          "name": "writeFile",
          "signatures": [
            {
              "params": [
                {
                  "textRaw": "`file` {String | Integer} filename or file descriptor ",
                  "name": "file",
                  "type": "String | Integer",
                  "desc": "filename or file descriptor"
                },
                {
                  "textRaw": "`data` {String | Buffer} ",
                  "name": "data",
                  "type": "String | Buffer"
                },
                {
                  "textRaw": "`options` {Object | String} ",
                  "options": [
                    {
                      "textRaw": "`encoding` {String | Null} default = `'utf8'` ",
                      "name": "encoding",
                      "type": "String | Null",
                      "desc": "default = `'utf8'`"
                    },
                    {
                      "textRaw": "`mode` {Number} default = `0o666` ",
                      "name": "mode",
                      "type": "Number",
                      "desc": "default = `0o666`"
                    },
                    {
                      "textRaw": "`flag` {String} default = `'w'` ",
                      "name": "flag",
                      "type": "String",
                      "desc": "default = `'w'`"
                    }
                  ],
                  "name": "options",
                  "type": "Object | String",
                  "optional": true
                },
                {
                  "textRaw": "`callback` {Function} ",
                  "name": "callback",
                  "type": "Function"
                }
              ]
            },
            {
              "params": [
                {
                  "name": "file"
                },
                {
                  "name": "data"
                },
                {
                  "name": "options",
                  "optional": true
                },
                {
                  "name": "callback"
                }
              ]
            }
          ],
          "desc": "<p>Asynchronously writes data to a file, replacing the file if it already exists.\n<code>data</code> can be a string or a buffer.\n\n</p>\n<p>The <code>encoding</code> option is ignored if <code>data</code> is a buffer. It defaults\nto <code>&#39;utf8&#39;</code>.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">fs.writeFile(&#39;message.txt&#39;, &#39;Hello Node.js&#39;, (err) =&gt; {\n  if (err) throw err;\n  console.log(&#39;It\\&#39;s saved!&#39;);\n});</code></pre>\n<p>If <code>options</code> is a string, then it specifies the encoding. Example:\n\n</p>\n<pre><code class=\"js\">fs.writeFile(&#39;message.txt&#39;, &#39;Hello Node.js&#39;, &#39;utf8&#39;, callback);</code></pre>\n<p>Any specified file descriptor has to support writing.\n\n</p>\n<p>Note that it is unsafe to use <code>fs.writeFile</code> multiple times on the same file\nwithout waiting for the callback. For this scenario,\n<code>fs.createWriteStream</code> is strongly recommended.\n\n</p>\n<p><em>Note: Specified file descriptors will not be closed automatically.</em>\n\n</p>\n"
        },
        {
          "textRaw": "fs.writeFileSync(file, data[, options])",
          "type": "method",
          "name": "writeFileSync",
          "desc": "<p>The synchronous version of [<code>fs.writeFile()</code>][]. Returns <code>undefined</code>.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "file"
                },
                {
                  "name": "data"
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
          "textRaw": "fs.writeSync(fd, buffer, offset, length[, position])",
          "type": "method",
          "name": "writeSync",
          "desc": "<p>Synchronous versions of [<code>fs.write()</code>][]. Returns the number of bytes written.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "data"
                },
                {
                  "name": "position",
                  "optional": true
                },
                {
                  "name": "encoding",
                  "optional": true
                }
              ]
            },
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "buffer"
                },
                {
                  "name": "offset"
                },
                {
                  "name": "length"
                },
                {
                  "name": "position",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "fs.writeSync(fd, data[, position[, encoding]])",
          "type": "method",
          "name": "writeSync",
          "desc": "<p>Synchronous versions of [<code>fs.write()</code>][]. Returns the number of bytes written.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "fd"
                },
                {
                  "name": "data"
                },
                {
                  "name": "position",
                  "optional": true
                },
                {
                  "name": "encoding",
                  "optional": true
                }
              ]
            }
          ]
        }
      ],
      "type": "module",
      "displayName": "fs"
    }
  ]
}
