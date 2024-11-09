import type { User } from './user'

export enum AuthState {
	SIGN_IN = 'signIn',
	SIGN_UP = 'signUp'
}

export interface CurrentSession extends User {
}

export interface LoginDto {
	email: string,
	password: string,
}

export interface LoginResponse {
	$id: string,
	$createdAt: string,
	$updatedAt: string,
	name: string,
	userId: string,
	expire: string,
	provider: string,
	providerUid: string,
	providerAccessToken: string,
	providerAccessTokenExpiry: string,
	providerRefreshToken: string,
	ip: string,
	osCode: string,
	osName: string,
	osVersion: string,
	clientType: string,
	clientCode: string,
	clientName: string,
	clientVersion: string,
	clientEngine: string,
	clientEngineVersion: string,
	deviceName: string,
	deviceBrand: string,
	deviceModel: string,
	countryCode: string,
	countryName: string,
	current: boolean,
	factors: string[],
	secret: string,
	mfaUpdatedAt: string
}
