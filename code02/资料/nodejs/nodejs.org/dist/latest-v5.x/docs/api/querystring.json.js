{
  "source": "https://nodejs.org/dist/latest-v5.x/docs/api/doc/api/querystring.md",
  "modules": [
    {
      "textRaw": "Query String",
      "name": "querystring",
      "stability": 2,
      "stabilityText": "Stable",
      "desc": "<p>This module provides utilities for dealing with query strings.\nIt provides the following methods:\n\n</p>\n",
      "properties": [
        {
          "textRaw": "querystring.escape",
          "name": "escape",
          "desc": "<p>The escape function used by <code>querystring.stringify</code>,\nprovided so that it could be overridden if necessary.\n\n</p>\n"
        },
        {
          "textRaw": "querystring.unescape",
          "name": "unescape",
          "desc": "<p>The unescape function used by <code>querystring.parse</code>,\nprovided so that it could be overridden if necessary.\n\n</p>\n<p>It will try to use <code>decodeURIComponent</code> in the first place,\nbut if that fails it falls back to a safer equivalent that\ndoesn&#39;t throw on malformed URLs.\n</p>\n"
        }
      ],
      "methods": [
        {
          "textRaw": "querystring.parse(str[, sep][, eq][, options])",
          "type": "method",
          "name": "parse",
          "desc": "<p>Deserialize a query string to an object.\nOptionally override the default separator (<code>&#39;&amp;&#39;</code>) and assignment (<code>&#39;=&#39;</code>)\ncharacters.\n\n</p>\n<p>Options object may contain <code>maxKeys</code> property (equal to 1000 by default), it&#39;ll\nbe used to limit processed keys. Set it to 0 to remove key count limitation.\n\n</p>\n<p>Options object may contain <code>decodeURIComponent</code> property (<code>querystring.unescape</code> by default),\nit can be used to decode a <code>non-utf8</code> encoding string if necessary.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">querystring.parse(&#39;foo=bar&amp;baz=qux&amp;baz=quux&amp;corge&#39;)\n// returns { foo: &#39;bar&#39;, baz: [&#39;qux&#39;, &#39;quux&#39;], corge: &#39;&#39; }\n\n// Suppose gbkDecodeURIComponent function already exists,\n// it can decode `gbk` encoding string\nquerystring.parse(&#39;w=%D6%D0%CE%C4&amp;foo=bar&#39;, null, null,\n  { decodeURIComponent: gbkDecodeURIComponent })\n// returns { w: &#39;中文&#39;, foo: &#39;bar&#39; }</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "str"
                },
                {
                  "name": "sep",
                  "optional": true
                },
                {
                  "name": "eq",
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
          "textRaw": "querystring.stringify(obj[, sep][, eq][, options])",
          "type": "method",
          "name": "stringify",
          "desc": "<p>Serialize an object to a query string.\nOptionally override the default separator (<code>&#39;&amp;&#39;</code>) and assignment (<code>&#39;=&#39;</code>)\ncharacters.\n\n</p>\n<p>Options object may contain <code>encodeURIComponent</code> property (<code>querystring.escape</code> by default),\nit can be used to encode string with <code>non-utf8</code> encoding if necessary.\n\n</p>\n<p>Example:\n\n</p>\n<pre><code class=\"js\">querystring.stringify({ foo: &#39;bar&#39;, baz: [&#39;qux&#39;, &#39;quux&#39;], corge: &#39;&#39; })\n// returns &#39;foo=bar&amp;baz=qux&amp;baz=quux&amp;corge=&#39;\n\nquerystring.stringify({foo: &#39;bar&#39;, baz: &#39;qux&#39;}, &#39;;&#39;, &#39;:&#39;)\n// returns &#39;foo:bar;baz:qux&#39;\n\n// Suppose gbkEncodeURIComponent function already exists,\n// it can encode string with `gbk` encoding\nquerystring.stringify({ w: &#39;中文&#39;, foo: &#39;bar&#39; }, null, null,\n  { encodeURIComponent: gbkEncodeURIComponent })\n// returns &#39;w=%D6%D0%CE%C4&amp;foo=bar&#39;</code></pre>\n",
          "signatures": [
            {
              "params": [
                {
                  "name": "obj"
                },
                {
                  "name": "sep",
                  "optional": true
                },
                {
                  "name": "eq",
                  "optional": true
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
      "displayName": "querystring"
    }
  ]
}
