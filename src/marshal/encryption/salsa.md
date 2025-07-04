---
description: An explanation of how Salsa20 encryption is used in Paladins for packet encryption and decryption.
---

# Salsa20

As said in the [introduction](/marshal/encryption/introduction) the client generates a random KEY/IV pair that it sends to the server using an unencrypted packet when trying to log in.

The KEY/IV is stored in an encrypted binary blob using the Diffie-Hellman key exchange in the packet so that the server can initiate its own Salsa20 encryption/decryption.

All you have to do to decrypt and encrypt your own packets is to grab the KEV/IV from the [`HELLO`](/marshal/packets/hello) packet and initiate your salsa20 encryption/decryption classes with that.
