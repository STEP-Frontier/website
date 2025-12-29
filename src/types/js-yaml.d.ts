declare module "js-yaml" {
  export function load(str: string, opts?: LoadOptions): unknown;
  export function loadAll(
    str: string,
    iterator?: (doc: unknown) => void,
    opts?: LoadOptions,
  ): unknown[];
  export function dump(obj: unknown, opts?: DumpOptions): string;

  export interface LoadOptions {
    filename?: string;
    onWarning?: (warning: Error) => void;
    schema?: Schema;
    json?: boolean;
  }

  export interface DumpOptions {
    indent?: number;
    noArrayIndent?: boolean;
    skipInvalid?: boolean;
    flowLevel?: number;
    styles?: Record<string, string>;
    schema?: Schema;
    sortKeys?: boolean | ((a: string, b: string) => number);
    lineWidth?: number;
    noRefs?: boolean;
    noCompatMode?: boolean;
    condenseFlow?: boolean;
    quotingType?: "'" | '"';
    forceQuotes?: boolean;
    replacer?: (key: string, value: unknown) => unknown;
  }

  export interface Schema {
    implicit: unknown[];
    explicit: unknown[];
  }

  export const FAILSAFE_SCHEMA: Schema;
  export const JSON_SCHEMA: Schema;
  export const CORE_SCHEMA: Schema;
  export const DEFAULT_SCHEMA: Schema;
}
