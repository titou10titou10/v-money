declare function format(input: any, opt?: {
    prefix: string;
    suffix: string;
    thousands: string;
    decimal: string;
    precision: number;
    unmaskedVar: null;
}): string;
declare function unformat(input: any, precision: number): number;
declare function setCursor(el: any, position: number): void;
export { format, unformat, setCursor };
