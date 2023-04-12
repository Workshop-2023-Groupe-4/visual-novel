"use strict";	
var __assign = (this && this.__assign) || function () {	
    __assign = Object.assign || function(t) {	
        for (var s, i = 1, n = arguments.length; i < n; i++) {	
            s = arguments[i];	
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))	
                t[p] = s[p];	
        }	
        return t;	
    };	
    return __assign.apply(this, arguments);	
};	
Object.defineProperty(exports, "__esModule", { value: true });	
var defaultOptions = {	
    type: "char",	
    overflow: "visible",	
};	
var TextSplitter = /** @class */ (function () {	
    function TextSplitter(element, options) {	
        this._element = element;	
        // Override default options with given options	
        this._options = __assign(__assign({}, __assign({}, TextSplitter._optionsDefault)), options);	
        // Save HTML before splitting to possibly undo the splitting	
        this._originalHTML = element.innerHTML;	
        // Split text	
        this._elements = TextSplitter.splitText(element, this._options);	
        this._addEventListeners();	
    }	
    Object.defineProperty(TextSplitter.prototype, "elements", {	
        get: function () {	
            return this._elements;	
        },	
        enumerable: false,	
        configurable: true	
    });	

    TextSplitter.prototype.reset = function () {	
        this._element.innerHTML = this._originalHTML;	
    };	
    TextSplitter.prototype._resizeHandler = function () {	
        this.reset();
        this._elements = TextSplitter.splitText(this._element, this._options);
    };	
    TextSplitter.prototype._addEventListeners = function () {	
        this._resizeHandlerHandler = this._resizeHandler.bind(this);
        if (this._options.type === "line") {	
            window.addEventListener("resize",  this._resizeHandlerHandler, false);	
        }	
    };	
    TextSplitter.prototype.destroy = function () {	
        window.removeEventListener("resize",  this._resizeHandlerHandler, false);	
    };	
    TextSplitter.splitText = function (el, options) {	
        if (options === void 0) { options = TextSplitter._optionsDefault; }	
        if (el.innerHTML === "")	
            return;	
        el.innerHTML = this._splitHTMLByWords(el.innerHTML, options);	
        var selector = options.type === "char" ? this._letterClassName : this._wordClassName;	
        var elements = Array.from(el.querySelectorAll(".".concat(selector)));	
        if (options.type === "line") {	
            // Use splitted words to make lines	
            var lines = this._getLinesFromSplittedWords(elements);	
            el.innerHTML = this._splitLinesInTag(lines, options);	
            elements = Array.from(el.querySelectorAll(".".concat(this._lineClassName)));	
            //return this._getLinesFromSplittedWords(elements)	
        }	
        return elements;	
    };	
    TextSplitter.separateWordsAndTags = function (html) {	
        var result = html.match(/<[\s]*[^>][^>]*>|[^\r\n\t\f\v <]+|(#.*?#)|(\[.*?\])/gm);	
        return result;	
    };	
    TextSplitter._getLinesFromSplittedWords = function (elements) {	
        var lines = [];	
        var lastLine;	
        var lastOffset = 0;	
        elements.forEach(function (element) {
            if (element.offsetTop != lastOffset) {
                lastOffset = element.offsetTop;
                lastLine = [];
                lastLine.push(element);
                lines.push(lastLine);
            }	
            else {	
                if(lastLine.push) {
                    lastLine.push(element);	
                }
            }	
        });	

        return lines;	
    };	
    TextSplitter._splitLinesInTag = function (lines, options) {	
        var _this = this;	
        if (options === void 0) { options = TextSplitter._optionsDefault; }	
        return lines	
            .map(function (line) {	
            return _this._wrapLineInTag(line, options);	
        })	
            .join("");	
    };	
    TextSplitter._wrapLineInTag = function (line, options) {	
        if (options === void 0) { options = TextSplitter._optionsDefault; }	
        return "<div class=\"".concat(TextSplitter._lineWrapperClassName, "\" style=\"overflow: ").concat(options.overflow, ";\">\n        <div class=\"").concat(TextSplitter._lineClassName, "\">").concat(line	
            .map(function (word) {	
            return word.innerHTML;	
        })	
            .join(" "), "</div>\n      </div>");	
    };	
    TextSplitter._splitHTMLByWords = function (html, options) {	
        if (options === void 0) { options = TextSplitter._optionsDefault; }	
        var separatedWords = TextSplitter.separateWordsAndTags(html);	
        return separatedWords	
            .map(function (element, index) {	
            var _a;	
            var isHTMLTag = ((_a = element.match(/<[\s/]*[^>][^>]*>/g)) === null || _a === void 0 ? void 0 : _a.length) > 0;	
            return isHTMLTag	
                ? element	
                : TextSplitter._wrapWordInTag(element, index != separatedWords.length - 1, options);	
        })	
            .join("");	
    };	
    TextSplitter._wrapWordInTag = function (word, addSpace, options) {	
        if (addSpace === void 0) { addSpace = true; }	
        if (options === void 0) { options = TextSplitter._optionsDefault; }	
        var inner = options.type === "char" ? this.splitLettersInTag(word) : "<div class=\"".concat(TextSplitter._wordClassName, "\">").concat(word, "</div>");	
        return "<div class=\"".concat(TextSplitter._wordWrapperClassName, "\" style=\"display: inline-flex; overflow: ").concat(options.overflow, "; flex-wrap: nowrap;\">\n      ").concat(inner).concat(addSpace ? "&nbsp;" : "", "\n    </div>");	
    };	
    TextSplitter._wrapLetterInTag = function (letter) {	
        return "<div class=\"".concat(TextSplitter._letterClassName, "\">\n            ").concat(letter.replace(" ", "&nbsp;"), "\n          </div>");	
    };	
    TextSplitter.splitLettersInTag = function (word) {	
        var _this = this;	
        return word	
            .split("")	
            .map(function (letter) {	
            return _this._wrapLetterInTag(letter);	
        })	
            .join("");	
    };
    TextSplitter._optionsDefault = defaultOptions;	
    TextSplitter._letterClassName = "char";	
    TextSplitter._wordWrapperClassName = "word-wrap";	
    TextSplitter._wordClassName = "word";	
    TextSplitter._lineWrapperClassName = "line-wrap";	
    TextSplitter._lineClassName = "line";	
    return TextSplitter;	
}());	

exports.default = TextSplitter;	