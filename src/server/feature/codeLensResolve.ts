import * as method from "../method";
import { Session } from "../session";
import {
  RequestHandler,
  TextDocumentPositionParams,
} from "vscode-languageserver";
import {
  CodeLens,
  SymbolInformation,
} from "vscode-languageserver-types";

export function handler(session: Session): RequestHandler<CodeLens, CodeLens, void> {
  return async (event: CodeLens) => {
    const data: SymbolInformation & { event: TextDocumentPositionParams } = event.data;
    const itemType = await method.getType(session, data.event);
    if (itemType == null) return event;
    const command = "";
    const title = itemType.type
      .replace(/=>/g, "⇒")
      .replace(/ : /g, ": ");
    event.command = { command, title };
    return event;
  };
}
