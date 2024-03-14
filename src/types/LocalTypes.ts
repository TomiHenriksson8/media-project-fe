import {User, UserWithNoPassword} from './DBTypes';
export type Credentials = Pick<User, 'username' | 'password'>;


export type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => Promise<boolean>;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};

export type ThemeContextType = {
  theme: string;
};


export type UserSearch = {
  user_id: number;
  username: string;
  type: 'user';
};

export type MediaItemSearch = {
  media_id: number;
  title: string;
  type: 'mediaItem';
};

export type mediaAndUsers = {
  users: UserSearch[];
  mediaItems: MediaItemSearch[];
}
/*
export type SearchResults = {
  users: UserSearch[];
  mediaItems: MediaItem[];
}; */

export type SearchResults = {
  mediaAndUsers: mediaAndUsers;

};

