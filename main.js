const lo = require("buffer-layout");

// Let's encode this value
const value = {
    last_user: [
        7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7, 7, 7, 7, 7,
        7, 7, 7, 7, 7
    ],
    value: 9999999999
}

// Here is a schema for it
const ds = lo.struct([lo.seq(lo.u8(), 32, "last_user"), lo.ns64("value")])

// Result of encoding goes here
const b = Buffer.alloc(32 + 8)

// Encode it
ds.encode(value, b)
console.log(Array.from(b))
// [
//     7, 7,   7,   7,  7,  7, 7, 7, 7, 7,
//     7, 7,   7,   7,  7,  7, 7, 7, 7, 7,
//     7, 7,   7,   7,  7,  7, 7, 7, 7, 7,
//     7, 7, 255, 227, 11, 84, 2, 0, 0, 0
//   ]


// Let's decode it back
const encoded_value = [
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 255, 227, 11, 84, 2, 0, 0, 0
]

const decoded_obj = ds.decode(Buffer.from(encoded_value))
console.log(decoded_obj)
// {
//     last_user: [
//       7, 7, 7, 7, 7, 7, 7, 7, 7,
//       7, 7, 7, 7, 7, 7, 7, 7, 7,
//       7, 7, 7, 7, 7, 7, 7, 7, 7,
//       7, 7, 7, 7, 7
//     ],
//     value: 9999999999
//   }