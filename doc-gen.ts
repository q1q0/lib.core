/// <reference path="node_modules/@types/node/index.d.ts" />

import * as ts from 'typescript';
import * as fs from 'fs';
import * as glob from 'glob';

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * This snippets of code is used to parse and generated PB CORE APIs for use with code
 * generator. Please DO NOT delete.
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
enum Modifier {
    Public, Static, Private, Protected, Async, Unknown
}

enum MemberType {
    Property, Method
}

interface Member {
    name: string,
    type?: MemberType,
    modifiers?: Modifier[],
    returnType?: string,
    variableType?: string
}

interface ClassInfo {
    name: string,
    members?: Member[],
    inheritFrom?: string
}

function makeDoc(fileNames: string[]) {
    let program = ts.createProgram(fileNames, {
        target: ts.ScriptTarget.ES5
    });

    let typeChecker = program.getTypeChecker();

    let classInfos: ClassInfo[] = [];

    for(const sourceFile of program.getSourceFiles()) {
        ts.forEachChild(sourceFile, visitNode);
    };

    fs.writeFileSync('pb-core.json', JSON.stringify(classInfos, undefined, 2));

    function visitNode(node: ts.Node) {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            visitClass(typeChecker.getSymbolAtLocation((node as ts.ClassDeclaration).name));
        } else if (node.kind === ts.SyntaxKind.EnumDeclaration) {
            visitEnum(typeChecker.getSymbolAtLocation((node as ts.EnumDeclaration).name));
        } else if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
            visitInterface(typeChecker.getSymbolAtLocation((node as ts.InterfaceDeclaration).name));
        }
    }

    function visitEnum(symbol: ts.Symbol) {
        visitClass(symbol);
    }

    function visitInterface(symbol: ts.Symbol) {
        visitClass(symbol);
    }

    function visitClass(symbol: ts.Symbol) {
        if (symbol['parent'] && symbol['parent'].name && symbol['parent'].name.indexOf('src/app/modules') >= 0) {
            let classInfo: ClassInfo = {
                name: symbol.name,
                members: []
            };

            if (symbol.valueDeclaration && symbol.valueDeclaration['members']) {
                visitMembers(classInfo, symbol.valueDeclaration['members']);
            } else {
                symbol.members.forEach((member) => {
                    if (member.valueDeclaration === null || member.valueDeclaration === undefined) {
                        console.log(member);
                    } else {
                        visitMember(classInfo, member.valueDeclaration);
                    }
                });
            }

            evaluateInheritance(classInfo, symbol);

            classInfos.push(classInfo);
        }
    }

    function evaluateInheritance(classInfo: ClassInfo, symbol: ts.Symbol) {
        if (symbol.declarations && symbol.declarations.length > 0) {
            symbol.declarations.forEach(dec => {
                if (dec.kind === ts.SyntaxKind.ClassDeclaration) {
                    let classDec: ts.ClassDeclaration = dec as ts.ClassDeclaration;

                    if (classDec.heritageClauses) {
                        classDec.heritageClauses.forEach(h => {
                            if (h.token === ts.SyntaxKind.ExtendsKeyword && h.types && h.types.length > 0) {
                                classInfo.inheritFrom = h.types[0].expression.getText();
                            }
                        });
                    }
                }
            });
        }
    }

    function visitMembers(classInfo: ClassInfo, members: Array<ts.Symbol>) {
        members.forEach((member) => {
            if (member.valueDeclaration === null || member.valueDeclaration === undefined) {
                if (member['symbol'] && member['symbol'].declarations) {
                    member['symbol'].declarations.forEach((declaration) => {
                        visitMember(classInfo, declaration);
                    });
                } else {
                    console.log(member);
                }
            } else {
                visitMember(classInfo, member.valueDeclaration);
            }
        });
    }

    function visitMember(classInfo: ClassInfo, symbol: ts.Declaration) {
        if (symbol.kind === ts.SyntaxKind.PropertyDeclaration || symbol.kind === ts.SyntaxKind.PropertySignature) {
            const memberType: ts.PropertyDeclaration = symbol as ts.PropertyDeclaration;
            classInfo.members.push({
                name: (symbol as any).name.getText(),
                type: MemberType.Property,
                modifiers: getModifiers(symbol.modifiers),
                variableType: getReturnType(memberType.type)
            });
        } else if (symbol.kind === ts.SyntaxKind.MethodDeclaration) {
            let methodSymbol: ts.MethodDeclaration = symbol as ts.MethodDeclaration;

            let classMember = {
                name: methodSymbol.name.getText(),
                type: MemberType.Method,
                modifiers: getModifiers(methodSymbol.modifiers),
                returnType: getReturnType(methodSymbol.type)
            };

            if (classMember.returnType && classMember.returnType.indexOf('Promise') >= 0) {
                classMember.modifiers.push(Modifier.Async);
            }

            classInfo.members.push(classMember);
        } else if (symbol.kind === ts.SyntaxKind.MethodSignature) {
            let methodSymbol: ts.MethodSignature = symbol as ts.MethodSignature;

            let classMember = {
                name: methodSymbol.name.getText(),
                type: MemberType.Method,
                modifiers: getModifiers(methodSymbol.modifiers),
                returnType: getReturnType(methodSymbol.type)
            };

            if (classMember.returnType && classMember.returnType.indexOf('Promise') >= 0) {
                classMember.modifiers.push(Modifier.Async);
            }

            classInfo.members.push(classMember);
        } else if (symbol.kind === ts.SyntaxKind.GetAccessor) {
            let propSymbol: ts.GetAccessorDeclaration = symbol as ts.GetAccessorDeclaration;

            classInfo.members.push({
                name: propSymbol.name.getText(),
                type: MemberType.Property,
                modifiers: getModifiers(propSymbol.modifiers),
                variableType: getReturnType(propSymbol.type)
            });
        } else if (symbol.kind === ts.SyntaxKind.SetAccessor) {
            let propSymbol: ts.SetAccessorDeclaration = symbol as ts.SetAccessorDeclaration;

            classInfo.members.push({
                name: propSymbol.name.getText(),
                type: MemberType.Property,
                modifiers: getModifiers(propSymbol.modifiers)
            });
        } else if (symbol.kind === ts.SyntaxKind.EnumMember) {
            classInfo.members.push({
                name: (symbol as any).name.getText(),
                type: MemberType.Property,
                modifiers: [Modifier.Static]
            });
        }
    }

    function getModifiers(mods: ts.NodeArray<ts.Modifier>): Modifier[] {
        let modifiers: Modifier [] = [];

        if (mods !== null && mods !== undefined) {
            for (const mod of mods) {
                modifiers.push(visitModifier(mod));
            }
        }

        return modifiers;
    }

    function visitModifier(modifier: ts.Modifier): Modifier {
        let modType = Modifier.Unknown;

        switch (modifier.kind) {
            case ts.SyntaxKind.StaticKeyword:
                modType = Modifier.Static
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
                modType = Modifier.Async
            default:
                break;
        }

        return modType;
    }

    function getReturnType(type: ts.TypeNode): string {
        if (type) {
            return type.getText();
        }

        return '';
    }
}

glob('src/app/**/*.ts', undefined, function(err, files){
    makeDoc(
        files
    );
});