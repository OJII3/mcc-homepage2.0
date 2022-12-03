import { GetStaticPaths, GetStaticProps } from 'next'
import markdownToHtml from './markdown-to-html'
import { Post } from './post-collector'
import { PostCollector } from './post-collector'

export class DynamicRouting {
  postCollector: PostCollector

  constructor(postCollector: PostCollector) {
    this.postCollector = postCollector
  }

  // アクセス可能なパスを用意する。ビルド時に実行される。
  getStaticPaths: GetStaticPaths = async () => {
    const postPaths = this.postCollector.getAllPostPaths()
    const paths = postPaths.map(({ slug, fullPath }) => {
      return { params: { slug } }
    })

    return {
      paths,
      fallback: false,
    }
  }

  // パスに対応するコンテンツ(HTML)を用意する。ビルド時に実行される。
  getStaticProps: GetStaticProps<{ post: Post }> = async (context) => {
    const post = this.postCollector.getPostBySlug(
      context?.params?.slug as string
    )
    post.content = await markdownToHtml(post.content)

    return {
      props: {
        post: post,
      },
    }
  }
}
