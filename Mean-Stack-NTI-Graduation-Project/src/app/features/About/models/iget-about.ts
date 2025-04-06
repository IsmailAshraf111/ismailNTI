export interface IGetAbout {
    _id: string;
    description: string;
    languages: string[];
    databases: string[];
    otherSkills: string[];
    tools: string[];
    frameworks?: string[]; 
}
