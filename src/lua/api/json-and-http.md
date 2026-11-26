---
title: json and http API reference
description: Encode and decode JSON and make HTTP(S) requests from a Paladins Lua mod with Tempest.Scripting, without blocking the game thread.
---

# `json` and `http`

Available since Tempest Scripting **1.1.0**. A mod that uses them should declare
`dependencies = ["tempest-scripting>=1.1.0"]` in its `manifest.toml`.

## `json`

```lua
local t, err = json.decode('{"a":[1,2,null],"b":{}}')
print(t.a[3] == json.null)                      -- true
print(json.encode({ id = 1, tags = json.array() })) -- {"id":1,"tags":[]}
print(json.encode(t, { pretty = true }))
```

| function                    | returns                                                            |
| --------------------------- | ------------------------------------------------------------------ |
| `json.encode(value, opts?)` | JSON text; `opts.pretty = true` indents it                         |
| `json.decode(text)`         | the value, or `nil` and an error message when the text is not JSON |
| `json.array(t?)`            | `t` (or a new table), marked to encode as an array even when empty |
| `json.null`                 | the value JSON `null` decodes to, so arrays keep their positions   |

How Lua values map to JSON:

- A table whose keys are exactly `1..n` is an array. Any other table is an object: integer keys
  become strings (`{ [2420] = "Zhin" }` → `{"2420":"Zhin"}`), and keys are written sorted.
- An empty table is `{}` unless it went through `json.array`. Arrays that `json.decode` returns
  are already marked, so `[]` stays `[]` when you encode it back.
- Integral numbers are written without a fraction (`2.0` → `2`).
- `nil` and `json.null` are `null`.
- NaN, infinities, functions, userdata, strings that are not valid UTF-8 and tables that
  contain themselves raise an error.

## `http`

Requests run on a thread of their own, so the game never waits on the network. The callback
runs on the game thread at the next event, like a [`tempest.queue`](/lua/api/tempest) job, so
it can touch game objects. It is profiled under your mod.

```lua
http.get("https://api.github.com/zen", function(res, err)
	if not res then return print("request failed: " .. err) end
	print(res.status, res.headers["content-type"], res.body)
end)

http.post("https://example.com/api/scores", { player = "me", score = 12 }, function(res, err)
	if res and res.ok then
		local reply = res:json()
	end
end)

http.request({
	url = "https://example.com/api/items",
	method = "PUT",
	headers = { Authorization = "Bearer " .. token },
	query = { page = 2, q = "a b" },  -- ?page=2&q=a%20b
	body = "raw text",
	timeout = 10,
}, function(res, err) end)
```

| function                                 | returns                      |
| ---------------------------------------- | ---------------------------- |
| `http.request(opts, callback)`           | request id                   |
| `http.get(url, [opts], callback)`        | request id                   |
| `http.post(url, body, [opts], callback)` | request id                   |
| `http.cancel(id)`                        | drops the request's callback |
| `http.urlencode(s)`                      | `s` percent-encoded          |

Options:

| field     | meaning                                                                   |
| --------- | ------------------------------------------------------------------------- |
| `url`     | `http://` or `https://` URL (required for `http.request`)                 |
| `method`  | default `GET`, or `POST` when there is a body                             |
| `headers` | `{ Name = "value" }`                                                      |
| `query`   | `{ key = value }` added to the URL, percent-encoded                       |
| `body`    | a string, or a table sent as JSON (with `Content-Type: application/json`) |
| `timeout` | seconds, default 30                                                       |

The callback receives `res, err`:

- `res.status` (integer), `res.ok` (status 2xx), `res.headers` (lower-case names; a repeated
  header's values are joined with `", "`), `res.body` (string), `res.url`, and `res:json()`,
  which is `json.decode(res.body)`.
- An error status such as 404 is still a response: `res` is set, `res.ok` is false.
- `err` is set, and `res` is `nil`, only when no response came back: the name did not
  resolve, the connection was refused, TLS failed, or the request timed out.

Requests go through Windows' own HTTP stack (WinHTTP): the system's certificates and proxy
settings, redirects followed, gzip and deflate decoded. Responses are limited to 256 MB.

When a mod reloads, the callbacks it was still waiting on are dropped, so an answer never
reaches the old copy of the mod. `http.cancel` does the same for one request: the request
still runs to the end, but nothing is called.
