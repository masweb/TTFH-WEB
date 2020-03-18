
export interface Iclient {
    id?: number;
    name: string;
    description: string;
    hourlyRate: number;
    revenue: number;
    active: boolean;
}

export interface Itasks {
    id?: number;
    clientId: number;
    task: string;
    active: boolean;
    running: boolean;
    openHistory: boolean;
    opencoment: boolean;
    hourlyRate: number;
    note: string;
    datecode: string;
    totalduration: string;
    revenue: number;
    detail: Array<Itimedetail>;
}

export interface Itimedetail {
    id?: number;
    taskId: number;
    start: string;
    end: string;
    datecode: string;
}

