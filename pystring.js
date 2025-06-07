class PyString extends String {
    #regexNewLine = /(?:\r\n|\r|\n)/;
    #regexNewLineKeep = /(\r\n|\r|\n)/;
    #regexSplitAtWhiteSpaceKeep = /(\s+)/;
    #regexAllWhiteSpace = /^\s+$/;
    #regexAlNum = /^[a-zA-Z0-9]+$/;
    #regexAlpha = /^[a-zA-Z]+$/;
    #regexDigit = /^[0-9]+$/;
    #regexWhiteSpace = /\s+/;
    #hexArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    constructor(str) {
        super(str);
    }
    strip(...args) {
        return new PyString(this.trim(...args));
    }
    rstrip(...args) {
        return new PyString(this.trimEnd(...args));
    }
    lstrip(...args) {
        return new PyString(this.trimStart(...args));
    }
    reverse() {
        return new PyString(this.split("").reverse().join(""));
    }
    rsplit(sep = "", limit = Number.MAX_SAFE_INTEGER) {
        if (!Number.isInteger(limit) || limit < 0) {
            throw new TypeError('limit must be non-negative integer');
        }
        if (typeof limit !== "number" || limit < 1) {
            return super.split(sep).map(part => new PyString(part));
        }
        if (sep === "") {
            const regexSplit = super.split(this.#regexSplitAtWhiteSpaceKeep);
            const splitSpacesArray = [];
            const wholeWordArray = [];
            let splitCounter = 0;
            for (let i = regexSplit.length - 1; i >= 0; i--) {
                const token = regexSplit[i];
                if (token.match(this.#regexAllWhiteSpace)) {
                    splitCounter++;
                    if (splitCounter <= limit) {
                        continue;
                    }
                }
                if (splitCounter < limit) {
                    splitSpacesArray.unshift(token);
                } else {
                    wholeWordArray.unshift(token);
                }
            }
            if (wholeWordArray.length == 0) {
                return splitSpacesArray.map(part => new PyString(part));
            }
            return [wholeWordArray.join(""), ...splitSpacesArray].map(part => new PyString(part));
        }
        const allParts = super.split(sep);
        if (allParts.length <= limit) {
            return allParts.map(part => new PyString(part));
        }
        const numLeftToJoin = allParts.length - limit;
        const leftJoint = allParts.slice(0, numLeftToJoin).join(sep);
        const rightParts = allParts.slice(numLeftToJoin);
        return [leftJoint, ...rightParts].map(part => new PyString(part));
    }
    lsplit(sep = "", limit = Number.MAX_SAFE_INTEGER) {
        if (!Number.isInteger(limit) || limit < 0) {
            throw new TypeError('limit must be non-negative integer');
        }
        if (typeof limit !== "number" || limit < 1) {
            return super.split(sep).map(part => new PyString(part));
        }
        if (sep === "") {
            const regexSplit = super.split(this.#regexSplitAtWhiteSpaceKeep);
            const splitSpacesArray = [];
            const wholeWordArray = [];
            let splitCounter = 0;
            for (let i = 0; i < regexSplit.length; i++) {
                const token = regexSplit[i];
                if (token.match(this.#regexAllWhiteSpace)) {
                    splitCounter++;
                    if (splitCounter <= limit) {
                        continue;
                    }
                }
                if (splitCounter < limit) {
                    splitSpacesArray.push(token);
                } else {
                    wholeWordArray.push(token);
                }
            }
            if (wholeWordArray.length === 0) {
                return splitSpacesArray.map(part => new PyString(part));
            }
            return [...splitSpacesArray, wholeWordArray.join("")].map(part => new PyString(part));
        }
        const allParts = super.split(sep);
        if (allParts.length <= limit) {
            return allParts.map(part => new PyString(part));
        }
        const leftParts = allParts.slice(0, limit);
        const rightJoint = allParts.slice(limit).join(sep);
        return [...leftParts, rightJoint].map(part => new PyString(part));
    }
    text_wrap(width) {
        if (!Number.isInteger(width) || width < 1) {throw TypeError('width must be positive integer');}
        const parts = [];
        for (let i = 0; i < this.length; i += width) {
            parts.push(this.toString().slice(i, i + width));
        }
        return parts.map(s => new PyString(s));
    }
    split(separator, maxsplit) {
        return super.split(separator, maxsplit).map(part => new PyString(part));
    }
    lower() {
        return new PyString(super.toLowerCase());
    }
    upper() {
        return new PyString(super.toUpperCase());
    }
    endswith(suffix, start = 0, end = this.length) {
        return this.slice(start, end).endsWith(suffix);
    }
    startswith(prefix, start = 0, end = this.length) {
        return super.slice(start, end).startsWith(prefix);
    }
    isspace() {
        return this.#regexAllWhiteSpace.test(this);
    }
    isalnum() {
        return this.#regexAlNum.test(this);
    }
    isalpha() {
        return this.#regexAlpha.test(this);
    }
    isdigit() {
        return this.#regexDigit.test(this);
    }
    isnumeric() {
        return this.#regexDigit.test(this);
    }
    islower() {
        return (super.toLowerCase().toString() == super.toString());
    }
    isupper() {
        return (super.toUpperCase().toString() == super.toString());
    }
    isascii() {
        for (let i = 0; i < this.length; i++) {
            if (this.charCodeAt(i) > 127) {
                return false;
            }
        }
        return true;
    }
    isdecimal() {
        for (let i = 0; i < this.length; i++) {
            if (this.charCodeAt(i) < 48 || this.charCodeAt(i) > 57) {
                return false;
            }
        }
        return true;
    }
    istitle() {
        if (this.length == 0) { return false; }
        if (this.length == 1) { return (this[0].toUpperCase() == this[0]); }
        let cased = false;
        let previous_is_cased = false;
        for (let i = 0; i < this.length; ++i) {
            if (this[i].toUpperCase() == this[i]) {
                if (previous_is_cased) {
                    return false;
                }
                previous_is_cased = true;
                cased = true;
            }
            else if (this[i].toLowerCase() == this[i]) {
                if (!previous_is_cased) {
                    return false;
                }
                previous_is_cased = true;
                cased = true;
            }
            else {
                previous_is_cased = false;
            }
        }
        return cased;
    }
    zfill(width) {
        return new PyString(super.padStart(width, "0"));
    }
    ljust(width, fillchar = " ") {
        return new PyString(super.padStart(width, fillchar));
    }
    rjust(width, fillchar = " ") {
        return new PyString(super.padEnd(width, fillchar));
    }
    center(width, fillchar = " ") {
        if ((typeof width !== "number") || (this.length >= width)) {
            return new PyString(this);
        }
        const marg = width - this.length;
        const left = marg / 2 + (marg & width & 1);
        return new PyString("".padStart(left, fillchar) + this.toString() + "".padEnd(marg - left, fillchar));
    }
    splitlines(keepends = false) {
        if (!keepends) {
            return super.split(this.#regexNewLine).map(part => new PyString(part));
        }
        const tmpArray = super.split(this.#regexNewLineKeep);
        let tmpArrayFinal = [];
        for (let i = 0; i < tmpArray.length; i++) {
            if (tmpArray[i].match(this.#regexNewLine)) {
                tmpArrayFinal[tmpArrayFinal.length - 1] = tmpArrayFinal[tmpArrayFinal.length - 1] + tmpArray[i];
            }
            else {
                tmpArrayFinal.push(tmpArray[i]);
            }
        }
        return tmpArrayFinal.map(part => new PyString(part));
    }
    removeprefix(prefix) {
        if (this.startsWith(prefix)) {
            return new PyString(this.substring(prefix.length));
        }
        return new PyString(this);
    }
    removesuffix(suffix) {
        if (this.endsWith(suffix)) {
            return new PyString(this.substring(0, this.length - suffix.length));
        }
        return new PyString(this);
    }
    convert_to_base16() {
        let tmpString = "";
        for (let i = 0; i < this.length; i++) {
            tmpString += this.#hexArray[this.charCodeAt(i) >>> 4];
            tmpString += this.#hexArray[this.charCodeAt(i) & 0x0F];
        }
        return new PyString(tmpString);
    }
    from_base16() {
        let tmp = "";
        for (let i = 0; i < this.length; i += 2) {
            const hiChar = this.charAt(i);
            const loChar = this.charAt(i + 1);
            const hiVal = this.#hexArray.indexOf(hiChar);
            const loVal = this.#hexArray.indexOf(loChar);
            const byteVal = (hiVal << 4) | loVal;
            tmp += String.fromCharCode(byteVal);
        }
        return new PyString(tmp);
    }
    count_words() {
        return this.toString()
            .trim()
            .split(this.#regexWhiteSpace)
            .reduce((map, w) => map.set(w, (map.get(w) || 0) + 1), new Map());
    }
    get_unique_words() {
        return Array.from((new Set(this.toString().split(this.#regexWhiteSpace))).values()).map(part => new PyString(part));
    }
    remove_accents() {
        return new PyString(this
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "").replace("ß", "ss").replace("ẞ", "SS")
        );
    }
    casefold() {
        return new PyString(this.remove_accents().toLowerCase());
    }
    capitalize() {
        return new PyString(this.remove_accents().charAt(0).toUpperCase() + this.toLowerCase().slice(1));
    }
    count(sub, start = 0, end = this.length) {
        return this.toString().slice(start, end).split(sub).length - 1;
    }
    expandtabs(tabsize = 8) {
        let out = '';
        let col = 0;
        for (let i = 0; i < this.length; i++) {
            const ch = this[i];
            if (ch === '\t') {
                const fill = tabsize - (col % tabsize);
                for (let q = 0; q < fill; q++) {
                    out += ' ';
                }
                col += fill;
            } else {
                out += ch;
                if (ch === '\n' || ch === '\r') {
                    col = 0;
                } else {
                    col += 1;
                }
            }
        }
        return new PyString(out);
    }
    join(iterable) {
        return new PyString(Array.from(iterable).join(this));
    }
    find(sub, start = 0, end = this.length) {
        let result = this.slice(start, end).indexOf(sub);
        if (result < 0) {
            return -1;
        }
        return result + start;
    }
    rfind(sub, start = 0, end = this.length) {
        let result = this.slice(start, end).lastIndexOf(sub);
        if (result < 0) {
            return -1;
        }
        return result + start;
    }
    format_map(mapping) {
        let tmpString = this.toString();
        for (const [key, value] of mapping) {
            tmpString = tmpString.replaceAll(`{${key}}`, value);
        }
        return new PyString(tmpString);
    }
    index(sub, start = 0, end = this.length) {
        let result = this.find(sub, start, end);
        if (result < 0) {
            throw new Error("substring not found");
        }
        return result;
    }
    rindex(sub, start = 0, end = this.length) {
        let result = this.rfind(sub, start, end);
        if (result < 0) {
            throw new Error("substring not found");
        }
        return result;
    }
    partition(sep) {
        let tmpArray = this.split(sep);
        if (tmpArray.length == 1) {
            return [new PyString(this.toString()), new PyString(""), new PyString("")];
        }
        return [new PyString(tmpArray[0]), new PyString(sep), new PyString(tmpArray.slice(1).join(sep))];
    }
    rpartition(sep) {
        let tmpArray = this.split(sep);
        if (tmpArray.length == 1) {
            return [new PyString(""), new PyString(""), new PyString(this.toString())];
        }
        return [new PyString(tmpArray.slice(0, tmpArray.length - 1).join(sep)), new PyString(sep), new PyString(tmpArray[tmpArray.length - 1])];
    }
    swapcase() {
        let s = "";
        for (let i = 0; i < this.length; ++i) {
            if (this[i].toLowerCase() == this[i]) {
                s += this[i].toUpperCase();
            }
            else if (this[i].toUpperCase() == this[i]) {
                s += this[i].toLowerCase();
            }
        }
        return new PyString(s);
    }
    title() {
        let s = "";
        if (this.length == 0) { return new PyString(s); }
        s += this[0].toUpperCase();
        for (let i = 1; i < this.length; ++i) {
            let nextupper = false;
            while (this[i].match(/\s/)) {
                s += this[i]
                i++;
                if (i >= this.length) {
                    break;
                }
                nextupper = true;
            }
            if (i >= this.length) {
                break;
            }
            if (nextupper) {
                s += this[i].toUpperCase();
                continue;
            }
            else {
                s += this[i].toLowerCase();
            }
        }
        return new PyString(s);
    }
    translate(table, deletechars = '') {
        if (table.length !== 256) {
            return new PyString(this.toString());
        }
        const delSet = new Set();
        for (let i = 0; i < deletechars.length; i++) {
            delSet.add(deletechars.charCodeAt(i) & 0xFF);
        }
        let out = '';
        for (let i = 0; i < this.length; i++) {
            const code = this.charCodeAt(i) & 0xFF;
            if (!delSet.has(code)) {
                out += table.charAt(code);
            }
        }
        return new PyString(out);
    }
    static maketrans(ma) {
        return Array.from({ length: 256 }, (_, i) => {
            if (ma.has(String.fromCharCode(i))) {
                return ma.get(String.fromCharCode(i));
            }
            return String.fromCharCode(i);
        }).join('');
    }
    static fixIndex(i, len) {
        return i < 0 ? Math.max(len + i, 0) : Math.min(i, len);
    }

    slice(start = 0, end = this.length) {
        const s = PyString.fixIndex(start, this.length);
        const e = PyString.fixIndex(end, this.length);
        return new PyString(super.slice(s, e));
    }
    substring(start, end) {
        return new PyString(super.substring(start, end));
    }
    [Symbol.iterator]() {
        return this.toString()[Symbol.iterator]();
    }
    get [Symbol.toStringTag]() {
        return 'PyString';
    }
}
