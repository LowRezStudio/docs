---
description: An introduction to the encryption methods used in Paladins, focusing on Salsa20 and the Diffie-Hellman key exchange.
---
# Introduction

Packets that are sent between the client and server are encrypted, Hi-Rez uses Salsa20[^1] which is a rotating key XOR cipher to do that using the Crypto++[^2] C++ library.

The client generates a random KEY/IV[^3][^4] pair that it sends to the server using an unencrypted packet when trying to log in.

The KEY/IV is stored in an encrypted binary blob[^5] using the Diffie-Hellman[^6] key exchange in the packet so that the server can initiate its own Salsa20 encryption/decryption.

# References

[^1]: https://en.wikipedia.org/wiki/Salsa20

[^2]: https://www.cryptopp.com/

[^3]: https://en.wikipedia.org/wiki/Key_(cryptography)

[^4]: https://en.wikipedia.org/wiki/Initialization_vector

[^5]: https://en.wikipedia.org/wiki/Binary_blob

[^6]: https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange
