import { ICommunication } from "./icommunication";

export interface IContact {
    description: string;
    boxTitle: string;
    // iconOneLink: string;
    // iconOneName: string;
    // iconOne: string;
    // IconTwoLink: string;
    // IconTwoName: string;
    // iconTwo: string;
    phoneNumber: number;
    communication:ICommunication[];

}
