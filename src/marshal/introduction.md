---
description: An introduction to Marshal, a proprietary binary serialization format used in Hi-Rez UE3 games for internal and network communication.
---

# Introduction

Every UE3 Hi-Rez games uses a proprietary binary serialization format called Marshal.<br/>
This format is used to communicate internally in the game or via packets.

The format is mostly used for TCP packet communication on the [login server](/marshal/servers/login-server) or UDP communication on the [game server](/marshal/servers/game-server), thought it's also used for the [lang.dat](/marshal/files/lang) files and the [assembly.dat](/marshal/files/assembly) file

# References

[^1]: https://en.wikipedia.org/wiki/Serialization
