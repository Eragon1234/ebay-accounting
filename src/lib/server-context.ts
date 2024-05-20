import {cache} from "react";

class PromiseWithResolverAccess<T> {
    promise: Promise<T>
    resolver!: (value: T) => void;
    rejecter!: (reason: any) => void;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolver = resolve;
            this.rejecter = reject;
        });
    }

    resolve(value: T) {
        this.resolver(value);
    }

    reject(reason: any) {
        this.rejecter(reason);
    }

    then(...args: Parameters<Promise<T>["then"]>) {
        return this.promise.then(...args);
    }
}

function createServerContext<T>() {
    return cache(() => new PromiseWithResolverAccess<T>());
}

export default createServerContext;