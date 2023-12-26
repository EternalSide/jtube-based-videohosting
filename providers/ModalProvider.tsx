"use client";
import AddInPlaylistModal from "@/components/modals/AddInPlaylistModal";
import ClearHistoryModal from "@/components/modals/ClearHistoryModal";
import EditProfileModal from "@/components/modals/EditProfileModal";
import UploadImageModal from "@/components/modals/UploadImageModal";
import {useEffect, useState} from "react";

const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(true);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<ClearHistoryModal />
			<EditProfileModal />
			<UploadImageModal />
			<AddInPlaylistModal />
		</>
	);
};
export default ModalProvider;
