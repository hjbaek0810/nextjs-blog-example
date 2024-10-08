import utilStyles from '../../styles/utils.module.css';

import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '@components/Date';
import CodeBlock from '@components/CodeBlock';

import { MDXRemote } from 'next-mdx-remote';

export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params, preview }) {
	console.log(`>>>> ${preview}`);
	const postData = await getPostData(params.id);
	return {
		props: {
			postData
		}
	};
}

const Button = ({ children }) => {
	return (
		<button
			className="bg-black dark:bg-white text-teal-200 dark:text-teal-700 text-lg rounded-lg px-5"
			onClick={() => alert(`thanks to ${children}`)}
		>
			{children}
		</button>
	);
};
const components = { Button, CodeBlock };

export default function Post({ postData, pathname }) {
	return (
		<>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h2>pathname: {pathname}</h2>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				{postData.contentHtml && <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />}
				{postData.mdxSource && <MDXRemote {...postData.mdxSource} components={components} />}
			</article>
		</>
	);
}
