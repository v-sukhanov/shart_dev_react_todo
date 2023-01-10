

export interface ITodo {
	id: string;
	name: string;
	done: boolean;
	folderId?: string
}

export interface IFolder {
	id: string;
	name: string;
}