/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
    "use strict";

    var oop = require("../../lib/oop");
    var Range = require("../../range").Range;
    var CFoldMode = require("./cstyle").FoldMode;

    var FoldMode = exports.FoldMode = function(commentRegex) {
        if (commentRegex) {
            this.foldingStartMarker = new RegExp(
                this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
            );
            this.foldingStopMarker = new RegExp(
                this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
            );
        }
    };
    oop.inherits(FoldMode, CFoldMode);

    (function() {

        this.blocks=[
            {
                start: /^\s*процедура|procedure\s*/i,
                end: /^\s*конецпроцедуры|endprocedure\s*/i
            },
            {
                start: /^\s*функция|function\s*/i,
                end: /^\s*конецфункции|endfunction\s*/i
            },
            {
                start: /(^[ \t]*#(?:Область).*$)/i,
                end: /(^[ \t]*#(?:КонецОбласти).*$)/i
            },
            {
                start: /#(?:Если|If|ИначеЕсли|ElsIf|Иначе|Else).*(?:Тогда|Then)?/i,
                end: /#(?:КонецЕсли|EndIf).*$/i
            },
            {
                start: /^[ \t]*(?:Если|If|ИначеЕсли|ElsIf|Иначе|Else).*$/i,
                end: /(?:КонецЕсли|EndIf).*$/i
            },
            {
                start: /^[ \t]*(?:Для|For|Пока|while).*(?:Цикл|do)?/i,
                end: /(?:КонецЦикла|enddo).*$/i
            },
            {
                start: /^[ \t]*(?:Попытка|Исключение|try|catch).*(?:Цикл|do)?/i,
                end: /(?:КонецПопытки|endtry).*$/i
            }
        ];

        this.getFoldWidgetRangeBase = this.getFoldWidgetRange;
        this.getFoldWidgetBase = this.getFoldWidget;

        this.getFoldWidget = function(session, foldStyle, row) {
            var fw = this.getFoldWidgetBase(session, foldStyle, row);
            if (!fw) {
                var line = session.getLine(row);
                for (var index = 0; index < this.blocks.length; index++) {
                    var element = this.blocks[index];
                    if (element.start.test(line)){
                        return "start";
                    }
                }
            }
            return fw;
        };

        this.getFoldWidgetRange = function(session, foldStyle, row) {
            var range = this.getFoldWidgetRangeBase(session, foldStyle, row);
            if (range)
                return range;

            var line = session.getLine(row);

            for (var index = 0; index < this.blocks.length; index++) {
                var element = this.blocks[index];
                if (element.start.test(line)){
                    return this.getMyStatementBlock(session, line, row, element.start, element.end);
                }
            }

        };

        this.getMyStatementBlock = function(session, lineParam, row, startRegEx, endRegEx) {
           
            var maxRow = session.getLength();
            var startRow = row;
            var endRow = row;

            var cLine = session.getLine(row);
            var startColumn = cLine.length;
            // for (var currentPos = startColumn; currentPos < cLine.length; currentPos++ ) {
            //     if (currentPos > 0 && cLine[currentPos-1] === '/' && cLine[currentPos] === '/') {
            //         break; // comment
            //     }
            //     if (cLine[currentPos] === '(') openBrackets++;
            //     else if (cLine[currentPos] === ')') closeBrackets++;
            //     if (openBrackets > 0 && openBrackets == closeBrackets) {
            //         startColumn = cLine.length;
            //         foundStart = true;
            //         break;
            //     }
            // }
            while (++row < maxRow) {
                var line = session.getLine(row);

                // if (!foundStart) {
                //     for (var currentPos = 0; currentPos < line.length; currentPos++ ) {
                //     if (currentPos > 0 && line[currentPos-1] === '/' && line[currentPos] === '/') {
                //         break; // comment
                //     }
                //     if (line[currentPos] === '(') openBrackets++;
                //     else if (line[currentPos] === ')') closeBrackets++;
                //     if (openBrackets > 0 && openBrackets == closeBrackets) {
                //             startRow = row;
                //             startColumn = line.length;
                //             foundStart = true;
                //             break;
                //         }
                //     }
                // }
                if (endRegEx.test(line))
                    break;
                endRow = row+1;
            }
            if (endRow > startRow) {
                var endColumn = session.getLine(endRow).length;
                return new Range(startRow, startColumn, endRow, endColumn);
            }
        };



    }).call(FoldMode.prototype);

    });