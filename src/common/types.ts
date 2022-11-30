export type Screens = {
    Home: undefined;
    Profile: undefined;
};

export type ErrorRes = {
    status: number;
    detail: string;
    title: string;
};

export type User = {
    ID: number;
    email: string;
    state?: string;
    country?: string;
    isMale?: boolean;
    pushToken?: string;
    sessionID?: string;
    accessToken: string;
    refreshToken: string;
};