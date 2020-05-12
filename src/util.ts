
export function omit<T, K extends keyof T>(o: T, args: K[]): Omit<T, K> {
    let out: any = {};
    for (let key in o) {
        if (!~args.indexOf(key as any)) out[key] = o[key];
    }
    return out;
}