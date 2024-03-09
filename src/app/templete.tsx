"use client";

const Template = ({ children }: { children: React.ReactNode }) => {
	console.log("Template");
	return <div>{children}</div>;
};

export default Template;
