export interface IProfile {
    sub: string;
    given_name: string;
    family_name: string;
    nick_name: string;
    name: string;
    updated_at: Date;
    picture: string;
    email: string;
}
export declare class EmptyProfile implements IProfile {
    sub: string;
    given_name: string;
    family_name: string;
    nick_name: string;
    name: string;
    updated_at: Date;
    picture: "";
    email: "";
    constructor(sub: string);
}
