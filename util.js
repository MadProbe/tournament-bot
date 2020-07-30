import { readdir as fsreaddir } from "fs/promises";
import { join } from "path";
const globals = Object.entries(Object.getOwnPropertyDescriptors(global)).filter(([prop, desc]) => {
    return prop[0].toUpperCase() === prop[0] && typeof desc.value === "function"
}).map(value => value[1].value)
export class ExtendableProxy extends new Proxy(Proxy, {
    get: (_, p) => p == 'prototype' ? { constructor: _ } : _[p]
}) {
    /**
     * @param {ProxyHandler<object>} h 
     */
    constructor(handler) {
        super(new.target, handler);
    }
}
delete ExtendableProxy.revocable;
const ObjectGetPrototypeOf = Object.getPrototypeOf;
const FunctionPrototypeToString = Function.prototype.toString;
export class NotConstructable {
    constructor() {
        throw new Error(`${this.constructor.name}: This class cannot be constructed!`)
    }
}
/**
 * Reads all file paths from given directory, including subfolders, 
 * if recursive options was set to true.
 * @param {string} dir Directory to read file paths from
 * @param {boolean} [recursive=true] If true, reads all files from subfolders
 * @returns {Promise<string[]>} Promise containing all read file paths
 */
export async function readdir(dir, recursive = true) {
    const dirents = await fsreaddir(dir, { withFileTypes: true });
    const result = [];
    for (const dirent of dirents) {
        const name = join(dir, dirent.name);
        if (recursive && dirent.isDirectory()) {
            const dirents = await readdir(name, true);
            result.push(...dirents);
        } else if (dirent.isFile()) {
            result.push(name);
        }
    }
    return result;
};
export class Util extends NotConstructable {
    static check(object, type, error, nullAllowed = false) {
        if ((object == null && nullAllowed) || typeof object !== type) {
            throw new TypeError(error);
        }
    }
    /**
     * Reads all file paths from given directory, including subfolders, 
     * if recursive options was set to true.
     * @param {string} dir Directory to read file paths from
     * @param {boolean} [recursive=true] If true, reads all files from subfolders
     * @returns {Promise<string[]>} Promise containing all read file paths
     */
    static async readdir(dir, recursive = true) {
        const dirents = await fsreaddir(dir, { withFileTypes: true });
        const result = [];
        for (const dirent of dirents) {
            const name = join(dir, dirent.name);
            if (recursive && dirent.isDirectory()) {
                const dirents = await this.readdir(name, true);
                result.push(...dirents);
            } else if (dirent.isFile()) {
                result.push(name);
            }
        }
        return result;
    }
    /**
     * @private
     * @param {Function} klass 
     * @returns {boolean}
     */
    static isClass(klass) {
        return typeof klass === "function" && FunctionPrototypeToString.call(klass).startsWith('class') || globals.includes(klass);
    }
    /**
     * Gets sub class of class
     * @param {Function} klass
     * @returns {?Function} 
     */
    static subClass(klass) {
        return this.isClass(klass) && klass !== Function ? ObjectGetPrototypeOf(klass) : null
    }
    /**
     * Gets all sub classes from class
     * @param {Function} klass 
     * @returns {?Function[]} subclasses, if given class was a function
     */
    static subClasses(klass) {
        if (this.isClass(klass)) {
            const classes = [];
            let sub = klass;
            while ((sub = this.subClass(sub)) !== null) {
                classes.push(sub);
            }
            return classes;
        } else return null;
    }
    /**
     * Checks for class being extending given classes
     * @param {Function} klass 
     * @param {Function[]} classes 
     */
    static doesExtend(klass, ...classes) {
        const subs = this.subClasses(klass);
        return !!subs && classes.every(klass => subs.includes(klass));
    }
}
