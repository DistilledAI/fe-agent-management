/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solora_pyth_price.json`.
 */
export type SoloraPythPrice = {
  "address": "w6kExqTy2v84MGzsX8uicpWzRLVdAzZhZ6x9anjbb81",
  "metadata": {
    "name": "soloraPythPrice",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "A crypto price prediction game using pyth oracles"
  },
  "instructions": [
    {
      "name": "closeAccounts",
      "discriminator": [
        171,
        222,
        94,
        233,
        34,
        250,
        202,
        1
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "relations": [
            "eventConfig"
          ]
        },
        {
          "name": "eventConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "event_config.authority",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.pyth_feed",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.currency_mint",
                "account": "eventConfig"
              }
            ]
          },
          "relations": [
            "event"
          ]
        },
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event.start_time",
                "account": "event"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createEvent",
      "discriminator": [
        49,
        219,
        29,
        203,
        22,
        98,
        100,
        87
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "eventConfig"
          ]
        },
        {
          "name": "eventConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "pythFeed"
              },
              {
                "kind": "account",
                "path": "currencyMint"
              }
            ]
          }
        },
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.next_round_id",
                "account": "eventConfig"
              }
            ]
          }
        },
        {
          "name": "pythFeed",
          "relations": [
            "eventConfig"
          ]
        },
        {
          "name": "currencyMint",
          "relations": [
            "eventConfig"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "initialLiquidity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createEventConfig",
      "discriminator": [
        61,
        29,
        132,
        88,
        72,
        37,
        19,
        33
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "eventConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "pythFeed"
              },
              {
                "kind": "account",
                "path": "currencyMint"
              }
            ]
          }
        },
        {
          "name": "pythFeed"
        },
        {
          "name": "currencyMint"
        },
        {
          "name": "feeAccount"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "intervalSeconds",
          "type": "u32"
        },
        {
          "name": "nextEventStart",
          "type": "i64"
        },
        {
          "name": "feeBps",
          "type": "u32"
        },
        {
          "name": "feeBurnBps",
          "type": "u32"
        }
      ]
    },
    {
      "name": "createOrder",
      "discriminator": [
        141,
        54,
        37,
        207,
        237,
        210,
        250,
        215
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "eventConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "event_config.authority",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.pyth_feed",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.currency_mint",
                "account": "eventConfig"
              }
            ]
          },
          "relations": [
            "event"
          ]
        },
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event.id",
                "account": "event"
              }
            ]
          }
        },
        {
          "name": "order",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "outcome",
          "type": {
            "defined": {
              "name": "outcome"
            }
          }
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setLockPrice",
      "discriminator": [
        164,
        209,
        167,
        81,
        210,
        14,
        107,
        82
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "eventConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "event_config.authority",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.pyth_feed",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.currency_mint",
                "account": "eventConfig"
              }
            ]
          },
          "relations": [
            "event"
          ]
        },
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event.id",
                "account": "event"
              }
            ]
          }
        },
        {
          "name": "pythFeed",
          "relations": [
            "eventConfig"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "settleEvent",
      "discriminator": [
        43,
        34,
        6,
        191,
        246,
        190,
        163,
        128
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "eventConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "event_config.authority",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.pyth_feed",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.currency_mint",
                "account": "eventConfig"
              }
            ]
          }
        },
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event.id",
                "account": "event"
              }
            ]
          }
        },
        {
          "name": "pythFeed",
          "relations": [
            "eventConfig"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "settleExpiredEvent",
      "discriminator": [
        205,
        179,
        116,
        236,
        176,
        89,
        223,
        187
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "eventConfig"
          ]
        },
        {
          "name": "eventConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "event_config.authority",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.pyth_feed",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.currency_mint",
                "account": "eventConfig"
              }
            ]
          }
        },
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event.id",
                "account": "event"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "settleOrder",
      "discriminator": [
        80,
        74,
        204,
        34,
        12,
        183,
        66,
        66
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "order"
          ]
        },
        {
          "name": "eventConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "event_config.authority",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.pyth_feed",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.currency_mint",
                "account": "eventConfig"
              }
            ]
          },
          "relations": [
            "event"
          ]
        },
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event.id",
                "account": "event"
              }
            ]
          },
          "relations": [
            "order"
          ]
        },
        {
          "name": "order",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "feeAccount",
          "writable": true,
          "relations": [
            "eventConfig"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateEventConfig",
      "discriminator": [
        38,
        47,
        8,
        203,
        48,
        205,
        103,
        227
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "eventConfig"
          ]
        },
        {
          "name": "eventConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "account",
                "path": "event_config.pyth_feed",
                "account": "eventConfig"
              },
              {
                "kind": "account",
                "path": "event_config.currency_mint",
                "account": "eventConfig"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "intervalSeconds",
          "type": "u32"
        },
        {
          "name": "nextEventStart",
          "type": "i64"
        },
        {
          "name": "expiredTimestampDifference",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "event",
      "discriminator": [
        125,
        192,
        125,
        158,
        9,
        115,
        152,
        233
      ]
    },
    {
      "name": "eventConfig",
      "discriminator": [
        85,
        63,
        74,
        243,
        198,
        192,
        138,
        0
      ]
    },
    {
      "name": "order",
      "discriminator": [
        134,
        173,
        223,
        185,
        77,
        86,
        28,
        51
      ]
    }
  ],
  "events": [
    {
      "name": "eventCreated",
      "discriminator": [
        59,
        186,
        199,
        175,
        242,
        25,
        238,
        94
      ]
    },
    {
      "name": "eventLocked",
      "discriminator": [
        142,
        162,
        200,
        139,
        142,
        169,
        149,
        202
      ]
    },
    {
      "name": "eventSettled",
      "discriminator": [
        42,
        215,
        248,
        63,
        93,
        46,
        48,
        44
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidPdaTransferSource",
      "msg": "Invalid PDA transfer source"
    },
    {
      "code": 6001,
      "name": "invalidPdaTransferDestination",
      "msg": "Invalid PDA transfer destination"
    },
    {
      "code": 6002,
      "name": "publicKeyMismatch",
      "msg": "Invalid public key"
    },
    {
      "code": 6003,
      "name": "incorrectOwner",
      "msg": "Incorrect owner"
    },
    {
      "code": 6004,
      "name": "uninitializedAccount",
      "msg": "Account not initialized"
    }
  ],
  "types": [
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump seed used to generate the program address / authority"
            ],
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "eventConfig",
            "type": "pubkey"
          },
          {
            "name": "startTime",
            "docs": [
              "Timestamp of when the event is open to orders"
            ],
            "type": "i64"
          },
          {
            "name": "lockTime",
            "docs": [
              "Timestamp of when the event is closed to new orders (start of waiting period)"
            ],
            "type": "i64"
          },
          {
            "name": "waitPeriod",
            "docs": [
              "Seconds to wait after locking and before closing"
            ],
            "type": "u32"
          },
          {
            "name": "lockPrice",
            "docs": [
              "Price of the pyth feed at the time of lock"
            ],
            "type": "u64"
          },
          {
            "name": "settlePrice",
            "docs": [
              "Price of the pyth feed at the time of settlement"
            ],
            "type": "u64"
          },
          {
            "name": "outcome",
            "docs": [
              "Outcome of the event or 0 if not yet resolved"
            ],
            "type": {
              "defined": {
                "name": "outcome"
              }
            }
          },
          {
            "name": "upAmount",
            "docs": [
              "Store up and down bet amounts"
            ],
            "type": "u128"
          },
          {
            "name": "downAmount",
            "type": "u128"
          },
          {
            "name": "upCount",
            "docs": [
              "Store counts for UI"
            ],
            "type": "u32"
          },
          {
            "name": "downCount",
            "type": "u32"
          },
          {
            "name": "priceDecimals",
            "docs": [
              "Number of decimals to consider for price changes"
            ],
            "type": "u8"
          },
          {
            "name": "ordersSettled",
            "docs": [
              "Number of orders settled. Once it reaches the up_count + down_count it's safe to close the event"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "eventConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump seed used to generate the program address / authority"
            ],
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "authority",
            "docs": [
              "Owner of the configuration"
            ],
            "type": "pubkey"
          },
          {
            "name": "pythFeed",
            "docs": [
              "Pyth price feed account to fetch prices from"
            ],
            "type": "pubkey"
          },
          {
            "name": "currencyMint",
            "docs": [
              "SPL token mint or native mint for SOL for the pool bets"
            ],
            "type": "pubkey"
          },
          {
            "name": "intervalSeconds",
            "docs": [
              "Number of seconds between start/lock/settle"
            ],
            "type": "u32"
          },
          {
            "name": "nextEventStart",
            "docs": [
              "Unix timestamp of the next time an event should start for this config"
            ],
            "type": "i64"
          },
          {
            "name": "nextRoundId",
            "type": "u64"
          },
          {
            "name": "expiredTimestampDifference",
            "type": "u32"
          },
          {
            "name": "feeAccount",
            "type": "pubkey"
          },
          {
            "name": "feeBps",
            "docs": [
              "Fee rate in bps"
            ],
            "type": "u32"
          },
          {
            "name": "feeBurnBps",
            "docs": [
              "Amount in bps to burn from the fees received"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "eventCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "eventConfig",
            "type": "pubkey"
          },
          {
            "name": "event",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "pythFeed",
            "type": "pubkey"
          },
          {
            "name": "priceDecimals",
            "type": "u8"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "lockTime",
            "type": "i64"
          },
          {
            "name": "waitPeriod",
            "type": "u32"
          },
          {
            "name": "currencyMint",
            "type": "pubkey"
          },
          {
            "name": "upAmount",
            "type": "u128"
          },
          {
            "name": "downAmount",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "eventLocked",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "eventConfig",
            "type": "pubkey"
          },
          {
            "name": "event",
            "type": "pubkey"
          },
          {
            "name": "lockPrice",
            "type": "u64"
          },
          {
            "name": "upAmount",
            "type": "u128"
          },
          {
            "name": "downAmount",
            "type": "u128"
          },
          {
            "name": "upCount",
            "type": "u32"
          },
          {
            "name": "downCount",
            "type": "u32"
          },
          {
            "name": "outcome",
            "type": {
              "defined": {
                "name": "outcome"
              }
            }
          }
        ]
      }
    },
    {
      "name": "eventSettled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "eventConfig",
            "type": "pubkey"
          },
          {
            "name": "event",
            "type": "pubkey"
          },
          {
            "name": "settlePrice",
            "type": "u64"
          },
          {
            "name": "outcome",
            "type": {
              "defined": {
                "name": "outcome"
              }
            }
          }
        ]
      }
    },
    {
      "name": "order",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump seed used to generate the program address / authority"
            ],
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "event",
            "type": "pubkey"
          },
          {
            "name": "outcome",
            "type": {
              "defined": {
                "name": "outcome"
              }
            }
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "outcome",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "undrawn"
          },
          {
            "name": "invalid"
          },
          {
            "name": "up"
          },
          {
            "name": "down"
          },
          {
            "name": "same"
          }
        ]
      }
    }
  ]
};
