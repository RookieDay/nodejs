{
  "source": "doc/api/buffer.markdown",
  "modules": [
    {
      "textRaw": "Buffer",
      "name": "buffer",
      "stability": 2,
      "stabilityText": "Stable",
      "desc": "<p>Prior to the introduction of <code>TypedArray</code> in ECMAScript 2015 (ES6), the\nJavaScript language had no mechanism for reading or manipulating streams\nof binary data. The <code>Buffer</code> class was introduced as part of the Node.js\nAPI to make it possible to interact with octet streams in the context of things\nlike TCP streams and file system operations.\n\n</p>\n<p>Now that <code>TypedArray</code> has been added in ES6, the <code>Buffer</code> class implements the\n<code>Uint8Array</code> API in a manner that is more optimized and suitable for Node.js&#39;\nuse cases.\n\n</p>\n<p>Instances of the <code>Buffer</code> class are similar to arrays of integers but\ncorrespond to fixed-sized, raw memory allocations outside the V8 heap.\nThe size of the <code>Buffer</code> is established when it is created and cannot be\nresized.\n\n</p>\n<p>The <code>Buffer</code> class is a global within Node.js, making it unlikely that one\nwould need to ever use <code>require(&#39;buffer&#39;)</code>.\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(10);\n  // creates a buffer of length 10\n\nconst buf2 = new Buffer([1,2,3]);\n  // creates a buffer containing [01, 02, 03]\n\nconst buf3 = new Buffer(&#39;test&#39;);\n  // creates a buffer containing ASCII bytes [74, 65, 73, 74]\n\nconst buf4 = new Buffer(&#39;tést&#39;, &#39;utf8&#39;);\n  // creates a buffer containing UTF8 bytes [74, c3, a9, 73, 74]</code></pre>\n",
      "modules": [
        {
          "textRaw": "Buffers and Character Encodings",
          "name": "buffers_and_character_encodings",
          "desc": "<p>Buffers are commonly used to represent sequences of encoded characters\nsuch as UTF8, UCS2, Base64 or even Hex-encoded data. It is possible to\nconvert back and forth between Buffers and ordinary JavaScript string objects\nby using an explicit encoding method.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(&#39;hello world&#39;, &#39;ascii&#39;);\nconsole.log(buf.toString(&#39;hex&#39;));\n  // prints: 68656c6c6f20776f726c64\nconsole.log(buf.toString(&#39;base64&#39;));\n  // prints: aGVsbG8gd29ybGQ=</code></pre>\n<p>The character encodings currently supported by Node.js include:\n\n</p>\n<ul>\n<li><p><code>&#39;ascii&#39;</code> - for 7-bit ASCII data only.  This encoding method is very fast and\nwill strip the high bit if set.</p>\n</li>\n<li><p><code>&#39;utf8&#39;</code> - Multibyte encoded Unicode characters. Many web pages and other\ndocument formats use UTF-8.</p>\n</li>\n<li><p><code>&#39;utf16le&#39;</code> - 2 or 4 bytes, little-endian encoded Unicode characters.\nSurrogate pairs (U+10000 to U+10FFFF) are supported.</p>\n</li>\n<li><p><code>&#39;ucs2&#39;</code> - Alias of <code>&#39;utf16le&#39;</code>.</p>\n</li>\n<li><p><code>&#39;base64&#39;</code> - Base64 string encoding. When creating a buffer from a string,\nthis encoding will also correctly accept &quot;URL and Filename Safe Alphabet&quot; as\nspecified in [RFC 4648, Section 5].</p>\n</li>\n<li><p><code>&#39;binary&#39;</code> - A way of encoding the buffer into a one-byte (<code>latin-1</code>)\nencoded string. The string <code>&#39;latin-1&#39;</code> is not supported. Instead, pass\n<code>&#39;binary&#39;</code> to use <code>&#39;latin-1&#39;</code> encoding.</p>\n</li>\n<li><p><code>&#39;hex&#39;</code> - Encode each byte as two hexadecimal characters.</p>\n</li>\n</ul>\n",
          "type": "module",
          "displayName": "Buffers and Character Encodings"
        },
        {
          "textRaw": "Buffers and TypedArray",
          "name": "buffers_and_typedarray",
          "desc": "<p>Buffers are also <code>Uint8Array</code> TypedArray instances. However, there are subtle\nincompatibilities with the TypedArray specification in ECMAScript 2015. For\ninstance, while <code>ArrayBuffer#slice()</code> creates a copy of the slice,\nthe implementation of [<code>Buffer#slice()</code>][<code>buf.slice()</code>] creates a view over the\nexisting Buffer without copying, making <code>Buffer#slice()</code> far more efficient.\n\n</p>\n<p>It is also possible to create new TypedArray instances from a <code>Buffer</code> with the\nfollowing caveats:\n\n</p>\n<ol>\n<li><p>The Buffer instances&#39;s memory is copied to the TypedArray, not shared.</p>\n</li>\n<li><p>The Buffer&#39;s memory is interpreted as an array of distinct elements, and not\nas a byte array of the target type. That is,\n<code>new Uint32Array(new Buffer([1,2,3,4]))</code> creates a 4-element <code>Uint32Array</code>\nwith elements <code>[1,2,3,4]</code>, not a <code>Uint32Array</code> with a single element\n<code>[0x1020304]</code> or <code>[0x4030201]</code>.</p>\n</li>\n</ol>\n<p>It is possible to create a new Buffer that shares the same allocated memory as\na TypedArray instance by using the TypeArray objects <code>.buffer</code> property:\n\n</p>\n<pre><code class=\"js\">const arr = new Uint16Array(2);\narr[0] = 5000;\narr[1] = 4000;\n\nconst buf1 = new Buffer(arr); // copies the buffer\nconst buf2 = new Buffer(arr.buffer); // shares the memory with arr;\n\nconsole.log(buf1);\n  // Prints: &lt;Buffer 88 a0&gt;, copied buffer has only two elements\nconsole.log(buf2);\n  // Prints: &lt;Buffer 88 13 a0 0f&gt;\n\narr[1] = 6000;\nconsole.log(buf1);\n  // Prints: &lt;Buffer 88 a0&gt;\nconsole.log(buf2);\n  // Prints: &lt;Buffer 88 13 70 17&gt;</code></pre>\n<p>Note that when creating a Buffer using the TypeArray&#39;s <code>.buffer</code>, it is not\ncurrently possible to use only a portion of the underlying <code>ArrayBuffer</code>. To\ncreate a Buffer that uses only a part of the <code>ArrayBuffer</code>, use the\n[<code>buf.slice()</code>][] function after the Buffer is created:\n\n</p>\n<pre><code class=\"js\">const arr = new Uint16Array(20);\nconst buf = new Buffer(arr.buffer).slice(0, 16);\nconsole.log(buf.length);\n  // Prints: 16</code></pre>\n",
          "type": "module",
          "displayName": "Buffers and TypedArray"
        },
        {
          "textRaw": "Buffers and ES6 iteration",
          "name": "buffers_and_es6_iteration",
          "desc": "<p>Buffers can be iterated over using the ECMAScript 2015 (ES6) <code>for..of</code> syntax:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1, 2, 3]);\n\nfor (var b of buf)\n  console.log(b)\n\n// Prints:\n//   1\n//   2\n//   3</code></pre>\n<p>Additionally, the [<code>buf.values()</code>][], [<code>buf.keys()</code>][], and\n[<code>buf.entries()</code>][] methods can be used to create iterators.\n\n</p>\n",
          "type": "module",
          "displayName": "Buffers and ES6 iteration"
        }
      ],
      "classes": [
        {
          "textRaw": "Class: Buffer",
          "type": "class",
          "name": "Buffer",
          "desc": "<p>The Buffer class is a global type for dealing with binary data directly.\nIt can be constructed in a variety of ways.\n\n</p>\n",
          "classMethods": [
            {
              "textRaw": "Class Method: Buffer.byteLength(string[, encoding])",
              "type": "classMethod",
              "name": "byteLength",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`string` {String} ",
                      "name": "string",
                      "type": "String"
                    },
                    {
                      "textRaw": "`encoding` {String} Default: `'utf8'` ",
                      "name": "encoding",
                      "type": "String",
                      "desc": "Default: `'utf8'`",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "string"
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Returns the actual byte length of a string. This is not the same as\n[<code>String.prototype.length</code>][] since that returns the number of <em>characters</em> in\na string.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const str = &#39;\\u00bd + \\u00bc = \\u00be&#39;;\n\nconsole.log(`${str}: ${str.length} characters, ` +\n            `${Buffer.byteLength(str, &#39;utf8&#39;)} bytes`);\n\n// ½ + ¼ = ¾: 9 characters, 12 bytes</code></pre>\n"
            },
            {
              "textRaw": "Class Method: Buffer.compare(buf1, buf2)",
              "type": "classMethod",
              "name": "compare",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`buf1` {Buffer} ",
                      "name": "buf1",
                      "type": "Buffer"
                    },
                    {
                      "textRaw": "`buf2` {Buffer} ",
                      "name": "buf2",
                      "type": "Buffer"
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "buf1"
                    },
                    {
                      "name": "buf2"
                    }
                  ]
                }
              ],
              "desc": "<p>Compares <code>buf1</code> to <code>buf2</code> typically for the purpose of sorting arrays of\nBuffers. This is equivalent is calling [<code>buf1.compare(buf2)</code>][].\n\n</p>\n<pre><code class=\"js\">const arr = [Buffer(&#39;1234&#39;), Buffer(&#39;0123&#39;)];\narr.sort(Buffer.compare);</code></pre>\n"
            },
            {
              "textRaw": "Class Method: Buffer.concat(list[, totalLength])",
              "type": "classMethod",
              "name": "concat",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Buffer} ",
                    "name": "return",
                    "type": "Buffer"
                  },
                  "params": [
                    {
                      "textRaw": "`list` {Array} List of Buffer objects to concat ",
                      "name": "list",
                      "type": "Array",
                      "desc": "List of Buffer objects to concat"
                    },
                    {
                      "textRaw": "`totalLength` {Number} Total length of the Buffers in the list when concatenated ",
                      "name": "totalLength",
                      "type": "Number",
                      "desc": "Total length of the Buffers in the list when concatenated",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "list"
                    },
                    {
                      "name": "totalLength",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Returns a new Buffer which is the result of concatenating all the Buffers in\nthe <code>list</code> together.\n\n</p>\n<p>If the list has no items, or if the <code>totalLength</code> is 0, then a new zero-length\nBuffer is returned.\n\n</p>\n<p>If <code>totalLength</code> is not provided, it is calculated from the Buffers in the\n<code>list</code>. This, however, adds an additional loop to the function, so it is faster\nto provide the length explicitly.\n\n</p>\n<p>Example: build a single Buffer from a list of three Buffers:\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(10).fill(0);\nconst buf2 = new Buffer(14).fill(0);\nconst buf3 = new Buffer(18).fill(0);\nconst totalLength = buf1.length + buf2.length + buf3.length;\n\nconsole.log(totalLength);\nconst bufA = Buffer.concat([buf1, buf2, buf3], totalLength);\nconsole.log(bufA);\nconsole.log(bufA.length);\n\n// 42\n// &lt;Buffer 00 00 00 00 ...&gt;\n// 42</code></pre>\n"
            },
            {
              "textRaw": "Class Method: Buffer.isBuffer(obj)",
              "type": "classMethod",
              "name": "isBuffer",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Boolean} ",
                    "name": "return",
                    "type": "Boolean"
                  },
                  "params": [
                    {
                      "textRaw": "`obj` {Object} ",
                      "name": "obj",
                      "type": "Object"
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "obj"
                    }
                  ]
                }
              ],
              "desc": "<p>Returns &#39;true&#39; if <code>obj</code> is a Buffer.\n\n</p>\n"
            },
            {
              "textRaw": "Class Method: Buffer.isEncoding(encoding)",
              "type": "classMethod",
              "name": "isEncoding",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Boolean} ",
                    "name": "return",
                    "type": "Boolean"
                  },
                  "params": [
                    {
                      "textRaw": "`encoding` {String} The encoding string to test ",
                      "name": "encoding",
                      "type": "String",
                      "desc": "The encoding string to test"
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "encoding"
                    }
                  ]
                }
              ],
              "desc": "<p>Returns true if the <code>encoding</code> is a valid encoding argument, or false\notherwise.\n\n</p>\n"
            }
          ],
          "properties": [
            {
              "textRaw": "buf[index]",
              "name": "[index]",
              "desc": "<p>The index operator <code>[index]</code> can be used to get and set the octet at position\n<code>index</code> in the Buffer. The values refer to individual bytes, so the legal value\nrange is between <code>0x00</code> and <code>0xFF</code> (hex) or <code>0</code> and <code>255</code> (decimal).\n\n</p>\n<p>Example: copy an ASCII string into a Buffer, one byte at a time:\n\n</p>\n<pre><code class=\"js\">const str = &quot;Node.js&quot;;\nconst buf = new Buffer(str.length);\n\nfor (var i = 0; i &lt; str.length ; i++) {\n  buf[i] = str.charCodeAt(i);\n}\n\nconsole.log(buf.toString(&#39;ascii&#39;));\n  // Prints: Node.js</code></pre>\n"
            },
            {
              "textRaw": "`length` {Number} ",
              "type": "Number",
              "name": "length",
              "desc": "<p>Returns the amount of memory allocated for the Buffer in number of bytes. Note\nthat this does not necessarily reflect the amount of usable data within the\nBuffer. For instance, in the example below, a Buffer with 1234 bytes is\nallocated, but only 11 ASCII bytes are written.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(1234);\n\nconsole.log(buf.length);\n  // Prints: 1234\n\nbuf.write(&#39;some string&#39;, 0, &#39;ascii&#39;);\nconsole.log(buf.length);\n  // Prints: 1234</code></pre>\n<p>While the <code>length</code> property is not immutable, changing the value of <code>length</code>\ncan result in undefined and inconsistent behavior. Applications that wish to\nmodify the length of a Buffer should therefore treat <code>length</code> as read-only and\nuse [<code>buf.slice()</code>][] to create a new Buffer.\n\n</p>\n<pre><code class=\"js\">var buf = new Buffer(10);\nbuf.write(&#39;abcdefghj&#39;, 0, &#39;ascii&#39;);\nconsole.log(buf.length);\n  // Prints: 10\nbuf = buf.slice(0,5);\nconsole.log(buf.length);\n  // Prints: 5</code></pre>\n"
            }
          ],
          "methods": [
            {
              "textRaw": "buf.compare(otherBuffer)",
              "type": "method",
              "name": "compare",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`otherBuffer` {Buffer} ",
                      "name": "otherBuffer",
                      "type": "Buffer"
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "otherBuffer"
                    }
                  ]
                }
              ],
              "desc": "<p>Compares two Buffer instances and returns a number indicating whether <code>buf</code>\ncomes before, after, or is the same as the <code>otherBuffer</code> in sort order.\nComparison is based on the actual sequence of bytes in each Buffer.\n\n</p>\n<ul>\n<li><code>0</code> is returned if <code>otherBuffer</code> is the same as <code>buf</code></li>\n<li><code>1</code> is returned if <code>otherBuffer</code> should come <em>before</em> <code>buf</code> when sorted.</li>\n<li><code>-1</code> is returned if <code>otherBuffer</code> should come <em>after</em> <code>buf</code> when sorted.</li>\n</ul>\n<pre><code class=\"js\">const buf1 = new Buffer(&#39;ABC&#39;);\nconst buf2 = new Buffer(&#39;BCD&#39;);\nconst buf3 = new Buffer(&#39;ABCD&#39;);\n\nconsole.log(buf1.compare(buf1));\n  // Prints: 0\nconsole.log(buf1.compare(buf2));\n  // Prints: -1\nconsole.log(buf1.compare(buf3));\n  // Prints: 1\nconsole.log(buf2.compare(buf1));\n  // Prints: 1\nconsole.log(buf2.compare(buf3));\n  // Prints: 1\n\n[buf1, buf2, buf3].sort(Buffer.compare);\n  // produces sort order [buf1, buf3, buf2]</code></pre>\n"
            },
            {
              "textRaw": "buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])",
              "type": "method",
              "name": "copy",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The number of bytes copied. ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The number of bytes copied."
                  },
                  "params": [
                    {
                      "textRaw": "`targetBuffer` {Buffer} Buffer to copy into ",
                      "name": "targetBuffer",
                      "type": "Buffer",
                      "desc": "Buffer to copy into"
                    },
                    {
                      "textRaw": "`targetStart` {Number} Default: 0 ",
                      "name": "targetStart",
                      "type": "Number",
                      "desc": "Default: 0"
                    },
                    {
                      "textRaw": "`sourceStart` {Number} Default: 0 ",
                      "name": "sourceStart",
                      "type": "Number",
                      "desc": "Default: 0"
                    },
                    {
                      "textRaw": "`sourceEnd` {Number} Default: `buffer.length` ",
                      "name": "sourceEnd",
                      "type": "Number",
                      "desc": "Default: `buffer.length`",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "targetBuffer"
                    },
                    {
                      "name": "targetStart"
                    },
                    {
                      "name": "sourceStart"
                    },
                    {
                      "name": "sourceEnd",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Copies data from a region of this Buffer to a region in the target Buffer even\nif the target memory region overlaps with the source.\n\n</p>\n<p>Example: build two Buffers, then copy <code>buf1</code> from byte 16 through byte 19\ninto <code>buf2</code>, starting at the 8th byte in <code>buf2</code>.\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(26);\nconst buf2 = new Buffer(26).fill(&#39;!&#39;);\n\nfor (var i = 0 ; i &lt; 26 ; i++) {\n  buf1[i] = i + 97; // 97 is ASCII a\n}\n\nbuf1.copy(buf2, 8, 16, 20);\nconsole.log(buf2.toString(&#39;ascii&#39;, 0, 25));\n  // Prints: !!!!!!!!qrst!!!!!!!!!!!!!</code></pre>\n<p>Example: Build a single Buffer, then copy data from one region to an overlapping\nregion in the same Buffer\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(26);\n\nfor (var i = 0 ; i &lt; 26 ; i++) {\n  buf[i] = i + 97; // 97 is ASCII a\n}\n\nbuf.copy(buf, 0, 4, 10);\nconsole.log(buf.toString());\n\n// efghijghijklmnopqrstuvwxyz</code></pre>\n"
            },
            {
              "textRaw": "buf.entries()",
              "type": "method",
              "name": "entries",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Iterator} ",
                    "name": "return",
                    "type": "Iterator"
                  },
                  "params": []
                },
                {
                  "params": []
                }
              ],
              "desc": "<p>Creates and returns an [iterator][] of <code>[index, byte]</code> pairs from the Buffer\ncontents.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(&#39;buffer&#39;);\nfor (var pair of buf.entries()) {\n  console.log(pair);\n}\n// prints:\n//   [0, 98]\n//   [1, 117]\n//   [2, 102]\n//   [3, 102]\n//   [4, 101]\n//   [5, 114]</code></pre>\n"
            },
            {
              "textRaw": "buf.equals(otherBuffer)",
              "type": "method",
              "name": "equals",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Boolean} ",
                    "name": "return",
                    "type": "Boolean"
                  },
                  "params": [
                    {
                      "textRaw": "`otherBuffer` {Buffer} ",
                      "name": "otherBuffer",
                      "type": "Buffer"
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "otherBuffer"
                    }
                  ]
                }
              ],
              "desc": "<p>Returns a boolean indicating whether <code>this</code> and <code>otherBuffer</code> have exactly the\nsame bytes.\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(&#39;ABC&#39;);\nconst buf2 = new Buffer(&#39;414243&#39;, &#39;hex&#39;);\nconst buf3 = new Buffer(&#39;ABCD&#39;);\n\nconsole.log(buf1.equals(buf2));\n  // Prints: true\nconsole.log(buf1.equals(buf3));\n  // Prints: false</code></pre>\n"
            },
            {
              "textRaw": "buf.fill(value[, offset[, end]])",
              "type": "method",
              "name": "fill",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Buffer} ",
                    "name": "return",
                    "type": "Buffer"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {String|Number} ",
                      "name": "value",
                      "type": "String|Number"
                    },
                    {
                      "textRaw": "`offset` {Number} Default: 0 ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "Default: 0"
                    },
                    {
                      "textRaw": "`end` {Number} Default: `buffer.length` ",
                      "name": "end",
                      "type": "Number",
                      "desc": "Default: `buffer.length`",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "end",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Fills the Buffer with the specified value. If the <code>offset</code> and <code>end</code> are not\ngiven it will fill the entire Buffer. The method returns a reference to the\nBuffer so calls can be chained.\n\n</p>\n<pre><code class=\"js\">const b = new Buffer(50).fill(&#39;h&#39;);\nconsole.log(b.toString());\n  // Prints: hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</code></pre>\n"
            },
            {
              "textRaw": "buf.indexOf(value[, byteOffset][, encoding])",
              "type": "method",
              "name": "indexOf",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {String|Buffer|Number} ",
                      "name": "value",
                      "type": "String|Buffer|Number"
                    },
                    {
                      "textRaw": "`byteOffset` {Number} Default: 0 ",
                      "name": "byteOffset",
                      "type": "Number",
                      "desc": "Default: 0",
                      "optional": true
                    },
                    {
                      "textRaw": "`encoding` {String} Default: `'utf8'` ",
                      "name": "encoding",
                      "type": "String",
                      "desc": "Default: `'utf8'`",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "byteOffset",
                      "optional": true
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Operates similar to [<code>Array#indexOf()</code>][] in that it returns either the\nstarting index position of <code>value</code> in Buffer or <code>-1</code> if the Buffer does not\ncontain <code>value</code>. The <code>value</code> can be a String, Buffer or Number. Strings are by\ndefault interpreted as UTF8. Buffers will use the entire Buffer (to compare a\npartial Buffer use [<code>buf.slice()</code>][]).  Numbers can range from 0 to 255.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(&#39;this is a buffer&#39;);\n\nbuf.indexOf(&#39;this&#39;);\n  // returns 0\nbuf.indexOf(&#39;is&#39;);\n  // returns 2\nbuf.indexOf(new Buffer(&#39;a buffer&#39;));\n  // returns 8\nbuf.indexOf(97); // ascii for &#39;a&#39;\n  // returns 8\nbuf.indexOf(new Buffer(&#39;a buffer example&#39;));\n  // returns -1\nbuf.indexOf(new Buffer(&#39;a buffer example&#39;).slice(0,8));\n  // returns 8\n\nconst utf16Buffer = new Buffer(&#39;\\u039a\\u0391\\u03a3\\u03a3\\u0395&#39;, &#39;ucs2&#39;);\n\nutf16Buffer.indexOf(&#39;\\u03a3&#39;,  0, &#39;ucs2&#39;);\n  // returns 4\nutf16Buffer.indexOf(&#39;\\u03a3&#39;, -4, &#39;ucs2&#39;);\n  // returns 6</code></pre>\n"
            },
            {
              "textRaw": "buf.includes(value[, byteOffset][, encoding])",
              "type": "method",
              "name": "includes",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Boolean} ",
                    "name": "return",
                    "type": "Boolean"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {String|Buffer|Number} ",
                      "name": "value",
                      "type": "String|Buffer|Number"
                    },
                    {
                      "textRaw": "`byteOffset` {Number} Default: 0 ",
                      "name": "byteOffset",
                      "type": "Number",
                      "desc": "Default: 0",
                      "optional": true
                    },
                    {
                      "textRaw": "`encoding` {String} Default: `'utf8'` ",
                      "name": "encoding",
                      "type": "String",
                      "desc": "Default: `'utf8'`",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "byteOffset",
                      "optional": true
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Operates similar to [<code>Array#includes()</code>][]. The <code>value</code> can be a String, Buffer\nor Number. Strings are interpreted as UTF8 unless overridden with the\n<code>encoding</code> argument. Buffers will use the entire Buffer (to compare a partial\nBuffer use [<code>buf.slice()</code>][]). Numbers can range from 0 to 255.\n\n</p>\n<p>The <code>byteOffset</code> indicates the index in <code>buf</code> where searching begins.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(&#39;this is a buffer&#39;);\n\nbuf.includes(&#39;this&#39;);\n  // returns true\nbuf.includes(&#39;is&#39;);\n  // returns true\nbuf.includes(new Buffer(&#39;a buffer&#39;));\n  // returns true\nbuf.includes(97); // ascii for &#39;a&#39;\n  // returns true\nbuf.includes(new Buffer(&#39;a buffer example&#39;));\n  // returns false\nbuf.includes(new Buffer(&#39;a buffer example&#39;).slice(0,8));\n  // returns true\nbuf.includes(&#39;this&#39;, 4);\n  // returns false</code></pre>\n"
            },
            {
              "textRaw": "buf.keys()",
              "type": "method",
              "name": "keys",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Iterator} ",
                    "name": "return",
                    "type": "Iterator"
                  },
                  "params": []
                },
                {
                  "params": []
                }
              ],
              "desc": "<p>Creates and returns an [iterator][] of Buffer keys (indices).\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(&#39;buffer&#39;);\nfor (var key of buf.keys()) {\n  console.log(key);\n}\n// prints:\n//   0\n//   1\n//   2\n//   3\n//   4\n//   5</code></pre>\n"
            },
            {
              "textRaw": "buf.readDoubleBE(offset[, noAssert])",
              "type": "method",
              "name": "readDoubleBE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 8` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 8`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads a 64-bit double from the Buffer at the specified <code>offset</code> with specified\nendian format (<code>readDoubleBE()</code> returns big endian, <code>readDoubleLE()</code> returns\nlittle endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,2,3,4,5,6,7,8]);\n\nbuf.readDoubleBE();\n  // Returns: 8.20788039913184e-304\nbuf.readDoubleLE();\n  // Returns: 5.447603722011605e-270\nbuf.readDoubleLE(1);\n  // throws RangeError: Index out of range\n\nbuf.readDoubleLE(1, true); // Warning: reads passed end of buffer!\n  // Segmentation fault! don&#39;t do this!</code></pre>\n"
            },
            {
              "textRaw": "buf.readDoubleLE(offset[, noAssert])",
              "type": "method",
              "name": "readDoubleLE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 8` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 8`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads a 64-bit double from the Buffer at the specified <code>offset</code> with specified\nendian format (<code>readDoubleBE()</code> returns big endian, <code>readDoubleLE()</code> returns\nlittle endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,2,3,4,5,6,7,8]);\n\nbuf.readDoubleBE();\n  // Returns: 8.20788039913184e-304\nbuf.readDoubleLE();\n  // Returns: 5.447603722011605e-270\nbuf.readDoubleLE(1);\n  // throws RangeError: Index out of range\n\nbuf.readDoubleLE(1, true); // Warning: reads passed end of buffer!\n  // Segmentation fault! don&#39;t do this!</code></pre>\n"
            },
            {
              "textRaw": "buf.readFloatBE(offset[, noAssert])",
              "type": "method",
              "name": "readFloatBE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads a 32-bit float from the Buffer at the specified <code>offset</code> with specified\nendian format (<code>readFloatBE()</code> returns big endian, <code>readFloatLE()</code> returns\nlittle endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,2,3,4]);\n\nbuf.readFloatBE();\n  // Returns: 2.387939260590663e-38\nbuf.readFloatLE();\n  // Returns: 1.539989614439558e-36\nbuf.readFloatLE(1);\n  // throws RangeError: Index out of range\n\nbuf.readFloatLE(1, true); // Warning: reads passed end of buffer!\n  // Segmentation fault! don&#39;t do this!</code></pre>\n"
            },
            {
              "textRaw": "buf.readFloatLE(offset[, noAssert])",
              "type": "method",
              "name": "readFloatLE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads a 32-bit float from the Buffer at the specified <code>offset</code> with specified\nendian format (<code>readFloatBE()</code> returns big endian, <code>readFloatLE()</code> returns\nlittle endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,2,3,4]);\n\nbuf.readFloatBE();\n  // Returns: 2.387939260590663e-38\nbuf.readFloatLE();\n  // Returns: 1.539989614439558e-36\nbuf.readFloatLE(1);\n  // throws RangeError: Index out of range\n\nbuf.readFloatLE(1, true); // Warning: reads passed end of buffer!\n  // Segmentation fault! don&#39;t do this!</code></pre>\n"
            },
            {
              "textRaw": "buf.readInt8(offset[, noAssert])",
              "type": "method",
              "name": "readInt8",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 1` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 1`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads a signed 8-bit integer from the Buffer at the specified <code>offset</code>.\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<p>Integers read from the Buffer are interpreted as two&#39;s complement signed values.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,-2,3,4]);\n\nbuf.readInt8(0);\n  // returns 1\nbuf.readInt8(1);\n  // returns -2</code></pre>\n"
            },
            {
              "textRaw": "buf.readInt16BE(offset[, noAssert])",
              "type": "method",
              "name": "readInt16BE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 2` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 2`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads a signed 16-bit integer from the Buffer at the specified <code>offset</code> with\nthe specified endian format (<code>readInt16BE()</code> returns big endian,\n<code>readInt16LE()</code> returns little endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<p>Integers read from the Buffer are interpreted as two&#39;s complement signed values.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,-2,3,4]);\n\nbuf.readInt16BE();\n  // returns 510\nbuf.readInt16LE(1);\n  // returns 1022</code></pre>\n"
            },
            {
              "textRaw": "buf.readInt16LE(offset[, noAssert])",
              "type": "method",
              "name": "readInt16LE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 2` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 2`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads a signed 16-bit integer from the Buffer at the specified <code>offset</code> with\nthe specified endian format (<code>readInt16BE()</code> returns big endian,\n<code>readInt16LE()</code> returns little endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<p>Integers read from the Buffer are interpreted as two&#39;s complement signed values.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,-2,3,4]);\n\nbuf.readInt16BE();\n  // returns 510\nbuf.readInt16LE(1);\n  // returns 1022</code></pre>\n"
            },
            {
              "textRaw": "buf.readInt32BE(offset[, noAssert])",
              "type": "method",
              "name": "readInt32BE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads a signed 32-bit integer from the Buffer at the specified <code>offset</code> with\nthe specified endian format (<code>readInt32BE()</code> returns big endian,\n<code>readInt32LE()</code> returns little endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<p>Integers read from the Buffer are interpreted as two&#39;s complement signed values.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,-2,3,4]);\n\nbuf.readInt32BE();\n  // returns 33424132\nbuf.readInt32LE();\n  // returns 67370497\nbuf.readInt32LE(1);\n  // throws RangeError: Index out of range</code></pre>\n"
            },
            {
              "textRaw": "buf.readInt32LE(offset[, noAssert])",
              "type": "method",
              "name": "readInt32LE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads a signed 32-bit integer from the Buffer at the specified <code>offset</code> with\nthe specified endian format (<code>readInt32BE()</code> returns big endian,\n<code>readInt32LE()</code> returns little endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<p>Integers read from the Buffer are interpreted as two&#39;s complement signed values.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,-2,3,4]);\n\nbuf.readInt32BE();\n  // returns 33424132\nbuf.readInt32LE();\n  // returns 67370497\nbuf.readInt32LE(1);\n  // throws RangeError: Index out of range</code></pre>\n"
            },
            {
              "textRaw": "buf.readIntBE(offset, byteLength[, noAssert])",
              "type": "method",
              "name": "readIntBE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - byteLength` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - byteLength`"
                    },
                    {
                      "textRaw": "`byteLength` {Number} `0 < byteLength <= 6` ",
                      "name": "byteLength",
                      "type": "Number",
                      "desc": "`0 < byteLength <= 6`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads <code>byteLength</code> number of bytes from the Buffer at the specified <code>offset</code>\nand interprets the result as a two&#39;s complement signed value. Supports up to 48\nbits of accuracy. For example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(6);\nbuf.writeUInt16LE(0x90ab, 0);\nbuf.writeUInt32LE(0x12345678, 2);\nbuf.readIntLE(0, 6).toString(16);  // Specify 6 bytes (48 bits)\n// Returns: &#39;1234567890ab&#39;\n\nbuf.readIntBE(0, 6).toString(16);\n// Returns: -546f87a9cbee</code></pre>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n"
            },
            {
              "textRaw": "buf.readIntLE(offset, byteLength[, noAssert])",
              "type": "method",
              "name": "readIntLE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - byteLength` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - byteLength`"
                    },
                    {
                      "textRaw": "`byteLength` {Number} `0 < byteLength <= 6` ",
                      "name": "byteLength",
                      "type": "Number",
                      "desc": "`0 < byteLength <= 6`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads <code>byteLength</code> number of bytes from the Buffer at the specified <code>offset</code>\nand interprets the result as a two&#39;s complement signed value. Supports up to 48\nbits of accuracy. For example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(6);\nbuf.writeUInt16LE(0x90ab, 0);\nbuf.writeUInt32LE(0x12345678, 2);\nbuf.readIntLE(0, 6).toString(16);  // Specify 6 bytes (48 bits)\n// Returns: &#39;1234567890ab&#39;\n\nbuf.readIntBE(0, 6).toString(16);\n// Returns: -546f87a9cbee</code></pre>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n"
            },
            {
              "textRaw": "buf.readUInt8(offset[, noAssert])",
              "type": "method",
              "name": "readUInt8",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 1` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 1`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads an unsigned 8-bit integer from the Buffer at the specified <code>offset</code>.\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([1,-2,3,4]);\n\nbuf.readUInt8(0);\n  // returns 1\nbuf.readUInt8(1);\n  // returns 254</code></pre>\n"
            },
            {
              "textRaw": "buf.readUInt16BE(offset[, noAssert])",
              "type": "method",
              "name": "readUInt16BE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 2` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 2`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads an unsigned 16-bit integer from the Buffer at the specified <code>offset</code> with\nspecified endian format (<code>readInt32BE()</code> returns big endian,\n<code>readInt32LE()</code> returns little endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([0x3, 0x4, 0x23, 0x42]);\n\nbuf.readUInt16BE(0);\n  // Returns: 0x0304\nbuf.readUInt16LE(0);\n  // Returns: 0x0403\nbuf.readUInt16BE(1);\n  // Returns: 0x0423\nbuf.readUInt16LE(1);\n  // Returns: 0x2304\nbuf.readUInt16BE(2);\n  // Returns: 0x2342\nbuf.readUInt16LE(2);\n  // Returns: 0x4223</code></pre>\n"
            },
            {
              "textRaw": "buf.readUInt16LE(offset[, noAssert])",
              "type": "method",
              "name": "readUInt16LE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 2` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 2`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads an unsigned 16-bit integer from the Buffer at the specified <code>offset</code> with\nspecified endian format (<code>readInt32BE()</code> returns big endian,\n<code>readInt32LE()</code> returns little endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([0x3, 0x4, 0x23, 0x42]);\n\nbuf.readUInt16BE(0);\n  // Returns: 0x0304\nbuf.readUInt16LE(0);\n  // Returns: 0x0403\nbuf.readUInt16BE(1);\n  // Returns: 0x0423\nbuf.readUInt16LE(1);\n  // Returns: 0x2304\nbuf.readUInt16BE(2);\n  // Returns: 0x2342\nbuf.readUInt16LE(2);\n  // Returns: 0x4223</code></pre>\n"
            },
            {
              "textRaw": "buf.readUInt32BE(offset[, noAssert])",
              "type": "method",
              "name": "readUInt32BE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads an unsigned 32-bit integer from the Buffer at the specified <code>offset</code> with\nspecified endian format (<code>readInt32BE()</code> returns big endian,\n<code>readInt32LE()</code> returns little endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([0x3, 0x4, 0x23, 0x42]);\n\nbuf.readUInt32BE(0);\n  // Returns: 0x03042342\nconsole.log(buf.readUInt32LE(0));\n  // Returns: 0x42230403</code></pre>\n"
            },
            {
              "textRaw": "buf.readUInt32LE(offset[, noAssert])",
              "type": "method",
              "name": "readUInt32LE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads an unsigned 32-bit integer from the Buffer at the specified <code>offset</code> with\nspecified endian format (<code>readInt32BE()</code> returns big endian,\n<code>readInt32LE()</code> returns little endian).\n\n</p>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([0x3, 0x4, 0x23, 0x42]);\n\nbuf.readUInt32BE(0);\n  // Returns: 0x03042342\nconsole.log(buf.readUInt32LE(0));\n  // Returns: 0x42230403</code></pre>\n"
            },
            {
              "textRaw": "buf.readUIntBE(offset, byteLength[, noAssert])",
              "type": "method",
              "name": "readUIntBE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - byteLength` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - byteLength`"
                    },
                    {
                      "textRaw": "`byteLength` {Number} `0 < byteLength <= 6` ",
                      "name": "byteLength",
                      "type": "Number",
                      "desc": "`0 < byteLength <= 6`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads <code>byteLength</code> number of bytes from the Buffer at the specified <code>offset</code>\nand interprets the result as an unsigned integer. Supports up to 48\nbits of accuracy. For example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(6);\nbuf.writeUInt16LE(0x90ab, 0);\nbuf.writeUInt32LE(0x12345678, 2);\nbuf.readUIntLE(0, 6).toString(16);  // Specify 6 bytes (48 bits)\n// Returns: &#39;1234567890ab&#39;\n\nbuf.readUIntBE(0, 6).toString(16);\n// Returns: ab9078563412</code></pre>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n"
            },
            {
              "textRaw": "buf.readUIntLE(offset, byteLength[, noAssert])",
              "type": "method",
              "name": "readUIntLE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} ",
                    "name": "return",
                    "type": "Number"
                  },
                  "params": [
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - byteLength` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - byteLength`"
                    },
                    {
                      "textRaw": "`byteLength` {Number} `0 < byteLength <= 6` ",
                      "name": "byteLength",
                      "type": "Number",
                      "desc": "`0 < byteLength <= 6`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Reads <code>byteLength</code> number of bytes from the Buffer at the specified <code>offset</code>\nand interprets the result as an unsigned integer. Supports up to 48\nbits of accuracy. For example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(6);\nbuf.writeUInt16LE(0x90ab, 0);\nbuf.writeUInt32LE(0x12345678, 2);\nbuf.readUIntLE(0, 6).toString(16);  // Specify 6 bytes (48 bits)\n// Returns: &#39;1234567890ab&#39;\n\nbuf.readUIntBE(0, 6).toString(16);\n// Returns: ab9078563412</code></pre>\n<p>Setting <code>noAssert</code> to <code>true</code> skips validation of the <code>offset</code>. This allows the\n<code>offset</code> to be beyond the end of the Buffer.\n\n</p>\n"
            },
            {
              "textRaw": "buf.slice([start[, end]])",
              "type": "method",
              "name": "slice",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Buffer} ",
                    "name": "return",
                    "type": "Buffer"
                  },
                  "params": [
                    {
                      "textRaw": "`start` {Number} Default: 0 ",
                      "name": "start",
                      "type": "Number",
                      "desc": "Default: 0"
                    },
                    {
                      "textRaw": "`end` {Number} Default: `buffer.length` ",
                      "name": "end",
                      "type": "Number",
                      "desc": "Default: `buffer.length`",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "start"
                    },
                    {
                      "name": "end",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Returns a new Buffer that references the same memory as the original, but\noffset and cropped by the <code>start</code> and <code>end</code> indices.\n\n</p>\n<p><strong>Note that modifying the new Buffer slice will modify the memory in the\noriginal Buffer because the allocated memory of the two objects overlap.</strong>\n\n</p>\n<p>Example: build a Buffer with the ASCII alphabet, take a slice, then modify one\nbyte from the original Buffer.\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(26);\n\nfor (var i = 0 ; i &lt; 26 ; i++) {\n  buf1[i] = i + 97; // 97 is ASCII a\n}\n\nconst buf2 = buf1.slice(0, 3);\nbuf2.toString(&#39;ascii&#39;, 0, buf2.length);\n  // Returns: &#39;abc&#39;\nbuf1[0] = 33;\nbuf2.toString(&#39;ascii&#39;, 0, buf2.length);\n  // Returns : &#39;!bc&#39;</code></pre>\n<p>Specifying negative indexes causes the slice to be generated relative to the\nend of the Buffer rather than the beginning.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(&#39;buffer&#39;);\n\nbuf.slice(-6, -1).toString();\n  // Returns &#39;buffe&#39;, equivalent to buf.slice(0, 5)\nbuf.slice(-6, -2).toString();\n  // Returns &#39;buff&#39;, equivalent to buf.slice(0, 4)\nbuf.slice(-5, -2).toString();\n  // Returns &#39;uff&#39;, equivalent to buf.slice(1, 4)</code></pre>\n"
            },
            {
              "textRaw": "buf.toString([encoding[, start[, end]]])",
              "type": "method",
              "name": "toString",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {String} ",
                    "name": "return",
                    "type": "String"
                  },
                  "params": [
                    {
                      "textRaw": "`encoding` {String} Default: `'utf8'` ",
                      "name": "encoding",
                      "type": "String",
                      "desc": "Default: `'utf8'`"
                    },
                    {
                      "textRaw": "`start` {Number} Default: 0 ",
                      "name": "start",
                      "type": "Number",
                      "desc": "Default: 0"
                    },
                    {
                      "textRaw": "`end` {Number} Default: `buffer.length` ",
                      "name": "end",
                      "type": "Number",
                      "desc": "Default: `buffer.length`",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "encoding"
                    },
                    {
                      "name": "start"
                    },
                    {
                      "name": "end",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Decodes and returns a string from the Buffer data using the specified\ncharacter set <code>encoding</code>.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(26);\nfor (var i = 0 ; i &lt; 26 ; i++) {\n  buf[i] = i + 97; // 97 is ASCII a\n}\nbuf.toString(&#39;ascii&#39;);\n  // Returns: &#39;abcdefghijklmnopqrstuvwxyz&#39;\nbuf.toString(&#39;ascii&#39;,0,5);\n  // Returns: &#39;abcde&#39;\nbuf.toString(&#39;utf8&#39;,0,5);\n  // Returns: &#39;abcde&#39;\nbuf.toString(undefined,0,5);\n  // Returns: &#39;abcde&#39;, encoding defaults to &#39;utf8&#39;</code></pre>\n"
            },
            {
              "textRaw": "buf.toJSON()",
              "type": "method",
              "name": "toJSON",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Object} ",
                    "name": "return",
                    "type": "Object"
                  },
                  "params": []
                },
                {
                  "params": []
                }
              ],
              "desc": "<p>Returns a JSON representation of the Buffer instance.  [<code>JSON.stringify()</code>][]\nimplicitly calls this function when stringifying a Buffer instance.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(&#39;test&#39;);\nconst json = JSON.stringify(buf);\n\nconsole.log(json);\n// Prints: &#39;{&quot;type&quot;:&quot;Buffer&quot;,&quot;data&quot;:[116,101,115,116]}&#39;\n\nconst copy = JSON.parse(json, (key, value) =&gt; {\n    return value &amp;&amp; value.type === &#39;Buffer&#39;\n      ? new Buffer(value.data)\n      : value;\n  });\n\nconsole.log(copy.toString());\n// Prints: &#39;test&#39;</code></pre>\n"
            },
            {
              "textRaw": "buf.values()",
              "type": "method",
              "name": "values",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Iterator} ",
                    "name": "return",
                    "type": "Iterator"
                  },
                  "params": []
                },
                {
                  "params": []
                }
              ],
              "desc": "<p>Creates and returns an [iterator][] for Buffer values (bytes). This function is\ncalled automatically when the Buffer is used in a <code>for..of</code> statement.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(&#39;buffer&#39;);\nfor (var value of buf.values()) {\n  console.log(value);\n}\n// prints:\n//   98\n//   117\n//   102\n//   102\n//   101\n//   114\n\nfor (var value of buf) {\n  console.log(value);\n}\n// prints:\n//   98\n//   117\n//   102\n//   102\n//   101\n//   114</code></pre>\n"
            },
            {
              "textRaw": "buf.write(string[, offset[, length]][, encoding])",
              "type": "method",
              "name": "write",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} Numbers of bytes written ",
                    "name": "return",
                    "type": "Number",
                    "desc": "Numbers of bytes written"
                  },
                  "params": [
                    {
                      "textRaw": "`string` {String} Bytes to be written to buffer ",
                      "name": "string",
                      "type": "String",
                      "desc": "Bytes to be written to buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} Default: 0 ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "Default: 0"
                    },
                    {
                      "textRaw": "`length` {Number} Default: `buffer.length - offset` ",
                      "name": "length",
                      "type": "Number",
                      "desc": "Default: `buffer.length - offset`",
                      "optional": true
                    },
                    {
                      "textRaw": "`encoding` {String} Default: `'utf8'` ",
                      "name": "encoding",
                      "type": "String",
                      "desc": "Default: `'utf8'`",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "string"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "length",
                      "optional": true
                    },
                    {
                      "name": "encoding",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>string</code> to the Buffer at <code>offset</code> using the given <code>encoding</code>.\nThe <code>length</code> parameter is the number of bytes to write. If the Buffer did not\ncontain enough space to fit the entire string, only a partial amount of the\nstring will be written however, it will not write only partially encoded\ncharacters.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(256);\nconst len = buf.write(&#39;\\u00bd + \\u00bc = \\u00be&#39;, 0);\nconsole.log(`${len} bytes: ${buf.toString(&#39;utf8&#39;, 0, len)}`);\n  // Prints: 12 bytes: ½ + ¼ = ¾</code></pre>\n"
            },
            {
              "textRaw": "buf.writeDoubleBE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeDoubleBE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 8` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 8`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeDoubleBE()</code> writes big endian, <code>writeDoubleLE()</code> writes little\nendian). The <code>value</code> argument <em>should</em> be a valid 64-bit double. Behavior is\nnot defined when <code>value</code> is anything other than a 64-bit double.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(8);\nbuf.writeDoubleBE(0xdeadbeefcafebabe, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer 43 eb d5 b7 dd f9 5f d7&gt;\n\nbuf.writeDoubleLE(0xdeadbeefcafebabe, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer d7 5f f9 dd b7 d5 eb 43&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeDoubleLE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeDoubleLE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 8` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 8`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeDoubleBE()</code> writes big endian, <code>writeDoubleLE()</code> writes little\nendian). The <code>value</code> argument <em>should</em> be a valid 64-bit double. Behavior is\nnot defined when <code>value</code> is anything other than a 64-bit double.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(8);\nbuf.writeDoubleBE(0xdeadbeefcafebabe, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer 43 eb d5 b7 dd f9 5f d7&gt;\n\nbuf.writeDoubleLE(0xdeadbeefcafebabe, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer d7 5f f9 dd b7 d5 eb 43&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeFloatBE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeFloatBE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeFloatBE()</code> writes big endian, <code>writeFloatLE()</code> writes little\nendian). Behavior is not defined when <code>value</code> is anything other than a 32-bit\nfloat.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(4);\nbuf.writeFloatBE(0xcafebabe, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer 4f 4a fe bb&gt;\n\nbuf.writeFloatLE(0xcafebabe, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer bb fe 4a 4f&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeFloatLE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeFloatLE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeFloatBE()</code> writes big endian, <code>writeFloatLE()</code> writes little\nendian). Behavior is not defined when <code>value</code> is anything other than a 32-bit\nfloat.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(4);\nbuf.writeFloatBE(0xcafebabe, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer 4f 4a fe bb&gt;\n\nbuf.writeFloatLE(0xcafebabe, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer bb fe 4a 4f&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeInt8(value, offset[, noAssert])",
              "type": "method",
              "name": "writeInt8",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 1` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 1`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code>. The <code>value</code> should be a\nvalid signed 8-bit integer.  Behavior is not defined when <code>value</code> is anything\nother than a signed 8-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>The <code>value</code> is interpreted and written as a two&#39;s complement signed integer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(2);\nbuf.writeInt8(2, 0);\nbuf.writeInt8(-2, 1);\nconsole.log(buf);\n  // Prints: &lt;Buffer 02 fe&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeInt16BE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeInt16BE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 2` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 2`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeInt16BE()</code> writes big endian, <code>writeInt16LE()</code> writes little\nendian). The <code>value</code> should be a valid signed 16-bit integer. Behavior is\nnot defined when <code>value</code> is anything other than a signed 16-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>The <code>value</code> is interpreted and written as a two&#39;s complement signed integer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(4);\nbuf.writeInt16BE(0x0102,0);\nbuf.writeInt16LE(0x0304,2);\nconsole.log(buf);\n  // Prints: &lt;Buffer 01 02 04 03&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeInt16LE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeInt16LE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 2` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 2`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeInt16BE()</code> writes big endian, <code>writeInt16LE()</code> writes little\nendian). The <code>value</code> should be a valid signed 16-bit integer. Behavior is\nnot defined when <code>value</code> is anything other than a signed 16-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>The <code>value</code> is interpreted and written as a two&#39;s complement signed integer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(4);\nbuf.writeInt16BE(0x0102,0);\nbuf.writeInt16LE(0x0304,2);\nconsole.log(buf);\n  // Prints: &lt;Buffer 01 02 04 03&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeInt32BE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeInt32BE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeInt32BE()</code> writes big endian, <code>writeInt32LE()</code> writes little\nendian). The <code>value</code> should be a valid signed 32-bit integer. Behavior is\nnot defined when <code>value</code> is anything other than a signed 32-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>The <code>value</code> is interpreted and written as a two&#39;s complement signed integer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(8);\nbuf.writeInt32BE(0x01020304,0);\nbuf.writeInt32LE(0x05060708,4);\nconsole.log(buf);\n  // Prints: &lt;Buffer 01 02 03 04 08 07 06 05&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeInt32LE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeInt32LE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeInt32BE()</code> writes big endian, <code>writeInt32LE()</code> writes little\nendian). The <code>value</code> should be a valid signed 32-bit integer. Behavior is\nnot defined when <code>value</code> is anything other than a signed 32-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>The <code>value</code> is interpreted and written as a two&#39;s complement signed integer.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(8);\nbuf.writeInt32BE(0x01020304,0);\nbuf.writeInt32LE(0x05060708,4);\nconsole.log(buf);\n  // Prints: &lt;Buffer 01 02 03 04 08 07 06 05&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeIntBE(value, offset, byteLength[, noAssert])",
              "type": "method",
              "name": "writeIntBE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - byteLength` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - byteLength`"
                    },
                    {
                      "textRaw": "`byteLength` {Number} `0 < byteLength <= 6` ",
                      "name": "byteLength",
                      "type": "Number",
                      "desc": "`0 < byteLength <= 6`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> and <code>byteLength</code>.\nSupports up to 48 bits of accuracy. For example:\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(6);\nbuf1.writeUIntBE(0x1234567890ab, 0, 6);\nconsole.log(buf1);\n  // Prints: &lt;Buffer 12 34 56 78 90 ab&gt;\n\nconst buf2 = new Buffer(6);\nbuf2.writeUIntLE(0x1234567890ab, 0, 6);\nconsole.log(buf2);\n  // Prints: &lt;Buffer ab 90 78 56 34 12&gt;</code></pre>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Behavior is not defined when <code>value</code> is anything other than an integer.\n\n</p>\n"
            },
            {
              "textRaw": "buf.writeIntLE(value, offset, byteLength[, noAssert])",
              "type": "method",
              "name": "writeIntLE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - byteLength` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - byteLength`"
                    },
                    {
                      "textRaw": "`byteLength` {Number} `0 < byteLength <= 6` ",
                      "name": "byteLength",
                      "type": "Number",
                      "desc": "`0 < byteLength <= 6`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> and <code>byteLength</code>.\nSupports up to 48 bits of accuracy. For example:\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(6);\nbuf1.writeUIntBE(0x1234567890ab, 0, 6);\nconsole.log(buf1);\n  // Prints: &lt;Buffer 12 34 56 78 90 ab&gt;\n\nconst buf2 = new Buffer(6);\nbuf2.writeUIntLE(0x1234567890ab, 0, 6);\nconsole.log(buf2);\n  // Prints: &lt;Buffer ab 90 78 56 34 12&gt;</code></pre>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Behavior is not defined when <code>value</code> is anything other than an integer.\n\n</p>\n"
            },
            {
              "textRaw": "buf.writeUInt8(value, offset[, noAssert])",
              "type": "method",
              "name": "writeUInt8",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 1` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 1`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code>. The <code>value</code> should be a\nvalid unsigned 8-bit integer.  Behavior is not defined when <code>value</code> is anything\nother than an unsigned 8-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(4);\nbuf.writeUInt8(0x3, 0);\nbuf.writeUInt8(0x4, 1);\nbuf.writeUInt8(0x23, 2);\nbuf.writeUInt8(0x42, 3);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer 03 04 23 42&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeUInt16BE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeUInt16BE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 2` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 2`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeUInt16BE()</code> writes big endian, <code>writeUInt16LE()</code> writes little\nendian). The <code>value</code> should be a valid unsigned 16-bit integer. Behavior is\nnot defined when <code>value</code> is anything other than an unsigned 16-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(4);\nbuf.writeUInt16BE(0xdead, 0);\nbuf.writeUInt16BE(0xbeef, 2);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer de ad be ef&gt;\n\nbuf.writeUInt16LE(0xdead, 0);\nbuf.writeUInt16LE(0xbeef, 2);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer ad de ef be&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeUInt16LE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeUInt16LE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 2` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 2`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeUInt16BE()</code> writes big endian, <code>writeUInt16LE()</code> writes little\nendian). The <code>value</code> should be a valid unsigned 16-bit integer. Behavior is\nnot defined when <code>value</code> is anything other than an unsigned 16-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(4);\nbuf.writeUInt16BE(0xdead, 0);\nbuf.writeUInt16BE(0xbeef, 2);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer de ad be ef&gt;\n\nbuf.writeUInt16LE(0xdead, 0);\nbuf.writeUInt16LE(0xbeef, 2);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer ad de ef be&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeUInt32BE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeUInt32BE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeUInt32BE()</code> writes big endian, <code>writeUInt32LE()</code> writes little\nendian). The <code>value</code> should be a valid unsigned 32-bit integer. Behavior is\nnot defined when <code>value</code> is anything other than an unsigned 32-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(4);\nbuf.writeUInt32BE(0xfeedface, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer fe ed fa ce&gt;\n\nbuf.writeUInt32LE(0xfeedface, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer ce fa ed fe&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeUInt32LE(value, offset[, noAssert])",
              "type": "method",
              "name": "writeUInt32LE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - 4` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - 4`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> with specified endian\nformat (<code>writeUInt32BE()</code> writes big endian, <code>writeUInt32LE()</code> writes little\nendian). The <code>value</code> should be a valid unsigned 32-bit integer. Behavior is\nnot defined when <code>value</code> is anything other than an unsigned 32-bit integer.\n\n</p>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(4);\nbuf.writeUInt32BE(0xfeedface, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer fe ed fa ce&gt;\n\nbuf.writeUInt32LE(0xfeedface, 0);\n\nconsole.log(buf);\n  // Prints: &lt;Buffer ce fa ed fe&gt;</code></pre>\n"
            },
            {
              "textRaw": "buf.writeUIntBE(value, offset, byteLength[, noAssert])",
              "type": "method",
              "name": "writeUIntBE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - byteLength` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - byteLength`"
                    },
                    {
                      "textRaw": "`byteLength` {Number} `0 < byteLength <= 6` ",
                      "name": "byteLength",
                      "type": "Number",
                      "desc": "`0 < byteLength <= 6`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> and <code>byteLength</code>.\nSupports up to 48 bits of accuracy. For example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(6);\nbuf.writeUIntBE(0x1234567890ab, 0, 6);\nconsole.log(buf);\n  // Prints: &lt;Buffer 12 34 56 78 90 ab&gt;</code></pre>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Behavior is not defined when <code>value</code> is anything other than an unsigned integer.\n\n</p>\n"
            },
            {
              "textRaw": "buf.writeUIntLE(value, offset, byteLength[, noAssert])",
              "type": "method",
              "name": "writeUIntLE",
              "signatures": [
                {
                  "return": {
                    "textRaw": "Return: {Number} The offset plus the number of written bytes ",
                    "name": "return",
                    "type": "Number",
                    "desc": "The offset plus the number of written bytes"
                  },
                  "params": [
                    {
                      "textRaw": "`value` {Number} Bytes to be written to Buffer ",
                      "name": "value",
                      "type": "Number",
                      "desc": "Bytes to be written to Buffer"
                    },
                    {
                      "textRaw": "`offset` {Number} `0 <= offset <= buf.length - byteLength` ",
                      "name": "offset",
                      "type": "Number",
                      "desc": "`0 <= offset <= buf.length - byteLength`"
                    },
                    {
                      "textRaw": "`byteLength` {Number} `0 < byteLength <= 6` ",
                      "name": "byteLength",
                      "type": "Number",
                      "desc": "`0 < byteLength <= 6`"
                    },
                    {
                      "textRaw": "`noAssert` {Boolean} Default: false ",
                      "name": "noAssert",
                      "type": "Boolean",
                      "desc": "Default: false",
                      "optional": true
                    }
                  ]
                },
                {
                  "params": [
                    {
                      "name": "value"
                    },
                    {
                      "name": "offset"
                    },
                    {
                      "name": "byteLength"
                    },
                    {
                      "name": "noAssert",
                      "optional": true
                    }
                  ]
                }
              ],
              "desc": "<p>Writes <code>value</code> to the Buffer at the specified <code>offset</code> and <code>byteLength</code>.\nSupports up to 48 bits of accuracy. For example:\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(6);\nbuf.writeUIntBE(0x1234567890ab, 0, 6);\nconsole.log(buf);\n  // Prints: &lt;Buffer 12 34 56 78 90 ab&gt;</code></pre>\n<p>Set <code>noAssert</code> to true to skip validation of <code>value</code> and <code>offset</code>. This means\nthat <code>value</code> may be too large for the specific function and <code>offset</code> may be\nbeyond the end of the Buffer leading to the values being silently dropped. This\nshould not be used unless you are certain of correctness.\n\n</p>\n<p>Behavior is not defined when <code>value</code> is anything other than an unsigned integer.\n\n</p>\n"
            }
          ],
          "signatures": [
            {
              "params": [
                {
                  "textRaw": "`array` {Array} ",
                  "name": "array",
                  "type": "Array"
                }
              ],
              "desc": "<p>Allocates a new Buffer using an <code>array</code> of octets.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([0x62,0x75,0x66,0x66,0x65,0x72]);\n  // creates a new Buffer containing ASCII bytes\n  // [&#39;b&#39;,&#39;u&#39;,&#39;f&#39;,&#39;f&#39;,&#39;e&#39;,&#39;r&#39;]</code></pre>\n"
            },
            {
              "params": [
                {
                  "name": "array"
                }
              ],
              "desc": "<p>Allocates a new Buffer using an <code>array</code> of octets.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer([0x62,0x75,0x66,0x66,0x65,0x72]);\n  // creates a new Buffer containing ASCII bytes\n  // [&#39;b&#39;,&#39;u&#39;,&#39;f&#39;,&#39;f&#39;,&#39;e&#39;,&#39;r&#39;]</code></pre>\n"
            },
            {
              "params": [
                {
                  "textRaw": "`buffer` {Buffer} ",
                  "name": "buffer",
                  "type": "Buffer"
                }
              ],
              "desc": "<p>Copies the passed <code>buffer</code> data onto a new <code>Buffer</code> instance.\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(&#39;buffer&#39;);\nconst buf2 = new Buffer(buf1);\n\nbuf1[0] = 0x61;\nconsole.log(buf1.toString());\n  // &#39;auffer&#39;\nconsole.log(buf2.toString());\n  // &#39;buffer&#39; (copy is not changed)</code></pre>\n"
            },
            {
              "params": [
                {
                  "name": "buffer"
                }
              ],
              "desc": "<p>Copies the passed <code>buffer</code> data onto a new <code>Buffer</code> instance.\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(&#39;buffer&#39;);\nconst buf2 = new Buffer(buf1);\n\nbuf1[0] = 0x61;\nconsole.log(buf1.toString());\n  // &#39;auffer&#39;\nconsole.log(buf2.toString());\n  // &#39;buffer&#39; (copy is not changed)</code></pre>\n"
            },
            {
              "params": [
                {
                  "textRaw": "`arrayBuffer` - The `.buffer` property of a `TypedArray` or a `new ArrayBuffer()` ",
                  "name": "arrayBuffer",
                  "desc": "The `.buffer` property of a `TypedArray` or a `new ArrayBuffer()`"
                }
              ],
              "desc": "<p>When passed a reference to the <code>.buffer</code> property of a <code>TypedArray</code> instance,\nthe newly created Buffer will share the same allocated memory as the\nTypedArray.\n\n</p>\n<pre><code class=\"js\">const arr = new Uint16Array(2);\narr[0] = 5000;\narr[1] = 4000;\n\nconst buf = new Buffer(arr.buffer); // shares the memory with arr;\n\nconsole.log(buf);\n  // Prints: &lt;Buffer 88 13 a0 0f&gt;\n\n// changing the TypdArray changes the Buffer also\narr[1] = 6000;\n\nconsole.log(buf);\n  // Prints: &lt;Buffer 88 13 70 17&gt;</code></pre>\n"
            },
            {
              "params": [
                {
                  "name": "arrayBuffer"
                }
              ],
              "desc": "<p>When passed a reference to the <code>.buffer</code> property of a <code>TypedArray</code> instance,\nthe newly created Buffer will share the same allocated memory as the\nTypedArray.\n\n</p>\n<pre><code class=\"js\">const arr = new Uint16Array(2);\narr[0] = 5000;\narr[1] = 4000;\n\nconst buf = new Buffer(arr.buffer); // shares the memory with arr;\n\nconsole.log(buf);\n  // Prints: &lt;Buffer 88 13 a0 0f&gt;\n\n// changing the TypdArray changes the Buffer also\narr[1] = 6000;\n\nconsole.log(buf);\n  // Prints: &lt;Buffer 88 13 70 17&gt;</code></pre>\n"
            },
            {
              "params": [
                {
                  "textRaw": "`size` {Number} ",
                  "name": "size",
                  "type": "Number"
                }
              ],
              "desc": "<p>Allocates a new Buffer of <code>size</code> bytes.  The <code>size</code> must be less than\nor equal to the value of <code>require(&#39;buffer&#39;).kMaxLength</code> (on 64-bit\narchitectures, <code>kMaxLength</code> is <code>(2^31)-1</code>). Otherwise, a [<code>RangeError</code>][] is\nthrown. If a <code>size</code> less than 0 is specified, a zero-length Buffer will be\ncreated.\n\n</p>\n<p>Unlike <code>ArrayBuffers</code>, the underlying memory for Buffer instances created in\nthis way is not initialized. The contents of a newly created <code>Buffer</code> are\nunknown and could contain sensitive data. Use [<code>buf.fill(0)</code>][] to initialize a\nBuffer to zeroes.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(5);\nconsole.log(buf);\n  // &lt;Buffer 78 e0 82 02 01&gt;\n  // (octets will be different, every time)\nbuf.fill(0);\nconsole.log(buf);\n  // &lt;Buffer 00 00 00 00 00&gt;</code></pre>\n"
            },
            {
              "params": [
                {
                  "name": "size"
                }
              ],
              "desc": "<p>Allocates a new Buffer of <code>size</code> bytes.  The <code>size</code> must be less than\nor equal to the value of <code>require(&#39;buffer&#39;).kMaxLength</code> (on 64-bit\narchitectures, <code>kMaxLength</code> is <code>(2^31)-1</code>). Otherwise, a [<code>RangeError</code>][] is\nthrown. If a <code>size</code> less than 0 is specified, a zero-length Buffer will be\ncreated.\n\n</p>\n<p>Unlike <code>ArrayBuffers</code>, the underlying memory for Buffer instances created in\nthis way is not initialized. The contents of a newly created <code>Buffer</code> are\nunknown and could contain sensitive data. Use [<code>buf.fill(0)</code>][] to initialize a\nBuffer to zeroes.\n\n</p>\n<pre><code class=\"js\">const buf = new Buffer(5);\nconsole.log(buf);\n  // &lt;Buffer 78 e0 82 02 01&gt;\n  // (octets will be different, every time)\nbuf.fill(0);\nconsole.log(buf);\n  // &lt;Buffer 00 00 00 00 00&gt;</code></pre>\n"
            },
            {
              "params": [
                {
                  "textRaw": "`str` {String} String to encode. ",
                  "name": "str",
                  "type": "String",
                  "desc": "String to encode."
                },
                {
                  "textRaw": "`encoding` {String} Default: `'utf8'` ",
                  "name": "encoding",
                  "type": "String",
                  "desc": "Default: `'utf8'`",
                  "optional": true
                }
              ],
              "desc": "<p>Creates a new Buffer containing the given JavaScript string <code>str</code>. If\nprovided, the <code>encoding</code> parameter identifies the strings character encoding.\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(&#39;this is a tést&#39;);\nconsole.log(buf1.toString());\n  // prints: this is a tést\nconsole.log(buf1.toString(&#39;ascii&#39;));\n  // prints: this is a tC)st\n\nconst buf2 = new Buffer(&#39;7468697320697320612074c3a97374&#39;, &#39;hex&#39;);\nconsole.log(buf2.toString());\n  // prints: this is a tést</code></pre>\n"
            },
            {
              "params": [
                {
                  "name": "str"
                },
                {
                  "name": "encoding",
                  "optional": true
                }
              ],
              "desc": "<p>Creates a new Buffer containing the given JavaScript string <code>str</code>. If\nprovided, the <code>encoding</code> parameter identifies the strings character encoding.\n\n</p>\n<pre><code class=\"js\">const buf1 = new Buffer(&#39;this is a tést&#39;);\nconsole.log(buf1.toString());\n  // prints: this is a tést\nconsole.log(buf1.toString(&#39;ascii&#39;));\n  // prints: this is a tC)st\n\nconst buf2 = new Buffer(&#39;7468697320697320612074c3a97374&#39;, &#39;hex&#39;);\nconsole.log(buf2.toString());\n  // prints: this is a tést</code></pre>\n"
            }
          ]
        },
        {
          "textRaw": "Class: SlowBuffer",
          "type": "class",
          "name": "SlowBuffer",
          "desc": "<p>Returns an un-pooled <code>Buffer</code>.\n\n</p>\n<p>In order to avoid the garbage collection overhead of creating many individually\nallocated Buffers, by default allocations under 4KB are sliced from a single\nlarger allocated object. This approach improves both performance and memory\nusage since v8 does not need to track and cleanup as many <code>Persistent</code> objects.\n\n</p>\n<p>In the case where a developer may need to retain a small chunk of memory from a\npool for an indeterminate amount of time, it may be appropriate to create an\nun-pooled Buffer instance using <code>SlowBuffer</code> then copy out the relevant bits.\n\n</p>\n<pre><code class=\"js\">// need to keep around a few small chunks of memory\nconst store = [];\n\nsocket.on(&#39;readable&#39;, () =&gt; {\n  var data = socket.read();\n  // allocate for retained data\n  var sb = new SlowBuffer(10);\n  // copy the data into the new allocation\n  data.copy(sb, 0, 0, 10);\n  store.push(sb);\n});</code></pre>\n<p>Use of <code>SlowBuffer</code> should be used only as a last resort <em>after</em> a developer\nhas observed undue memory retention in their applications.\n\n</p>\n"
        }
      ],
      "properties": [
        {
          "textRaw": "`INSPECT_MAX_BYTES` {Number} Default: 50 ",
          "type": "Number",
          "name": "INSPECT_MAX_BYTES",
          "desc": "<p>Returns the maximum number of bytes that will be returned when\n<code>buffer.inspect()</code> is called. This can be overridden by user modules. See\n[<code>util.inspect()</code>][] for more details on <code>buffer.inspect()</code> behavior.\n\n</p>\n<p>Note that this is a property on the <code>buffer</code> module as returned by\n<code>require(&#39;buffer&#39;)</code>, not on the Buffer global or a Buffer instance.\n\n</p>\n",
          "shortDesc": "Default: 50"
        }
      ],
      "type": "module",
      "displayName": "Buffer"
    }
  ]
}
