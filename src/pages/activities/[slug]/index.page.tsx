import { FC } from 'react';

import { ArticleWrapper } from '~/features/markdown/components/ArticleWrapper';
import { Post, PostCollector } from '~/features/markdown/post-collector';
import { SEO } from '~/features/seo';
import { Navbar } from '~/features/ui/Navbar';
import { DynamicRouting } from '~/routes/dynamic-routing';

const postCollector = new PostCollector('activities');
const dynamicRouting = new DynamicRouting(postCollector);

type ActivitiesPostPageProps = {
	post: Post;
};

/**
 * works以下のマークダウンファイルへのパスはここに通されます。
 * @param param0
 * @returns
 */
const ActivitiesPost: FC<ActivitiesPostPageProps> = ({ post }) => {
	return (
		<>
			<SEO meta={post.frontmatter} />
			<Navbar theme='auto' />
			<ArticleWrapper {...post.frontmatter} contentHtml={post.content} />
		</>
	);
};

// アクセス可能なパスを用意する。ビルド時に実行される。
export const getStaticPaths = dynamicRouting.getStaticPaths;

// パスに対応するコンテンツ(HTML)を用意する。ビルド時に実行される。
export const getStaticProps = dynamicRouting.getStaticProps;

export default ActivitiesPost;
