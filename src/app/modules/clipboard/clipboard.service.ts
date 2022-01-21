import { Injectable, Inject } from '@angular/core';
import * as clipboard from "clipboard-polyfill";

@Injectable({
  providedIn: 'root'
})
/**
 * Clipboard service that use the modern implementation of cliboard. For older browser, a polyfill
 * is used instead.
 */
export class ClipboardService {

  //constructor(@Inject("ClipboardPolyfill") private clipboard: any) { }

  /**
   * Copy the {txt} text into the clipboard
   * 
   * @param txt text to be copied into the clipboard
   */
  copy(txt: string) {
    return clipboard.writeText(txt);
  }
}
