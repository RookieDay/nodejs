{
  "source": "https://nodejs.org/dist/latest-v5.x/docs/api/doc/api/net.md",
  "modules": [
    {
      "textRaw": "net",
      "name": "net",
      "stability": 2,
      "stabilityText": "Stable",
      "desc": "<p>The <code>net</code> module provides you with an asynchronous network wrapper. It contains\nfunctions for creating both servers and clients (called streams). You can include\nthis module with <code>require(&#39;net&#39;);</code>.\n\n</p>\n",
      "classes": [
        {
          "textRaw": "Class: net.Server",
          "type": "class",
          "name": "net.Server",
          "desc": "<p>This class is used to create a TCP or local server.\n\n</p>\n<p><code>net.Server</code> is an [<code>EventEmitter</code>][] with the following events:\n\n</p>\n",
          "events": [
            {
              "textRaw": "Event: 'close'",
              "type": "event",
              "name": "close",
              "desc": "<p>Emitted when the server closes. Note that if connections exist, this\nevent is not emitted until all connections are ended.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'connection'",
              "type": "event",
              "name": "connection",
              "params": [],
              "desc": "<p>Emitted when a new connection is made. <code>socket</code> is an instance of\n<code>net.Socket</code>.\n\n</p>\n"
            },
            {
              "textRaw": "Event: 'error'",
              "type": "event",
              "name": "error",
              "params": [],
              "desc": "<p>Emitted when an error occurs.  The [<code>&#39;close&#39;</code>][] event will be called directly\nfollowing this event.  See example in discussion of <code>server.listen</code>.\n\n</p>\n"
            },
            {
              "textRaw": "Event: 'listening'",
              "type": "event",
              "name": "listening",
              "desc": "<p>Emitted when the server has been bound after calling <code>server.listen</code>.\n\n</p>\n",
              "params": []
            }
          ],
          "methods": [
            {
              "textRaw": "server.address()",
              "type": "method",
              "name": "address",
              "desc": "<p>Returns the bound address, the address family name and port of the server\nas reported by the operating system.\nUseful to find which port was assigned when giving getting an OS-assigned address.\nReturns an object with three properties, e.g.\n<code>{ port: 12346, family: &#39;IPv4&#39;, address: &#39;127.0.0.1&#39; }</code>\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">var server = net.createServer((socket) =&gt; {\n  socket.end(&#39;goodbye\\n&#39;);\n}).on(&#39;error&#39;, (err) =&gt; {\n  // handle errors here\n  throw err;\n});\n\n// grab a random port.\nserver.listen(() =&gt; {\n  address = server.address();\n  console.log(&#39;opened server on %j&#39;, address);\n});</code></pre>\n<p>Don&#39;t call <code>server.address()</code> until the <code>&#39;listening&#39;</code> event has been emitted.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "server.close([callback])",
              "type": "method",
              "name": "close",
              "desc": "<p>Stops the server from accepting new connections and keeps existing\nconnections. This function is asynchronous, the server is finally\nclosed when all connections are ended and the server emits a [<code>&#39;close&#39;</code>][] event.\nThe optional <code>callback</code> will be called once the <code>&#39;close&#39;</code> event occurs. Unlike\nthat event, it will be called with an Error as its only argument if the server\nwas not open when it was closed.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "server.getConnections(callback)",
              "type": "method",
              "name": "getConnections",
              "desc": "<p>Asynchronously get the number of concurrent connections on the server. Works\nwhen sockets were sent to forks.\n\n</p>\n<p>Callback should take two arguments <code>err</code> and <code>count</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "callback"
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "server.listen(handle[, backlog][, callback])",
              "type": "method",
              "name": "listen",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`handle` {Object} ",
                      "name": "handle",
                      "type": "Object"
                    },
                    {
                      "textRaw": "`backlog` {Number} ",
                      "name": "backlog",
                      "type": "Number",
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
                      "name": "handle"
                    },
                    {
                      "name": "backlog",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>handle</code> object can be set to either a server or socket (anything\nwith an underlying <code>_handle</code> member), or a <code>{fd: &lt;n&gt;}</code> object.\n\n</p>\n<p>This will cause the server to accept connections on the specified\nhandle, but it is presumed that the file descriptor or handle has\nalready been bound to a port or domain socket.\n\n</p>\n<p>Listening on a file descriptor is not supported on Windows.\n\n</p>\n<p>This function is asynchronous.  When the server has been bound,\n[<code>&#39;listening&#39;</code>][] event will be emitted.\nThe last parameter <code>callback</code> will be added as a listener for the\n[<code>&#39;listening&#39;</code>][] event.\n\n</p>\n<p>The parameter <code>backlog</code> behaves the same as in\n[<code>server.listen(port[, hostname][, backlog][, callback])</code>][<code>server.listen(port, host, backlog, callback)</code>].\n\n</p>\n"
            },
            {
              "textRaw": "server.listen(options[, callback])",
              "type": "method",
              "name": "listen",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`options` {Object} - Required. Supports the following properties: ",
                      "options": [
                        {
                          "textRaw": "`port` {Number} - Optional. ",
                          "name": "port",
                          "type": "Number",
                          "desc": "Optional."
                        },
                        {
                          "textRaw": "`host` {String} - Optional. ",
                          "name": "host",
                          "type": "String",
                          "desc": "Optional."
                        },
                        {
                          "textRaw": "`backlog` {Number} - Optional. ",
                          "name": "backlog",
                          "type": "Number",
                          "desc": "Optional."
                        },
                        {
                          "textRaw": "`path` {String} - Optional. ",
                          "name": "path",
                          "type": "String",
                          "desc": "Optional."
                        },
                        {
                          "textRaw": "`exclusive` {Boolean} - Optional. ",
                          "name": "exclusive",
                          "type": "Boolean",
                          "desc": "Optional."
                        }
                      ],
                      "name": "options",
                      "type": "Object",
                      "desc": "Required. Supports the following properties:"
                    },
                    {
                      "textRaw": "`callback` {Function} - Optional. ",
                      "name": "callback",
                      "type": "Function",
                      "desc": "Optional.",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "options"
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>The <code>port</code>, <code>host</code>, and <code>backlog</code> properties of <code>options</code>, as well as the\noptional callback function, behave as they do on a call to\n[<code>server.listen(port[, hostname][, backlog][, callback])</code>][<code>server.listen(port, host, backlog, callback)</code>].\nAlternatively, the <code>path</code> option can be used to specify a UNIX socket.\n\n</p>\n<p>If <code>exclusive</code> is <code>false</code> (default), then cluster workers will use the same\nunderlying handle, allowing connection handling duties to be shared. When\n<code>exclusive</code> is <code>true</code>, the handle is not shared, and attempted port sharing\nresults in an error. An example which listens on an exclusive port is\nshown below.\n\n</p>\n<pre><code class=\"js\">server.listen({\n  host: &#39;localhost&#39;,\n  port: 80,\n  exclusive: true\n});</code></pre>\n"
            },
            {
              "textRaw": "server.listen(path[, backlog][, callback])",
              "type": "method",
              "name": "listen",
              "signatures": [
                {
                  "params": [
                    {
                      "textRaw": "`path` {String} ",
                      "name": "path",
                      "type": "String"
                    },
                    {
                      "textRaw": "`backlog` {Number} ",
                      "name": "backlog",
                      "type": "Number",
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
                      "name": "path"
                    },
                    {
                      "name": "backlog",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Start a local socket server listening for connections on the given <code>path</code>.\n\n</p>\n<p>This function is asynchronous.  When the server has been bound,\n[<code>&#39;listening&#39;</code>][] event will be emitted.  The last parameter <code>callback</code>\nwill be added as a listener for the [<code>&#39;listening&#39;</code>][] event.\n\n</p>\n<p>On UNIX, the local domain is usually known as the UNIX domain. The path is a\nfilesystem path name. It is subject to the same naming conventions and\npermissions checks as would be done on file creation, will be visible in the\nfilesystem, and will <em>persist until unlinked</em>.\n\n</p>\n<p>On Windows, the local domain is implemented using a named pipe. The path <em>must</em>\nrefer to an entry in <code>\\\\?\\pipe\\</code> or <code>\\\\.\\pipe\\</code>. Any characters are permitted,\nbut the latter may do some processing of pipe names, such as resolving <code>..</code>\nsequences. Despite appearances, the pipe name space is flat.  Pipes will <em>not\npersist</em>, they are removed when the last reference to them is closed. Do not\nforget JavaScript string escaping requires paths to be specified with\ndouble-backslashes, such as:\n\n</p>\n<pre><code>net.createServer().listen(\n    path.join(&#39;\\\\\\\\?\\\\pipe&#39;, process.cwd(), &#39;myctl&#39;))</code></pre>\n<p>The parameter <code>backlog</code> behaves the same as in\n[<code>server.listen(port[, hostname][, backlog][, callback])</code>][<code>server.listen(port, host, backlog, callback)</code>].\n\n</p>\n"
            },
            {
              "textRaw": "server.listen(port[, hostname][, backlog][, callback])",
              "type": "method",
              "name": "listen",
              "desc": "<p>Begin accepting connections on the specified <code>port</code> and <code>hostname</code>. If the\n<code>hostname</code> is omitted, the server will accept connections on any IPv6 address\n(<code>::</code>) when IPv6 is available, or any IPv4 address (<code>0.0.0.0</code>) otherwise. A\nport value of zero will assign a random port.\n\n</p>\n<p>Backlog is the maximum length of the queue of pending connections.\nThe actual length will be determined by your OS through sysctl settings such as\n<code>tcp_max_syn_backlog</code> and <code>somaxconn</code> on linux. The default value of this\nparameter is 511 (not 512).\n\n</p>\n<p>This function is asynchronous.  When the server has been bound,\n[<code>&#39;listening&#39;</code>][] event will be emitted.  The last parameter <code>callback</code>\nwill be added as a listener for the [<code>&#39;listening&#39;</code>][] event.\n\n</p>\n<p>One issue some users run into is getting <code>EADDRINUSE</code> errors. This means that\nanother server is already running on the requested port. One way of handling this\nwould be to wait a second and then try again. This can be done with\n\n</p>\n<pre><code class=\"js\">server.on(&#39;error&#39;, (e) =&gt; {\n  if (e.code == &#39;EADDRINUSE&#39;) {\n    console.log(&#39;Address in use, retrying...&#39;);\n    setTimeout(() =&gt; {\n      server.close();\n      server.listen(PORT, HOST);\n    }, 1000);\n  }\n});</code></pre>\n<p>(Note: All sockets in Node.js set <code>SO_REUSEADDR</code> already)\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "port"
                    },
                    {
                      "name": "hostname",
                      "optional": true
                    },
                    {
                      "name": "backlog",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "server.ref()",
              "type": "method",
              "name": "ref",
              "desc": "<p>Opposite of <code>unref</code>, calling <code>ref</code> on a previously <code>unref</code>d server will <em>not</em>\nlet the program exit if it&#39;s the only server left (the default behavior). If\nthe server is <code>ref</code>d calling <code>ref</code> again will have no effect.\n\n</p>\n<p>Returns <code>server</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "server.unref()",
              "type": "method",
              "name": "unref",
              "desc": "<p>Calling <code>unref</code> on a server will allow the program to exit if this is the only\nactive server in the event system. If the server is already <code>unref</code>d calling\n<code>unref</code> again will have no effect.\n\n</p>\n<p>Returns <code>server</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            }
          ],
          "properties": [
            {
              "textRaw": "server.connections",
              "name": "connections",
              "stability": 0,
              "stabilityText": "Deprecated: Use [`server.getConnections()`][] instead.",
              "desc": "<p>The number of concurrent connections on the server.\n\n</p>\n<p>This becomes <code>null</code> when sending a socket to a child with\n[<code>child_process.fork()</code>][]. To poll forks and get current number of active\nconnections use asynchronous <code>server.getConnections</code> instead.\n\n</p>\n"
            },
            {
              "textRaw": "server.listening",
              "name": "listening",
              "desc": "<p>A Boolean indicating whether or not the server is listening for\nconnections.\n\n</p>\n"
            },
            {
              "textRaw": "server.maxConnections",
              "name": "maxConnections",
              "desc": "<p>Set this property to reject connections when the server&#39;s connection count gets\nhigh.\n\n</p>\n<p>It is not recommended to use this option once a socket has been sent to a child\nwith [<code>child_process.fork()</code>][].\n\n</p>\n"
            }
          ]
        },
        {
          "textRaw": "Class: net.Socket",
          "type": "class",
          "name": "net.Socket",
          "desc": "<p>This object is an abstraction of a TCP or local socket.  <code>net.Socket</code>\ninstances implement a duplex Stream interface.  They can be created by the\nuser and used as a client (with [<code>connect()</code>][]) or they can be created by Node.js\nand passed to the user through the <code>&#39;connection&#39;</code> event of a server.\n\n</p>\n",
          "methods": [
            {
              "textRaw": "new net.Socket([options])",
              "type": "method",
              "name": "Socket",
              "desc": "<p>Construct a new socket object.\n\n</p>\n<p><code>options</code> is an object with the following defaults:\n\n</p>\n<pre><code class=\"js\">{\n  fd: null,\n  allowHalfOpen: false,\n  readable: false,\n  writable: false\n}</code></pre>\n<p><code>fd</code> allows you to specify the existing file descriptor of socket.\nSet <code>readable</code> and/or <code>writable</code> to <code>true</code> to allow reads and/or writes on this\nsocket (NOTE: Works only when <code>fd</code> is passed).\nAbout <code>allowHalfOpen</code>, refer to <code>createServer()</code> and <code>&#39;end&#39;</code> event.\n\n</p>\n<p><code>net.Socket</code> instances are [<code>EventEmitter</code>][] with the following events:\n\n</p>\n",
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
            },
            {
              "textRaw": "socket.address()",
              "type": "method",
              "name": "address",
              "desc": "<p>Returns the bound address, the address family name and port of the\nsocket as reported by the operating system. Returns an object with\nthree properties, e.g.\n<code>{ port: 12346, family: &#39;IPv4&#39;, address: &#39;127.0.0.1&#39; }</code>\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "socket.connect(options[, connectListener])",
              "type": "method",
              "name": "connect",
              "desc": "<p>Opens the connection for a given socket.\n\n</p>\n<p>For TCP sockets, <code>options</code> argument should be an object which specifies:\n\n</p>\n<ul>\n<li><p><code>port</code>: Port the client should connect to (Required).</p>\n</li>\n<li><p><code>host</code>: Host the client should connect to. Defaults to <code>&#39;localhost&#39;</code>.</p>\n</li>\n<li><p><code>localAddress</code>: Local interface to bind to for network connections.</p>\n</li>\n<li><p><code>localPort</code>: Local port to bind to for network connections.</p>\n</li>\n<li><p><code>family</code> : Version of IP stack. Defaults to <code>4</code>.</p>\n</li>\n<li><p><code>hints</code>: [<code>dns.lookup()</code> hints][]. Defaults to <code>0</code>.</p>\n</li>\n<li><p><code>lookup</code> : Custom lookup function. Defaults to <code>dns.lookup</code>.</p>\n</li>\n</ul>\n<p>For local domain sockets, <code>options</code> argument should be an object which\nspecifies:\n\n</p>\n<ul>\n<li><code>path</code>: Path the client should connect to (Required).</li>\n</ul>\n<p>Normally this method is not needed, as <code>net.createConnection</code> opens the\nsocket. Use this only if you are implementing a custom Socket.\n\n</p>\n<p>This function is asynchronous. When the [<code>&#39;connect&#39;</code>][] event is emitted the\nsocket is established. If there is a problem connecting, the <code>&#39;connect&#39;</code> event\nwill not be emitted, the [<code>&#39;error&#39;</code>][] event will be emitted with the exception.\n\n</p>\n<p>The <code>connectListener</code> parameter will be added as a listener for the\n[<code>&#39;connect&#39;</code>][] event.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "options"
                    },
                    {
                      "name": "connectListener",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "socket.connect(path[, connectListener])",
              "type": "method",
              "name": "connect",
              "desc": "<p>As [<code>socket.connect(options\\[, connectListener\\])</code>][<code>socket.connect(options, connectListener)</code>],\nwith options either as either <code>{port: port, host: host}</code> or <code>{path: path}</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "port"
                    },
                    {
                      "name": "host",
                      "optional": true
                    },
                    {
                      "name": "connectListener",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "path"
                    },
                    {
                      "name": "connectListener",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "socket.connect(port[, host][, connectListener])",
              "type": "method",
              "name": "connect",
              "desc": "<p>As [<code>socket.connect(options\\[, connectListener\\])</code>][<code>socket.connect(options, connectListener)</code>],\nwith options either as either <code>{port: port, host: host}</code> or <code>{path: path}</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "port"
                    },
                    {
                      "name": "host",
                      "optional": true
                    },
                    {
                      "name": "connectListener",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "socket.destroy()",
              "type": "method",
              "name": "destroy",
              "desc": "<p>Ensures that no more I/O activity happens on this socket. Only necessary in\ncase of errors (parse error or so).\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "socket.end([data][, encoding])",
              "type": "method",
              "name": "end",
              "desc": "<p>Half-closes the socket. i.e., it sends a FIN packet. It is possible the\nserver will still send some data.\n\n</p>\n<p>If <code>data</code> is specified, it is equivalent to calling\n<code>socket.write(data, encoding)</code> followed by <code>socket.end()</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "data",
                      "optional": true
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "socket.pause()",
              "type": "method",
              "name": "pause",
              "desc": "<p>Pauses the reading of data. That is, [<code>&#39;data&#39;</code>][] events will not be emitted.\nUseful to throttle back an upload.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "socket.ref()",
              "type": "method",
              "name": "ref",
              "desc": "<p>Opposite of <code>unref</code>, calling <code>ref</code> on a previously <code>unref</code>d socket will <em>not</em>\nlet the program exit if it&#39;s the only socket left (the default behavior). If\nthe socket is <code>ref</code>d calling <code>ref</code> again will have no effect.\n\n</p>\n<p>Returns <code>socket</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "socket.resume()",
              "type": "method",
              "name": "resume",
              "desc": "<p>Resumes reading after a call to [<code>pause()</code>][].\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "socket.setEncoding([encoding])",
              "type": "method",
              "name": "setEncoding",
              "desc": "<p>Set the encoding for the socket as a [Readable Stream][]. See\n[<code>stream.setEncoding()</code>][] for more information.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "encoding",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "socket.setKeepAlive([enable][, initialDelay])",
              "type": "method",
              "name": "setKeepAlive",
              "desc": "<p>Enable/disable keep-alive functionality, and optionally set the initial\ndelay before the first keepalive probe is sent on an idle socket.\n<code>enable</code> defaults to <code>false</code>.\n\n</p>\n<p>Set <code>initialDelay</code> (in milliseconds) to set the delay between the last\ndata packet received and the first keepalive probe. Setting 0 for\ninitialDelay will leave the value unchanged from the default\n(or previous) setting. Defaults to <code>0</code>.\n\n</p>\n<p>Returns <code>socket</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "enable",
                      "optional": true
                    },
                    {
                      "name": "initialDelay",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "socket.setNoDelay([noDelay])",
              "type": "method",
              "name": "setNoDelay",
              "desc": "<p>Disables the Nagle algorithm. By default TCP connections use the Nagle\nalgorithm, they buffer data before sending it off. Setting <code>true</code> for\n<code>noDelay</code> will immediately fire off data each time <code>socket.write()</code> is called.\n<code>noDelay</code> defaults to <code>true</code>.\n\n</p>\n<p>Returns <code>socket</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "noDelay",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "socket.setTimeout(timeout[, callback])",
              "type": "method",
              "name": "setTimeout",
              "desc": "<p>Sets the socket to timeout after <code>timeout</code> milliseconds of inactivity on\nthe socket. By default <code>net.Socket</code> do not have a timeout.\n\n</p>\n<p>When an idle timeout is triggered the socket will receive a [<code>&#39;timeout&#39;</code>][]\nevent but the connection will not be severed. The user must manually [<code>end()</code>][]\nor [<code>destroy()</code>][] the socket.\n\n</p>\n<p>If <code>timeout</code> is 0, then the existing idle timeout is disabled.\n\n</p>\n<p>The optional <code>callback</code> parameter will be added as a one time listener for the\n[<code>&#39;timeout&#39;</code>][] event.\n\n</p>\n<p>Returns <code>socket</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "timeout"
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            {
              "textRaw": "socket.unref()",
              "type": "method",
              "name": "unref",
              "desc": "<p>Calling <code>unref</code> on a socket will allow the program to exit if this is the only\nactive socket in the event system. If the socket is already <code>unref</code>d calling\n<code>unref</code> again will have no effect.\n\n</p>\n<p>Returns <code>socket</code>.\n\n</p>\n",
              "signatures": [
                {
                  "params": []
                }
              ]
            },
            {
              "textRaw": "socket.write(data[, encoding][, callback])",
              "type": "method",
              "name": "write",
              "desc": "<p>Sends data on the socket. The second parameter specifies the encoding in the\ncase of a string--it defaults to UTF8 encoding.\n\n</p>\n<p>Returns <code>true</code> if the entire data was flushed successfully to the kernel\nbuffer. Returns <code>false</code> if all or part of the data was queued in user memory.\n[<code>&#39;drain&#39;</code>][] will be emitted when the buffer is again free.\n\n</p>\n<p>The optional <code>callback</code> parameter will be executed when the data is finally\nwritten out - this may not be immediately.\n\n</p>\n",
              "signatures": [
                {
                  "params": [
                    {
                      "name": "data"
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    },
                    {
                      "name": "callback",
                      "optional": true
                    }
                  ]
                }
              ]
            }
          ],
          "events": [
            {
              "textRaw": "Event: 'close'",
              "type": "event",
              "name": "close",
              "params": [],
              "desc": "<p>Emitted once the socket is fully closed. The argument <code>had_error</code> is a boolean\nwhich says if the socket was closed due to a transmission error.\n\n</p>\n"
            },
            {
              "textRaw": "Event: 'connect'",
              "type": "event",
              "name": "connect",
              "desc": "<p>Emitted when a socket connection is successfully established.\nSee [<code>connect()</code>][].\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'data'",
              "type": "event",
              "name": "data",
              "params": [],
              "desc": "<p>Emitted when data is received.  The argument <code>data</code> will be a <code>Buffer</code> or\n<code>String</code>.  Encoding of data is set by <code>socket.setEncoding()</code>.\n(See the [Readable Stream][] section for more information.)\n\n</p>\n<p>Note that the <strong>data will be lost</strong> if there is no listener when a <code>Socket</code>\nemits a <code>&#39;data&#39;</code> event.\n\n</p>\n"
            },
            {
              "textRaw": "Event: 'drain'",
              "type": "event",
              "name": "drain",
              "desc": "<p>Emitted when the write buffer becomes empty. Can be used to throttle uploads.\n\n</p>\n<p>See also: the return values of <code>socket.write()</code>\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'end'",
              "type": "event",
              "name": "end",
              "desc": "<p>Emitted when the other end of the socket sends a FIN packet.\n\n</p>\n<p>By default (<code>allowHalfOpen == false</code>) the socket will destroy its file\ndescriptor  once it has written out its pending write queue.  However, by\nsetting <code>allowHalfOpen == true</code> the socket will not automatically <code>end()</code>\nits side allowing the user to write arbitrary amounts of data, with the\ncaveat that the user is required to <code>end()</code> their side now.\n\n</p>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'error'",
              "type": "event",
              "name": "error",
              "params": [],
              "desc": "<p>Emitted when an error occurs.  The <code>&#39;close&#39;</code> event will be called directly\nfollowing this event.\n\n</p>\n"
            },
            {
              "textRaw": "Event: 'lookup'",
              "type": "event",
              "name": "lookup",
              "desc": "<p>Emitted after resolving the hostname but before connecting.\nNot applicable to UNIX sockets.\n\n</p>\n<ul>\n<li><code>err</code> {Error|Null} The error object.  See [<code>dns.lookup()</code>][].</li>\n<li><code>address</code> {String} The IP address.</li>\n<li><code>family</code> {String|Null} The address type.  See [<code>dns.lookup()</code>][].</li>\n<li><code>host</code> {String} The hostname.</li>\n</ul>\n",
              "params": []
            },
            {
              "textRaw": "Event: 'timeout'",
              "type": "event",
              "name": "timeout",
              "desc": "<p>Emitted if the socket times out from inactivity. This is only to notify that\nthe socket has been idle. The user must manually close the connection.\n\n</p>\n<p>See also: [<code>socket.setTimeout()</code>][]\n\n</p>\n",
              "params": []
            }
          ],
          "properties": [
            {
              "textRaw": "socket.bufferSize",
              "name": "bufferSize",
              "desc": "<p><code>net.Socket</code> has the property that <code>socket.write()</code> always works. This is to\nhelp users get up and running quickly. The computer cannot always keep up\nwith the amount of data that is written to a socket - the network connection\nsimply might be too slow. Node.js will internally queue up the data written to a\nsocket and send it out over the wire when it is possible. (Internally it is\npolling on the socket&#39;s file descriptor for being writable).\n\n</p>\n<p>The consequence of this internal buffering is that memory may grow. This\nproperty shows the number of characters currently buffered to be written.\n(Number of characters is approximately equal to the number of bytes to be\nwritten, but the buffer may contain strings, and the strings are lazily\nencoded, so the exact number of bytes is not known.)\n\n</p>\n<p>Users who experience large or growing <code>bufferSize</code> should attempt to\n&quot;throttle&quot; the data flows in their program with [<code>pause()</code>][] and [<code>resume()</code>][].\n\n</p>\n"
            },
            {
              "textRaw": "socket.bytesRead",
              "name": "bytesRead",
              "desc": "<p>The amount of received bytes.\n\n</p>\n"
            },
            {
              "textRaw": "socket.bytesWritten",
              "name": "bytesWritten",
              "desc": "<p>The amount of bytes sent.\n\n</p>\n"
            },
            {
              "textRaw": "socket.localAddress",
              "name": "localAddress",
              "desc": "<p>The string representation of the local IP address the remote client is\nconnecting on. For example, if you are listening on <code>&#39;0.0.0.0&#39;</code> and the\nclient connects on <code>&#39;192.168.1.1&#39;</code>, the value would be <code>&#39;192.168.1.1&#39;</code>.\n\n</p>\n"
            },
            {
              "textRaw": "socket.localPort",
              "name": "localPort",
              "desc": "<p>The numeric representation of the local port. For example,\n<code>80</code> or <code>21</code>.\n\n</p>\n"
            },
            {
              "textRaw": "socket.remoteAddress",
              "name": "remoteAddress",
              "desc": "<p>The string representation of the remote IP address. For example,\n<code>&#39;74.125.127.100&#39;</code> or <code>&#39;2001:4860:a005::68&#39;</code>. Value may be <code>undefined</code> if\nthe socket is destroyed (for example, if the client disconnected).\n\n</p>\n"
            },
            {
              "textRaw": "socket.remoteFamily",
              "name": "remoteFamily",
              "desc": "<p>The string representation of the remote IP family. <code>&#39;IPv4&#39;</code> or <code>&#39;IPv6&#39;</code>.\n\n</p>\n"
            },
            {
              "textRaw": "socket.remotePort",
              "name": "remotePort",
              "desc": "<p>The numeric representation of the remote port. For example,\n<code>80</code> or <code>21</code>.\n\n</p>\n"
            }
          ]
        }
      ],
      "methods": [
        {
          "textRaw": "net.connect(options[, connectListener])",
          "type": "method",
          "name": "connect",
          "desc": "<p>A factory function, which returns a new [<code>net.Socket</code>][] and automatically\nconnects with the supplied <code>options</code>.\n\n</p>\n<p>The options are passed to both the [<code>net.Socket</code>][] constructor and the\n[<code>socket.connect</code>][] method.\n\n</p>\n<p>The <code>connectListener</code> parameter will be added as a listener for the\n[<code>&#39;connect&#39;</code>][] event once.\n\n</p>\n<p>Here is an example of a client of the previously described echo server:\n\n</p>\n<pre><code class=\"js\">const net = require(&#39;net&#39;);\nconst client = net.connect({port: 8124}, () =&gt; {\n  // &#39;connect&#39; listener\n  console.log(&#39;connected to server!&#39;);\n  client.write(&#39;world!\\r\\n&#39;);\n});\nclient.on(&#39;data&#39;, (data) =&gt; {\n  console.log(data.toString());\n  client.end();\n});\nclient.on(&#39;end&#39;, () =&gt; {\n  console.log(&#39;disconnected from server&#39;);\n});</code></pre>\n<p>To connect on the socket <code>/tmp/echo.sock</code> the second line would just be\nchanged to\n\n</p>\n<pre><code class=\"js\">const client = net.connect({path: &#39;/tmp/echo.sock&#39;});</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "options"
                },
                {
                  "name": "connectListener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "net.connect(path[, connectListener])",
          "type": "method",
          "name": "connect",
          "desc": "<p>A factory function, which returns a new unix [<code>net.Socket</code>][] and automatically\nconnects to the supplied <code>path</code>.\n\n</p>\n<p>The <code>connectListener</code> parameter will be added as a listener for the\n[<code>&#39;connect&#39;</code>][] event once.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "connectListener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "net.connect(port[, host][, connectListener])",
          "type": "method",
          "name": "connect",
          "desc": "<p>A factory function, which returns a new [<code>net.Socket</code>][] and automatically\nconnects to the supplied <code>port</code> and <code>host</code>.\n\n</p>\n<p>If <code>host</code> is omitted, <code>&#39;localhost&#39;</code> will be assumed.\n\n</p>\n<p>The <code>connectListener</code> parameter will be added as a listener for the\n[<code>&#39;connect&#39;</code>][] event once.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "port"
                },
                {
                  "name": "host",
                  "optional": true
                },
                {
                  "name": "connectListener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "net.createConnection(options[, connectListener])",
          "type": "method",
          "name": "createConnection",
          "desc": "<p>A factory function, which returns a new [<code>net.Socket</code>][] and automatically\nconnects with the supplied <code>options</code>.\n\n</p>\n<p>The options are passed to both the [<code>net.Socket</code>][] constructor and the\n[<code>socket.connect</code>][] method.\n\n</p>\n<p>The <code>connectListener</code> parameter will be added as a listener for the\n[<code>&#39;connect&#39;</code>][] event once.\n\n</p>\n<p>Here is an example of a client of the previously described echo server:\n\n</p>\n<pre><code class=\"js\">const net = require(&#39;net&#39;);\nconst client = net.createConnection({port: 8124}, () =&gt; {\n  //&#39;connect&#39; listener\n  console.log(&#39;connected to server!&#39;);\n  client.write(&#39;world!\\r\\n&#39;);\n});\nclient.on(&#39;data&#39;, (data) =&gt; {\n  console.log(data.toString());\n  client.end();\n});\nclient.on(&#39;end&#39;, () =&gt; {\n  console.log(&#39;disconnected from server&#39;);\n});</code></pre>\n<p>To connect on the socket <code>/tmp/echo.sock</code> the second line would just be\nchanged to\n\n</p>\n<pre><code class=\"js\">const client = net.connect({path: &#39;/tmp/echo.sock&#39;});</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "options"
                },
                {
                  "name": "connectListener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "net.createConnection(path[, connectListener])",
          "type": "method",
          "name": "createConnection",
          "desc": "<p>A factory function, which returns a new unix [<code>net.Socket</code>][] and automatically\nconnects to the supplied <code>path</code>.\n\n</p>\n<p>The <code>connectListener</code> parameter will be added as a listener for the\n[<code>&#39;connect&#39;</code>][] event once.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "path"
                },
                {
                  "name": "connectListener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "net.createConnection(port[, host][, connectListener])",
          "type": "method",
          "name": "createConnection",
          "desc": "<p>A factory function, which returns a new [<code>net.Socket</code>][] and automatically\nconnects to the supplied <code>port</code> and <code>host</code>.\n\n</p>\n<p>If <code>host</code> is omitted, <code>&#39;localhost&#39;</code> will be assumed.\n\n</p>\n<p>The <code>connectListener</code> parameter will be added as a listener for the\n[<code>&#39;connect&#39;</code>][] event once.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "port"
                },
                {
                  "name": "host",
                  "optional": true
                },
                {
                  "name": "connectListener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "net.createServer([options][, connectionListener])",
          "type": "method",
          "name": "createServer",
          "desc": "<p>Creates a new server. The <code>connectionListener</code> argument is\nautomatically set as a listener for the [<code>&#39;connection&#39;</code>][] event.\n\n</p>\n<p><code>options</code> is an object with the following defaults:\n\n</p>\n<pre><code class=\"js\">{\n  allowHalfOpen: false,\n  pauseOnConnect: false\n}</code></pre>\n<p>If <code>allowHalfOpen</code> is <code>true</code>, then the socket won&#39;t automatically send a FIN\npacket when the other end of the socket sends a FIN packet. The socket becomes\nnon-readable, but still writable. You should call the [<code>end()</code>][] method explicitly.\nSee [<code>&#39;end&#39;</code>][] event for more information.\n\n</p>\n<p>If <code>pauseOnConnect</code> is <code>true</code>, then the socket associated with each incoming\nconnection will be paused, and no data will be read from its handle. This allows\nconnections to be passed between processes without any data being read by the\noriginal process. To begin reading data from a paused socket, call [<code>resume()</code>][].\n\n</p>\n<p>Here is an example of an echo server which listens for connections\non port 8124:\n\n</p>\n<pre><code class=\"js\">const net = require(&#39;net&#39;);\nconst server = net.createServer((c) =&gt; {\n  // &#39;connection&#39; listener\n  console.log(&#39;client connected&#39;);\n  c.on(&#39;end&#39;, () =&gt; {\n    console.log(&#39;client disconnected&#39;);\n  });\n  c.write(&#39;hello\\r\\n&#39;);\n  c.pipe(c);\n});\nserver.on(&#39;error&#39;, (err) =&gt; {\n  throw err;\n});\nserver.listen(8124, () =&gt; {\n  console.log(&#39;server bound&#39;);\n});</code></pre>\n<p>Test this by using <code>telnet</code>:\n\n</p>\n<pre><code>telnet localhost 8124</code></pre>\n<p>To listen on the socket <code>/tmp/echo.sock</code> the third line from the last would\njust be changed to\n\n</p>\n<pre><code class=\"js\">server.listen(&#39;/tmp/echo.sock&#39;, () =&gt; {\n  console.log(&#39;server bound&#39;);\n});</code></pre>\n<p>Use <code>nc</code> to connect to a UNIX domain socket server:\n\n</p>\n<pre><code class=\"js\">nc -U /tmp/echo.sock</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "options",
                  "optional": true
                },
                {
                  "name": "connectionListener",
                  "optional": true
                }
              ]
            }
          ]
        },
        {
          "textRaw": "net.isIP(input)",
          "type": "method",
          "name": "isIP",
          "desc": "<p>Tests if input is an IP address. Returns 0 for invalid strings,\nreturns 4 for IP version 4 addresses, and returns 6 for IP version 6 addresses.\n\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "input"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "net.isIPv4(input)",
          "type": "method",
          "name": "isIPv4",
          "desc": "<p>Returns true if input is a version 4 IP address, otherwise returns false.\n\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "input"
                }
              ]
            }
          ]
        },
        {
          "textRaw": "net.isIPv6(input)",
          "type": "method",
          "name": "isIPv6",
          "desc": "<p>Returns true if input is a version 6 IP address, otherwise returns false.\n\n</p>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "input"
                }
              ]
            }
          ]
        }
      ],
      "type": "module",
      "displayName": "net"
    }
  ]
}
