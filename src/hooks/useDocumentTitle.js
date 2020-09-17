import React, { useLayoutEffect } from "react";

const useDocumentTitle = (title) => {
	useLayoutEffect(() => {
		if (title) {
			document.title = title;
		} else {
			document.title = "FarmDepo - One Stop Store for Fresh Farm Produce";
		}
	}, [title]);
};

export default useDocumentTitle;
