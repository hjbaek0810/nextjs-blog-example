import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Utterances from './Utterances';
import { useEffect, useState } from 'react';

const name = 'Your Name';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
	const [theme, setTheme] = useState();

	useEffect(() => {
		setTheme(() =>
			typeof window !== 'undefined'
				? localStorage.getItem('theme') === 'dark'
					? 'dark'
					: 'light'
				: 'light'
		);
	}, [setTheme]);

	useEffect(() => {
		if (theme === 'dark') {
			document.querySelector('body').classList.add('dark');
		} else {
			document.querySelector('body').classList.remove('dark');
		}
	}, [theme]);

	const handleClick = () => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark') {
			localStorage.setItem('theme', 'light');
			setTheme('light');
		} else {
			localStorage.setItem('theme', 'dark');
			setTheme('dark');
		}
	};

	return (
		<div className="bg-pink-50 dark:bg-black text-gray-800 dark:text-gray-200 h-100">
			<div className={styles.container}>
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<meta name="description" content="Learn how to build a personal website using Next.js" />
					<meta
						property="og:image"
						content={`https://og-image.vercel.app/${encodeURI(
							siteTitle
						)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
					/>
					<meta name="og:title" content={siteTitle} />
					<meta name="twitter:card" content="summary_large_image" />
				</Head>
				<button className="w-12 px-2" onClick={handleClick}>
					{theme === 'dark' ? (
						<Image src="/light-mode.svg" alt="light" width={120} height={120} />
					) : (
						<Image src="/dark-mode.svg" alt="dark" width={120} height={120} />
					)}
				</button>
				<header className={styles.header}>
					{home ? (
						<>
							<Image
								priority
								src="/images/profile.jpg"
								className={utilStyles.borderCircle}
								height={144}
								width={144}
								alt={name}
							/>
							<h1 className={utilStyles.heading2Xl}>{name}</h1>
						</>
					) : (
						<>
							<Link href="/">
								<Image
									priority
									src="/images/profile.jpg"
									className={utilStyles.borderCircle}
									height={108}
									width={108}
									alt={name}
								/>
							</Link>
							<h2 className={utilStyles.headingLg}>
								<Link href="/">
									<div className={utilStyles.colorInherit}>{name}</div>
								</Link>
							</h2>
						</>
					)}
				</header>
				<main>{children}</main>
				{!home && (
					<>
						<Utterances />
						<div className={styles.backToHome}>
							<Link href="/">← Back to home</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
