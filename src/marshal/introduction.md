# Introduction

Every UE3 Hi-Rez games uses a proprietary binary serialization[^1] format called Marshal.<br/>
This format is used to communicate internally in the game or via packets.

The format is mostly used for TCP packet communication on the [login server](/marshal/login-server) or UDP communication on the [game server](/marshal/game-server), thought it's also used for the [lang.dat](/marshal/lang-file) files and the [assembly.dat](/marshal/assembly) file

# References
[^1]: https://en.wikipedia.org/wiki/Serialization
