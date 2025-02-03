export interface APIUserResults {
    users: User[];
    total: number;
    skip:  number;
    limit: number;
}

export interface User {
    id:         number;
    firstName:  string;
    lastName:   string;
    maidenName: string;
    age:        number;
    gender:     Gender;
    email:      string;
    phone:      string;
    username:   string;
    password:   string;
    birthDate:  string;
    image:      string;
    bloodGroup: string;
    height:     number;
    weight:     number;
    eyeColor:   string;
    hair:       Hair;
    ip:         string;
    address:    Address;
    macAddress: string;
    university: string;
    bank:       Bank;
    company:    Company;
    ein:        string;
    ssn:        string;
    userAgent:  string;
    crypto:     Crypto;
    role:       Role;
}

export interface Address {
    address:     string;
    city:        string;
    state:       string;
    stateCode:   string;
    postalCode:  string;
    coordinates: Coordinates;
    country:     string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType:   string;
    currency:   string;
    iban:       string;
}

export interface Company {
    department: string;
    name:       string;
    title:      string;
    address:    Address;
}

export interface Crypto {
    coin:    string;
    wallet:  string;
    network: string;
}

export enum Gender {
    Female = "female",
    Male = "male",
}

export interface Hair {
    color: string;
    type:  Type;
}

export enum Type {
    Curly = "Curly",
    Kinky = "Kinky",
    Straight = "Straight",
    Wavy = "Wavy",
}

export enum Role {
    Admin = "admin",
    Moderator = "moderator",
    User = "user",
}


export interface APISensorResults {
    sensorData: SensorData[];
}

export interface SensorData {
    userId:        number;
    sensorSummary: SensorSummary;
}

export interface SensorSummary {
    lastMeasurement:  Date;
    heartRate:        number;
    bloodPressure:    BloodPressure;
    oxygenSaturation: number;
}

export interface BloodPressure {
    systolic:  number;
    diastolic: number;
}


