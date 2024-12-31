/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solana_treasury_program.json`.
 */
export type SolanaTreasuryProgram = {
  address: "7YymL3hnQhvSYtuH8vQT8ieLV63fnpPy1xtM4VyFFn6Y"
  metadata: {
    name: "solanaTreasuryProgram"
    version: "0.1.0"
    spec: "0.1.0"
    description: "Created with Anchor"
  }
  instructions: [
    {
      name: "initialize"
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "treasury"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [116, 114, 101, 97, 115, 117, 114, 121]
              },
              {
                kind: "account"
                path: "signer"
              },
            ]
          }
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
      ]
      args: []
    },
    {
      name: "withdrawSol"
      discriminator: [145, 131, 74, 136, 65, 137, 42, 38]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "treasury"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [116, 114, 101, 97, 115, 117, 114, 121]
              },
              {
                kind: "account"
                path: "signer"
              },
            ]
          }
        },
        {
          name: "treasuryWsolAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "treasury"
              },
              {
                kind: "const"
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: "account"
                path: "nativeMint"
              },
            ]
            program: {
              kind: "const"
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: "receiver"
          writable: true
        },
        {
          name: "nativeMint"
          address: "So11111111111111111111111111111111111111112"
        },
        {
          name: "receiverWsolAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "receiver"
              },
              {
                kind: "const"
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: "account"
                path: "nativeMint"
              },
            ]
            program: {
              kind: "const"
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "associatedTokenProgram"
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
      ]
      args: [
        {
          name: "amount"
          type: "u64"
        },
      ]
    },
    {
      name: "withdrawToken"
      discriminator: [136, 235, 181, 5, 101, 109, 57, 81]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "treasury"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [116, 114, 101, 97, 115, 117, 114, 121]
              },
              {
                kind: "account"
                path: "signer"
              },
            ]
          }
        },
        {
          name: "treasuryTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "treasury"
              },
              {
                kind: "const"
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: "account"
                path: "currencyMint"
              },
            ]
            program: {
              kind: "const"
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: "receiver"
          writable: true
        },
        {
          name: "receiverTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "receiver"
              },
              {
                kind: "const"
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: "account"
                path: "currencyMint"
              },
            ]
            program: {
              kind: "const"
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: "currencyMint"
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "associatedTokenProgram"
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
      ]
      args: [
        {
          name: "amount"
          type: "u64"
        },
      ]
    },
  ]
}
