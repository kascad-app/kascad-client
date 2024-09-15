"use client";

import React from "react";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-footer-background h-96 ">
			<div className="container mx-auto flex h-full justify-center items-center space-x-6">
				<a
					href="https://www.instagram.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="/views/logos/instagram-line.svg"
						alt="Twitter"
						className="h-6 w-6"
					/>
				</a>
				<a
					href="https://www.twitter.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="/views/logos/twitter-x-line.svg"
						alt="Twitter"
						className="h-6 w-6"
					/>
				</a>
				<a
					href="https://www.facebook.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="/views/logos/facebook-circle-fill.svg"
						alt="Facebook"
						className="h-6 w-6"
					/>
				</a>
			</div>
		</footer>
	);
};
