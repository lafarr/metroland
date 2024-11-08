"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function Upload() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<ArrayBuffer | string | null>("");

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/csv`, {
			method: 'POST',
			body: JSON.stringify({ file: file })
		})
			.then(async (response: Response) => {
				if (!response.ok) { }
				const res = await response.json();
				console.log(res);
			});
	}

	function handleFileChange(_: ChangeEvent) {
		var reader = new FileReader();
		const file: File | null = inputRef.current && inputRef.current.files ? inputRef.current.files[0] : null;
		if (file) {
			reader.readAsDataURL(file);
			reader.onload = function() {
				setFile(reader.result);
			};
			reader.onerror = function(error) {
				console.log('Error: ', error);
			};
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input ref={inputRef} type="file" onChange={handleFileChange} />
			<button type="submit">submit</button>
		</form>
	)
}
