/// <reference types="node" />
import * as EventEmitter from 'events';
import { TClass, IInstance } from './mixins';
export interface IEvents<IEventsList> extends IInstance {
    emitter: EventEmitter;
    emit<IE extends keyof IEventsList>(eventName: IE, data: IEventsList[IE]): this;
    on<IE extends keyof IEventsList>(eventName: IE, listener: (data: IEventsList[IE]) => void): this;
    once<IE extends keyof IEventsList>(eventName: IE, listener: (data: IEventsList[IE]) => void): this;
    off<IE extends keyof IEventsList>(eventName: IE, listener: (data: IEventsList[IE]) => void): this;
    destroy: () => void;
    [key: string]: any;
}
export interface IEventsEmitData {
    eventName: string;
    data: any;
}
export interface IEventsList {
    [key: string]: any;
    emit: IEventsEmitData;
}
export declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
export declare const MixedEvents: TClass<IEvents<IEventsList>>;
export declare class Events extends MixedEvents {
}
