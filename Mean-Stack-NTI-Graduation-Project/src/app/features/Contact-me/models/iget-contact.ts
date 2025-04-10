import { ICommunication } from './icommunication';

export interface IGetContact {
  description: string;
  boxTitle: string;
  // iconOneLink: string;
  // iconOneName: string;
  // iconOne: string;
  // IconTwoLink: string;
  // IconTwoName: string;
  // iconTwo: string;
  phoneNumber: number;
  communication: ICommunication[];
  _id: string;
}
