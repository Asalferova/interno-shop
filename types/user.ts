import type { Comment } from '~/types/comments'

export enum UserRoles {
  BUYER = 'BUYER',
  SELLER = 'SELLER'
}

export interface User {
    $id: string,
    $createdAt: string,
    $updatedAt: string,
    name: string,
    registration: string,
    status: boolean,
    labels: string[],
    passwordUpdate: string,
    email: string,
    phone: string,
    emailVerification: boolean,
    phoneVerification: boolean,
    mfa: boolean,
    accessedAt: string
}

export interface UserRegistrationDto {
  userId: string,
  email: string,
  password: string,
  name: string,
}

export interface UserDbDTO {
  documentId: string,
	data: {
		name: string,
		email?: string
	}
}

export interface UserDbResponse {
	name: string,
	$id: string,
	$permissions: string[],
	$createdAt: string,
	$updatedAt: string,
	avatar: string,
	comments: Comment[],
	$databaseId: string,
	$collectionId: string,
	email?: string,
	surname?: string,
	dateOfBirth: string,
	phone: string,
	cardNumber?: string
}
export interface UserProfileUpdatePayload {
  surname: string;
  dateOfBirth: string;
	phone: string;
	cardNumber: string;
}
