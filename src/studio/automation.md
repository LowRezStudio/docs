---
title: Automation
description: Let an AI assistant such as Claude Code drive Tempest Studio through its built-in MCP server.
---

# Automation

Tempest Studio has a built-in [MCP](https://modelcontextprotocol.io) server, so an AI assistant such
as Claude Code can open packages, read and edit objects, and take screenshots of the Studio while you
watch.

## Connect an assistant

The server runs while the Studio is open, on `http://127.0.0.1:1423/mcp`, reachable only from your
own computer. Click the plug icon at the bottom of the activity bar: the dialog shows

- the `claude mcp add` command that registers the Studio with Claude Code;
- a `.mcp.json` snippet for other clients.

Both include an access token. It is made the first time the Studio runs and kept, so an assistant
configured once keeps working. The port can be changed with the `TEMPEST_STUDIO_MCP_PORT`
environment variable.

## What an assistant can do

| Tool                                                    | What it does                                                                       |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `studio_windows`, `studio_state`                        | List the windows; read what a window has open.                                     |
| `studio_open_workspace`, `studio_open_package`          | Open a game folder or a package.                                                   |
| `studio_select`, `studio_set_mode`, `studio_open_table` | Select an object, switch views, open an assembly table.                            |
| `upk_call`                                              | Call any backend method: read objects, edit properties, export and replace assets. |
| `studio_eval`                                           | Run code in the Studio's window.                                                   |
| `studio_screenshot`                                     | Capture the window.                                                                |
| `studio_new_window`                                     | Open a new window.                                                                 |

Edits made by an assistant are ordinary edits: they appear as unsaved (or are kept in your project),
can be undone, and go into the mod like your own.

::: warning
The server gives full control over the Studio and the files it can reach. Only give the token to
assistants you trust.
:::
