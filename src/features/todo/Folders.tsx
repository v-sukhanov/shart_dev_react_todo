import React, { useState } from 'react';
import { useAppActions, useAppSelector } from '../../app/hooks';
import { Guid } from 'guid-typescript';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

export const Folders = () => {
	const {folders} = useAppSelector(x => x.folders);
	const {addFolder, removeFolder} = useAppActions()
	const [newFolderName, setNewFolderName] = useState('');
	const [searchParams] = useSearchParams();
	const folderId = searchParams.get('folderId');
	const navigate = useNavigate();

	const createFolderHandler = () => {
		addFolder({
			id: Guid.create().toString(),
			name: newFolderName
		})
		setNewFolderName('');
	}

	const removeFolderHandler = (event: React.MouseEvent<HTMLButtonElement> ,id: string) => {
		event.stopPropagation();
		removeFolder(id);
	}

	const setFolderIdParam = (folderId: string | null) => {
		navigate({
			search: createSearchParams({
				folderId: folderId ? folderId : ''
			}).toString()
		})
	}


	return <div  className="w-[500px] rounded p-5 bg-gray-100">
		<h2 className="text-lg">
			Folders
		</h2>
		<div className="mt-5 flex">
			<input onKeyDown={e => e.key === 'Enter' && createFolderHandler()} value={newFolderName} onChange={e => setNewFolderName(e.target.value)} className="h-[40px] border py-2 px-4 w-full h-[42px] mb-2" placeholder="Type the folder name" type="text"/>
			<button onClick={ createFolderHandler} className="ml-2 h-[40px] rounded p-2 bg-blue-500 text-white">
				Create
			</button>
		</div>
		<div className="h-[400px] overflow-y-scroll">
			<div onClick={() => setFolderIdParam(null)} className={"mt-10 flex cursor-pointer border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all" + (!folderId ? " bg-blue-100 hover:bg-blue-200" : "")}>
				Все
			</div>
			{
				folders.map(folder => {
					return <div onClick={() => setFolderIdParam(folder.id)} key={folder.id} className={"flex items-center justify-between cursor-pointer border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all" + (folderId === folder.id ? " bg-blue-100 hover:bg-blue-200" : "")}>
					<span>
						{folder.name}
					</span>
						<button onClick={(e) => removeFolderHandler(e, folder.id)} className="h-[40px] rounded p-2 bg-red-500 text-white">
							Remove
						</button>
					</div>
				})
			}
		</div>

	</div>
}