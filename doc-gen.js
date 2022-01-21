"use strict";
/// <reference path="node_modules/@types/node/index.d.ts" />
exports.__esModule = true;
var ts = require("typescript");
var fs = require("fs");
var glob = require("glob");
/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * This snippets of code is used to parse and generated PB CORE APIs for use with code
 * generator. Please DO NOT delete.
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
var Modifier;
(function (Modifier) {
    Modifier[Modifier["Public"] = 0] = "Public";
    Modifier[Modifier["Static"] = 1] = "Static";
    Modifier[Modifier["Private"] = 2] = "Private";
    Modifier[Modifier["Protected"] = 3] = "Protected";
    Modifier[Modifier["Async"] = 4] = "Async";
    Modifier[Modifier["Unknown"] = 5] = "Unknown";
})(Modifier || (Modifier = {}));
var MemberType;
(function (MemberType) {
    MemberType[MemberType["Property"] = 0] = "Property";
    MemberType[MemberType["Method"] = 1] = "Method";
})(MemberType || (MemberType = {}));
function makeDoc(fileNames) {
    var program = ts.createProgram(fileNames, {
        target: ts.ScriptTarget.ES5
    });
    var typeChecker = program.getTypeChecker();
    var classInfos = [];
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        ts.forEachChild(sourceFile, visitNode);
    }
    ;
    fs.writeFileSync('pb-core.json', JSON.stringify(classInfos, undefined, 2));
    function visitNode(node) {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            visitClass(typeChecker.getSymbolAtLocation(node.name));
        }
        else if (node.kind === ts.SyntaxKind.EnumDeclaration) {
            visitEnum(typeChecker.getSymbolAtLocation(node.name));
        }
        else if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
            visitInterface(typeChecker.getSymbolAtLocation(node.name));
        }
    }
    function visitEnum(symbol) {
        visitClass(symbol);
    }
    function visitInterface(symbol) {
        visitClass(symbol);
    }
    function visitClass(symbol) {
        if (symbol['parent'] && symbol['parent'].name && symbol['parent'].name.indexOf('src/app/modules') >= 0) {
            var classInfo_1 = {
                name: symbol.name,
                members: []
            };
            if (symbol.valueDeclaration && symbol.valueDeclaration['members']) {
                visitMembers(classInfo_1, symbol.valueDeclaration['members']);
            }
            else {
                symbol.members.forEach(function (member) {
                    if (member.valueDeclaration === null || member.valueDeclaration === undefined) {
                        console.log(member);
                    }
                    else {
                        visitMember(classInfo_1, member.valueDeclaration);
                    }
                });
            }
            evaluateInheritance(classInfo_1, symbol);
            classInfos.push(classInfo_1);
        }
    }
    function evaluateInheritance(classInfo, symbol) {
        if (symbol.declarations && symbol.declarations.length > 0) {
            symbol.declarations.forEach(function (dec) {
                if (dec.kind === ts.SyntaxKind.ClassDeclaration) {
                    var classDec = dec;
                    if (classDec.heritageClauses) {
                        classDec.heritageClauses.forEach(function (h) {
                            if (h.token === ts.SyntaxKind.ExtendsKeyword && h.types && h.types.length > 0) {
                                classInfo.inheritFrom = h.types[0].expression.getText();
                            }
                        });
                    }
                }
            });
        }
    }
    function visitMembers(classInfo, members) {
        members.forEach(function (member) {
            if (member.valueDeclaration === null || member.valueDeclaration === undefined) {
                if (member['symbol'] && member['symbol'].declarations) {
                    member['symbol'].declarations.forEach(function (declaration) {
                        visitMember(classInfo, declaration);
                    });
                }
                else {
                    console.log(member);
                }
            }
            else {
                visitMember(classInfo, member.valueDeclaration);
            }
        });
    }
    function visitMember(classInfo, symbol) {
        if (symbol.kind === ts.SyntaxKind.PropertyDeclaration || symbol.kind === ts.SyntaxKind.PropertySignature) {
            var memberType = symbol;
            classInfo.members.push({
                name: symbol.name.getText(),
                type: MemberType.Property,
                modifiers: getModifiers(symbol.modifiers),
                variableType: getReturnType(memberType.type)
            });
        }
        else if (symbol.kind === ts.SyntaxKind.MethodDeclaration) {
            var methodSymbol = symbol;
            var classMember = {
                name: methodSymbol.name.getText(),
                type: MemberType.Method,
                modifiers: getModifiers(methodSymbol.modifiers),
                returnType: getReturnType(methodSymbol.type)
            };
            if (classMember.returnType && classMember.returnType.indexOf('Promise') >= 0) {
                classMember.modifiers.push(Modifier.Async);
            }
            classInfo.members.push(classMember);
        }
        else if (symbol.kind === ts.SyntaxKind.MethodSignature) {
            var methodSymbol = symbol;
            var classMember = {
                name: methodSymbol.name.getText(),
                type: MemberType.Method,
                modifiers: getModifiers(methodSymbol.modifiers),
                returnType: getReturnType(methodSymbol.type)
            };
            if (classMember.returnType && classMember.returnType.indexOf('Promise') >= 0) {
                classMember.modifiers.push(Modifier.Async);
            }
            classInfo.members.push(classMember);
        }
        else if (symbol.kind === ts.SyntaxKind.GetAccessor) {
            var propSymbol = symbol;
            classInfo.members.push({
                name: propSymbol.name.getText(),
                type: MemberType.Property,
                modifiers: getModifiers(propSymbol.modifiers),
                variableType: getReturnType(propSymbol.type)
            });
        }
        else if (symbol.kind === ts.SyntaxKind.SetAccessor) {
            var propSymbol = symbol;
            classInfo.members.push({
                name: propSymbol.name.getText(),
                type: MemberType.Property,
                modifiers: getModifiers(propSymbol.modifiers)
            });
        }
        else if (symbol.kind === ts.SyntaxKind.EnumMember) {
            classInfo.members.push({
                name: symbol.name.getText(),
                type: MemberType.Property,
                modifiers: [Modifier.Static]
            });
        }
    }
    function getModifiers(mods) {
        var modifiers = [];
        if (mods !== null && mods !== undefined) {
            for (var _i = 0, mods_1 = mods; _i < mods_1.length; _i++) {
                var mod = mods_1[_i];
                modifiers.push(visitModifier(mod));
            }
        }
        return modifiers;
    }
    function visitModifier(modifier) {
        var modType = Modifier.Unknown;
        switch (modifier.kind) {
            case ts.SyntaxKind.StaticKeyword:
                modType = Modifier.Static;
                break;
            case ts.SyntaxKind.PrivateKeyword:
                modType = Modifier.Private;
                break;
            case ts.SyntaxKind.PublicKeyword:
                modType = Modifier.Public;
                break;
            case ts.SyntaxKind.ProtectedKeyword:
                modType = Modifier.Protected;
                break;
            case ts.SyntaxKind.AsyncKeyword:
                modType = Modifier.Async;
            default:
                break;
        }
        return modType;
    }
    function getReturnType(type) {
        if (type) {
            return type.getText();
        }
        return '';
    }
}
glob('src/app/**/*.ts', undefined, function (err, files) {
    makeDoc(files);
});
