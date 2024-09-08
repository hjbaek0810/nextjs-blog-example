import { useRouter } from 'next/router';
import '../styles/globals.css';
import Layout from '@components/Layout';

export default function App({ Component, pageProps }) {
	const router = useRouter();

	return (
		<Layout home={router.pathname === '/'}>
			<Component {...pageProps} pathname={router.pathname} />;
		</Layout>
	);
}
