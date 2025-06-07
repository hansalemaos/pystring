# pystring
Clone of Python's string API in JavaScript

```js
mystring = new PyString("Hhello\th\tello  ");
console.log(mystring.strip());
console.log(mystring.split("ll").map(part => part.toString()));
console.log(mystring.reverse().toString());
console.log(mystring.rsplit("ll", 3).map(part => part.toString()));
console.log(mystring.rsplit("", 2).map(part => part.toString()));
console.log(mystring.lsplit("", 2).map(part => part.toString()));
console.log(mystring.text_wrap(3).map(part => part.toString()));
console.log(mystring.lower().toString());
console.log(mystring.upper().toString());
console.log(new PyString("Hhello\th\tello  ").istitle());
console.log(new PyString("Hello").istitle());
console.log(new PyString("Hello").zfill(10).toString());
console.log(new PyString("Hello").ljust(25, "x").toString());
console.log(new PyString("Hello").center(25, "x").toString());
console.log(new PyString("Hello\nhallao\r\nqq").splitlines().map(part => part.toString()));
console.log(new PyString("Hello\nhallao\r\nqq").splitlines(true).map(part => part.toString()));
console.log(new PyString("Hello\nhallao\r\nqq").removeprefix("Hello").toString());
console.log(new PyString("Hello\nhallao\r\nqq").removesuffix("qq").toString());
console.log(new PyString("Hello\nhallao\r\nqq").convert_to_base16().toString());
console.log(new PyString("48656C6C6F0A68616C6C616F0D0A7171").from_base16().toString());
console.log(new PyString("Hello Hello\nhallao\r\nqq").count_words());
console.log(new PyString("Hello Hello\nhallao\r\nqq").get_unique_words());
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").remove_accents().toString());
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").casefold().toString());
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").capitalize().toString());
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").count("ll"));
console.log(new PyString('01\t012\t0123\t01234').expandtabs(8).toString());
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").find("ll", 1));
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").find("xl", 1));
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").rfind("ll", 1));
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").rfind("xll", 0));
console.log(new PyString('{name} was born in {country}').format_map(new Map([['country', 'Holland'], ['name', 'Guido']])).toString());
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").isascii());
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").casefold().isascii());
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").partition("ll").map(part => part.toString()));
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").partition("llx").map(part => part.toString()));
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").rpartition("ll").map(part => part.toString()));
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").rpartition("llx").map(part => part.toString()));
console.log(new PyString("Hello Hello\näöçßhallao\r\nqq").swapcase().toString());
console.log(new PyString('Hello world qQ').title().toString());
console.log(new PyString('q').title().toString());
console.log(new PyString("Hello, World!\n1234\tABcd").title().toString());
console.log(new PyString("Hello, World!\n1234\tABcd").translate(PyString.maketrans(new Map([["H", "q"], ["e", "w"], ["l", "e"], ["o", "r"], [" ", " "]])), "").toString());
console.log(new PyString("Hello, World!\n1234\tABcd").endswith("World!"));
console.log(new PyString("Hello, World!\n1234\tABcd").endswith("cd"));
console.log(new PyString("ABcd").endswith("AB", 0, 2));
console.log(new PyString(",").join([1, 2, 3]).toString());
console.log(new PyString("    ").isspace());
console.log(new PyString("ABc").isalnum());
console.log(new PyString("ABc|").isalnum());
console.log(new PyString("999").isdigit());
console.log(new PyString("999").isdecimal());
console.log(new PyString("myStr").slice(1, 3).upper());
console.log(new PyString("myStr").slice(-3, -1).upper());
let teststring = new PyString("myStr");
for (let c of teststring) {
    console.log(c);
}
```